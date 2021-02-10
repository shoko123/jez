INSERT INTO `tag_types` (`str_id`, `subject`, `category`, `category_order`, `group_order`, `display_name`, `multiple`, `dependency`) VALUES 

('Periods:Top-Level','Period','Period',2,1,'Periods (Top-Level)',1,NULL),

('Periods:Neolithic','Period','Period',2,3,'Neolithic Subperiods',1,
'[["T>Periods:Top-Level>10300"]]'),

('Periods:Bronze','Period','Period',2,6,'Bronze Subperiods',1,
'[["T>Periods:Top-Level>10500"]]'),

('Periods:Iron','Period','Period',2,7,'Iron Subperiods',1,
'[["T>Periods:Top-Level>10600"]]'),

('Periods:Hellenistic','Period','Period',2,9,'Hellenistic Subperiods',1,
'[["T>Periods:Top-Level>10800"]]'),

('Periods:Roman','Period','Period',2,10,'Roman Subperiods',1,
'[["T>Periods:Top-Level>10900"]]'),

('Periods:Early-Islamic','Period','Period',2,12,'Early-Islamic Subperiods',1,
'[["T>Periods:Top-Level>11100"]]'),

('Periods:Medieval','Period','Period',2,15,'Medieval Subperiods',1,
'[["T>Periods:Top-Level>11200"]]'),

('Periods:Modern','Period','Period',2,20,'Modern Subperiods',1,
'[["T>Periods:Top-Level>11400"]]');



/*('Periods:Paleolithic'*/
/*('Periods:Epipaleolithic'*/


/*('Periods:Chalcolithic',*/


/*('Periods:Persian','Period',*/



/*('Periods:Byzantine'*/


/*('Periods:Ottoman'*/









INSERT INTO `tags` (`id`, `type`, `order_column`, `name`, `created_at`, `updated_at`, `slug`) VALUES 
(10100,'Periods:Top-Level',1,'{"en": "Paleolithic"}',NULL,NULL,'{"en": "Paleolithic"}'),
(10200,'Periods:Top-Level',2,'{"en": "Epipaleolithic"}',NULL,NULL,'{"en": "Epipaleolithic"}'),
(10300,'Periods:Top-Level',3,'{"en": "Neolithic"}',NULL,NULL,'{"en": "Neolithic"}'),
(10311,'Periods:Neolithic',1,'{"en": "PPNA"}',NULL,NULL,'{"en": "PPNA"}'),
(10312,'Periods:Neolithic',2,'{"en": "PPNB"}',NULL,NULL,'{"en": "PPNB"}'),
(10313,'Periods:Neolithic',3,'{"en": "PPNC"}',NULL,NULL,'{"en": "PPNC"}'),
(10314,'Periods:Neolithic',4,'{"en": "Pottery Neolithic"}',NULL,NULL,'{"en": "Pottery Neolithic"}'),
(10400,'Periods:Top-Level',4,'{"en": "Chalcolithic"}',NULL,NULL,'{"en": "Chalcolithic"}'),
(10500,'Periods:Top-Level',5,'{"en": "Bronze"}',NULL,NULL,'{"en": "Bronze"}'),
(10511,'Periods:Bronze',1,'{"en": "EB"}',NULL,NULL,'{"en": "EB"}'),
(10512,'Periods:Bronze',2,'{"en": "EB I"}',NULL,NULL,'{"en": "EB I"}'),
(10513,'Periods:Bronze',3,'{"en": "EB II"}',NULL,NULL,'{"en": "EB II"}'),
(10514,'Periods:Bronze',4,'{"en": "EB III"}',NULL,NULL,'{"en": "EB III"}'),
(10515,'Periods:Bronze',5,'{"en": "IB"}',NULL,NULL,'{"en": "IB"}'),
(10516,'Periods:Bronze',6,'{"en": "MB"}',NULL,NULL,'{"en": "MB"}'),
(10518,'Periods:Bronze',8,'{"en": "MB IIA"}',NULL,NULL,'{"en": "MB IIA"}'),
(10519,'Periods:Bronze',9,'{"en": "MB IIB"}',NULL,NULL,'{"en": "MB IIB"}'),
(10520,'Periods:Bronze',10,'{"en": "MB IIC"}',NULL,NULL,'{"en": "MB IIC"}'),
(10521,'Periods:Bronze',11,'{"en": "LB"}',NULL,NULL,'{"en": "LB"}'),
(10522,'Periods:Bronze',12,'{"en": "LB I"}',NULL,NULL,'{"en": "LB I"}'),
(10523,'Periods:Bronze',13,'{"en": "LB IIA"}',NULL,NULL,'{"en": "LB IIA"}'),
(10524,'Periods:Bronze',14,'{"en": "LB IIB"}',NULL,NULL,'{"en": "LB IIB"}'),
(10600,'Periods:Top-Level',6,'{"en": "Iron"}',NULL,NULL,'{"en": "Iron"}'),
(10611,'Periods:Iron',1,'{"en": "Ir"}',NULL,NULL,'{"en": "Ir"}'),
(10612,'Periods:Iron',2,'{"en": "Ir IA"}',NULL,NULL,'{"en": "Ir IA"}'),
(10613,'Periods:Iron',3,'{"en": "Ir IB"}',NULL,NULL,'{"en": "Ir IB"}'),
(10614,'Periods:Iron',4,'{"en": "Ir IIA"}',NULL,NULL,'{"en": "Ir IIA"}'),
(10615,'Periods:Iron',5,'{"en": "Ir IIB"}',NULL,NULL,'{"en": "Ir IIB"}'),
(10616,'Periods:Iron',6,'{"en": "Ir IIC"}',NULL,NULL,'{"en": "Ir IIC"}'),
(10700,'Periods:Top-Level',7,'{"en": "Persian"}',NULL,NULL,'{"en": "Persian"}'),
(10800,'Periods:Top-Level',8,'{"en": "Hellenistic"}',NULL,NULL,'{"en": "Hellenistic"}'),
(10811,'Periods:Hellenistic',1,'{"en": "Early Hellenistic"}',NULL,NULL,'{"en": "Hellenistic"}'),
(10812,'Periods:Hellenistic',2,'{"en": "Late Hellenistic"}',NULL,NULL,'{"en": "Late Hellenistic"}'),
(10900,'Periods:Top-Level',9,'{"en": "Roman"}',NULL,NULL,'{"en": "Roman"}'),
(10911,'Periods:Roman',1,'{"en": "Early Roman"}',NULL,NULL,'{"en": "Early Roman"}'),
(10912,'Periods:Roman',2,'{"en": "Herodian"}',NULL,NULL,'{"en": "Herodian"}'),
(10913,'Periods:Roman',3,'{"en": "Middle Roman"}',NULL,NULL,'{"en": "Middle Roman"}'),
(10914,'Periods:Roman',4,'{"en": "Late Roman"}',NULL,NULL,'{"en": "Late Roman"}'),
(11000,'Periods:Top-Level',10,'{"en": "Byzantine"}',NULL,NULL,'{"en": "Byzantine"}'),
(11100,'Periods:Top-Level',11,'{"en": "Early Islamic"}',NULL,NULL,'{"en": "Early Islamic"}'),
(11111,'Periods:Early-Islamic',1,'{"en": "Umayyad"}',NULL,NULL,'{"en": "Umayyad"}'),
(11112,'Periods:Early-Islamic',2,'{"en": "Abbasid"}',NULL,NULL,'{"en": "Abbasid"}'),
(11113,'Periods:Early-Islamic',3,'{"en": "Fatimid"}',NULL,NULL,'{"en": "Fatimid"}'),
(11200,'Periods:Top-Level',12,'{"en": "Medieval"}',NULL,NULL,'{"en": "Medieval"}'),
(11213,'Periods:Medieval',1,'{"en": "Crusader"}',NULL,NULL,'{"en": "Crusader"}'),
(11214,'Periods:Medieval',2,'{"en": "Ayyubid"}',NULL,NULL,'{"en": "Ayyubid"}'),
(11215,'Periods:Medieval',3,'{"en": "Mamluk"}',NULL,NULL,'{"en": "Mamluk"}'),
(11300,'Periods:Top-Level',13,'{"en": "Ottoman"}',NULL,NULL,'{"en": "Ottoman"}'),
(11400,'Periods:Top-Level',14,'{"en": "Modern"}',NULL,NULL,'{"en": "Modern"}'),
(11411,'Periods:Modern',1,'{"en": "1917-1948"}',NULL,NULL,'{"en": "1917-1948"}'),
(11412,'Periods:Modern',2,'{"en": "1949-present"}',NULL,NULL,'{"en": "1949-present"}');