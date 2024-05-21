const { User } = require('../models');

const manyusers = async () => {
  const count = await User.countDocuments();
  return count;
};

module.exports = {
  async getuser(req, res) {
    try {
      const users = await User.find();
      const userele = {
        users,
        manyusers: await manyusers(),
      };
      return res.json(userele);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err); }
  },

  async userIDs(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.id }).lean();
      if (!user) {
        return res.status(404).json({ message: 'No users found' });
      }
      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err); }
  },

  async addusers(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err); }
  },

  async userupdates(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true }
      );
      if (!user) {
        return res.status(404).json({ message: 'No users found' }); }
      res.json(user);
    } catch (err) {
      res.status(500).json(err); }
  },

  async deleteusers(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.id });
      if (!user) {
        return res.status(404).json({ message: 'No users found' }); }
      res.json({ message: 'User deleted' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err); }
  },

  async addingusers(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.id },
        { $addToSet: { friends: req.params.friendID } },
        { runValidators: true, new: true }
      );
      if (!user) {
        return res.status(404).json({ message: 'No user found with this ID!' }); }
      res.json(user);
    } catch (err) {
      res.status(500).json(err); }
  },

  async deletingusers(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.id },
        { $pull: { friends: req.params.friendID } },
        { runValidators: true, new: true }
      );
      if (!user) {
        return res.status(404).json({ message: 'No user found with this ID!' }); }
      res.json(user);
    } catch (err) {
      res.status(500).json(err); }
  },
};