const router = require("express").Router();
const postController = require("../controllers/postController");

router.get("/", postController.getPosts);
router.post("/", postController.createPost);
router.get("/:id", postController.getPost);
// router.put('/:id', postController.updatePost);
// router.delete('/:id', postController.deletePost);

module.exports = router;
