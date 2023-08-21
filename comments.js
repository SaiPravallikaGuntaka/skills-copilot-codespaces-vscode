// Create web server 

// Import modules
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// Handle request to get all comments
router.get('/', async (req, res) => {
    try {
        const comments = await Comment.find();
        res.json(comments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Handle request to get one comment
router.get('/:id', getComment, (req, res) => {
    res.json(res.comment);
});

// Handle request to create one comment
router.post('/', [
    check('name').isLength({ min: 1 }).withMessage('Name is required'),
    check('comment').isLength({ min: 1 }).withMessage('Comment is required'),
    check('rating').isLength({ min: 1 }).withMessage('Rating is required'),
    check('date').isLength({ min: 1 }).withMessage('Date is required'),
    check('movie_id').isLength({ min: 1 }).withMessage('Movie ID is required'),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors });
    }

    const comment = new Comment({
        name: req.body.name,
        comment: req.body.comment,
        rating: req.body.rating,
        date: req.body.date,
        movie_id: req.body.movie_id
    });

    try {
        const newComment = await comment.save();
        res.status(201).json(newComment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Handle request to update one comment
router.patch('/:id', getComment, async (req, res) => {
    if (req.body.name != null) {
        res.comment.name = req.body.name;
    }
    if (req.body.comment != null) {
        res.comment.comment = req.body.comment;
    }
    if (req.body.rating != null) {
        res.comment.rating = req.body.rating;
    }
    if (req.body.date != null) {
        res.comment.date = req.body.date;
    }
    if (req.body.movie_id != null) {
        res.comment.movie_id = req.body.movie_id;
    }

    try {
        const updatedComment = await res.comment.save();
        res.json(updatedComment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
