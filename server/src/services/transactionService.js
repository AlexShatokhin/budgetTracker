const { PrismaClient } = require("@prisma/client");

class transactionService {
    async getTransactions(req, res){
        try {
            const client = new PrismaClient();
            const startDate = new Date(req.query.from);
            startDate.setHours(2,0,0,0)
            const endDate = new Date(req.query.to);
            endDate.setHours(25, 59, 59, 999);
            const transactions = await client.transactions.findMany({
                where: {
                    user_id: req.userID,
                    date: {
                        gte: startDate,
                        lte: endDate
                    }
                },
                orderBy: {
                    date: 'desc'
                },
                include: {
                    categories: true
                }
            });
            const totalAmounts = {
                income: 0,
                expense: 0
            }
            const formattedTransactions = transactions.map(transaction => ({
                ...transaction,
                category: transaction.categories.name,
            }));

            transactions.forEach(transaction => {
                totalAmounts[transaction.type] += +transaction.amount;
            })
            res.status(200).json({message: "Transactions sended successfully", result: formattedTransactions, total: totalAmounts})
    
        } catch(err){
            console.log(err);
            res.status(500).json({message: "Internal Server Error", result: []});
        }
    }

    async getLatestTransactions(req, res){
        try {
            const client = new PrismaClient();
            const limit = req.query.limit || 5;
            const transactions = await client.transactions.findMany({
                where: {
                    user_id: req.userID
                },
                orderBy: {
                    date: 'desc'
                },
                take: +limit,
                include: {
                    categories: true
                }
            })
            const totalAmounts = {
                income: 0,
                expense: 0
            }
            console.log(transactions);
            transactions.forEach(transaction => {
                totalAmounts[transaction.type] += +transaction.amount;
            });
            const formattedTransactions = transactions.map(transaction => ({
                ...transaction,
                category: transaction.categories.name,
            }));
            res.status(200).json({message: "Transactions sended successfully", result: formattedTransactions, total: totalAmounts})
        } catch(err){
            console.log(err);
            res.status(500).json({message: "Internal Server Error", result: []});
        }
    }

    async getMonthlyTransactions(req, res){
        try{
            const client = new PrismaClient();
            const result = await client.$queryRaw`
                SELECT 
                    DATE_FORMAT(date, '%Y-%m-01') AS month,
                    SUM(CASE WHEN type = "expense" THEN amount ELSE 0 END) AS expenses,
                    SUM(CASE WHEN type = "income" THEN amount ELSE 0 END) AS income
                FROM transactions
                WHERE date >= DATE_SUB(CURDATE(), INTERVAL 1 YEAR)
                GROUP BY month
                ORDER BY month;
            `;
            const convertedResult = result.map(item => {
                return {
                    month: new Intl.DateTimeFormat('en', { month: 'long' }).format(new Date(item.month)),
                    income: +item.income,
                    expenses: +item.expenses
                }
            })
            res.status(200).json({message: "Monthly amounts sended successfully", result: convertedResult})
        } catch(err){
            console.log(err);
            res.status(500).json({message: "Internal Server Error", result: []});
        }
    }

    async getAmountsByCategory(req, res){
        try {
            const client = new PrismaClient();
            const result = await client.$queryRaw`
                SELECT 
                    categories.name AS category,
                    SUM(CASE WHEN transactions.type = "expense" THEN transactions.amount ELSE 0 END) AS expenses,
                    SUM(CASE WHEN transactions.type = "income" THEN transactions.amount ELSE 0 END) AS income
                FROM transactions
                JOIN categories ON transactions.category_id = categories.id
                WHERE transactions.user_id = ${req.userID}
                GROUP BY category;
            `;
            const convertedResult = result.map(item => {
                return {
                    category: item.category,
                    type: item.expenses > item.income ? "expense" : "income",
                    amount: item.expenses > item.income ? +item.expenses : +item.income
                }
            })
            res.status(200).json({message: "Monthly amounts sended successfully", result: convertedResult})
        } catch(err){
            console.log(err);
            res.status(500).json({message: "Internal Server Error", result: []});
        }
    }

    async postTransaction(req, res){
        try {
            const client = new PrismaClient();
            const {
                amount,
                type,
                category,
                date, 
                time,
                description
            } = req.body;
            await client.transactions.create({
                data: {
                    amount,
                    type: type.toLowerCase(),
                    categories: {
                        connect: { id: +category },
                    },
                    date: new Date(date + "T" + time + ":00Z"),
                    note: description,
                    users: {
                        connect: { id: req.userID }
                    }
                }
            })
            res.status(200).json({message: "Transaction added successfully"})
        } catch(err){
            console.log(err);
            res.status(500).json({message: "Internal Server Error"});
        }
    }

    async getTransactionByCategory(req, res){
        try {
            const client = new PrismaClient();
            const type = req.query.type || "expense";
            const startDate = new Date(req.query.from);
            startDate.setHours(2,0,0,0)
            const endDate = new Date(req.query.to);
            endDate.setHours(25, 59, 59, 999);

            const transactionsByCategory = await client.transactions.groupBy({
                by: ['category_id'],
                _sum: {
                    amount: true
                },
                where: {
                    user_id: req.userID,
                    type: type,
                    date: {
                        gte: startDate,
                        lte: endDate
                    }
                }
            });

            const total = transactionsByCategory.reduce((acc, group) => acc + +group._sum.amount, 0);
            console.log(total)
            const result = await Promise.all(transactionsByCategory.map(async (group) => {
                const category = await client.categories.findUnique({
                    where: { id: group.category_id }
                });
                return {
                    id: category.id,
                    category: category.name,
                    totalAmount: group._sum.amount,
                    percentage: ((group._sum.amount / total) * 100).toFixed(2),
                };
            }));

            res.status(200).json({ message: "Transactions grouped by category successfully", result });
        } catch(err){

        }
    }

    async getTransactionByCategoryId(req, res){
        try {
            const client = new PrismaClient();
            const categoryId = req.params.categoryID;
            const startDate = new Date(req.query.from);
            startDate.setHours(2,0,0,0)
            const endDate = new Date(req.query.to);
            endDate.setHours(25, 59, 59, 999);

            const transactions = await client.transactions.findMany({
                where: {
                    user_id: req.userID,
                    category_id: +categoryId,
                    date: {
                        gte: startDate,
                        lte: endDate
                    }
                },
                orderBy: {
                    date: 'desc'
                },
                include: {
                    categories: true
                }
            })

            const formattedTransactions = transactions.map(transaction => ({
                ...transaction,
                category: transaction.categories.name,
            }));

            res.status(200).json({ message: `Transactions from category ${categoryId} sended successfully`, result: formattedTransactions });

        } catch(err){
            console.log(err);
            res.status(500).json({message: "Internal Server Error", result: []});
        }
    }

    async updateTransaction(req, res) {
        try {
            const client = new PrismaClient();
            const { transactionID } = req.params;
            const {
                amount,
                type,
                category,
                date,
                note
            } = req.body;
            const updatedTransaction = await client.transactions.update({
                where: { id: parseInt(transactionID) },
                data: {
                    amount,
                    type,
                    category,
                    date,
                    note
                }
            });
            res.status(200).json({ message: "Transaction updated successfully", result: updatedTransaction });

        } catch (err) {
            console.log(err);
            res.status(500).json("Internal Server Error");
        }
    }

    async deleteTransaction (req, res) {
        try {
            const client = new PrismaClient();
            const { transactionID } = req.params;
            await client.transactions.delete({
                where: {id: transactionID}
            })
            res.status(200).json({message: "Transaction removed successfully"})
    
        } catch(err){
            console.log(err);
            res.status(500).json("Internal Server Error");
        }
    }
}

module.exports = new transactionService();