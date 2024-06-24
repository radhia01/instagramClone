const Post = require("../models//Posts");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "db8b6npfz",
  api_key: "463356543873864",
  api_secret: "2DcMz3X2pG8mUZ_JB--QhHXqHAM",
});
// ajouter un  nouveau post

exports.addPost = async (req, res) => {
  try {
    const { user, caption } = req.body;

    const result = await cloudinary.uploader.upload(
      req.file.buffer.toString("base64")
    );

    const newPost = new Post({
      user,
      imag_url: result.secure_url,
      caption,
    });

    await newPost.save();

    return res.json({
      post: newPost,
      success: true,
      message: "Post ajouté avec success",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Erreur de serveur ", err: error.message });
  }
};
// recuperer tous les postes
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ errro: "Erreur de serveur " });
  }
};
// recuperer les postes associés à un utilisateur
exports.getUserPosts = async (req, res) => {
  try {
    const { id } = req.params;
    const posts = await Post.find({ user: id });
    console.log(posts);
    return res.status(200).json(posts);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Server Error" });
  }
};
// supprimer tous les postes
exports.deleteAllPosts = async (req, res) => {
  try {
    const { id } = req.params;
    await Post.deleteOne({ _id: id });
  } catch (error) {
    return res.status(500).json({ error: "Erreur de serveur" });
  }
};
// supprimer un post
exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    await Post.findByIdAndDelete(id);
    return res.status(200).json(id);
  } catch (error) {
    return res.status(500).json({ error: "Erreur de serveur " });
  }
};
// ajouter un commentaire à un post
exports.addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment, user } = req.body;
    const newPost = await Post.findByIdAndUpdate(
      id,
      {
        $push: {
          comment: { content: comment, user },
        },
      },
      { new: true }
    );
    return res.status(200).json(newPost);
  } catch (error) {
    return res.status(500).json({ error: "Erreur de serveur " });
  }
};
// ajouter un j'aime à un post
exports.likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userid } = req.body;
    const likesPost=await Post.findById(id)
   
    if(!likesPost){
      return res.status(404).json({error:"post not found"})
    }
    let updatedPost;
    const alreadyLiked=likesPost.likes.find(like=>like.user.toString()===userid);
    if(alreadyLiked){
      updatedPost=await Post.findByIdAndUpdate(id,{
      $pull:{
        likes:{user:userid}
      }
     },{new:true})
console.log(updatedPost)
    }
     else {
       updatedPost=await Post.findByIdAndUpdate(id,{
        $addToSet:{
          likes:{user:userid}
        }
       },{new:true})
    }
    console.log(updatedPost)
    return res.status(200).json(updatedPost);
  } catch (error) {
    console.log(error.message)
  }
};
// mettre a jour un post
exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { caption } = req.body;
    console.log(id, caption);
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      {
        caption: caption,
      },
      { new: true }
    );
    console.log(updatedPost);
    return res.status(200).json(updatedPost);
  } catch (error) {
    return res.status(500).json({ error: "Erreur de serveur" });
  }
};
