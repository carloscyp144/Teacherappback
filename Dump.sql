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
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alumnos`
--

LOCK TABLES `alumnos` WRITE;
/*!40000 ALTER TABLE `alumnos` DISABLE KEYS */;
INSERT INTO `alumnos` VALUES (1,0,39),(2,0,40),(3,0,41),(4,0,42),(5,0,43),(6,0,44),(7,0,45),(8,0,46),(9,0,47),(10,1,48),(11,0,49),(12,0,50),(13,0,51),(14,0,52),(15,0,69),(16,0,70),(17,0,76),(18,1,77),(19,0,78),(20,0,79),(21,0,81),(22,0,85);
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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inscripciones`
--

LOCK TABLES `inscripciones` WRITE;
/*!40000 ALTER TABLE `inscripciones` DISABLE KEYS */;
INSERT INTO `inscripciones` VALUES (1,1,1,'Nefasto. No ir.','2022-11-16',3,10),(2,1,4,'Muy satisfecha, contenta con el resultado.','2022-11-16',9,10),(3,0,NULL,NULL,NULL,9,2),(6,1,5,'Gran experiencia. Repetir√≠a sin duda.','2022-11-17',11,7),(7,0,NULL,NULL,NULL,2,8),(8,0,4,'Estupendo. Gran tunante.','2022-11-17',12,7),(9,0,NULL,NULL,NULL,13,7),(10,1,4,'Muy bien. Async-await forever.','2022-11-17',14,7);
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
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profesores`
--

LOCK TABLES `profesores` WRITE;
/*!40000 ALTER TABLE `profesores` DISABLE KEYS */;
INSERT INTO `profesores` VALUES (2,'Profesor m√≠tico',999.99,1,_binary '\0\0\0\0\0\0\0KXc\'\‡,@çÇ;´	I@','555555555',1,NULL,NULL,NULL,62,2),(3,'Profesor con car√°cter',99.99,25,_binary '\0\0\0\0\0\0\0KXc\'\‡(@çÇ;´âI@','555555555',1,NULL,NULL,NULL,64,4),(4,'Bendita paciencia',92.00,20,_binary '\0\0\0\0\0\0\0\ÂÒ¥¸¿˘(@çÇ;´âI@','555555555',1,NULL,NULL,NULL,65,5),(5,'Gran compa√±ero',45.00,15,_binary '\0\0\0\0\0\0\0\ÂÒ¥¸¿˘(@\ﬁ\ÊC´âI@','555555555',1,NULL,NULL,NULL,66,6),(6,'Sigo vivo',42.00,70,_binary '\0\0\0\0\0\0\0\ÂÒ¥¸¿˘(@z´	˝ßâI@','555555555',0,NULL,NULL,NULL,67,7),(7,'Un poquito de async y un poquito de await',42.00,70,_binary '\0\0\0\0\0\0\0\ÂÒ¥¸¿˘(@¯\Ã\ÌπßâI@','555555555',0,4.33,13,3,68,8),(8,'Los mejors resultados. Garantizado',22.00,10,_binary '\0\0\0\0\0\0\0&\·B¡˘(@\»HQ¬ßâI@','555555555',0,NULL,NULL,NULL,71,9),(9,'Gran resultado en Colina Triste',22.00,10,_binary '\0\0\0\0\0\0\0&\·B¡˘(@\»HQ¬ßâI@','555555555',0,NULL,NULL,NULL,72,10),(10,'No s√© de que me suena este nombre',22.00,10,_binary '\0\0\0\0\0\0\0&\·B¡˘(@\»HQ¬ßâI@','555555555',1,2.50,5,2,73,11),(11,'Your english will improve a lot!',22.00,10,_binary '\0\0\0\0\0\0\0©ø^a¡˘(@\Î4®âI@','555555555',0,NULL,NULL,NULL,74,12),(12,'An√°lisis num√©rico a tu alcance. Fisher te lo garantiza.',22.00,10,_binary '\0\0\0\0\0\0\0ªÜt\”¡˘(@\‘\nx>®âI@','555555555F',0,NULL,NULL,NULL,80,4),(13,'Siempre a tu disposici√≥n',12.85,12,_binary '\0\0\0\0\0\0\0\Õ\›¯$¡˘(@òƒ¥ ßâI@','555555555',0,NULL,NULL,NULL,82,2),(14,'Profesor 10',12.75,4,_binary '\0\0\0\0\0\0\0CíYΩ\√˘(@\Î4®âI@','555555555',0,NULL,NULL,NULL,83,6),(15,'An√°lisis num√©rico a tu alcance',22.00,10,_binary '\0\0\0\0\0\0\0©ø^a¡˘(@\Î4®âI@','555555555',0,NULL,NULL,NULL,84,4),(16,'Ense√±o a so√±ar, d√©jame guiarte. ¬øVamos?',12.50,12,_binary '\0\0\0\0\0\0\0h\–\–?¡˘(@Üá\’ƒßâI@','555555555',1,NULL,NULL,NULL,86,13);
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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ramas`
--

LOCK TABLES `ramas` WRITE;
/*!40000 ALTER TABLE `ramas` DISABLE KEYS */;
INSERT INTO `ramas` VALUES (2,'Programaci√≥n declarativa'),(4,'Matem√°tica discreta'),(5,'Compiladores'),(6,'Lenguajes de Marcado'),(7,'Ciencia naturales'),(8,'Backend'),(9,'Micolog√≠a avanzada'),(10,'Machacador de pedales'),(11,'Sexado de pollos'),(12,'English teacher'),(13,'Sue√±os y f√°bulas');
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
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `userName_UNIQUE` (`userName`),
  KEY `fk_usuarios_rol1_idx` (`rolId`),
  CONSTRAINT `fk_usuarios_rol` FOREIGN KEY (`rolId`) REFERENCES `rol` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (37,'admin','Nombre completo administrador','admin@gmail.com','$2b$08$OVWehOdmcy09840rjGGj0e7UVPE54Qo7Ta05hOJEiBGteuvdQVfV.',1),(39,'mjimenez','Mariano Jim√©nez','mjimenez@gmail.com','$2b$08$SrdzOSHnFwQ6dbzEq7AbvOnZzzcqD.qgu37.rcB9oEuApiJ1i3WFK',2),(40,'emendoza',' Eduardo Mendoza','emendoza@gmail.com','$2b$08$kr6EbTkOSV.gOFC7gj6PsuzNgB0roJzKReMLesHxHlfqBQkcPBMLO',2),(41,'emendoza2','Eduardo Mendoza Modificado','emendoza2@gmail.com','$2b$08$mfKLCQdY8svBhQHpRiahdOKvYrECpNe6usCfM4SKT65cAnE.rrnmu',2),(42,'emedoza3','Eduardo Mendoza 3','emendoza3@gmail.com','$2b$08$CreDYdInYAaKZa/mXCdCJ.g4iv6OvqNaOsIQzEMSzLSdZ.JAqG7AG',2),(43,'emedoza4','Eduardo Mendoza 4','emendoza4@gmail.com','$2b$08$OkeivTDYtmWVusZ16Feyx.ff76zmLYhXI8gBBxdFl2JxnhK9y9ftC',2),(44,'emedoza5','Eduardo Mendoza 5','emendoza5@gmail.com','$2b$08$U.hfIb5opQqD6n/V29M9XuxPCrcamPAoInsVxtw1ndFpxCPLUt0nW',2),(45,'emedoza6','Eduardo Mendoza 6','emendoza6@gmail.com','$2b$08$1G6BaV8OC/ZcfxW30HYPguBYkt8irRWb8XVlXr3hc21gC5LTuOaCS',2),(46,'emedoza7','Eduardo Mendoza 7','emendoza7@gmail.com','$2b$08$59eXokB1O/B6dvS4djjy1eAjGLEs8xjWFny6JV20W52mDs.rwxDm6',2),(47,'agrandeshernandez','Almudena Grandes Hern√°ndez','agrandes@gmail.com','$2b$08$FpkZQyeHAuKBzv1U.tNXsu.b0jfKVc55glb53uXVGYLyJDYh/YJSm',2),(48,'arodriguez','Mario Rodr√≠guez Artalejo','arodriguez@gmail.com','$2b$08$ZxmtiMaADUNFo4.iDaqtLeZnN0/80JEERbF0jHh5TdXh88.b7u1N.',2),(49,'achacon','Dulce Chac√≥n','achacon@gmail.com','$2b$08$p2a8mjqPMWlqgt94/QqzVeITrNlE75owJODv3aDke/HAlQq8NxJfy',2),(50,'areverte','Arturo P√©rez-Reverte','areverte@gmail.com','$2b$08$FgSyabf3yYh/YJhZiw47XOVsDv6.sfuaEBbeRs.bPX3COxlc7b4j2',2),(51,'cruiz','Carlos Ru√≠z Zaf√≥n','cruiz@gmail.com','$2b$08$gBpZDYw5S0QUdlI10qA5i.7tMnSfMZqal8WH49tRwknKOhWMtJwru',2),(52,'mMoliner','Maria Moliner','mMoliner@gmail.com','$2b$08$HV3pfnXqpy1sk.hL2fEF0uyQqIkYYaPLkDdZ5HoqdoTvijq6xHBbi',2),(62,'mrodriguez','Mario Rodr√≠guez Artalejo','mrodriguez@gmail.com','$2b$08$5X50HH/zxzd/ChuMrhvyfePjP0J/UntJePJrhaGDM5Z9Hh0Yi1g3.',3),(64,'thortala','Teresa Hortal√°','thortala@gmail.com','$2b$08$zf4umBICiN.yQQuN0Ka.AeX.HpCTTTq16n44oBe2NjZaEo0F5Ws2u',3),(65,'afernandez','Alfredo Fern√°ndez-Valmayor Crespo','afernandez@gmail.com','$2b$08$Ir9b.JK8qZ3Wi6octnNLxeIvcgvczDSC2oWwTW7ae7p.vlQqLs8Je',3),(66,'jlsierra','Jos√© Lu√≠s Sierra','jlsierra@gmail.com','$2b$08$l8sBHoHqnu3QRRabZPk1Heu8yRgErezSlUwjMibF7mDhzUSS531pK',3),(67,'mpyg','Don Marcelino Pan y Agua','mpyg@gmail.com','$2b$08$/9ilA.bGk7IrXNaDhg6bKuFmNumbk952VNxLBinv0KtdhUVf9jZWK',3),(68,'mgiron','Mario Gir√≥n','mgiron@gmail.com','$2b$08$q0zypFf3fqYwGC0JAAcc0O3cKJoCTmuuTu9NT6sYptdKHI/wd36kq',3),(69,'mprieto','Manuel Prieto L√≥pez','mprieto@gmail.com','$2b$08$g0ORcb0SP.gSi0L1Y2yuleJ72RqRmsqly9h.W35Zfc4UnmyAEjDXS',2),(70,'mgonzalez','Manuel Gonz√°lez del √Ålamo','mgozalez@gmail.com','$2b$08$dh88W/g92SIRedEO3SRb0OZ47tK9PVyVXdXrQw7onunGn.cIGlyR.',2),(71,'amartinez','Agust√≠n Mart√≠nez Ramos','amartinez@gmail.com','$2b$08$NkszqJyctAUQQG0cSX5HP.7yrshrLx7RBCqqhzhunk.U2l7T7ac.e',3),(72,'mmata','Mart√≠n Mata Cabello','mmata@gmail.com','$2b$08$EEiRfTC/n7hfGe/WFcumpOqk26gzIQ/4JXSrmXAS1PZKKZ2t.Eowe',3),(73,'mcembellin','Mario Cembell√≠n','mcembellin@gmail.com','$2b$08$O.QT2FBgzOPTfZrOwRSMdu6SpPLHQszLGmrYSsCI28Lgse7ATmIju',3),(74,'jsmith','Joe Smith','jsmith@gmail.com','$2b$08$GpXBzNwWSs1rwMyyAe.IcO.3au9VZP0og6Ic1ljwR7Yqk3qkyDNDu',3),(76,'mtrujillo','Maria Antonia Trujillo','mtrujillo@gmail.com','$2b$08$X5YaPL.X44b3NSNiyPLBGuRvjSzes1zgK6GvBn8dCrKJjocNYA7Xq',2),(77,'alopez','Ana L√≥pez Gald√≥n','alopez@gmail.com','$2b$08$EJKnJrdP/UHPioLbBzzdAeOUtxg3CJycSdlIsgF5KLvLrsUpaNllq',2),(78,'mcalzada','Mart√≠n Calzada del Olmo','mcalzada@gmail.com','$2b$08$Jp7fIWhFlaENdR7BG/agz.VlMVbq8Z0i44.nSo244D1iQzCSA2LL.',2),(79,'aalamo','Almudena del √Ålamo Santamar√≠a','aalamo@gmail.com','$2b$08$MBnWQn5/bcAVRRBF4GgoR.u10UMbusJEfi3UKwbCrihf3GlUD.6Km',2),(80,'ialbenizfisher','Isaac Alb√©niz Fisher','ialbenizfisher@gmail.com','$2b$08$UNI7lvE20vnBLrIrYnSHYuzrr5NQvDt/deySKF8y9EDLsw9vptgCW',3),(81,'aHernando','Alejandro Hernando','ahernando@gmail.com','$2b$08$JJ.o4AYzcL/gyD6JNatPp.sGx7O5jObBG.WlFFzfNq95YEuSqZvAu',2),(82,'amtormes','Alba Mar√≠a de Tormes','amtormes@gmail.com','$2b$08$jIdquUFpdEvQaDeChFjFpeSUey0Fg/R3IjJS/7JsoVbDJO0wK6RAa',3),(83,'cperez','C√©sar Rodr√≠guez P√©rez','cperez@gmail.com','$2b$08$lv4Luu0.F/mz7xR/rIoJ/.WT8VqDtV6bXBwK1UCPpkRN7rZsa0waq',3),(84,'ialbeniz','Isaac Alb√©niz Taylor','ialbeniz@gmail.com','$2b$08$AtOv9OHt7PW7A0CGQ1KnWuV82LQh7.N.zjbTWhuxF8v0WH1IO15hi',3),(85,'dbrown','Dan Brown','dbrown@outlook.com','$2b$08$7FzMJVIuv48U7DtlXcHv/u6s8BeFAM13aaswx1.3iceYWBljXCYB6',2),(86,'cruizzafon','Carlos Ru√≠z Zaf√≥n','cruizzafon@gmail.com','$2b$08$ZCIDQbt15SiDW2xjOCELt.3WZWxVV/s2fIw04v6tLGF6xM98hg.za',3);
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

-- Dump completed on 2022-11-18  3:06:13
