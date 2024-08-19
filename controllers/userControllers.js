// app.post('/api/register', async (req, res) => {
//     const { name, email, phone, address, city, country, zip, password } = req.body;
//     console.log('Registration Details:', req.body);
//     if (!name || !email || !phone || !address || !city || !country || !zip || !password) {
//         return res.status(400).json({ error: 'Please fill in all fields' });
//     }
//     try {
//         const existingCustomer = await Customer.findOne({ email });
//         if (existingCustomer) {
//             return res.status(400).json({ error: 'Email already registered' });
//         }
//         const newCustomer = new Customer({ name, email, phone, address, city, country, zip, password });
//         await newCustomer.save();
//         res.status(201).json({ message: 'Registration successful' });
//     } catch (error) {
//         console.error("Error during registration:", error.message || error); // Detailed error logging
//         if (error.code === 11000) {
//             return res.status(400).json({ error: 'Duplicate key error' });
//         }
//         res.status(500).json({ error: 'Internal server error', details: error.message });
//     }
// });

// Define the sign-in route
app.post('/api/signin', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Please fill in all fields' });
    }
    try {
        const user = await Customer.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        res.status(200).json({ message: 'Sign in successful' });
    } catch (error) {
        console.error('Error during sign-in:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});