const router = require("express").Router();
const likeController = require("../controllers/likeController");

router.get("/", likeController.getLikes);

module.exports = router;
