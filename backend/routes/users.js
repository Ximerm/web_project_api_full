const router = require("express").Router();

const {
  getUsers,
  getCurrentUser,
  getUserById,
  updateProfile,
  updateAvatar,
} = require("../controllers/users");

const {
  updateProfileValidation,
  updateAvatarValidation,
  userIdValidation,
} = require("../utils/validation");

router.get("/", getUsers);

router.get("/me", getCurrentUser);

router.get("/:userId", userIdValidation, getUserById);

router.patch("/me", updateProfileValidation, updateProfile);

router.patch("/me/avatar", updateAvatarValidation, updateAvatar);

module.exports = router;
app.get("/", (req, res) => {
  res.send("Express server is running correctly!");
});
