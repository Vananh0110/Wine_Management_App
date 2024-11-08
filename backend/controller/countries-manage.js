const connection = require("../db");

const getCountries = async (req, res) => {
  // A simple SELECT query
  try {
    const [results, fields] = await connection.query(
      "SELECT * FROM `Countries` "
    );

    //console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available
    res.status(200).json({ message: "get successfully", results: results });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "get failed", error: err });
  }
};

const insertCountry = async (req, res) => {
  const { country_code, country_name, country_description } = req.body;

  if (!country_code || !country_name || !country_description) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const [results] = await connection.execute(
      "INSERT INTO `Countries` (`CountryCode`, `CountryName`, `Description`) VALUES (?, ?, ?)",
      [country_code, country_name, country_description]
    );

    console.log("Inserted row:", results);

    res.status(200).json({
      message: "Insert successful",
    });
  } catch (err) {
    console.error("Error inserting data:", err);
    res
      .status(500)
      .json({ message: "Error inserting data", error: err.message });
  }
};

const updateCountry = async (req, res) => {
  const { country_code, new_name, new_description } = req.body;
  if (!country_code || !new_name || !new_description) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const [results] = await connection.execute(
      "UPDATE `Countries` SET `CountryName` = ?, `Description` = ? WHERE `CountryCode` = ?",
      [new_name, new_description, country_code]
    );
    if (results.affectedRows > 0) {
      return res.status(200).json({ message: "Update successful" });
    } else {
      return res.status(404).json({ message: "Country not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating data", error: err.message });
  }
};

const deleteCountry = async (req, res) => {
  const { country_code } = req.body;
  if (!country_code) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const [results] = await connection.execute(
      "DELETE FROM `Countries` WHERE `CountryCode` = ?",
      [country_code]
    );
    if (results.affectedRows > 0) {
      return res.status(200).json({ message: "Delete successful" });
    } else {
      return res.status(404).json({ message: "Country not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting data", error: err.message });
  }
};
module.exports = {
  getCountries,
  insertCountry,
  updateCountry,
  deleteCountry,
};
