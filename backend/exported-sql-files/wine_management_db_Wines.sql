
DROP TABLE IF EXISTS `Wines`;
CREATE TABLE `Wines` (
  `WineCode` varchar(10) NOT NULL,
  `WineName` varchar(100) DEFAULT NULL,
  `AlcoholPercentage` decimal(4,2) DEFAULT NULL,
  `Age` int DEFAULT NULL,
  `CountryCode` varchar(10) DEFAULT NULL,
  `Image` text,
  PRIMARY KEY (`WineCode`),
  KEY `CountryCode` (`CountryCode`),
  CONSTRAINT `wines_ibfk_1` FOREIGN KEY (`CountryCode`) REFERENCES `Countries` (`CountryCode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `Wines` WRITE;

INSERT INTO `Wines` VALUES 
    ('W001','Chateau Margaux',13.50,10,'FR','http://localhost:5000/images/Chateau_Margaux.jpeg'),
    ('W002','Barolo',14.00,8,'IT','http://localhost:5000/images/Barolo.jpeg'),
    ('W003','Rioja Reserva',13.00,7,'ES','http://localhost:5000/images/Ostatu_Rioja_Reserva.jpeg'),
    ('W004','Penfolds Grange',14.50,6,'AU','http://localhost:5000/images/Penfolds_Grange.jpeg'),
    ('W005','Champagne Moet',12.00,3,'FR','http://localhost:5000/images/Moet_Champagne_Hampers.jpeg'),
    ('W006','Chianti Classico',13.20,4,'IT','http://localhost:5000/images/Tenuta_di_Arceno_Chianti.jpeg');
UNLOCK TABLES;

