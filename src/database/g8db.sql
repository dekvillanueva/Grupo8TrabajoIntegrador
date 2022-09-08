-- MySQL dump 10.13  Distrib 8.0.12, for macos10.13 (x86_64)
--
-- Host: localhost    Database: g8db
-- ------------------------------------------------------
-- Server version	8.0.11

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Sensores de temperatura'),(2,'Sensores de flujo'),(3,'Sensores de gas'),(4,'Sensores de presión'),(5,'Sensores de posición');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `products` (
  `product_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_name` varchar(50) DEFAULT NULL,
  `product_description` text,
  `product_image` varchar(100) DEFAULT NULL,
  `product_price` decimal(10,0) DEFAULT NULL,
  `product_discount` int(11) DEFAULT NULL,
  `product_category_id` int(11) NOT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (13,'Caudalímetro magneto-inductivo SM6020','Medición precisa del caudal, del consumo y de la temperatura de los fluidos.\r\nPrecisión, reproducibilidad y dinámica de medición elevadas.\r\nCon salida de conmutación, analógica y de impulsos.\r\nPantalla a color de fácil lectura con indicación variable en rojo y verde.\r\nNo se requieren tramos de entrada y salida.','/assets/images/uploads/image-1662562438545.jpg',134652,0,2),(14,'Detector de caudal ultrasónico SU7000','Medición precisa del caudal, del consumo y de la temperatura de los fluidos.\r\nIdeal para agua, aceites y soluciones de glicol.\r\nPara el montaje en tuberías.\r\nCon salida de conmutación, analógica y de impulsos.\r\nPantalla con LED de 4 dígitos de fácil lectura.    ','/assets/images/uploads/image-1662562934030.jpg',168300,5,2),(15,'Caudalímetro vortex SV7150','Con medición de temperatura integrada.\r\nCompatible con agua con y sin conductividad (agua desionizada).\r\nPuesta en marcha rápida y sencilla.\r\nDiseño compacto para el montaje espacios reducidos.        ','/assets/images/uploads/image-1662563381522.jpg',46500,0,2),(16,'Contador de aire comprimido SD5500','Medición precisa de caudal, consumo, presión y temperatura del fluido.\nPrecisión, reproducibilidad y dinámica de medición elevadas.\nPara la detección del aire comprimido de servicio\nIndicación alterna en rojo y en verde para marcar de forma inequívoca las zonas buenas.\nAlineación idónea gracias a la posibilidad de rotar la pantalla.            ','/assets/images/uploads/image-1662566588475.png',154000,10,2),(17,'Caudalímetro con válvula de retención SBG232','Detección exacta del caudal y de la temperatura de los fluidos.\r\nIdeal para agua, líquidos refrigerantes, aceites y soluciones de glicol gracias a las curvas de medición integradas.\r\nSeguro anti-retorno con un tiempo de respuesta muy corto.\r\nCon salida de conmutación, analógica y de frecuencia.\r\nPantalla LED de lectura fácil con indicación alterna en rojo y verde.               ','/assets/images/uploads/image-1662567018907.jpg',57449,0,2),(18,'Detector de circulación de fluidos SI6800','Diseño apto para aplicaciones asépticas que cumple los requisitos de la industria alimentaria y de bebidas.\r\nApto para procesos SIP hasta 140 °C.\r\nBarra de LED para indicar el punto de conmutación y el estado del caudal.\r\nAmplio surtido de adaptadores de proceso en los accesorios.\r\nMateriales en contacto con los fluidos de acero inoxidable.                ','/assets/images/uploads/defaultProduct.png',84945,0,2),(19,'Sensor de temperatura TD2231','Diseño apto para aplicaciones asépticas que cumple los requisitos de la industria alimentaria y de bebidas.\r\nDinámica de respuesta muy buena y tiempo de retardo a la disponibilidad muy corto.\r\nPantalla con LED de 4 dígitos de fácil lectura.\r\nPrecisa salida analógica y comunicación cómoda a través de IO-Link.\r\nGrado de protección elevado y alta resistencia a la presión.                ','/assets/images/uploads/image-1662567519985.png',43639,0,1),(20,'Sensor de temperatura TA3597','Resistente y compatible con aplicaciones asépticas.\r\nDiseño especialmente compacto.\r\nSellado seguro durante el proceso.\r\nAdaptadores para todas las conexiones de proceso habituales.\r\n                ','/assets/images/uploads/image-1662567729564.png',38735,5,1),(21,'Sensor de temperatura con cable y conexión de proc','Medición precisa de la temperatura en depósitos, tanques y tuberías.\r\nPara la conexión a una unidad de evaluación.\r\nAdaptación sencilla al proceso a través de racor para varilla a presión o tubo de protección.\r\nElevada precisión en todo el rango de medición de temperatura.\r\nConexión sencilla y absolutamente estanca mediante conexión M12.         ','/assets/images/uploads/image-1662568016819.png',16442,0,1),(22,'Sensor de temperatura por infrarrojo TW2100','Medición fiable y sin contacto de la temperatura de objetos con temperaturas muy altas\r\nPara aplicaciones en la industria del acero y del vidrio.\r\nAjuste intuitivo de la salida analógica y de la salida de conmutación pulsando un botón.\r\nPantalla de fácil lectura para ver la temperatura actual.\r\nRobusta carcasa y lente de precisión a prueba de arañazos para el uso en entornos industriales muy exigentes.\r\nPiloto LED para la orientación y el control.                ','/assets/images/uploads/image-1662568294076.png',334000,15,1),(23,'Sensor de temperatura con conexión de proceso TM41','Medición precisa de la temperatura en depósitos, tanques y tuberías.\r\nPara la conexión a una unidad de evaluación.\r\nTiempo de respuesta muy corto para el uso en procesos con cambios rápidos de temperatura.\r\nRobusta carcasa de acero inoxidable con un grado de protección alto y elevada resistencia a la presión.\r\nNumerosas posibilidades de conexión al proceso mediante adaptadores.                ','/assets/images/uploads/image-1662568509301.png',19140,0,1),(24,'Sensor de presión con membrana aflorante PG2794','Indicador analógico, presostato y transmisor de presión en un equipo\r\nLectura muy fácil también desde una gran distancia\r\nPantalla giratoria con barra de LED para indicar los puntos de conmutación\r\nRobusta carcasa de acero inoxidable apta para aplicaciones asépticas que cumple los requisitos de la industria alimentaria y de bebidas\r\nConexión de proceso rasante para el uso en procesos CIP y SIP.                ','/assets/images/uploads/image-1662569479492.png',118331,0,4),(25,'Sensor de presión con ajuste del punto de conmutac','Ajuste sencillo de punto de conmutación mediante dos anillos de ajuste de lectura óptima.\r\nElevada estabilidad a largo plazo gracias a una robusta célula de medición de acero inoxidable con resistencia a la presión alta y fiable.\r\nEl bloqueo mecánico evita una modificación accidental de los ajustes.\r\nPrevisión de vida útil de más de 50 millones de ciclos de presión.\r\nPara el uso en sistemas hidráulicos, neumáticos, de climatización y refrigeración.                ','/assets/images/uploads/image-1662569671549.png',20047,20,4),(26,'Sonda de nivel hidrostática PS3208','Medición del nivel hidrostático económica y sencilla.\r\nCompensación de presión mediante cable con ventilación interna.\r\nCableado menos complejo en caso de funcionamiento como bucle de corriente de dos hilos.\r\nElevada precisión total y estabilidad a largo plazo.\r\nRobusta carcasa de acero inoxidable muy estanca.                ','/assets/images/uploads/image-1662569801283.png',94620,0,4),(27,'Sensor de presión PT0505','Medición precisa de presiones absolutas independientemente de la presión del aire ambiental.\r\nPara el uso en aplicaciones con una regulación de la presión especialmente precisa.\r\nRobusta carcasa de acero inoxidable muy resistente a choques y vibraciones.\r\nDiseño compacto para aplicaciones con un reducido espacio de instalación.\r\nEstabilidad a largo plazo gracias a la elevada precisión de repetición y al desvío escaso con respecto a la línea característica.                ','/assets/images/uploads/image-1662570482049.png',25104,0,4),(28,'Sensor de presión para neumática PQ7834','Monitorización fiable de la presión del sistema en sistemas neumáticos y en instalaciones de aire comprimido.\r\nResistencia muy alta a la sobrepresión y al vacío\r\nPantalla LED biselada de lectura fácil.\r\nIndicación alterna en rojo y en verde para marcar de forma inequívoca las zonas buenas.\r\nDos salidas de conmutación, una de ellas programable como salida de diagnóstico.                ','/assets/images/uploads/image-1662570687763.png',18738,25,4),(29,'Detector inductivo IFS240','Uso en aplicaciones industriales, móviles, de refrigeración y de lubricación.\r\nAlto grado de protección para las exigencias de entornos industriales agresivos.\r\nUso flexible gracias al amplio rango de temperaturas de servicio.\r\nRegistro seguro gracias a una elevada distancia de conmutación y a tolerancias de sensor reducidas.\r\nReducción del tiempo en almacén gracias al amplio espectro de aplicaciones.                ','/assets/images/uploads/image-1662571643106.png',9947,0,5),(30,'Detector capacitivo KQ6005','Parametrización sencilla mediante IO-Link\r\nFunción de salida NA/NC programable.\r\nIndicación bien visible del estado de conmutación mediante LED.\r\nMontaje sencillo mediante un adaptador de montaje y de cintas de fijación.\r\nPara detección de posición o para supervisión del nivel.                ','/assets/images/uploads/image-1662571864714.png',11645,30,5),(31,'Detector de velocidad MX5050','Detección sin contacto de ruedas dentadas metálicas.\r\nPara frecuencias de conmutación muy elevadas de hasta 15.000 Hz.\r\nDetección exacta de la rueda dentada.\r\nAmplio rango de temperatura de funcionamiento.\r\nMontaje rápido mediante tecnología de bridas.                ','/assets/images/uploads/image-1662571996861.png',12705,0,5),(32,'Rosemount™ 928 Wireless Gas Monitor','H2S: rango del nivel de concentración de gas 0-100 ppm\r\nAgotamiento de O2: nivel de concentración de gas 0-25 % por volumen\r\nCO: rango de nivel de concentración de gas 0-1 000 ppm                ','/assets/images/uploads/image-1662573028622.png',185698,15,3),(33,'Rosemount™ 975HR Detector de llama de hidrógeno in','Diseño multiespectro para la detección de llamas de hidrocarburos e hidrógeno con alta inmunidad a las alarmas falsas.\r\nSeis niveles de sensibilidad para asegurarse de que no se produzcan detecciones en el cruce de zonas.\r\nRespuesta a alta velocidad hasta 50 ms (exp./1 s)                ','/assets/images/uploads/image-1662573318073.png',197500,0,3);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products_users`
--

DROP TABLE IF EXISTS `products_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `products_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products_users`
--

LOCK TABLES `products_users` WRITE;
/*!40000 ALTER TABLE `products_users` DISABLE KEYS */;
/*!40000 ALTER TABLE `products_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `avatar` varchar(100) DEFAULT NULL,
  `is_admin` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (11,'Optimus','optimus@essensor.com','$2a$10$sDcl5XNtYCR/UEgnT.h0DeHqZCpndBxQ85KetxVV4yz5yaCQD/cEy','/assets/images/avatars/image-1662648114112.png',0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-09-08 13:29:33
