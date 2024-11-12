const connection = require('../db');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../images'));
  },
  filename: (req, file, cb) => {
    // Lấy tên gốc của ảnh mà không có phần mở rộng
    const originalName = path.parse(file.originalname).name;
    // Tạo một chuỗi ngẫu nhiên để thêm vào tên gốc
    const uniqueSuffix = '-' + Math.round(Math.random() * 1e9);
    // Tạo tên tệp mới với tên gốc + số ngẫu nhiên + phần mở rộng gốc
    cb(null, originalName + uniqueSuffix + path.extname(file.originalname));
    //cb(null, originalName + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

const getWines = async (req, res) => {
  // A simple SELECT query
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
  console.log('Full File Data:', req);

  // Kiểm tra nếu bất kỳ trường nào bị thiếu
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
    // Thực hiện câu lệnh INSERT
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

// const updateWine = async (req, res) => {
//   const { wine_code, wine_name, alcohol_percentage, age, country_code } =
//     req.body;

//   let imagePath = req.file ? req.file.filename : null;

//   if (
//     !wine_code ||
//     !wine_name ||
//     !alcohol_percentage ||
//     !age ||
//     !country_code ||
//     !imagePath
//   ) {
//     return res.status(400).json({ message: "All fields are required" });
//   }

//   imagePath = "http://localhost:5000/images/" + imagePath;

//   try {
//     const [rows] = await connection.execute(
//       "SELECT Image FROM Wines WHERE WineCode = ?",
//       [wine_code]
//     );

//     if (rows.length > 0) {
//       let imagePath = rows[0].Image;

//       // Remove the base URL from the image path
//       imagePath = imagePath.replace("http://localhost:5000/images/", "");

//       // Delete the image file
//       if (imagePath) {
//         deleteImage(`../images/${imagePath}`);
//         console.log("Delete image successfully");
//       }
//     } else {
//       console.log("Image not found");
//     }
//   } catch (error) {
//     console.error("Error in image deletion:", error);
//   }

//   try {
//     const [results] = await connection.execute(
//       "UPDATE `Wines` SET `WineName` = ?, `AlcoholPercentage` = ?, `Age` = ?, `CountryCode` = ?, `Image` = ? WHERE `WineCode` = ?",
//       [wine_name, alcohol_percentage, age, country_code, imagePath, wine_code] // Ensure `wine_code` is included in WHERE clause
//     );

//     if (results.affectedRows > 0) {
//       return res.status(200).json({ message: "Update successful" });
//     } else {
//       return res.status(404).json({ message: "Wine not found" });
//     }
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error updating data", error: error.message });
//   }
// };

const updateWine = async (req, res) => {
  const { wine_code, wine_name, alcohol_percentage, age, country_code } =
    req.body;

  try {
    const [results] = await connection.execute(
      'UPDATE `Wines` SET `WineName` = ?, `AlcoholPercentage` = ?, `Age` = ?, `CountryCode` = ? WHERE `WineCode` = ?',
      [wine_name, alcohol_percentage, age, country_code, wine_code] // Ensure `wine_code` is included in WHERE clause
    );
    if (results.affectedRows > 0) {
      return res.status(200).json({ message: 'Update successful' });
    } else {
      return res.status(404).json({ message: 'Wine not found' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error updating data', error: error.message });
  }
};

// Function to delete image from folder
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
