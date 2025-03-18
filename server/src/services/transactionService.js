const { PrismaClient } = require("@prisma/client");

class transactionService {
    async getTransactions(req, res){
        try {
            const client = new PrismaClient();
            const transactions = await client.transactions.findMany({
                where: {
                    user_id: req.userID
                }
            });
            res.status(200).json({message: "Transactions sended successfully", result: transactions})
    
        } catch(err){
            console.log(err);
            res.status(500).json("Internal Server Error");
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
                    user_id: req.userID,
                    amount,
                    type: type.toLowerCase(),
                    category,
                    date: new Date(date + "T" + time + ":00Z"),
                    note: description
                }
            })
            res.status(200).json({message: "Transaction added successfully"})
        } catch(err){
            console.log(err);
            res.status(500).json({message: "Internal Server Error"});
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