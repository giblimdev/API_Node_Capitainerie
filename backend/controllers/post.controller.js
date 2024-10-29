const PostModel = require('../models/post_model');

// POST method to create a new post
module.exports.setPosts = async (req, res) => {
  console.log('Request body:', req.body);
  if (!req.body.message) {
    return res.status(400).json({ message: "Merci d'ajouter un message" });
  }
  const newPost = new PostModel({
    message: req.body.message,
    author: req.body.author,
    likers: req.body.likers || []
  });
  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET method to retrieve posts
module.exports.getPosts = async (req, res) => {
  try {
    const posts = await PostModel.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT method to update a post
module.exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const { message, author, likers } = req.body;
  if (!message) {
    return res.status(400).json({ message: "Merci d'ajouter un message" });
  }
  try {
    const updatedPost = await PostModel.findByIdAndUpdate(id, { message, author, likers }, { new: true });
    if (!updatedPost) {
      return res.status(404).json({ message: "Post non trouvé" });
    }
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE method to delete a post
module.exports.deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPost = await PostModel.findByIdAndDelete(id);
    if (!deletedPost) {
      return res.status(404).json({ message: "Post non trouvé" });
    }
    res.status(200).json({ message: "Post supprimé avec succès" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PATCH method to like a post
module.exports.likePost = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  try {
    const post = await PostModel.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post non trouvé" });
    }
    if (!post.likers.includes(userId)) {
      post.likers.push(userId);
      await post.save();
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PATCH method to dislike a post
module.exports.dislikePost = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  try {
    const post = await PostModel.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post non trouvé" });
    }
    post.likers = post.likers.filter(liker => liker !== userId);
    await post.save();
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
