const { PrismaClient } = require("@prisma/client");

class transactionService {
    prisma = new PrismaClient();

    getDateRange(from, to) {
        const startDate = new Date(from);
        startDate.setHours(2, 0, 0, 0);
    
        const endDate = new Date(to);
        endDate.setHours(25, 59, 59, 999);
    
        return { startDate, endDate };
    }

    formatTransactions(transactions){
        return transactions.map(transaction => ({
            ...transaction,
            category: transaction.categories.name,
        }));
    }

    asyncHandler(fn) {
        return (req, res, next) => {
            Promise.resolve(fn(req, res, next)).catch(next);
        };
    }

    getTransactions = this.asyncHandler(async (req, res) => {
        const { startDate, endDate } = this.getDateRange(req.query.from, req.query.to);
        const transactions = await this.prisma.transactions.findMany({
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

        transactions.forEach(transaction => {
            totalAmounts[transaction.type] += +transaction.amount;
        })
        res.status(200).json({message: "Transactions sended successfully", result: this.formatTransactions(transactions), total: totalAmounts})
    })

    getLatestTransactions = this.asyncHandler(async (req, res) => {
        const limit = req.query.limit || 5;
        const transactions = await this.prisma.transactions.findMany({
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
        transactions.forEach(transaction => {
            totalAmounts[transaction.type] += +transaction.amount;
        });
        res.status(200).json({message: "Transactions sended successfully", result: this.formatTransactions(transactions), total: totalAmounts})
    })

    getMonthlyTransactions = this.asyncHandler(async (_req, res) => {
        const result = await this.prisma.$queryRaw`
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
    })

     getAmountsByCategory = this.asyncHandler(async (req, res) => {
        const result = await this.prisma.$queryRaw`
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
    })

    postTransaction = this.asyncHandler(async (req, res) => {
        const {
            amount,
            type,
            category,
            date, 
            time,
            description
        } = req.body;
        await this.prisma.transactions.create({
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
    })

    getTransactionByCategory = this.asyncHandler(async (req, res) => {
        const type = req.query.type || "expense";
        const {startDate, endDate} = this.getDateRange(req.query.from, req.query.to);

        const transactionsByCategory = await this.prisma.transactions.groupBy({
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
        const result = await Promise.all(transactionsByCategory.map(async (group) => {
            const category = await this.prisma.categories.findUnique({
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
    })

    getTransactionByCategoryId = this.asyncHandler(async (req, res) =>{
        const categoryId = req.params.categoryID;
        const { startDate, endDate } = this.getDateRange(req.query.from, req.query.to);

        const transactions = await this.prisma.transactions.findMany({
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

        res.status(200).json({ message: `Transactions from category ${categoryId} sended successfully`, result: this.formatTransactions(transactions) });
    })

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