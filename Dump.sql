-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: teacherapp
-- ------------------------------------------------------
-- Server version	8.0.30

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
-- Table structure for table `administradores`
--

DROP TABLE IF EXISTS `administradores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `administradores` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `nombreCompleto` varchar(45) NOT NULL,
  `userName` varchar(25) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administradores`
--

LOCK TABLES `administradores` WRITE;
/*!40000 ALTER TABLE `administradores` DISABLE KEYS */;
INSERT INTO `administradores` VALUES (8,'Nombre completo administrador','admin','admin@gmail.com','$2b$08$aD.5O18bQ9iiA8uVJ6IJNegv0EduSJLpTvc1LVkfpoIRU4/8B3xce');
/*!40000 ALTER TABLE `administradores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `alumnos`
--

DROP TABLE IF EXISTS `alumnos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alumnos` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `nombreCompleto` varchar(45) NOT NULL,
  `userName` varchar(25) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `borrado` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alumnos`
--

LOCK TABLES `alumnos` WRITE;
/*!40000 ALTER TABLE `alumnos` DISABLE KEYS */;
INSERT INTO `alumnos` VALUES (1,'Mario Rodriguez Artalejo','mRodriguez','mrodriguez@gmail.com','$2b$08$IBys1xHRimLHfumEqdEWYuUM95yzW8M12ZNLD3D6xq..VfFpSi9g.',0),(5,'Mario Rodriguez Artalejo','mRodriguez2','mrodriguez2@gmail.com','$2b$08$Bn0V3D3lg4S3XyhlGini7OaXkUuzbxKeXO72WrP3iF3BCMutU78ty',0),(6,'Mario Rodriguez Artalejo','mRodriguez3','mrodriguez3@gmail.com','$2b$08$.Pupu8MjTcwlBBFdWoHThOypTGK6RZubtwHGOlYBJhyZl9cAoBZ.O',0),(7,'Mario Rodriguez Artalejo','mRodriguez4','mrodriguez4@gmail.com','$2b$08$bSZ/eUtSvjtjl8LLKHw.DeaX8qJv8Nf49fF.9sWGX/eiCUyJGk7Je',0),(8,' Mario Rodriguez Artalejo ','mRodriguez5','mrodriguez5@gmail.com','$2b$08$5aP3O6qPepffBH1Pk9kPP.QE.M9/qtCFpAx3Ga7ImLW40cG/XcELS',1),(9,'Mario Rodriguez Artalejo','mRodriguez6','mrodriguez6@gmail.com','$2b$08$EqybGMxnPv8jjFgU2RQqSe1R7bo/s5DF5oE.VzT8HnoE0cco/OiSG',1),(10,'Mario Rodriguez otro','mario','mario@gmail.com','$2b$08$7Mm0.GplR5ysLa0jc8Wd3exVwiVX9Y.1ge5tbU1YkJE32wdvgzVaW',1),(11,'Mario Jimenez MOD','mjimenez','mjimenez@gmail.com','$2b$08$hwxhu6ED/tzDhRSh/U6E0.XuZJ1ne758RaoQ9DSj3ZNol9w25RjV.',0),(12,'Mario Jiménez Frías 2','mariano2','mariano2@gmail.com','$2b$08$dpbcYu/kOgDSE5RU4izRmuDsfj31B98aDaosNl3kJ6Nm/cwohr2a6',1),(13,'Mario Jiménez Frías 2','mjimenez2','mjimenez2@gmail.com','$2b$08$4Ue8BE9DGBM9L11VlE2wH.BhcveUY7hmz.OfiHt9hOf9vdVRgaC16',0),(14,'Carlos Andujar Jaen','cAndujar','cAndujar@gmail.com','$2b$08$poZv5xvATBLWVQPGgL53NO3Y4LduomrUeBUaDL3eON4F/FYgYGu7G',0),(15,'Eduardo Rodríguez Artalejo','eRodriguez','eRodriguez@gmail.com','$2b$08$joc0Yc6KT0XwA.Kx4ujBG..SvwCdicNLXlHT7Uad0pMznOwo0EFe6',0);
/*!40000 ALTER TABLE `alumnos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inscripciones`
--

DROP TABLE IF EXISTS `inscripciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inscripciones` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `estado` int NOT NULL,
  `puntuacion` int DEFAULT NULL,
  `comentario` varchar(100) DEFAULT NULL,
  `fechaPuntuacion` date DEFAULT NULL,
  `alumnosId` int unsigned NOT NULL,
  `profesoresId` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_alumnos_has_profesores_profesores1_idx` (`profesoresId`),
  KEY `fk_alumnos_has_profesores_alumnos1_idx` (`alumnosId`),
  CONSTRAINT `fk_inscripciones_alumnos` FOREIGN KEY (`alumnosId`) REFERENCES `alumnos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_inscripciones_profesores` FOREIGN KEY (`profesoresId`) REFERENCES `profesores` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inscripciones`
--

LOCK TABLES `inscripciones` WRITE;
/*!40000 ALTER TABLE `inscripciones` DISABLE KEYS */;
/*!40000 ALTER TABLE `inscripciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profesores`
--

DROP TABLE IF EXISTS `profesores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profesores` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `nombreCompleto` varchar(50) NOT NULL,
  `userName` varchar(25) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `descripcion` varchar(200) NOT NULL,
  `precioHora` decimal(5,2) NOT NULL,
  `experiencia` int NOT NULL,
  `coordenadas` point NOT NULL,
  `telefono` varchar(12) NOT NULL,
  `validado` tinyint NOT NULL DEFAULT '0',
  `puntuacionMedia` decimal(3,2) DEFAULT NULL,
  `puntacionTotal` int DEFAULT NULL,
  `numeroPuntuaciones` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profesores`
--

LOCK TABLES `profesores` WRITE;
/*!40000 ALTER TABLE `profesores` DISABLE KEYS */;
/*!40000 ALTER TABLE `profesores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ramas`
--

DROP TABLE IF EXISTS `ramas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ramas` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(25) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ramas`
--

LOCK TABLES `ramas` WRITE;
/*!40000 ALTER TABLE `ramas` DISABLE KEYS */;
INSERT INTO `ramas` VALUES (1,'Matemáticas'),(2,'Full stack developer'),(3,'Programación');
/*!40000 ALTER TABLE `ramas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ramasprofesores`
--

DROP TABLE IF EXISTS `ramasprofesores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ramasprofesores` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `profesores_id` int unsigned NOT NULL,
  `ramas_id` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_profesores_has_ramas_ramas1_idx` (`ramas_id`),
  KEY `fk_profesores_has_ramas_profesores1_idx` (`profesores_id`),
  CONSTRAINT `fk_profesores_has_ramas_profesores1` FOREIGN KEY (`profesores_id`) REFERENCES `profesores` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_profesores_has_ramas_ramas1` FOREIGN KEY (`ramas_id`) REFERENCES `ramas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ramasprofesores`
--

LOCK TABLES `ramasprofesores` WRITE;
/*!40000 ALTER TABLE `ramasprofesores` DISABLE KEYS */;
/*!40000 ALTER TABLE `ramasprofesores` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-14 12:04:02
