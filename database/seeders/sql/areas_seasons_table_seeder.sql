INSERT INTO `areas` (`id`, `name`, `description`, `notes`) VALUES 
(1,'K','area K','dag a lot'),
(2,'L','area L',NULL),
(3,'M','area M',NULL),
(4,'N','area N',NULL),
(5,'P','area P',NULL),
(6,'Q','area Q',NULL),
(7,'S','areas S',NULL);

INSERT INTO `seasons` (`id`, `season`, `description`, `staff`) VALUES 
(1, 12,'season 2012','2012 staff'),
(2, 13,'season 2013','2013 staff'),
(3, 14,'season 2014','2014 staff'),
(4, 15,'season 2015','2015 staff'),
(5, 16,'season 2016','2016 staff'),
(6, 17,'season 2017','2017 staff'),
(7, 18,'season 2018','2018 staff');


INSERT INTO `areas_seasons` (`id`, `area_id`, `season_id`, `area`, `season`, `tag`, `description`, `summary`) VALUES (1,1,1,'K',12,'12/K',NULL,NULL),(2,2,1,'L',12,'12/L',NULL,NULL),(3,3,1,'M',12,'12/M',NULL,NULL),(4,4,1,'N',12,'12/N',NULL,NULL),(5,5,1,'P',12,'12/P',NULL,NULL),(6,6,1,'Q',12,'12/Q',NULL,NULL),(7,1,2,'K',13,'13/K',NULL,NULL),(8,3,2,'M',13,'13/M',NULL,NULL),(9,5,2,'P',13,'13/P',NULL,NULL),(10,7,2,'S',13,'13/S',NULL,NULL),(11,1,3,'K',14,'14/K',NULL,NULL),(12,5,3,'P',14,'14/P',NULL,NULL),(13,7,3,'S',14,'14/S',NULL,NULL),(14,1,4,'K',15,'15/K',NULL,NULL),(15,7,4,'S',15,'15/S',NULL,NULL),(16,2,5,'L',16,'16/L','Philippe Trench',NULL),(17,6,5,'Q',16,'16/Q','Philippe\"s olive press area',NULL),(18,7,5,'S',16,'16/S','Area S',NULL),(19,7,6,'S',17,'17/S',NULL,NULL),(20,7,7,'S',18,'18/S','Area S',NULL);
