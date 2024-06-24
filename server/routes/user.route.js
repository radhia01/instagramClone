const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
async function handleUpload(file) {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  return res;
}

const {
  getAllUsers,
  deleteAccount,
  updateUser,
  deleteUser,
  followUser,
  unfollowUser,
  updateProfile,
  updatePassword,
} = require("../controllers/User.controller");
const User = require("../models/User");
const router = express.Router();
// route to get all users
router.get("/api/users", getAllUsers);
// route to delete user
router.delete("/api/users/:id", deleteAccount);
// // route to update user
// router.patch("/api/users/:id", updateUser);
// route ot delete a user
router.delete("/api/users/:id", deleteUser);
// route to follow a user
router.put("/api/users/followers/:id", followUser);
// route to unfollow user
router.put("/api/users/unfollow/:id", unfollowUser);
// route to update user profile
router.put("/api/users/profile/:id", updateProfile);
// route to update password
router.put("/api/users/update/password/:id", updatePassword);
// route to change userimage profile
router.put(
  "/api/users/image/profile",
  upload.single("image"),
  async (req, res) => {
    try {
      const { user } = req.body;
      console.log(req.file);
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
      const cldRes = await handleUpload(dataURI);
      console.log(cldRes.secure_url);
      const updatedImage = await User.findByIdAndUpdate(
        user,
        {
          Useravatar: cldRes.secure_url,
        },
        { new: true }
      );
      console.log(updatedImage);
      res.json(updatedImage);
    } catch (error) {
      res.send({
        message: error.message,
      });
    }
  }
);
// route pour supprimer le compte utilisateur
router.delete("/api/users/id", deleteAccount);

module.exports = router;
