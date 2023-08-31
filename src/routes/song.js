const express = require('express');
const router = express.Router();

// Create Song
router.post('/', (req, res) => {
    res.status(200).send({ message: 'Return something...' });
});

// Get All Song
router.get('/', (req, res) => {
    res.status(200).send({ message: 'Return something...' });
});

// Get Song by ID
router.get('/:id', (req, res) => {
    res.status(200).send({ message: 'Return something...' });
});

// Like Song
router.get('/like/:id', (req, res) => {
    res.status(200).send({ message: 'Return something...' });
});

// Update Song
router.put('/:id', (req, res) => {
    res.status(200).send({ message: 'Return something...' });
});

// Deleted Song
router.delete('/:id', (req, res) => {
    res.status(200).send({ message: 'Return something...' });
});

// Export
module.exports = router;
