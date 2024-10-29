const express = require("express");
const { getPosts, setPosts, updatePost, deletePost, likePost, dislikePost } = 
require("../controllers/post.controller");

const router = express.Router();

router.get("/", getPosts);
router.post("/", setPosts);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);
router.patch('/like-post/:id', likePost);
router.patch('/dislike-post/:id', dislikePost);

app.use('/users', userRoutes);
app.use('/catways', catwayRoutes);
app.use('/reservations', reservationRoutes);

module.exports = router;
