import express from 'express';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import multer from 'multer';
import jwt from 'jsonwebtoken';


const prisma = new PrismaClient();
const upload = multer({ dest: 'uploads/' }); // Configure multer for file uploads
export const UserRouter = express.Router();

// Register Route
UserRouter.post('/register', upload.single('drivingLicense'), async (req, res) => {
    const { firstName, lastName, email, password, dateOfBirth, gender } = req.body;
    const drivingLicenseImage = req.file ? req.file.path : null;

    // Basic input validation
    if (!firstName || !lastName || !email || !password || !dateOfBirth || !gender) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = await prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                password: hashedPassword,
                dateOfBirth: new Date(dateOfBirth),
                gender,
                drivingLicenseImage
            }
        });
        const userId = user.id;
        const token = jwt.sign(
            { userId: newUser.id, email: newUser.email },
            process.env.JWT_SECRET,  // Ensure JWT_SECRET is loaded from environment variables
            { expiresIn: '1h' } // Token expiration time
        );

        res.status(201).json({ message: 'User registered successfully', userId, token });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Error registering user', error });
    }
});


// Login Route
UserRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        // Find user by email
        const user = await prisma.user.findUnique({
            where: { email }
        });
        const userId = user.id;
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        
        // Generate JWT token
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET,  // Ensure JWT_SECRET is loaded from environment variables
            { expiresIn: '1h' } // Token expiration time
        );
        

        

        return res.status(200).json({ message: 'Login successful', token, userId });
    } catch (error) {
        console.error('Error during login:', error); // Log the error for debugging
        return res.status(500).json({ 
            message: 'Error logging in', 
            error: error.message || 'An unknown error occurred'  // Send a more detailed error message
        });
    }
});
