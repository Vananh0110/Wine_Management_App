const connection = require("../db");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const getWinesByCountry = async (req, res) => {
  const country_name = req.params.country_name;

  try {
    const [results, fields] = await connection.query(
      `
      SELECT
          Countries.CountryName,
          Wines.WineCode,
          Wines.WineName,
          Wines.AlcoholPercentage,
          Wines.Age,
          Wines.Image
      FROM
          Wines
      JOIN
          Countries ON Wines.CountryCode = Countries.CountryCode
      WHERE 
          Countries.CountryName = ?
      ORDER BY
          Countries.CountryName
      `,
      [country_name]
    );

    console.log(fields);
    res.status(200).json({ message: "get successfully", results: results });
  } catch (err) {
    console.log(req.params);
    console.log(err);
    res.status(500).json({ message: "get failed", error: err });
  }
};

const getWinesByCountryNamePrefix = async (req, res) => {
  const country_name_prefix = req.body.country_name_prefix;

  try {
    const [results, fields] = await connection.query(
      `
      SELECT
          Countries.CountryName,
          Wines.WineCode,
          Wines.WineName,
          Wines.AlcoholPercentage,
          Wines.Age,
          Wines.Image
      FROM
          Wines
      JOIN
          Countries ON Wines.CountryCode = Countries.CountryCode
      WHERE 
          Countries.CountryName LIKE ?
      ORDER BY
          Countries.CountryName
      `,
      [`${country_name_prefix}%`] // Add the prefix with a wildcard
    );

    res.status(200).json({ message: "get successfully", results: results });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "get failed", error: err });
  }
};

const getWinesByAlcoholPercentageDefault = async (req, res) => {
  const alcohol_percentage = req.body.alcohol_percentage;
  try {
    const [results, fields] = await connection.query(
      `
    SELECT
      Wines.WineCode,
      Wines.WineName,
      Wines.AlcoholPercentage,
      Wines.Age,
      Wines.CountryCode,
      Wines.Image
    FROM
      Wines
    JOIN
      Countries ON Wines.CountryCode = Countries.CountryCode
    WHERE
      Wines.AlcoholPercentage > 5
      AND Countries.CountryName = 'France';
      `
    );

    res.status(200).json({ message: "get successfully", results: results });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "get failed", error: err });
  }
};

const getWinesByAlcoholPercentage = async (req, res) => {
  const alcohol_percentage = req.params.alcohol_percentage;
  const country_name = req.params.country_name;
  try {
    const [results, fields] = await connection.query(
      `
    SELECT
      Wines.WineCode,
      Wines.WineName,
      Wines.AlcoholPercentage,
      Wines.Age,
      Wines.CountryCode,
      Wines.Image
    FROM
      Wines
    JOIN
      Countries ON Wines.CountryCode = Countries.CountryCode
    WHERE
      Wines.AlcoholPercentage > ?
      AND Countries.CountryName = ?;
      `,
      [alcohol_percentage, country_name]
    );

    res.status(200).json({ message: "get successfully", results: results });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "get failed", error: err });
  }
};

const getWinesByAlcoholPercentageAndCountryName = async (req, res) => {
  const alcohol_percentage = req.body.alcohol_percentage;
  const country_name = req.body.country_name;
  try {
    const [results, fields] = await connection.query(
      `
    SELECT
      Wines.WineCode,
      Wines.WineName,
      Wines.AlcoholPercentage,
      Wines.Age,
      Wines.CountryCode,
      Wines.Image
    FROM
      Wines
    JOIN
      Countries ON Wines.CountryCode = Countries.CountryCode
    WHERE
      Wines.AlcoholPercentage > ?
      AND Countries.CountryName = ?;
      `,
      [alcohol_percentage, country_name]
    );

    res.status(200).json({ message: "get successfully", results: results });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "get failed", error: err });
  }
};

module.exports = {
  getWinesByCountry,
  getWinesByCountryNamePrefix,
  getWinesByAlcoholPercentageDefault,
  getWinesByAlcoholPercentage,
  getWinesByAlcoholPercentageAndCountryName,
};
