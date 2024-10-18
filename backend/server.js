import express from 'express';
import { UserRouter } from './routes/user.js';
import { AdminRouter } from './routes/admin.js';
import { BookingRouter } from './routes/booking.js';

const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Use UserRouter, AdminRouter, and BookingRouter for respective routes
app.use('/user', UserRouter);
app.use('/admin', AdminRouter);
app.use('/booking', BookingRouter);

// Homepage route
app.get("/", (req, res) => {
    res.send("Homepage");
});

app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});
