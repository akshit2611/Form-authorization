// db.js - MongoDB Atlas Connection Helper
const { MongoClient } = require('mongodb');
require('dotenv').config();

// Connection URI from .env
const uri = process.env.MONGODB_URI;

// Create a new MongoClient with connection pooling
const client = new MongoClient(uri, {
  maxPoolSize: 10, // Maximum number of connections in pool
  connectTimeoutMS: 5000, // Timeout after 5 seconds
  socketTimeoutMS: 30000 // Close sockets after 30s of inactivity
});

// Global variable to cache the connection
let cachedDb = null;

async function connectDB() {
  if (cachedDb) {
    console.log("Using existing database connection");
    return cachedDb;
  }

  try {
    // Connect the client to the server
    await client.connect();
    
    // Test the connection
    await client.db().admin().ping();
    console.log("Successfully connected to MongoDB Atlas!");
    
    // Select database (replace 'myDatabase' with your actual DB name)
    const db = client.db('myDatabase');
    
    // Cache the connection
    cachedDb = db;
    return db;
    
  } catch (err) {
    console.error("MongoDB connection error:", err);
    // Close the client if there's an error
    await client.close();
    process.exit(1); // Exit process with failure
  }
}

// Graceful shutdown handler
process.on('SIGINT', async () => {
  await client.close();
  console.log('MongoDB connection closed');
  process.exit(0);
});

module.exports = connectDB;