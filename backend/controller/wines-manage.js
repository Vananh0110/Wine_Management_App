const connection = require('../db');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../images');
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = '-' + Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    const fileName = path.parse(file.originalname).name + uniqueSuffix + fileExtension;
    cb(null, fileName);
  },
});

const upload = multer({ storage });

const getWines = async (req, res) => {
  try {
    const [results, fields] = await connection.query('SELECT * FROM `Wines` ');

    //console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available
    res.status(200).json({ message: 'get successfully', results: results });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'get failed', error: err });
  }
};

const insertWine = async (req, res) => {
  const { wine_code, wine_name, alcohol_percentage, age, country_code } =
    req.body;

  var imagePath = req.file ? req.file.filename : null;

  console.log('Received Wine Data:', {
    wine_code,
    wine_name,
    alcohol_percentage,
    age,
    country_code,
  });
  console.log('Received Image Path:', imagePath);

  if (
    !wine_code ||
    !wine_name ||
    !alcohol_percentage ||
    !age ||
    !country_code ||
    !imagePath
  ) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  imagePath = 'http://localhost:5000/images/' + imagePath;
  try {
    const [results] = await connection.execute(
      'INSERT INTO Wines (WineCode, WineName, AlcoholPercentage, Age, CountryCode, Image) VALUES (?, ?, ?, ?, ?, ?)',
      [wine_code, wine_name, alcohol_percentage, age, country_code, imagePath]
    );

    res.status(200).json({
      message: 'Wine inserted successfully',
      data: {
        id: results.insertId,
        wine_code,
        wine_name,
        alcohol_percentage,
        age,
        country_code,
        imagePath,
      },
    });
  } catch (err) {
    console.error('Error inserting data:', err);
    res.status(500).json({
      message: 'Error inserting wine data',
      error: err.message,
    });
  }
};

const updateWine = async (req, res) => {
  const { wine_code, wine_name, alcohol_percentage, age, country_code } =
    req.body;

  let imagePath = req.file ? req.file.filename : null;

  if (!wine_code || !wine_name || !alcohol_percentage || !age || !country_code) {
    return res.status(400).json({ message: "All fields except image are required" });
  }

  try {
    if (!imagePath) {
      const [rows] = await connection.execute(
        "SELECT Image FROM Wines WHERE WineCode = ?",
        [wine_code]
      );

      if (rows.length > 0) {
        imagePath = rows[0].Image; // Lấy URL ảnh cũ
      } else {
        return res.status(404).json({ message: "Wine not found" });
      }
    } else {
      // Nếu có ảnh mới, cần xóa ảnh cũ
      const [rows] = await connection.execute(
        "SELECT Image FROM Wines WHERE WineCode = ?",
        [wine_code]
      );

      if (rows.length > 0) {
        let oldImagePath = rows[0].Image;

        // Loại bỏ phần URL cơ sở trước khi xóa file
        oldImagePath = oldImagePath.replace(
          "http://localhost:5000/images/",
          ""
        );

        // Xóa file ảnh cũ
        if (oldImagePath) {
          deleteImage(`../images/${oldImagePath}`);
          console.log("Deleted old image successfully");
        }
      }
    }

    // Gán URL đầy đủ cho ảnh mới
    if (req.file) {
      imagePath = "http://localhost:5000/images/" + imagePath;
    }

    // Cập nhật dữ liệu trong cơ sở dữ liệu
    const [results] = await connection.execute(
      "UPDATE `Wines` SET `WineName` = ?, `AlcoholPercentage` = ?, `Age` = ?, `CountryCode` = ?, `Image` = ? WHERE `WineCode` = ?",
      [wine_name, alcohol_percentage, age, country_code, imagePath, wine_code]
    );

    if (results.affectedRows > 0) {
      return res.status(200).json({ message: "Update successful" });
    } else {
      return res.status(404).json({ message: "Wine not found" });
    }
  } catch (error) {
    console.error("Error in updateWine:", error);
    res.status(500).json({ message: "Error updating data", error: error.message });
  }
};


function deleteImage(imagePath) {
  const fullPath = path.resolve(__dirname, imagePath);

  fs.unlink(fullPath, (err) => {
    if (err) {
      console.error(`Failed to delete file: ${err}`);
      return;
    }
    console.log('File deleted successfully');
  });
}

const deleteWine = async (req, res) => {
  const { wine_code } = req.body;
  if (!wine_code) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  //xoá ảnh không dùngg nữa
  try {
    const [rows] = await connection.execute(
      'SELECT Image FROM Wines WHERE WineCode = ?',
      [wine_code]
    );

    if (rows.length > 0) {
      let imagePath = rows[0].Image;

      // Remove the base URL from the image path
      imagePath = imagePath.replace('http://localhost:5000/images/', '');

      // Delete the image file
      if (imagePath) {
        deleteImage(`../images/${imagePath}`);
        console.log('Delete image successfully');
      }
    } else {
      console.log('Image not found');
    }
  } catch (error) {
    console.error('Error in image deletion:', error);
  }

  try {
    const [results] = await connection.execute(
      'DELETE FROM `Wines` WHERE `WineCode` = ?',
      [wine_code]
    );

    if (results.affectedRows > 0) {
      return res.status(200).json({ message: 'Delete successful' });
    } else {
      return res.status(404).json({ message: 'Wine not found' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error deleting data', error: error.message });
  }
};

module.exports = {
  upload,
  getWines,
  insertWine,
  updateWine,
  deleteWine,
};
