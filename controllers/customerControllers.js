import asyncHandler from "express-async-handler";
import Customer from "../models/customerModel.js";

const getAllcustomers = asyncHandler(async (req, res) => {
    try {
        const customers = await Customer.find();
        res.status(200).json(customers);
    } catch (error) {
        console.error("Error fetching customers:", error);
        res.status(500).json({ error: error.message });
    }
});

const getcustomersById = asyncHandler(async (req, res) => {
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
const postAllcustomers = asyncHandler(async (req, res) => {
    try {
        const { regNo, name, email, telephone, address, nic } = req.body;

        // Check for missing fields
        if (!regNo || !name || !email || !telephone || !address || !nic) {
            return res.status(400).json({ error: error.message });
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
const putcustomersById = asyncHandler(async (req, res) => {
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
const deletecustomersById = asyncHandler(async (req, res) => {
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



export {
    getAllcustomers,
    getcustomersById,
    postAllcustomers,
    putcustomersById,
    deletecustomersById
}