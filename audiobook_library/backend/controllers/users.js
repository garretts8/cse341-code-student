// const { ObjectId } = require('mongodb');
// const mongodb = require('../db/connect');

// // GET all users (admin only - protected by OAuth)
// const getAllUsers = async (req, res) => {
//   try {
//     // Check if user is authenticated
//     if (!req.isAuthenticated()) {
//       return res.status(401).json({ message: 'Unauthorized' });
//     }

//     const result = await mongodb
//       .getDb()
//       .collection('users')
//       .find()
//       .toArray();

//     res.status(200).json(result);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // GET current user profile
// const getCurrentUser = async (req, res) => {
//   try {
//     if (!req.isAuthenticated()) {
//       return res.status(401).json({ message: 'Not authenticated' });
//     }

//     res.status(200).json(req.user);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // GET user by ID
// const getUserById = async (req, res) => {
//   try {
//     if (!req.isAuthenticated()) {
//       return res.status(401).json({ message: 'Unauthorized' });
//     }

//     const userId = new ObjectId(req.params.id);
//     const result = await mongodb
//       .getDb()
//       .collection('users')
//       .findOne({ _id: userId });

//     if (!result) {
//       res.status(404).json({ message: 'User not found' });
//     } else {
//       // Don't return sensitive data
//       const { googleId, ...userData } = result;
//       res.status(200).json(userData);
//     }
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Update user profile
// const updateUser = async (req, res) => {
//   try {
//     if (!req.isAuthenticated()) {
//       return res.status(401).json({ message: 'Unauthorized' });
//     }

//     const userId = new ObjectId(req.params.id);

//     // Users can only update their own profile
//     if (req.user._id.toString() !== userId.toString()) {
//       return res.status(403).json({ message: 'Forbidden' });
//     }

//     const userData = {
//       displayName: req.body.displayName,
//       firstName: req.body.firstName,
//       lastName: req.body.lastName,
//       email: req.body.email
//     };

//     const response = await mongodb
//       .getDb()
//       .collection('users')
//       .updateOne({ _id: userId }, { $set: userData });

//     if (response.matchedCount === 0) {
//       res.status(404).json({ message: 'User not found' });
//     } else {
//       res.status(200).json({ message: 'User updated successfully' });
//     }
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// module.exports = {
//   getAllUsers,
//   getCurrentUser,
//   getUserById,
// };
