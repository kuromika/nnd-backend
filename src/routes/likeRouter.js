const router = require("express").Router();
const likeController = require("../controllers/likeController");

router.get("/", likeController.getLikes);
router.delete("/:id", likeController.deleteLike);

module.exports = router;
