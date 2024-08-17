const nodemailer = require("nodemailer");
const User = require("../models/user.model.js");

//get all users
const getUsers = async (req, res) => {
  try {
    const user = await User.find({});
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get single users by id
const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//post users
const postUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update users by id
const putUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const updatedUser = await User.findById(id);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete users by id
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User delete successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user by email-id
const updateUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOneAndUpdate({ email }, req.body, { new: true });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Function to generate a 6-digit code
const generateCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Function to send code to email
const sendCodeToEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const code = generateCode(); // Generate the code
    const expirationTime = new Date(Date.now() + 10 * 60000).toISOString(); // Set expiration time

    // Update the user in the database with the generated code and expiration time
    const user = await User.findOneAndUpdate(
      { email },
      { forgetPasswordCode: code, forgetPasswordCodeExpires: expirationTime },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Set up email transporter
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "your-email@gmail.com",
        pass: "your-email-password",
      },
      tls: {
        rejectUnauthorized: false, // Disable SSL certificate validation
      },
    });

    // Email options
    const mailOptions = {
      from: '"Your App Name" <your-email@gmail.com>',
      to: email,
      subject: "Your Verification Code",
      text: `Your verification code is: ${code}`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Verification code sent to email", code });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUsers,
  getUser,
  postUser,
  putUser,
  deleteUser,
  updateUserByEmail,
  sendCodeToEmail,
};
