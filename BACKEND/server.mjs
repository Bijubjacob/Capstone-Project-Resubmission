import express from 'express';
import connectDB from './config/db.mjs';
import dotenv from 'dotenv';
import userRoutes from './routes/api/users.mjs';
import authRoutes from './routes/api/auth.mjs';
import profileRoutes from './routes/api/profile.mjs';
import adminRoutes from './routes/api/admin.mjs';
import cors from 'cors';
import listEndpoints from 'express-list-endpoints';
import subscribeRoutes from './routes/api/subscribe.mjs';


dotenv.config();


//Initialize our app variable with Express
const app = express();

//Connect Database
connectDB();

// Initialize middleware

app.use(cors({
  origin: 'https://shootpro24.onrender.com', // Allow the frontend to make requests
  methods: 'GET,POST,PUT,DELETE', // Allow specific methods
  credentials: true, // If needed, enable cookies
}));
app.use(express.json({ extended: false }));

//Single endpoint just to test API. Send data to browser
//app.get('/', (req, res) => res.send('API Running'))

//Define Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
// Use admin routes
app.use('/api/admin', adminRoutes);
app.use('/api/subscribe', subscribeRoutes); // Use the new subscribe route


// Log cloud name for verification, but REMOVE it for production
if (process.env.NODE_ENV !== 'production') {
  console.log('Cloudinary Cloud Name:', process.env.CLOUD_NAME);
}

console.log(listEndpoints(app));  // This will print all routes to the console

// This route will respond to requests made to the root URL "/"
app.get('/', (req, res) => {
  res.send('Welcome to the backend!');
});

// Enviromental Variables
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
