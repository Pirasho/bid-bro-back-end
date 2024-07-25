const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const app = express();
const port = 5000;

// CORS configuration
app.use(cors({
  origin: 'http://localhost:3000', 
}));

app.use(express.json());

// MongoDB connection
const mongoUri = "mongodb+srv://nelaxsana:Neluxcy07@cluster0.xxm0soz.mongodb.net/sample1?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to MongoDB");
}).catch((error) => {
  console.error("MongoDB connection error:", error);
});

// Product schema and model
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
});

const Product = mongoose.model("Product", productSchema);

// Seller schema and model
const sellerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  telephone: { type: String, required: true },
  address: { type: String, required: true },
  nic: { type: String, required: true },
});

const Seller = mongoose.model("Seller", sellerSchema);

// Customer schema and model
const customerSchema = new mongoose.Schema({
  regNo: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  telephone: { type: String, required: true },
  address: { type: String, required: true },
  nic: { type: String, required: true },
});
const Customer = mongoose.model("Customer", customerSchema);

//chart schema

const salesSchema = new mongoose.Schema({
  productName: String,
  count: Number,
});

const Sales = mongoose.model('Sales', salesSchema);


// Example of creating a new sales record
const newSale = new Sales({
  productName: 'Product A',
  count: 10,
});

newSale.save()
  .then(savedSale => {
    console.log('New sale saved:', savedSale);
  })
  .catch(error => {
    console.error('Error saving new sale:', error);
  });





// User schema and model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

userSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();

  try {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    return next();
  } catch (error) {
    return next(error);
  }
});

const User = mongoose.model('User', userSchema);
// Routes

// Product routes
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/products", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error("Error creating product:", error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Internal server error" });
  }
});


app.put("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(400).json({ error: "Bad request" });
  }
});

app.delete("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Seller routes
app.get("/api/sellers", async (req, res) => {
  try {
    const sellers = await Seller.find();
    res.status(200).json(sellers);
  } catch (error) {
    console.error("Error fetching sellers:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/sellers/:id", async (req, res) => {
  try {
    const seller = await Seller.findById(req.params.id);
    if (!seller) {
      return res.status(404).json({ error: "Seller not found" });
    }
    res.status(200).json(seller);
  } catch (error) {
    console.error("Error fetching seller by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/sellers", async (req, res) => {
  try {
      const { name, email, telephone, address, nic } = req.body;
      
      // Log the incoming request body
      console.log("Incoming request body:", req.body);

      // Check for missing fields
      if (!name || !email || !telephone || !address || !nic) {
          return res.status(400).json({ error: "All fields are required" });
      }

      // Create a new seller
      const seller = new Seller({ name, email, telephone, address, nic });
      await seller.save();

      // Log successful save
      console.log("Seller added successfully:", seller);

      res.status(201).json(seller);
  } catch (error) {
      // Log detailed error
      console.error("Error adding seller:", error);

      // Return specific error message
      if (error.name === 'ValidationError') {
          return res.status(400).json({ error: error.message });
      }

      res.status(500).json({ error: "Internal server error" });
  }
});



app.put("/api/sellers/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedSeller = await Seller.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedSeller) {
      return res.status(404).json({ error: "Seller not found" });
    }
    res.status(200).json(updatedSeller);
  } catch (error) {
    console.error("Error updating seller:", error);
    res.status(400).json({ error: "Bad request" });
  }
});

app.delete("/api/sellers/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSeller = await Seller.findByIdAndDelete(id);
    if (!deletedSeller) {
      return res.status(404).json({ error: "Seller not found" });
    }
    res.status(200).json({ message: "Seller deleted successfully" });
  } catch (error) {
    console.error("Error deleting seller:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});





app.get('/api/salesProducts', async (req, res) => {
  try {
    const sales = await Sales.find();
    res.status(200).json(sales);
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});

app.post('/api/salesProducts', async (req, res) => {
  try {
    const { productName, count } = req.body;
    if (!productName || !count) {
      return res.status(400).json({ error: 'Product name and count are required' });
    }
    const newSale = new Sales({ productName, count });
    await newSale.save();
    res.status(201).json(newSale);
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});



// Routes for Customers
// Get all customers
app.get("/api/customers", async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (error) {
    console.error("Error fetching customers:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get customer by ID
app.get("/api/customers/:id", async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }
    res.status(200).json(customer);
  } catch (error) {
    console.error("Error fetching customer by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Add a new customer
app.post("/api/customers", async (req, res) => {
  try {
    const { regNo, name, email, telephone, address, nic } = req.body;

    // Check for missing fields
    if (!regNo || !name || !email || !telephone || !address || !nic) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Create a new customer
    const customer = new Customer({ regNo, name, email, telephone, address, nic });
    await customer.save();

    res.status(201).json(customer);
  } catch (error) {
    console.error("Error adding customer:", error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update customer by ID
app.put("/api/customers/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCustomer = await Customer.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedCustomer) {
      return res.status(404).json({ error: "Customer not found" });
    }
    res.status(200).json(updatedCustomer);
  } catch (error) {
    console.error("Error updating customer:", error);
    res.status(400).json({ error: "Bad request" });
  }
});

// Delete customer by ID
app.delete("/api/customers/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCustomer = await Customer.findByIdAndDelete(id);
    if (!deletedCustomer) {
      return res.status(404).json({ error: "Customer not found" });
    }
    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (error) {
    console.error("Error deleting customer:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// // Registration endpoint
// app.post('/api/register', async (req, res) => {
//   const { name, email, password } = req.body;

//   if (!name || !email || !password) {
//     return res.status(400).json({ error: 'Please fill in all fields' });
//   }

//   try {
//     console.log("Checking for existing user...");
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       console.log("Email already registered.");
//       return res.status(400).json({ error: 'Email already registered' });
//     }

//     console.log("Creating new user...");
//     const newUser = new User({ name, email, password });
//     await newUser.save();
//     console.log("User registered successfully.");
//     res.status(201).json({ message: 'Registration successful' });
//   } catch (error) {
//     console.error("Error during registration:", error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });


// Endpoint to get product count
app.get('/api/productCount', async (req, res) => {
  try {
    const productCount = await Product.countDocuments();
    res.json({ count: productCount });
  } catch (error) {
    console.error('Error fetching product count:', error);
    res.status(500).json({ error: 'Failed to fetch product count' });
  }
});




// Endpoint to get sellers count
app.get('/api/sellersCount', async (req, res) => {
  try {
    const sellersCount = await Seller.countDocuments();
    res.json({ count: sellersCount });
  } catch (error) {
    console.error('Error fetching sellers count:', error);
    res.status(500).json({ error: 'Failed to fetch sellers count' });
  }
});


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});