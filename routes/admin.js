const path = require('path');

const express = require('express')

const router = express.Router();

const adminController = require('../controllers/AdminController')
const authController = require('../controllers/AuthController')

const { body } = require('express-validator/check');

const isAuth = require('../middlewares/is-Auth')


//auth
router.get("/regAd1000", authController.getRegAd1000)

router.post("/regAd1000",[
  body("email","Düzgün email daxil edin.")
  .isString()
  .isLength({ min: 4 })
  .trim(),
  body("password", "Şifrə en az 5 simvoldan ibaret olmalıdı.")
  .isString()
  .isLength({ min: 6 })
  .trim()
], authController.regAd1000)


router.get("/logAd1000", authController.getLogAd1000)

router.post("/logAd1000", authController.logAd1000)

router.post('/logout', authController.postLogout);


//auth

                // GET methods 
// url -> /ad1000/index
router.get("/index",isAuth, adminController.home)
// url -> /ad1000/service
router.get("/service",isAuth, adminController.service)
// url -> /ad1000/news
router.get("/news",isAuth, adminController.news)
// url -> /ad1000/carousel
router.get("/carousel",isAuth, adminController.carousel)
//url -> /ad1000/services/:serId
router.get("/services/edit/:serviceId",isAuth, adminController.getService)

router.get("/services/delete/:serviceId",isAuth, adminController.deleteService)

router.get("/news/delete/:newsId",isAuth, adminController.deteleNews)

router.get("/carousels/delete/:newsId",isAuth, adminController.deteleCarousel)

router.post("/editService",isAuth, adminController.editService)

                // POST methods 
// url -> /ad1000/index
router.post("/index",isAuth, adminController.addCompany)
// url -> /ad1000/editCompany
router.post("/editCompany",isAuth, adminController.editCompany)
// url -> /ad1000/service
router.post("/service",isAuth,[
    body('name')
      .isString()
      .isLength({ min: 3 })
      .trim(),
    body('title')
    .isString()
    .isLength({ min: 3 })
    .trim(),
    body('description')
      .isLength({ min: 5, max: 400 })
      .trim()
], adminController.addService)
// url -> /ad1000/news
router.post("/news",isAuth, adminController.addNews)
// url -> /ad1000/carousel
router.post("/carousel",isAuth, adminController.addCarousel)

module.exports = router