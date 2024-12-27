import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

const SECRET = process.env.JWT_SECRET || 'bYjEzNTI0NzY0MTQzMTM'

// User Signup
export const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, username, password, imageURL } = req.body;

    // Check for duplicate email or username
    const existingEmail = await User.findOne({ email });
    const existingUsername = await User.findOne({ username });
    if (existingEmail) return res.status(400).json({ error: 'Email already registered' });
    if (existingUsername) return res.status(400).json({ error: 'Username already taken' });

    const user = new User({ firstName, lastName, email, username, password, imageURL });
    await user.save();
    const token = jwt.sign({ id: user._id, username: user.username, email: user.email, firstname: firstName, lastname: lastName }, SECRET, { expiresIn: '1h' });

    res.status(201).json({ message: 'User registered successfully!', token});
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// User Login
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });


    // Generate JWT
    const token = jwt.sign(
      { id: user._id, username: user.username, firstname: user.firstName, lastname: user.lastName, email: user.email, imageUrl: user.imageURL },
      SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token });
   
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get User Profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password').populate("friends", "username email"); // Exclude password
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.localStorage.setItem(user) = {
      id: user.id,
      username: user.username,
      email: user.email,
      imageURL: user.imageURL,
      friends: user.friends,
      firstName: user.firstName,
      lastName: user.lastName,

    };
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    const { firstName, lastName, email, imageURL } = req.body;
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;
    if (imageURL) user.imageURL = imageURL;

    await user.save();
    res.status(200).json({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      imageURL: user.imageURL,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addProfileImage = async (request, response) => {
    try {
        const { userId } = request;
        const { imageURL } = request.body;
        if (!imageURL) {
            return response.status(400).send("Image URL is required");
        }
        const user = await User.findByIdAndUpdate(userId, {
            imageURL,
            profileSetup: true,
        }, { new: true,
            runValidators: true });
    }catch (error) {
        console.error("Error updating profile:", error);
        return response.status(500).json({ message: "Server error" });
    }
};
