const path = require('path');

const express = require('express')

const router = express.Router();

const adminController = require('../controllers/AdminController')

                // GET methods 
// url -> /ad1000/index
router.get("/index", adminController.home)
// url -> /ad1000/service
router.get("/service", adminController.service)
// url -> /ad1000/news
router.get("/news", adminController.news)
// url -> /ad1000/carousel
router.get("/carousel", adminController.carousel)
                // POST methods 
// url -> /ad1000/index
router.post("/index", adminController.addCompany)
// url -> /ad1000/editCompany
router.post("/editCompany", adminController.editCompany)
// url -> /ad1000/service
router.post("/service", adminController.addService)
// url -> /ad1000/news
router.post("/news", adminController.addNews)
// url -> /ad1000/carousel
router.post("/carousel", adminController.addCarousel)

module.exports = router