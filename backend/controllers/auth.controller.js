const jwt = require("jsonwebtoken");
const authService = require("../services/auth.service");

exports.googleCallback = async (req, res) => {
    try {
        const user = await authService.findOrCreateUser(req.user);
        const token = jwt.sign(
            { id: user.id, email: user.email, tier: user.tier },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );
        const encoded = encodeURIComponent(JSON.stringify(user));
        res.redirect(
            `${process.env.FRONTEND_URL}/auth/callback?token=${token}&user=${encoded}`
        );
    } catch (err) {
        console.error("Google callback error:", err);
        res.redirect(`${process.env.FRONTEND_URL}/login?error=auth_failed`);
    }
};

exports.getMe = async (req, res) => {
    try {
        const user = await authService.getUserById(req.user.id);
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch user" });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        console.log("req.body:", JSON.stringify(req.body));
        const {
            birth_year,
            marital_status,
            occupation,
            experience_level,
            investor_type
        } = req.body;

        const user = await authService.updateUserProfile(
            req.user.id,
            {
                birth_year, marital_status,
                occupation, experience_level, investor_type
            }
        );

        res.json({ success: true, user });
    } catch (err) {
        console.error("updateProfile error:", err.message);
        res.status(500).json({ error: "Failed to update profile" });
    }
};

