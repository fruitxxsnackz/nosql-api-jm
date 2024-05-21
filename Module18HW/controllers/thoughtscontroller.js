const { Thought, User } = require('../models');

module.exports = {
    async getthoughts(req, res) {
        try {
            const thoughts = await Thought.find({});
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err); }
    },
    async thoughtsID(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId });
            if (!thought) {
                return res.status(404).json({ message: 'No thought found with this ID!' });
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err); }
    },

    async newthoughts(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const usersdata = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $push: { thoughts: thought._id } },
                { new: true }
            );
            if (!usersdata) {
                return res.status(404).json({ message: 'Invalid data' });
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err); }
    },

    async refreshthoughts(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(
                { _id: req.params.thoughtId },
                req.body,
                { runValidators: true, new: true }
            );
            if (!thought) {
                return res.status(404).json({ message: 'No thoughts found' });
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err); }
    },

    async deleteThought(req, res) {
        try {
            const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
            if (!thought) {
                return res.status(404).json({ message: 'No thoughts found' });
            }
            res.json({ message: 'Thought deleted!' });
        } catch (err) {
            res.status(500).json(err); }
    },

    async addingreact(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $push: { reactions: req.body } },
                { new: true, runValidators: true }
            );
            if (!thought) {
                return res.status(404).json({ message: 'Invalid data' });
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err); }
    },

    async deletingreact(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { new: true, runValidators: true }
            );
            if (!thought) {
                return res.status(404).json({ message: 'Invalid data' });
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err); }
    },
};