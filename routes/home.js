const express = require('express')
const homeController = require('../controllers/HomeControlller')

const router = express.Router();

router.get("/",homeController.homePage)

router.get("/index",homeController.homePage)

router.get("/contact",homeController.contact)

router.get("/about",homeController.about)

router.get("/news",homeController.news)

router.get("/news/:newsId",homeController.singleNews)

router.get("/services",homeController.services)

router.get("/services/:serviceId",homeController.singleService)

router.get("/projects",homeController.projects)

module.exports = router;
