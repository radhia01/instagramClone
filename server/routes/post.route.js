const express = require("express");
const router = express.Router();
const Post = require("../models//Posts");
const multer = require("multer");
const {
  getPosts,
  getUserPosts,
  deleteAllPosts,
  addComment,
  likePost,
  deletePost,
  updatePost,
} = require("../controllers/Post.controller");
const cloudinary = require("cloudinary").v2;
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
// Configuration de  Cloudinary
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
} // route pour ajouter un post
router.post("/api/posts", upload.single("image"), async (req, res) => {
  try {
    const { user, caption, datePub } = req.body;

    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    const cldRes = await handleUpload(dataURI);
    const newPost = new Post({
      user,
      imag_url: cldRes.secure_url,
      caption,
      datePub,
    });
    await newPost.save();
    res.json(newPost);
  } catch (error) {
    res.send({
      message: error.message,
    });
  }
});
// route pour recuperer la liste des postes
router.get("/api/posts/", getPosts);
// routre pour recuperer la liste des postes associes à un utilisateur
router.get("/api/posts/users/:id", getUserPosts);
// route pour commenter un post
router.put("/api/comment/posts/:id", addComment);
// routre pour ajouter un j'aime à  un poste
router.put("/api/like/posts/:id", likePost);
// route pour supprimer un post
router.delete("/api/posts/:id", deletePost);
// route pour mettre a jour un post 
router.put("/api/posts/:id",updatePost)
module.exports = router;
