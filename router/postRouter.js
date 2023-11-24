
const express = require('express');
const router = express.Router();
const Posts = require('../Model/Posts');

// Create a new Data
router.post('/new', async (req, res) => {
    try {
        const newData = new Posts(req.body);
        const data = await newData.save();
        res.status(201).json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all Data
router.get('/', async (req, res) => {
    try {
        const data = await Posts.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get('/get/:email', async (req, res) => {
    try {
        const data = await Posts.find({ email: req.params.email });
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get('/pins/:email', async (req, res) => {
    try {
        const data = await Posts.find({ pins: { email: req.params.email } });
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get('/category/:name', async (req, res) => {
    try {
        const data = await Posts.find({ category: req.params.name });
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.put('/save/:id', async (req, res) => {
    try {
        const { email } = req.body
        const tergetData = await Posts.findOne({ _id: req.params.id })
        if (tergetData) {
            const isExist = tergetData.pins.filter((p) => p.email === email)

            if (isExist.length) {
                res.send({ tergetData, status: "Data Alrady Exist" })
            }
            else {
                const updatePost = await Posts.updateOne({ _id: req.params.id }, { pins: [...tergetData.pins, { email }] })
                res.status(200).send(updatePost)
            }
        }
        else {
            res.status(404).send(tergetData)
        }
    } catch (error) {
        res.status(500).send(error)
    }
})

router.put('/remove/:id', async (req, res) => {
    try {
        const { email } = req.body
        const tergetData = await Posts.findOne({ _id: req.params.id })
        if (tergetData) {
            const exist = tergetData.pins.filter((p) => p.email !== email)
            console.log(exist)
            const updatePost = await Posts.updateOne({ _id: req.params.id },
                { pins: exist })
            res.status(200).send(updatePost)

        }
        else {
            res.status(404).send(tergetData)
        }
    } catch (error) {
        res.status(500).send(error)
    }
})
// Update a Data by ID
router.put('/:id', async (req, res) => {

    try {
        const data = await Posts.findByIdAndUpdate(req.params.id, req.body);

        if (!data) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a Data by ID
router.delete('/:id', async (req, res) => {
    try {
        const data = await Posts.findByIdAndDelete(req.params.id);
        if (!data) {
            return res.status(404).json({ message: 'Data not found' });
        }
        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

