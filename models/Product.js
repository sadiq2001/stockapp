const mongoose = require('mongoose');

// Set strictQuery option to avoid deprecation warning
mongoose.set('strictQuery', true); // Set to false if you want to allow flexible queries

// Connect to MongoDB (replace the connection string with your own)
mongoose.connect('mongodb://localhost:27017/yourDatabaseName', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('Connection error', err));

// Define the Product schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
});

// Export the Product model
module.exports = mongoose.model('Product', productSchema);
