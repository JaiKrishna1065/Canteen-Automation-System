const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const logger = require("./middleware");

const app = express();
const PORT = 3000;

// Middleware6
app.use(cors());
app.use(express.json());
app.use(logger);

const url = "mongodb://localhost:27017";
const db = "Canteen-Automeal";
const client = new MongoClient(url, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const connect = async (callback) => {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    callback();
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  }
};

// Save bill details to MongoDB
app.post('/Bill', async (req, res) => {
  const billDetails = req.body;
  console.log('Received bill details:', billDetails);
  try {
      const database = client.db('Canteen-Automeal');
      const collection = database.collection("orders");
      const result = await collection.insertOne(billDetails);
      res.status(200).json({ ok: true, message: 'Bill saved successfully' });
  } catch (error) {
      console.error("Error saving bill:", error);
      res.status(500).json({ message: 'Error saving bill', error });
  }
});

app.get('/Orders', async (req, res) => {
  try {
      const database = client.db('Canteen-Automeal');
      const collection = database.collection("orders");
      const orders = await collection.find({}).toArray();
      res.status(200).json(orders);
  } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ message: 'Error retrieving orders', error });
  }
});

connect(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  });
