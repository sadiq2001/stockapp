const express = require('express');
const Product = require('../models/Product');
const { BedrockClient, InvokeModelCommand } = require('@aws-sdk/client-bedrock'); // AWS SDK v3 Bedrock client

const router = express.Router();

// Create a Bedrock client with credentials and region configuration
const bedrockClient = new BedrockClient({
  region: 'us-east-1', // Replace with your Bedrock region
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// @route POST /api/products
// @desc Add a new product and generate description using Amazon Bedrock
router.post('/', async (req, res) => {
  const { name, category, price } = req.body;

  // Create product entry in MongoDB
  const newProduct = new Product({
    name,
    category,
    price,
  });

  try {
    // Prepare the input for Bedrock model invocation
    const command = new InvokeModelCommand({
      modelId: 'gpt-foundation-model', // Hypothetical model ID for Bedrock's GPT model
      prompt: `Create a brief product description for a ${name} in the ${category} category.`, // Use correct template literals
    });

    // Send request to Bedrock and await response
    const response = await bedrockClient.send(command);

    // Check the structure of the response
    console.log('Bedrock response:', response);

    // Save generated description to the product
    newProduct.description = response.generated_text;  // Adjust this based on the actual response structure

    // Save the product to the database
    await newProduct.save();

    // Send the saved product as a response
    res.json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
