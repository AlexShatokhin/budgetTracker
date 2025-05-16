const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {PrismaClient} = require('@prisma/client');
class authService {
    prisma = new PrismaClient();

    asyncHandler(fn) {
        return (req, res, next) => {
            Promise.resolve(fn(req, res, next)).catch(next);
        };
    }

    auth = this.asyncHandler(async (req, res) => {
        const {email, password} = req.body;
        const hashPassword = await bcrypt.hash(password, 10);
        const user = await this.prisma.users.findUnique({
            where: {email}
        });
        if(user) return res.status(400).json({message: 'User already exists'});

        await this.prisma.users.create({
            data: {
                email,
                password: hashPassword
            }
        })
        res.status(200).json({message: 'User created successfully'});
    }) 

    login = this.asyncHandler(async (req, res) => {
        const {email, password} = req.query;
        const user = await this.prisma.users.findUnique({
            where: {email}
        });
        if(!user) return res.status(400).json({message: 'Invalid credentials'});
        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) return res.status(400).json({message: 'Invalid credentials'});
        
        const token = jwt.sign({userID: user.id}, process.env.SECRET_KEY, {
            expiresIn: '1h'
        });
        res.status(200).json({
            message: 'Login successful',
            token
        })
    }) 

    me = this.asyncHandler(async (req, res) => {
        const user = await this.prisma.users.findUnique({
            where: {id: req.userID},
            select: {email: true}
        });
        res.status(200).json({
            message: 'User details',
            email: user.email
        })
    })

    changePassword = this.asyncHandler(async (req, res) => {
        const {oldPassword, newPassword} = req.body;

        if(oldPassword === newPassword) return res.status(400).json({message: 'New password cannot be same as old password'});
        if(newPassword.length < 6) return res.status(400).json({message: 'New password must be at least 6 characters long'});

        const user = await this.prisma.users.findUnique({
            where: {id: req.userID}
        })
        if(!user) return res.status(400).json({message: 'User not found'});
        const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
        if(!isPasswordValid) return res.status(400).json({message: 'Invalid credentials'});

        const hashNewPassword = await bcrypt.hash(newPassword, 10);
        await this.prisma.users.update({
            where: {id: req.userID},
            data: {password: hashNewPassword}
        })
        res.status(200).json({message: 'Password changed successfully'});

    })
}

module.exports = new authService();