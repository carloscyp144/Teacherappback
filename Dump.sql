CREATE DATABASE  IF NOT EXISTS `teacherapp` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `teacherapp`;
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
-- Table structure for table `alumnos`
--

DROP TABLE IF EXISTS `alumnos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alumnos` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `borrado` tinyint NOT NULL DEFAULT '0',
  `usuariosId` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_alumnos_usuarios1_idx` (`usuariosId`),
  CONSTRAINT `fk_alumnos_usuarios` FOREIGN KEY (`usuariosId`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alumnos`
--

LOCK TABLES `alumnos` WRITE;
/*!40000 ALTER TABLE `alumnos` DISABLE KEYS */;
INSERT INTO `alumnos` VALUES (1,0,39),(2,0,40),(3,0,41),(4,0,42),(5,0,43),(6,0,44),(7,0,45),(8,0,46),(9,0,47),(10,1,48),(11,0,49),(12,0,50),(13,0,51),(14,0,52),(15,0,69),(16,0,70),(17,0,76),(18,0,77),(19,0,78),(20,0,79),(21,0,81),(22,0,85),(23,0,87),(24,0,89),(25,0,97),(26,0,108),(27,0,109);
/*!40000 ALTER TABLE `alumnos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `conversaciones`
--

DROP TABLE IF EXISTS `conversaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `conversaciones` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `profesoresId` int unsigned NOT NULL,
  `alumnosId` int unsigned NOT NULL,
  `borradaProfesor` tinyint NOT NULL,
  `borradaAlumno` tinyint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_Conversacion_profesores1_idx` (`profesoresId`),
  KEY `fk_Conversacion_alumnos1_idx` (`alumnosId`),
  CONSTRAINT `fk_Conversacion_alumnos` FOREIGN KEY (`alumnosId`) REFERENCES `alumnos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_Conversacion_profesores` FOREIGN KEY (`profesoresId`) REFERENCES `profesores` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conversaciones`
--

LOCK TABLES `conversaciones` WRITE;
/*!40000 ALTER TABLE `conversaciones` DISABLE KEYS */;
INSERT INTO `conversaciones` VALUES (3,7,20,0,0),(4,3,20,0,0),(5,7,11,0,0);
/*!40000 ALTER TABLE `conversaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `emailspendientes`
--

DROP TABLE IF EXISTS `emailspendientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `emailspendientes` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `emailType` int NOT NULL,
  `referenciaId` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `emailspendientes`
--

LOCK TABLES `emailspendientes` WRITE;
/*!40000 ALTER TABLE `emailspendientes` DISABLE KEYS */;
/*!40000 ALTER TABLE `emailspendientes` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inscripciones`
--

LOCK TABLES `inscripciones` WRITE;
/*!40000 ALTER TABLE `inscripciones` DISABLE KEYS */;
INSERT INTO `inscripciones` VALUES (1,1,1,'Nefasto. No ir.','2022-11-16',3,10),(2,1,4,'Muy satisfecha, contenta con el resultado.','2022-11-16',9,10),(3,0,NULL,NULL,NULL,9,2),(6,1,5,'Gran experiencia. Repetir√≠a sin duda.','2022-11-17',11,7),(7,0,NULL,NULL,NULL,2,8),(8,1,4,'Estupendo. Gran tunante.','2022-11-17',12,7),(9,0,NULL,NULL,NULL,13,7),(10,1,4,'Muy bien. Async-await forever.','2022-11-17',14,7),(11,0,NULL,NULL,NULL,23,7),(12,1,3,'En general bien, pero a veces divaga un poco.','2022-11-20',24,17),(13,0,NULL,NULL,NULL,11,17);
/*!40000 ALTER TABLE `inscripciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mensajes`
--

DROP TABLE IF EXISTS `mensajes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mensajes` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `autor` int NOT NULL,
  `destinatario` int NOT NULL,
  `texto` varchar(200) NOT NULL,
  `fechaHora` datetime NOT NULL,
  `leido` tinyint NOT NULL,
  `borradoProfesor` tinyint NOT NULL,
  `borradoAlumno` tinyint NOT NULL,
  `conversacionesId` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_Mensajes_Conversaciones1_idx` (`conversacionesId`),
  CONSTRAINT `fk_Mensajes_Conversaciones` FOREIGN KEY (`conversacionesId`) REFERENCES `conversaciones` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mensajes`
--

LOCK TABLES `mensajes` WRITE;
/*!40000 ALTER TABLE `mensajes` DISABLE KEYS */;
INSERT INTO `mensajes` VALUES (1,7,20,'Hola usuario 79. Soy Mario Gir√≥n.','2022-12-02 02:19:50',0,0,0,3),(2,7,20,'Hola usuario 79. Soy Mario Gir√≥n.','2022-12-02 02:20:44',0,0,0,3),(3,20,7,'Hola Mario Gir√≥n, soy Almudena √Ålamo.','2022-12-02 02:26:19',0,0,0,3),(4,20,3,'Hola Teresa, ¬øQu√© tal? Soy Almudena √Ålamo.','2022-12-02 10:11:32',1,1,0,4),(5,20,3,'A ver si podemos hablar esta semana. Necesito m√°s clases.','2022-12-02 10:16:22',0,1,0,4),(6,3,20,'Cuando quieras Almudena.','2022-12-02 22:19:19',0,1,0,4),(7,3,20,'Hola de nuevo Almudena, ¬øqu√© tal est√°s?.','2022-12-04 01:42:44',0,1,0,4),(8,3,20,'Almudena, ¬øte lleg√≥ el mensaje anterior?.','2022-12-04 02:17:55',0,1,0,4),(9,20,3,'S√≠ me lleg√≥. Te respondo en un rato. Disculpa.','2022-12-04 02:42:45',0,1,0,4),(10,20,3,'¬øS√≠gues ah√≠?','2022-12-04 20:10:57',0,1,0,4),(11,20,3,'Hola de nuevo.','2022-12-04 20:12:44',0,1,0,4),(12,20,3,'Se ha quedado buena tarde.','2022-12-04 20:15:09',0,1,0,4),(13,7,11,'Se ha quedado un noche estupenda.','2022-12-04 22:44:29',0,0,0,5),(14,20,3,'Se ha quedado un noche estupenda.','2022-12-04 22:46:18',0,1,0,4),(15,20,3,'Bueno, hablamos ma√±ana ya.','2022-12-04 23:09:59',0,1,0,4),(16,3,20,'Hola Almudena. Hablamos ma√±ana. Ciao!','2022-12-04 23:39:07',0,1,0,4);
/*!40000 ALTER TABLE `mensajes` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profesores`
--

LOCK TABLES `profesores` WRITE;
/*!40000 ALTER TABLE `profesores` DISABLE KEYS */;
INSERT INTO `profesores` VALUES (2,'Profesor m√≠tico',999.99,1,_binary '\0\0\0\0\0\0\0KXc\'\‡,@çÇ;´	I@','555555555',1,NULL,NULL,NULL,62,2),(3,'Profesor con car√°cter',99.99,25,_binary '\0\0\0\0\0\0\0KXc\'\‡(@çÇ;´âI@','555555555',1,NULL,NULL,NULL,64,4),(4,'Bendita paciencia',92.00,20,_binary '\0\0\0\0\0\0\0\ÂÒ¥¸¿˘(@çÇ;´âI@','555555555',1,NULL,NULL,NULL,65,5),(5,'Gran compa√±ero',45.00,15,_binary '\0\0\0\0\0\0\0\ÂÒ¥¸¿˘(@\ﬁ\ÊC´âI@','555555555',1,NULL,NULL,NULL,66,6),(6,'Sigo vivo',42.00,70,_binary '\0\0\0\0\0\0\0\ÂÒ¥¸¿˘(@z´	˝ßâI@','555555555',0,NULL,NULL,NULL,67,7),(7,'Un poquito de async y un poquito de await',42.00,70,_binary '\0\0\0\0\0\0\0\ÂÒ¥¸¿˘(@¯\Ã\ÌπßâI@','555555555',1,4.33,13,3,68,8),(8,'Los mejors resultados. Garantizado',22.00,10,_binary '\0\0\0\0\0\0\0&\·B¡˘(@\»HQ¬ßâI@','555555555',0,NULL,NULL,NULL,71,9),(9,'Gran resultado en Colina Triste',22.00,10,_binary '\0\0\0\0\0\0\0&\·B¡˘(@\»HQ¬ßâI@','555555555',0,NULL,NULL,NULL,72,10),(10,'No s√© de que me suena este nombre',22.00,10,_binary '\0\0\0\0\0\0\0&\·B¡˘(@\»HQ¬ßâI@','555555555',1,2.50,5,2,73,11),(11,'Your english will improve a lot!',22.00,10,_binary '\0\0\0\0\0\0\0©ø^a¡˘(@\Î4®âI@','555555555',0,NULL,NULL,NULL,74,12),(12,'An√°lisis num√©rico a tu alcance. Fisher te lo garantiza.',22.00,10,_binary '\0\0\0\0\0\0\0ªÜt\”¡˘(@\‘\nx>®âI@','555555555F',0,NULL,NULL,NULL,80,4),(13,'Siempre a tu disposici√≥n',12.85,12,_binary '\0\0\0\0\0\0\0\Õ\›¯$¡˘(@òƒ¥ ßâI@','555555555',0,NULL,NULL,NULL,82,2),(14,'Profesor 10',12.75,4,_binary '\0\0\0\0\0\0\0CíYΩ\√˘(@\Î4®âI@','555555555',0,NULL,NULL,NULL,83,6),(15,'An√°lisis num√©rico a tu alcance',22.00,10,_binary '\0\0\0\0\0\0\0©ø^a¡˘(@\Î4®âI@','555555555',0,NULL,NULL,NULL,84,4),(16,'Ense√±o a so√±ar, d√©jame guiarte. ¬øVamos?',12.50,12,_binary '\0\0\0\0\0\0\0h\–\–?¡˘(@Üá\’ƒßâI@','555555555',1,NULL,NULL,NULL,86,13),(17,'El maestro del prado y El fuego invisible',12.50,12,_binary '\0\0\0\0\0\0\0&\·B¡˘(@\»HQ¬ßâI@','444444444',1,3.00,3,1,88,14),(20,'Great expectations',15.50,17,_binary '\0\0\0\0\0\0\0&\·B¡˘(@\»HQ¬ßâI@','555555555',0,NULL,NULL,NULL,92,14),(21,'Muchos a√±os de experiencia con grandes resultados',12.50,20,_binary '\0\0\0\0\0\0\0&\·B¡˘(@\»HQ¬ßâI@','555555555',0,NULL,NULL,NULL,93,6),(22,'La reina descalza y la mano de F√°tima',18.00,15,_binary '\0\0\0\0\0\0\0&\·B¡˘(@\»HQ¬ßâI@','555555555',0,NULL,NULL,NULL,94,14),(23,'El √∫ltimo cat√≥n. El origen perdido. Venganza en Sevilla.',12.50,12,_binary '\0\0\0\0\0\0\0¥9\Œm\¬˘(@\Î4®âI@','555555555',0,NULL,NULL,NULL,95,14),(24,'Excelentes resultados, todos mis alumnos pasan con nota',15.00,12,_binary '\0\0\0\0\0\0\0h\–\–?¡˘(@¯\Ã\ÌπßâI@','555555555',0,NULL,NULL,NULL,96,14),(25,'A tu disposici√≥n. Mejorar√°s',22.00,10,_binary '\0\0\0\0\0\0\0ˆ∏\ n¡˘(@Ä\ﬁ\n®âI@','555555555',1,NULL,NULL,NULL,98,4),(30,'Vas a mejorar, te lo garantizo.',15.00,15,_binary '\0\0\0\0\0\0\0h\–\–?¡˘(@\»HQ¬ßâI@','555555555',0,NULL,NULL,NULL,103,14),(31,'Tasa de aprobados muy alta.',15.00,16,_binary '\0\0\0\0\0\0\0\ÍÆ\ÏÇ¡˘(@¯\Ã\ÌπßâI@','555555555',0,NULL,NULL,NULL,104,14),(32,'Mejorar√°s d√≠a a d√≠a.',9.00,8,_binary '\0\0\0\0\0\0\0h\–\–?¡˘(@E\∆Y«ßâI@','555555556',0,NULL,NULL,NULL,105,2),(33,'Llevo muerto m√°s de 60 a√±os. Pero por aqu√≠ ando.',1.00,75,_binary '\0\0\0\0\0\0\0ÕÜF¡˘(@Ú\«˛√ßâI@','555555556',0,NULL,NULL,NULL,106,14),(34,'Vas a sacar muy buenas notas',14.00,12,_binary '\0\0\0\0\0\0\0h\–\–?¡˘(@¯\Ã\ÌπßâI@','555555555',0,NULL,NULL,NULL,107,2);
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
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ramas`
--

LOCK TABLES `ramas` WRITE;
/*!40000 ALTER TABLE `ramas` DISABLE KEYS */;
INSERT INTO `ramas` VALUES (2,'Programaci√≥n declarativa'),(4,'Matem√°tica discreta'),(5,'Compiladores'),(6,'Qu√≠mica'),(7,'Ciencia naturales'),(8,'Backend'),(9,'Micolog√≠a avanzada'),(10,'Personal fitness'),(11,'Apicultura'),(12,'English teacher'),(13,'Sue√±os y f√°bulas'),(14,'Literatura'),(15,'F√≠sica'),(17,'Qu√≠mica'),(21,'Matem√°ticas');
/*!40000 ALTER TABLE `ramas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol`
--

DROP TABLE IF EXISTS `rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rol` (
  `id` int unsigned NOT NULL,
  `descripcion` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `descripcion_UNIQUE` (`descripcion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol`
--

LOCK TABLES `rol` WRITE;
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
INSERT INTO `rol` VALUES (1,'admin'),(2,'alumno'),(3,'profesor');
/*!40000 ALTER TABLE `rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `userName` varchar(25) NOT NULL,
  `nombreCompleto` varchar(50) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `rolId` int unsigned NOT NULL,
  `imagen` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `userName_UNIQUE` (`userName`),
  KEY `fk_usuarios_rol1_idx` (`rolId`),
  CONSTRAINT `fk_usuarios_rol` FOREIGN KEY (`rolId`) REFERENCES `rol` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=110 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (37,'admin','Nombre completo administrador','mjifrias@yahoo.es','$2b$08$KOZxjEEleGXrcUeqo2e7lOqyuH9xnfeLgQpAMEJzZA5rGYFhc/Jlq',1,'37.png'),(39,'mjimenez','Mariano Jim√©nez','mjimenez@gmail.com','$2b$08$SrdzOSHnFwQ6dbzEq7AbvOnZzzcqD.qgu37.rcB9oEuApiJ1i3WFK',2,NULL),(40,'emendoza',' Eduardo Mendoza','emendoza@gmail.com','$2b$08$kr6EbTkOSV.gOFC7gj6PsuzNgB0roJzKReMLesHxHlfqBQkcPBMLO',2,NULL),(41,'emendoza2','Eduardo Mendoza Modificado','emendoza2@gmail.com','$2b$08$mfKLCQdY8svBhQHpRiahdOKvYrECpNe6usCfM4SKT65cAnE.rrnmu',2,NULL),(42,'emedoza3','Eduardo Mendoza 3','emendoza3@gmail.com','$2b$08$CreDYdInYAaKZa/mXCdCJ.g4iv6OvqNaOsIQzEMSzLSdZ.JAqG7AG',2,NULL),(43,'emedoza4','Eduardo Mendoza 4','emendoza4@gmail.com','$2b$08$OkeivTDYtmWVusZ16Feyx.ff76zmLYhXI8gBBxdFl2JxnhK9y9ftC',2,NULL),(44,'emedoza5','Eduardo Mendoza 5','emendoza5@gmail.com','$2b$08$U.hfIb5opQqD6n/V29M9XuxPCrcamPAoInsVxtw1ndFpxCPLUt0nW',2,NULL),(45,'emedoza6','Eduardo Mendoza 6','emendoza6@gmail.com','$2b$08$1G6BaV8OC/ZcfxW30HYPguBYkt8irRWb8XVlXr3hc21gC5LTuOaCS',2,NULL),(46,'emedoza7','Eduardo Mendoza 7','emendoza7@gmail.com','$2b$08$59eXokB1O/B6dvS4djjy1eAjGLEs8xjWFny6JV20W52mDs.rwxDm6',2,NULL),(47,'agrandeshernandez','Almudena Grandes Hern√°ndez','agrandes@gmail.com','$2b$08$FpkZQyeHAuKBzv1U.tNXsu.b0jfKVc55glb53uXVGYLyJDYh/YJSm',2,'47.gif'),(48,'arodriguez','Mario Rodr√≠guez Artalejo','arodriguez@gmail.com','$2b$08$ZxmtiMaADUNFo4.iDaqtLeZnN0/80JEERbF0jHh5TdXh88.b7u1N.',2,NULL),(49,'achacon','Dulce Chac√≥n','achacon@gmail.com','$2b$08$p2a8mjqPMWlqgt94/QqzVeITrNlE75owJODv3aDke/HAlQq8NxJfy',2,NULL),(50,'areverte','Arturo P√©rez-Reverte','areverte@gmail.com','$2b$08$FgSyabf3yYh/YJhZiw47XOVsDv6.sfuaEBbeRs.bPX3COxlc7b4j2',2,NULL),(51,'cruiz','Carlos Ru√≠z Zaf√≥n','cruiz@gmail.com','$2b$08$gBpZDYw5S0QUdlI10qA5i.7tMnSfMZqal8WH49tRwknKOhWMtJwru',2,'51.gif'),(52,'mMoliner','Maria Moliner','mMoliner@gmail.com','$2b$08$HV3pfnXqpy1sk.hL2fEF0uyQqIkYYaPLkDdZ5HoqdoTvijq6xHBbi',2,'52.gif'),(62,'mrodriguez','Mario Rodr√≠guez Artalejo','mrodriguez@gmail.com','$2b$08$5X50HH/zxzd/ChuMrhvyfePjP0J/UntJePJrhaGDM5Z9Hh0Yi1g3.',3,NULL),(64,'thortala','Teresa Hortal√°','thortala@gmail.com','$2b$08$zf4umBICiN.yQQuN0Ka.AeX.HpCTTTq16n44oBe2NjZaEo0F5Ws2u',3,NULL),(65,'afernandez','Alfredo Fern√°ndez-Valmayor Crespo','afernandez@gmail.com','$2b$08$Ir9b.JK8qZ3Wi6octnNLxeIvcgvczDSC2oWwTW7ae7p.vlQqLs8Je',3,NULL),(66,'jlsierra','Jos√© Lu√≠s Sierra','jlsierra@gmail.com','$2b$08$l8sBHoHqnu3QRRabZPk1Heu8yRgErezSlUwjMibF7mDhzUSS531pK',3,NULL),(67,'mpyg','Don Marcelino Pan y Agua','mpyg@gmail.com','$2b$08$/9ilA.bGk7IrXNaDhg6bKuFmNumbk952VNxLBinv0KtdhUVf9jZWK',3,NULL),(68,'mgiron','Mario Gir√≥n','mgiron@gmail.com','$2b$08$q0zypFf3fqYwGC0JAAcc0O3cKJoCTmuuTu9NT6sYptdKHI/wd36kq',3,NULL),(69,'mprieto','Manuel Prieto L√≥pez','mprieto@gmail.com','$2b$08$g0ORcb0SP.gSi0L1Y2yuleJ72RqRmsqly9h.W35Zfc4UnmyAEjDXS',2,NULL),(70,'mgonzalez','Manuel Gonz√°lez del √Ålamo','mgozalez@gmail.com','$2b$08$dh88W/g92SIRedEO3SRb0OZ47tK9PVyVXdXrQw7onunGn.cIGlyR.',2,NULL),(71,'amartinez','Agust√≠n Mart√≠nez Ramos','amartinez@gmail.com','$2b$08$NkszqJyctAUQQG0cSX5HP.7yrshrLx7RBCqqhzhunk.U2l7T7ac.e',3,NULL),(72,'mmata','Mart√≠n Mata Cabello','mmata@gmail.com','$2b$08$EEiRfTC/n7hfGe/WFcumpOqk26gzIQ/4JXSrmXAS1PZKKZ2t.Eowe',3,NULL),(73,'mcembellin','Mario Cembell√≠n','mcembellin@gmail.com','$2b$08$O.QT2FBgzOPTfZrOwRSMdu6SpPLHQszLGmrYSsCI28Lgse7ATmIju',3,NULL),(74,'jsmith','Joe Smith','jsmith@gmail.com','$2b$08$GpXBzNwWSs1rwMyyAe.IcO.3au9VZP0og6Ic1ljwR7Yqk3qkyDNDu',3,NULL),(76,'mtrujillo','Maria Antonia Trujillo','mtrujillo@gmail.com','$2b$08$X5YaPL.X44b3NSNiyPLBGuRvjSzes1zgK6GvBn8dCrKJjocNYA7Xq',2,NULL),(77,'alopez','Ana L√≥pez Gald√≥n','alopez@gmail.com','$2b$08$EJKnJrdP/UHPioLbBzzdAeOUtxg3CJycSdlIsgF5KLvLrsUpaNllq',2,NULL),(78,'mcalzada','Mart√≠n Calzada del Olmo','mcalzada@gmail.com','$2b$08$Jp7fIWhFlaENdR7BG/agz.VlMVbq8Z0i44.nSo244D1iQzCSA2LL.',2,NULL),(79,'aalamo','Almudena del √Ålamo Santamar√≠a','aalamo@gmail.com','$2b$08$MBnWQn5/bcAVRRBF4GgoR.u10UMbusJEfi3UKwbCrihf3GlUD.6Km',2,'79.gif'),(80,'ialbenizfisher','Isaac Alb√©niz Fisher','ialbenizfisher@gmail.com','$2b$08$UNI7lvE20vnBLrIrYnSHYuzrr5NQvDt/deySKF8y9EDLsw9vptgCW',3,NULL),(81,'aHernando','Alejandro Hernando','ahernando@gmail.com','$2b$08$JJ.o4AYzcL/gyD6JNatPp.sGx7O5jObBG.WlFFzfNq95YEuSqZvAu',2,NULL),(82,'amtormes','Alba Mar√≠a de Tormes','amtormes@gmail.com','$2b$08$jIdquUFpdEvQaDeChFjFpeSUey0Fg/R3IjJS/7JsoVbDJO0wK6RAa',3,NULL),(83,'cperez','C√©sar Rodr√≠guez P√©rez','cperez@gmail.com','$2b$08$lv4Luu0.F/mz7xR/rIoJ/.WT8VqDtV6bXBwK1UCPpkRN7rZsa0waq',3,NULL),(84,'ialbeniz','Isaac Alb√©niz Taylor','ialbeniz@gmail.com','$2b$08$AtOv9OHt7PW7A0CGQ1KnWuV82LQh7.N.zjbTWhuxF8v0WH1IO15hi',3,NULL),(85,'dbrown','Dan Brown','dbrown@outlook.com','$2b$08$7FzMJVIuv48U7DtlXcHv/u6s8BeFAM13aaswx1.3iceYWBljXCYB6',2,NULL),(86,'cruizzafon','Carlos Ru√≠z Zaf√≥n','cruizzafon@gmail.com','$2b$08$ZCIDQbt15SiDW2xjOCELt.3WZWxVV/s2fIw04v6tLGF6xM98hg.za',3,NULL),(87,'kfollet','Ken Follet','kfollet@gmail.com','$2b$08$2vPeC4kEqrcQCSZVHx5Z0OWFKA5RiynN.0vq9YIxqFOLncF6ThVPG',2,NULL),(88,'jsierra','Javier Sierra','jsierra@gmail.com','$2b$08$9kcCdMCnx9.0mvYwRrdItOy2zeCAxxNC5V36jNaBRFxFCzzGQf1ae',3,'88.png'),(89,'gfesser','Guillermo Fessser P√©rez','gfesser@gmail.com','$2b$08$eWAgt5Tjk.hZ2J1m4R8JyO36pENjZ6kGbvPCb5jVmjO9le7Nf6vie',2,'89.jpg'),(92,'cdickens','Charles Dickens','cdickens@gmail.com','$2b$08$0d29CZ9lKSxy.ndowh9Ee.HkOiMI0Lf4/wBHETBL1ilKKYZd4b79K',3,NULL),(93,'faramburu','Fernando Aramburu','faramburu@gmail.com','$2b$08$V213ZhBw1iR4hWi.tZqfduzc12IW3f8SA0beWoOxjk8AKZwEtR/1i',3,'93.gif'),(94,'ifalcones','Ildefonso Falcones','ifalcones@gmail.com','$2b$08$qhPxNwXwLMvxdwnQN/quRe6iNnZaVcuDw11/RdPA6Eb8KsQTNovti',3,'94.png'),(95,'masensi','Matilde Asensi','mjifrias@hotmail.com','$2b$08$azWfb.7UXTfmJx3N8TLPDOIp9HP3Q47bZe3W07MWUuSMY0WxEQpHC',3,'95.png'),(96,'rcampoamor','Ram√≥n de Campoamor','rcampoamor@gmail.com','$2b$08$LVW77zrW3ljBJIs0ZJgs5.O3SM/uc9UGp/4BLGCEmtNmGEpRUD2yW',3,NULL),(97,'agutierrez','Antonio Gutierrez M√°rquez','agutierrez@gmail.com','$2b$08$PcTnyeIoAc9YtjWfWoUuKOPaq8c18RW.FB.0xAaZ0pCOZBNWev/Te',2,NULL),(98,'mmayorga','Mart√≠n Mayorga','mmayorga@gmail.com','$2b$08$XFEkqsuPzGy.2VH3ApV9EuFhu0zytn1zJAkx7Uv6PVuyUYSsuldHe',3,NULL),(103,'jnavarro','Julia Navarro','jnavarro@gmail.com','$2b$08$OtSd7irzU7NpXbKqWXwV7.hadA3TmnwN23wSCUyJI/syIZCjEN7AC',3,'103.gif'),(104,'jausten','Jane Austen','jausten@gmail.com','$2b$08$/iuB3Ua2zpIflLdwFTgDjOL8hneBE9Dqs7LjPZ8mc5hX7vWhfJDtO',3,'NULL'),(105,'cportis','Charles Portis','cportis@gmail.com','$2b$08$Pywz8P7CEfWdAQookwR7A.c21jVxFSJhMljoVzLR0zjicY50M7n.i',3,NULL),(106,'ffitzgerald','Francis Scott Key Fitzgerald','ffitzgerald@gmail.com','$2b$08$6x6AgkbkZSR0Rl9MJYiJRuAbgxJVs0pDckTgw2glkhB3Yk44X7n7a',3,'106.gif'),(107,'alopezlopez','Antonio L√≥pez L√≥pez','alopezlopez@gmail.com','$2b$08$yeSORZ6ltmmLD03Zzt6hqOPtYrZG62iz5QCyXXUcEtzkQ9SwrjhF.',3,NULL),(108,'ajimenez','Alex Jim√©nez del Olmo','ajimenez@gmail.com','$2b$08$U.9TK5.e5UOfErudeWYt2u8kmdv2CY0xACcuHZtBrZqcDZ.L5ndni',2,'108.gif'),(109,'sdelrio','Sandra del R√≠o Gutierrez','sdelrio@gmail.com','$2b$08$SrhycMQKKR1XWmj30k2IeuZj9xZzbkOUvW1bhRiWE0UMJ2KdeoF6e',2,NULL);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-12-07  9:15:12
