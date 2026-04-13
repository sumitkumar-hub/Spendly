import User from "../models/User.js";

// 🔥 UPDATE PROFILE
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const { name, email, password } = req.body;

    // ✅ Update fields
    if (name) user.name = name;
    if (email) user.email = email;

    // ⚠️ IMPORTANT: password direct assign (model will hash)
    if (password && password.trim() !== "") {
      user.password = password;
    }

    const updatedUser = await user.save();

    res.json({
      success: true,
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
      },
    });

  } catch (err) {
    console.error("Update Profile Error:", err);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};