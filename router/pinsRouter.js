// Pins Router
const express = require('express');
const router = express.Router();
const Pins = require('../Model/User')

// Create a new Data
router.post('/new', async (req, res) => {
    try {
        const user = new Pins(req.body);
        const data = await user.save();
        res.status(201).json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all Data
router.get('/', async (req, res) => {
    try {
        const users = await Pins.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get('/get/:email', async (req, res) => {
    try {
        const user = await Pins.findOne({ email: req.params.email });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Update a Data by ID
router.put('/:id', async (req, res) => {

    try {
        const user = await Pins.findByIdAndUpdate(req.params.id, req.body);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a Data by ID
router.delete('/:id', async (req, res) => {
    try {
        const user = await Pins.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

