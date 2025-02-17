const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

exports.getLoginForm = (req, res) => {
  res.send(`
    <h1>Get Auth Token</h1>
    <form>
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" required>
      <br>
      <label for="password">Password:</label>
      <input type="password" id="password" name="password" required>
      <br>
      <button type="submit">Generate Token</button>
    </form>
    <br>
    <label for="token">Token:</label>
    <textarea id="token" name="token" rows="4" cols="50"></textarea>
    <br>
    <button onclick="window.location.href='https://apis-cgk0.onrender.com/api-docs'">Go to API Docs</button>
    <script>
      document.querySelector('form').addEventListener('submit', async function(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const response = await fetch('/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: formData.get('email'),
            password: formData.get('password')
          })
        });
        const result = await response.json();
        if (response.ok) {
          document.getElementById('token').value = result.token;
        } else {
          alert(result.message);
        }
      });
    </script>
  `);
};

exports.generateToken = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    // Validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email, sessionId: new Date().getTime() },
      JWT_SECRET,
      { expiresIn: "1d" } // Token expires in 1 day
    );

    return res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
