require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');

const app = express();

// Middleware
app.use(cors({
  origin: 'https://nithwin-blog.vercel.app', // Replace with the frontend URL if different
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
// Apply CORS middleware
app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));
app.use(express.json());  // Parse JSON requests

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://nithwin-blog.vercel.app');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/auth", authRoutes);  // Authentication routes
app.use("/blogs", blogRoutes);  // Blog routes

app.get("/works",(req,res) =>{
  res.send("working good");
})
// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
