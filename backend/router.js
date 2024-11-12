const { Router } = require("express");
const contriesController = require("./controller/countries-manage");
const winesController = require("./controller/wines-manage");
const filterController = require("./controller/filter");
const router = Router();
const upload = winesController.upload;

router.get("/get-countries", contriesController.getCountries);
router.post("/insert-country", contriesController.insertCountry);
router.put("/update-country", contriesController.updateCountry);
router.delete("/delete-country", contriesController.deleteCountry);

router.get("/get-wines", winesController.getWines);
// Route sử dụng middleware
router.post("/insert-wine", upload.single("image"), winesController.insertWine);
router.put("/update-wine", winesController.updateWine);
router.delete("/delete-wine", winesController.deleteWine);

// filter theo tên nước nhập full
router.get("/filter-wines-by-country/:country_name", filterController.getWinesByCountry);
//filter theo tên nước nhập 1 phần
router.get(
  "/filter-by-name-prefix",
  filterController.getWinesByCountryNamePrefix
);
//filter theo độ rượu > 5 độ và tên nước mặc định là Pháp (đề bài gốc)
router.get(
  "/filter-wines-by-alcohol-percentage-default",
  filterController.getWinesByAlcoholPercentageDefault
);
//filter theo độ rượu tự chọn và tên nước mặc định là Pháp
router.get(
  "/filter-wines-by-alcohol-percentage/:country_name/:alcohol_percentage",
  filterController.getWinesByAlcoholPercentage
);
//filter theo độ rượu tự chọn và tên nước tự chọn
router.get(
  "/filter-wines-by-alcohol-percentage-and-country-name",
  filterController.getWinesByAlcoholPercentageAndCountryName
);
module.exports = router;
