const { PrismaClient } = require("@prisma/client");

class categoryService {
    async getCategories(req, res) {
        try {
            const client = new PrismaClient();
            const categories = await client.categories.findMany();
            res.status(200).json({ message: "Categories retrieved successfully", result: categories });
        } catch (err) {
            console.log(err);
            res.status(500).json("Internal Server Error");
        }
    }

    async createCategory(req, res) {
        try {
            const client = new PrismaClient();
            const { name, monthly_budget } = req.body;
            const newCategory = await client.categories.create({
                data: {
                    user_id: req.userID,
                    name,
                    monthly_budget
                }
            });
            res.status(201).json({ message: "Category created successfully", result: newCategory });
        } catch (err) {
            console.log(err);
            res.status(500).json({message: "Internal Server Error"});
        }
    }

    async updateCategory(req, res) {
        try {
            const client = new PrismaClient();
            const { id } = req.params;
            const { name, monthly_budget } = req.body;
            const updatedCategory = await client.categories.update({
                where: { id: parseInt(id) },
                data: {
                    name,
                    monthly_budget
                }
            });
            res.status(200).json({ message: "Category updated successfully", result: updatedCategory });
        } catch (err) {
            console.log(err);
            res.status(500).json({message: "Internal Server Error"});
        }
    }

    async deleteCategory(req, res) {
        try {
            const client = new PrismaClient();
            const { id } = req.params;
            await client.categories.delete({
                where: { id: parseInt(id) }
            });
            res.status(200).json({ message: "Category deleted successfully" });
        } catch (err) {
            console.log(err);
            res.status(500).json({message: "Internal Server Error"});
        }
    }
}

module.exports = new categoryService();