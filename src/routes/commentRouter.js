const router = require("express").Router();
const commentController = require("../controllers/commentController");

router.put("/:id", commentController.updatePostComment);
router.delete("/:id", commentController.deletePostComment);

module.exports = router;
