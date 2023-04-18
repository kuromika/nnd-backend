const router = require("express").Router();
const { getPostComments } = require("../controllers/commentController");
const postController = require("../controllers/postController");

router.get("/", postController.getPosts);
router.post("/", postController.createPost);
router.get("/:id", postController.getPost);
router.put("/:id", postController.updatePost);
router.delete("/:id", postController.deletePost);

router.get("/:postId/comments", getPostComments);

module.exports = router;
