-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: teacherapp
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `profesores`
--

DROP TABLE IF EXISTS `profesores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profesores` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(200) NOT NULL,
  `precioHora` decimal(5,2) NOT NULL,
  `experiencia` int NOT NULL,
  `coordenadas` point NOT NULL,
  `telefono` varchar(12) NOT NULL,
  `validado` tinyint NOT NULL DEFAULT '0',
  `puntuacionMedia` decimal(3,2) DEFAULT NULL,
  `puntuacionTotal` int DEFAULT NULL,
  `numeroPuntuaciones` int DEFAULT NULL,
  `usuarioId` int unsigned NOT NULL,
  `ramaId` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_teachers_users_idx` (`usuarioId`),
  KEY `fk_profesores_ramas1_idx` (`ramaId`),
  CONSTRAINT `fk_profesores_ramas` FOREIGN KEY (`ramaId`) REFERENCES `ramas` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_teachers_users` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profesores`
--

LOCK TABLES `profesores` WRITE;
/*!40000 ALTER TABLE `profesores` DISABLE KEYS */;
INSERT INTO `profesores` VALUES (2,'Profesor mítico',999.99,1,0x0000000001010000004B581B6327E02C400E8D823BAB094940,'555555555',1,NULL,NULL,NULL,62,2),(3,'Profesor con carácter',99.99,25,0x0000000001010000004B581B6327E028400E8D823BAB894940,'555555555',1,NULL,NULL,NULL,64,4),(4,'Bendita paciencia',92.00,20,0x000000000101000000E5F1B4FCC0F928400E8D823BAB894940,'555555555',1,NULL,NULL,NULL,65,5),(5,'Gran compañero',45.00,15,0x000000000101000000E5F1B4FCC0F92840DE08E643AB894940,'555555555',1,NULL,NULL,NULL,66,6),(6,'Sigo vivo',42.00,70,0x000000000101000000E5F1B4FCC0F928407AAB09FDA7894940,'555555555',0,NULL,NULL,NULL,67,7),(7,'Un poquito de async y un poquito de await',42.00,70,0x000000000101000000E5F1B4FCC0F92840F8CCEDB9A7894940,'555555555',1,4.33,13,3,68,8),(8,'Los mejors resultados. Garantizado',22.00,10,0x00000000010100000026E1421EC1F92840C84851C2A7894940,'555555555',0,NULL,NULL,NULL,71,9),(9,'Gran resultado en Colina Triste',22.00,10,0x00000000010100000026E1421EC1F92840C84851C2A7894940,'555555555',0,NULL,NULL,NULL,72,10),(10,'No sé de que me suena este nombre',22.00,10,0x00000000010100000026E1421EC1F92840C84851C2A7894940,'555555555',1,2.50,5,2,73,11),(11,'Your english will improve a lot!',22.00,10,0x000000000101000000A9BF5E61C1F92840EB1E3416A8894940,'555555555',0,NULL,NULL,NULL,74,12),(12,'Análisis numérico a tu alcance. Fisher te lo garantiza.',22.00,10,0x000000000101000000BB8674D3C1F92840D40A783EA8894940,'555555555F',0,NULL,NULL,NULL,80,4),(13,'Siempre a tu disposición',12.85,12,0x000000000101000000CDDDF824C1F9284098C4B4CAA7894940,'555555555',0,NULL,NULL,NULL,82,2),(14,'Profesor 10',12.75,4,0x000000000101000000439259BDC3F92840EB1E3416A8894940,'555555555',0,NULL,NULL,NULL,83,6),(15,'Análisis numérico a tu alcance',22.00,10,0x000000000101000000A9BF5E61C1F92840EB1E3416A8894940,'555555555',0,NULL,NULL,NULL,84,4),(16,'Enseño a soñar, déjame guiarte. ¿Vamos?',12.50,12,0x00000000010100000068D0D03FC1F928408687D5C4A7894940,'555555555',1,NULL,NULL,NULL,86,13),(17,'El maestro del prado y El fuego invisible',12.50,12,0x00000000010100000026E1421EC1F92840C84851C2A7894940,'444444444',1,3.00,3,1,88,14),(20,'Great expectations',15.50,17,0x00000000010100000026E1421EC1F92840C84851C2A7894940,'555555555',0,NULL,NULL,NULL,92,14);
/*!40000 ALTER TABLE `profesores` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-21  3:41:33
