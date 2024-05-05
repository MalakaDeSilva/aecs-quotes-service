const AWS = require("aws-sdk");
const express = require("express");

// Set your AWS credentials and region
AWS.config.update({
  region: "ap-southeast-1",
});

// Initialize AWS DynamoDB DocumentClient
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const app = express();
const PORT = process.env.PORT || 3000;

// Define the endpoint to fetch a random quote
app.get("/quote", async (req, res) => {
  try {
    // Query DynamoDB to get all quotes
    const queryParams = {
      TableName: "QuotesTable", // Replace 'QuotesTable' with your DynamoDB table name
    };
    const { Items } = await dynamoDB.scan(queryParams).promise();

    // Choose a random quote from the list
    const randomIndex = Math.floor(Math.random() * Items.length);
    const randomQuote = Items[randomIndex];

    res.json(randomQuote);
  } catch (error) {
    console.error("Error fetching quote:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
