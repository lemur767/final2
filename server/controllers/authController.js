import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

const SECRET = process.env.JWT_SECRET || 'bYjEzNTI0NzY0MTQzMTM'

// User Signup
export const signup = async (req, res) => {
  try {
    const { firstname, lastname, email, username, password, imageUrl } = req.body;

    // Check for duplicate email or username
    const existingEmail = await User.findOne({ email });
    const existingUsername = await User.findOne({ username });
    if (existingEmail) return res.status(400).json({ error: 'Email already registered' });
    if (existingUsername) return res.status(400).json({ error: 'Username already taken' });

    const user = new User({ firstname, lastname, email, username, password, imageUrl });
    await user.save();
    const token = jwt.sign({ id: user._id, username: user.username }, SECRET, { expiresIn: '1h' });

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
    console.log(token);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get User Profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); // Exclude password
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateProfile = async (request, response) => {
    try {
        const { userId } = request;
        const { firstName, lastName, color } = request.body;
        if(!firstName || !lastName || !color){
            return response.status(400).send("All fields are required");
        }
        const user = await User.findByIdAndUpdate(userId,{
            firstName,
            lastName,
            color,
            profileSetup: true,
        }, {new: true,runValidators: true});
    
        return response.status(200).json({
            id: user.id,
            username: user.username,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            imageURL: user.imageURL,
            profileSetup: user.profileSetup,
            color: user.color,
        });
    } catch (error) {
        console.error("Error updating profile:", error);
        return response.status(500).json({ message: "Server error" });
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
