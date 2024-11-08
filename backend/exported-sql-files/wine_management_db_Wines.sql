-- MySQL dump 10.13  Distrib 8.0.40, for macos14 (x86_64)
--
-- Host: localhost    Database: wine_management_db
-- ------------------------------------------------------
-- Server version	9.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Wines`
--

DROP TABLE IF EXISTS `Wines`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Wines`
--

LOCK TABLES `Wines` WRITE;
/*!40000 ALTER TABLE `Wines` DISABLE KEYS */;
INSERT INTO `Wines` VALUES ('W001','Chateau Margaux',13.50,10,'FR','http://localhost:5000/images/Chateau_Margaux.jpeg'),('W002','Barolo',14.00,8,'IT','http://localhost:5000/images/Barolo.jpeg'),('W003','Napa Valley Cabernet',13.80,5,'US','http://localhost:5000/images/Napa_Valley.jpeg'),('W004','Rioja Reserva',13.00,7,'ES','http://localhost:5000/images/Ostatu_Rioja_Reserva.jpeg'),('W005','Penfolds Grange',14.50,6,'AU','http://localhost:5000/images/Penfolds_Grange.jpeg'),('W006','Champagne Moet',12.00,3,'FR','http://localhost:5000/images/Moet_Champagne_Hampers.jpeg'),('W007','Chianti Classico',13.20,4,'IT','http://localhost:5000/images/Tenuta_di_Arceno_Chianti.jpeg');
/*!40000 ALTER TABLE `Wines` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-08 23:22:45
