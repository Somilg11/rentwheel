import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export const BookingRouter = express.Router();

// Create Booking Route
BookingRouter.post('/create', async (req, res) => {
    const { userId, pickupLocation, dropLocation, pickupDateTime, dropDateTime, carType } = req.body;

    // Input validation
    if (!userId || !pickupLocation || !dropLocation || !pickupDateTime || !dropDateTime || !carType) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Ensure the user exists
        const user = await prisma.user.findUnique({
            where: { id: userId }
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Create a booking, ensuring correct relation setup
        const newBooking = await prisma.booking.create({
            data: {
                pickupLocation,
                dropLocation,
                pickupDateTime: new Date(pickupDateTime),
                dropDateTime: new Date(dropDateTime),
                carType: {
                    create: {
                        brand: carType.brand,
                        model: carType.model,
                        seatCapacity: carType.seatCapacity,
                        transmission: carType.transmission
                    }
                },
                user: { connect: { id: userId } }  // Connect booking to the user
            }
        });

        res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
    } catch (error) {
        console.error("Booking creation error:", error);
        res.status(500).json({ message: 'Error creating booking', error });
    }
});
