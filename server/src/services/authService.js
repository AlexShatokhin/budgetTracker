const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {PrismaClient} = require('@prisma/client');
class authService {
    async auth(req, res){
        try {
            const { email, password } = req.body;
            const hashPassword = await bcrypt.hash(password, 10);
            const prisma = new PrismaClient();
            await prisma.users.create({
                data: {
                    email,
                    password: hashPassword
                }
            })
            res.status(200).json({message: 'User created successfully'});
        } catch(err){
            console.log(err);
            res.status(500).json({message: 'Internal server error'});
        }

    }

    async login(req, res){
        try {
            const {email, password} = req.query;
            const prisma = new PrismaClient();
            const user = await prisma.users.findUnique({
                where: {email}
            });
            if(!user){
                return res.status(400).json({message: 'Invalid credentials'});
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if(!isPasswordValid){
                return res.status(400).json({message: 'Invalid credentials'});
            }
            const token = jwt.sign({userID: user.id}, process.env.SECRET_KEY, {
                expiresIn: '1h'
            });
            res.status(200).json({
                message: 'Login successful',
                token
            })
        } catch(err){
            console.log(err);
            res.status(500).json({message: 'Internal server error'});
        }
    }

}

module.exports = new authService();