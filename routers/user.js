const express = require("express");
const router = express.Router();
const { User } = require("../models/User");
const bcrypt = require("bcrypt");

// Getting users 
router.get(`/`, async (req, res) => {
    const users = await User.find();

    if(!users) {
        res.status(404).send("User not found!");
    }
    res.send(users);
});

// Getting user by id 
router.get(`/:id`, async (req, res) => {
    const users = await User.findById(req.params.id);
    if(!users) {
        res.status(404).send("User not found!");
    }
    res.send(users);
});

// Creat User
router.post(`/`, async (req, res) => {
    try {
        // Check if user already exist
        let { username, email, password, walletAddress, role } = req.body;
        const userCheck = await User.findOne({email})
        if(userCheck) {
            return res.status(400).json({message: "User already exits."})
        }
        // Hash Password
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);

        let user = new User({
        username,
        email,
        password,
        walletAddress,
        role
        });

        // Save to DB
        user = await user.save()
        res.status(201).send(createdUser);
    } catch(err) {
        res.status(500).json({success: false, error: err});
    };
});

// Updating User
router.put(`/:id`, async(req, res) => {
    try {
        const updates = req.body;
        // If password is being updated, hash it
        if (updates.password) {
            const salt = await bcrypt.genSalt(10);
            updates.password = await bcrypt.hash(updates.password, salt);
        }
        const user = await User.findByIdAndUpdate(req.params.id, {new: true}); 
            
        if(!user) {
            return res.status(404).send("User cound not be updated.");
        }
        res.status(200).json(user);
    }catch(err) {
        res.status(500).send("Server error");
    }
});

// Deleting user
router.delete(`/:id`, async(req, res) => {
    const user = await User.findByIdAndDelete(req.params.id).then(deleted => {
        if(!deleted) {
            return res.status(404).send("Error: User could not be deleted!");
        } else {
            return res.status(200).send("User deleted.");
        }
    });
    res.status(200).send("User Deleted Successfully.");
});

module.exports = router;