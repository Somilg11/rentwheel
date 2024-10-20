import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export const BookingRouter = express.Router();

BookingRouter.post('/create', async (req, res) => {
    // Destructure request body and ensure all required fields are present
    const { userId, pickupLocation, dropLocation, pickupDateTime, dropDateTime, name, price, seatCapacity } = req.body;

    // Input validation
    if (!userId || !pickupLocation || !dropLocation || !pickupDateTime || !dropDateTime || !name || !price || !seatCapacity) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Convert userId to an integer
        const parsedUserId = parseInt(userId, 10); // Ensure userId is an integer

        // Ensure the user exists
        const user = await prisma.user.findUnique({
            where: { id: parsedUserId } // Use parsed integer userId
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Find the vehicle by its name
        const vehicle = await prisma.vehicle.findUnique({
            where: { name } // Using name to find the vehicle
        });
        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }

        // Create the booking
        const newBooking = await prisma.booking.create({
            data: {
                pickupLocation,
                dropLocation,
                pickupDateTime: new Date(pickupDateTime),
                dropDateTime: new Date(dropDateTime),
                vehicle: { connect: { id: vehicle.id } }, // Link the booking to the vehicle using ID
                user: { connect: { id: parsedUserId } } // Link the booking to the user
            }
        });

        res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
    } catch (error) {
        console.error('Booking creation error:', error);
        res.status(500).json({ message: 'Error creating booking', error: error.message });
    }
});

export default BookingRouter;
