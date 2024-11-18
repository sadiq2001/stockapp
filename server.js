const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const mqtt = require('mqtt'); // Import the MQTT module

// Load environment variables
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Root route to respond to GET requests
app.get('/', (req, res) => {
  res.send('Welcome to the Stock Management API!');
});

// Routes
app.use('/api/products', productRoutes);

// MQTT setup
const client = mqtt.connect('mqtt://your-ec2-ip-address:1883');

client.on('connect', () => {
  console.log('Connected to MQTT Broker');
  
  // Subscribe to a topic (e.g., 'stock/updates')
  client.subscribe('stock/updates', (err) => {
    if (!err) {
      console.log('Subscribed to stock updates');
    } else {
      console.error('Subscription error:', err);
    }
  });
});

client.on('message', (topic, message) => {
  console.log(`Received message on ${topic}: ${message.toString()}`);
  // Process the message further if needed
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
