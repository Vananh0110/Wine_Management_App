const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const db = require("./db");
const cors = require("cors");

const app = express();
const PORT = 5000;
const router = require("./router");

app.use(cors());
// Cấu hình middleware để phân tích dữ liệu JSON
app.use(express.json());

// Cấu hình middleware để phục vụ các tệp tĩnh từ thư mục 'images'
app.use("/images", express.static(path.join(__dirname, "./images")));
app.use("/", router);
app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
