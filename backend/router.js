const { Router } = require("express");
const contriesController = require("./controller/countries-manage");
const winesController = require("./controller/wines-manage");
const router = Router();
const upload = winesController.upload;

router.get("/get-countries", contriesController.getCountries);
router.post("/insert-country", contriesController.insertCountry);
router.put("/update-country", contriesController.updateCountry);
router.delete("/delete-country", contriesController.deleteCountry);

router.get("/get-wines", winesController.getWines);
// Route sử dụng middleware
router.post("/insert-wine", upload.single("image"), winesController.insertWine);
router.put("/update-wine", upload.single("image"), winesController.updateWine);
router.delete("/delete-wine", winesController.deleteWine);
module.exports = router;
