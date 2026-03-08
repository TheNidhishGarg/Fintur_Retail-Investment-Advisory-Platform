const express = require("express");
const router = express.Router();
const passport = require("../config/passport");
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/authMiddleware");

router.get(
    "/google",
    passport.authenticate("google", { scope: ["openid", "profile", "email"] })
);

router.get(
    "/google/callback",
    (req, res, next) => {
        passport.authenticate("google", {
            session: false,
        }, (err, user, info) => {
            if (err) {
                console.error("OAuth Error:", err);
                return res.redirect(`${process.env.FRONTEND_URL}/login?error=auth_failed`);
            }
            if (!user) {
                console.error("No user returned:", info);
                return res.redirect(`${process.env.FRONTEND_URL}/login?error=no_user`);
            }
            req.user = user;
            next();
        })(req, res, next);
    },
    authController.googleCallback
);

router.get("/me", authMiddleware, authController.getMe);
router.patch("/profile", authMiddleware, authController.updateProfile);

module.exports = router;
