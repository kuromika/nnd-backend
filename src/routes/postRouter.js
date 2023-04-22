const router = require("express").Router();
const commentController = require("../controllers/commentController");
const postController = require("../controllers/postController");
const likeController = require("../controllers/likeController");

router.get("/", postController.getPosts);
router.post("/", postController.createPost);
router.get("/:id", postController.getPost);
router.put("/:id", postController.updatePost);
router.delete("/:id", postController.deletePost);

router.get("/:postId/comments", commentController.getPostComments);
router.post("/:postId/comments", commentController.createPostComment);

router.get("/:postId/likes", likeController.getPostLikes);
router.post("/:id/likes", likeController.createLike("Post"));

module.exports = router;
