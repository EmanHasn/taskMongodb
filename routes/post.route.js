const  router = require("express").Router()
const postController = require("../controllers/post.controller");

router.get("/" , postController.home )
// router.get("/home" , postController.home)
router.get("/edit/:id" , postController.edit)
router.post("/edit/:id" , postController.editLogic)

// router.get("/add" , postController.add)
router.get("/addpost" , postController.addpost)
router.post("/addpost" , postController.addLogic)
router.get("/single/:id" , postController.single)
router.get("/delete/:id" , postController.delete)

module.exports = router 