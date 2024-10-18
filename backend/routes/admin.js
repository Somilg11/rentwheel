import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export const AdminRouter = express.Router();

const JWT_SECRET = 'your_jwt_secret'; // Use environment variables in production

// Admin Register Route
AdminRouter.post('/register', async (req, res) => {
    const { firstName, lastName, email, password, dateOfBirth, gender } = req.body;

    // Basic input validation
    if (!firstName || !lastName || !email || !password || !dateOfBirth || !gender) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Check if admin already exists
        const existingAdmin = await prisma.admin.findUnique({
            where: { email }
        });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new admin
        const newAdmin = await prisma.admin.create({
            data: {
                firstName,
                lastName,
                email,
                password: hashedPassword,
                dateOfBirth: new Date(dateOfBirth),
                gender
            }
        });

        res.status(201).json({ message: 'Admin registered successfully', admin: newAdmin });
    } catch (error) {
        res.status(500).json({ message: 'Error registering admin', error });
    }
});

// Admin Login Route
AdminRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        // Find admin by email
        const admin = await prisma.admin.findUnique({
            where: { email }
        });

        if (!admin) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare password
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { adminId: admin.id, email: admin.email },
            JWT_SECRET,
            { expiresIn: '1h' } // Token expiration time
        );

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
});
