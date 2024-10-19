import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export const AdminRouter = express.Router();

const JWT_SECRET = 'admin_jwt_secret'; // Use environment variables in production

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

// Get Vehicles (with optional filtering)
// Get all Vehicles
AdminRouter.get('/vehicles', async (req, res) => {
    

    try {
        const vehicles = await prisma.vehicle.findMany({});

        res.status(200).json({ vehicles });
    } catch (error) {
        console.error('Error fetching vehicles:', error); // Log error for debugging
        res.status(500).json({ message: 'Error fetching vehicles', error });
    }
});


// Add Vehicle
// Add Vehicle Route with improved error handling
// Add Vehicle
// Add Vehicle
AdminRouter.post('/vehicles', async (req, res) => {
    const { name, image, seats, pricePerDay, fuelType, transmission, condition, status, type } = req.body;

    if (!name || !image || !seats || !pricePerDay || !fuelType || !transmission || !condition || !status || !type) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const newVehicle = await prisma.vehicle.create({
            data: {
                name,
                image,
                seats,
                pricePerDay,
                fuelType,
                transmission,
                condition,
                status,
                type
            }
        });

        res.status(201).json({ message: 'Vehicle added successfully', vehicle: newVehicle });
    } catch (error) {
        console.error('Error adding vehicle:', error);
        res.status(500).json({ message: 'Error adding vehicle', error: error.message || error });
    }
});



// Update Vehicle
AdminRouter.put('/vehicles/:id', async (req, res) => {
    const { id } = req.params;
    const { name, image, seats, pricePerDay, fuelType, transmission, condition, status, type } = req.body;

    if (!name && !image && !seats && !pricePerDay && !fuelType && !transmission && !condition && !status && !type) {
        return res.status(400).json({ message: 'At least one field is required' });
    }

    try {
        const updatedVehicle = await prisma.vehicle.update({
            where: { id: Number(id) },
            data: { name, image, seats, pricePerDay, fuelType, transmission, condition, status, type }
        });

        res.status(200).json({ message: 'Vehicle updated successfully', vehicle: updatedVehicle });
    } catch (error) {
        res.status(500).json({ message: 'Error updating vehicle', error: error.message || error });
    }
});


// Delete Vehicle
AdminRouter.delete('/vehicles/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const vehicle = await prisma.vehicle.delete({
            where: { id: Number(id) }
        });
        res.status(200).json({ message: 'Vehicle deleted successfully', vehicle });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting vehicle', error });
    }
});


// Get Orders (with optional filtering)
AdminRouter.get('/orders', async (req, res) => {
    const { page = 1, searchTerm = '', statusFilter = 'all' } = req.query;
    const take = 10;
    const skip = (page - 1) * take;

    try {
        let whereClause = {
            OR: [
                { customerName: { contains: searchTerm, mode: 'insensitive' } },
                { vehicleName: { contains: searchTerm, mode: 'insensitive' } }
            ]
        };

        if (statusFilter !== 'all') {
            whereClause = { ...whereClause, status: statusFilter };
        }

        const orders = await prisma.order.findMany({
            where: whereClause,
            skip,
            take
        });

        const totalOrders = await prisma.order.count({ where: whereClause });
        const totalPages = Math.ceil(totalOrders / take);

        res.status(200).json({ orders, totalPages });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error });
    }
});

// Update Order Status
AdminRouter.put('/orders/:id', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
        return res.status(400).json({ message: 'Status is required' });
    }

    try {
        const updatedOrder = await prisma.order.update({
            where: { id: Number(id) },
            data: { status }
        });

        res.status(200).json({ message: 'Order status updated successfully', order: updatedOrder });
    } catch (error) {
        res.status(500).json({ message: 'Error updating order status', error });
    }
});
