const express = require('express')
const homeController = require('../controllers/HomeControlller')

const router = express.Router();

router.get("/index",homeController.homePage)

router.get("/contact",homeController.contact)

router.get("/about",homeController.about)

router.get("/news",homeController.news)

router.get("/news/1",homeController.singleNews)

router.get("/services",homeController.services)

router.get("/services/1",homeController.singleService)

router.get("/projects",homeController.projects)

module.exports = router;
