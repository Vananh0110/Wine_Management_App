DROP TABLE IF EXISTS `Countries`;
CREATE TABLE `Countries` (
  `CountryCode` varchar(10) NOT NULL,
  `CountryName` varchar(100) DEFAULT NULL,
  `Description` text,
  PRIMARY KEY (`CountryCode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `Countries` WRITE;

INSERT INTO `Countries` VALUES 
    ('AU','Australia','Australia - Known for Shiraz and Chardonnay.'),
    ('ES','Spain','Spain - Famous for rich, robust red wines.'),
    ('FR','France','France - Known for premium wine production.'),
    ('IT','Italy','Italy - Renowned for diverse wine varieties.'),
    ('US','United States','United States - Major producer of wines.');
UNLOCK TABLES;
