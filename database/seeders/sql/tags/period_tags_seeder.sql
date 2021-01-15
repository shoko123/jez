INSERT INTO `tag_types` (`str_id`, `name_major`, `name_minor`, `display_name`, `multiple`, `order_column`, `dependency`) VALUES 

('Periods:Base-Type','Period','Base-Type','Periods (Top-Level)',1,1,NULL),

/*('Periods:Paleolithic'*/
/*('Periods:Epipaleolithic'*/

('Periods:Neolithic','Period','Neolithic','Neolithic Subperiods',1,4,
    '{"source": "Tag", "tag_type_str_id": "Periods:Base-Type", "id": "10300", "tag_name": "Neolithic"}'),

/*('Periods:Chalcolithic',*/

('Periods:Bronze','Period','Bronze','Bronze Subperiods',1,6,
    '{"source": "Tag", "tag_type_str_id": "Periods:Base-Type", "id": "10500", "tag_name": "Bronze"}'),

('Periods:Iron','Period','Iron','Iron Subperiods',1,7,
    '{"source": "Tag", "tag_type_str_id": "Periods:Base-Type", "id": "10600", "tag_name": "Iron"}'),

/*('Periods:Persian','Period',*/

('Periods:Hellenistic','Period','Hellenistic','Hellenistic Subperiods',1,9,
    '{"source": "Tag", "tag_type_str_id": "Periods:Base-Type", "id": "10800", "tag_name": "Hellenistic"}'),

('Periods:Roman','Period','Roman','Roman Subperiods',1,10,
    '{"source": "Tag", "tag_type_str_id": "Periods:Base-Type", "id": "10900", "tag_name": "Roman"}'),

/*('Periods:Byzantine'*/

('Periods:Early-Islamic','Period','Early-Islamic','Early-Islamic Subperiods',1,12,
    '{"source": "Tag", "tag_type_str_id": "Periods:Base-Type", "id": "11100", "tag_name": "Early Islamic"}'),

('Periods:Medieval','Period','Medieval','Medieval Subperiods',1,13,
    '{"source": "Tag", "tag_type_str_id": "Periods:Base-Type", "id": "11200", "tag_name": "Medieval"}'),

/*('Periods:Ottoman'*/

('Periods:Modern','Period','Modern','Modern Subperiods',1,15,
    '{"source": "Tag", "tag_type_str_id": "Periods:Base-Type", "id": "11400", "tag_name": "Modern"}');









INSERT INTO `tags` (`id`, `type`, `tag_type_id`, `order_column`, `name`, `slug`, `created_at`, `updated_at`) VALUES 
(10100,'Periods:Base-Type',NULL,1,'{"en": "Paleolithic"}','{"en": "Paleolithic"}',NULL,NULL),
(10200,'Periods:Base-Type',NULL,2,'{"en": "Epipaleolithic"}','{"en": "Epipaleolithic"}',NULL,NULL),
(10300,'Periods:Base-Type',NULL,3,'{"en": "Neolithic"}','{"en": "Neolithic"}',NULL,NULL),
(10400,'Periods:Base-Type',NULL,4,'{"en": "Chalcolithic"}','{"en": "Chalcolithic"}',NULL,NULL),
(10500,'Periods:Base-Type',NULL,5,'{"en": "Bronze"}','{"en": "Bronze"}',NULL,NULL),
(10600,'Periods:Base-Type',NULL,6,'{"en": "Iron"}','{"en": "Iron"}',NULL,NULL),
(10700,'Periods:Base-Type',NULL,7,'{"en": "Persian"}','{"en": "Persian"}',NULL,NULL),
(10800,'Periods:Base-Type',NULL,8,'{"en": "Hellenistic"}','{"en": "Hellenistic"}',NULL,NULL),
(10900,'Periods:Base-Type',NULL,9,'{"en": "Roman"}','{"en": "Roman"}',NULL,NULL),
(11000,'Periods:Base-Type',NULL,10,'{"en": "Byzantine"}','{"en": "Byzantine"}',NULL,NULL),
(11100,'Periods:Base-Type',NULL,11,'{"en": "Early Islamic"}','{"en": "Early Islamic"}',NULL,NULL),
(11200,'Periods:Base-Type',NULL,12,'{"en": "Medieval"}','{"en": "Medieval"}',NULL,NULL),
(11300,'Periods:Base-Type',NULL,13,'{"en": "Ottoman"}','{"en": "Ottoman"}',NULL,NULL),
(11400,'Periods:Base-Type',NULL,14,'{"en": "Modern"}','{"en": "Modern"}',NULL,NULL),

(10311,'Periods:Neolithic',NULL,1,'{"en": "PPNA"}','{"en": "PPNA"}',NULL,NULL),
(10312,'Periods:Neolithic',NULL,2,'{"en": "PPNB"}','{"en": "PPNB"}',NULL,NULL),
(10313,'Periods:Neolithic',NULL,3,'{"en": "PPNC"}','{"en": "PPNC"}',NULL,NULL),
(10314,'Periods:Neolithic',NULL,4,'{"en": "Pottery Neolithic"}','{"en": "Pottery Neolithic"}',NULL,NULL),
(10315,'Periods:Neolithic',NULL,5,'{"en": "Yarmukian"}','{"en": "Yarmukian"}',NULL,NULL),
(10316,'Periods:Neolithic',NULL,6,'{"en": "Wadi Rabah"}','{"en": "Wadi Rabah"}',NULL,NULL),

(10511,'Periods:Bronze',NULL,1,'{"en": "EB"}','{"en": "EB"}',NULL,NULL),
(10512,'Periods:Bronze',NULL,2,'{"en": "EB I"}','{"en": "EB I"}',NULL,NULL),
(10513,'Periods:Bronze',NULL,3,'{"en": "EB II"}','{"en": "EB II"}',NULL,NULL),
(10514,'Periods:Bronze',NULL,4,'{"en": "EB III"}','{"en": "EB III"}',NULL,NULL),
(10515,'Periods:Bronze',NULL,5,'{"en": "IB"}','{"en": "IB"}',NULL,NULL),
(10516,'Periods:Bronze',NULL,6,'{"en": "MB"}','{"en": "MB"}',NULL,NULL),
(10518,'Periods:Bronze',NULL,8,'{"en": "MB IIA"}','{"en": "MB IIA"}',NULL,NULL),
(10519,'Periods:Bronze',NULL,9,'{"en": "MB IIB"}','{"en": "MB IIB"}',NULL,NULL),
(10520,'Periods:Bronze',NULL,10,'{"en": "MB IIC"}','{"en": "MB IIC"}',NULL,NULL),
(10521,'Periods:Bronze',NULL,11,'{"en": "LB"}','{"en": "LB"}',NULL,NULL),
(10522,'Periods:Bronze',NULL,12,'{"en": "LB I"}','{"en": "LB I"}',NULL,NULL),
(10523,'Periods:Bronze',NULL,13,'{"en": "LB IIA"}','{"en": "LB IIA"}',NULL,NULL),
(10524,'Periods:Bronze',NULL,14,'{"en": "LB IIB"}','{"en": "LB IIB"}',NULL,NULL),

(10611,'Periods:Iron',NULL,1,'{"en": "Ir"}','{"en": "Ir"}',NULL,NULL),
(10612,'Periods:Iron',NULL,2,'{"en": "Ir IA"}','{"en": "Ir IA"}',NULL,NULL),
(10613,'Periods:Iron',NULL,3,'{"en": "Ir IB"}','{"en": "Ir IB"}',NULL,NULL),
(10614,'Periods:Iron',NULL,4,'{"en": "Ir IIA"}','{"en": "Ir IIA"}',NULL,NULL),
(10615,'Periods:Iron',NULL,5,'{"en": "Ir IIB"}','{"en": "Ir IIB"}',NULL,NULL),
(10616,'Periods:Iron',NULL,6,'{"en": "Ir IIC"}','{"en": "Ir IIC"}',NULL,NULL),

(10811,'Periods:Hellenistic',NULL,1,'{"en": "Early Hellenistic"}','{"en": "Hellenistic"}',NULL,NULL),
(10812,'Periods:Hellenistic',NULL,2,'{"en": "Late Hellenistic"}','{"en": "Late Hellenistic"}',NULL,NULL),

(10911,'Periods:Roman',NULL,1,'{"en": "Early Roman"}','{"en": "Early Roman"}',NULL,NULL),
(10912,'Periods:Roman',NULL,2,'{"en": "Herodian"}','{"en": "Herodian"}',NULL,NULL),
(10913,'Periods:Roman',NULL,3,'{"en": "Middle Roman"}','{"en": "Middle Roman"}',NULL,NULL),
(10914,'Periods:Roman',NULL,4,'{"en": "Late Roman"}','{"en": "Late Roman"}',NULL,NULL),

(11111,'Periods:Early-Islamic',NULL,1,'{"en": "Umayyad"}','{"en": "Umayyad"}',NULL,NULL),
(11112,'Periods:Early-Islamic',NULL,2,'{"en": "Abbasid"}','{"en": "Abbasid"}',NULL,NULL),
(11113,'Periods:Early-Islamic',NULL,3,'{"en": "Fatimid"}','{"en": "Fatimid"}',NULL,NULL),

(11213,'Periods:Medieval',NULL,1,'{"en": "Crusader"}','{"en": "Crusader"}',NULL,NULL),
(11214,'Periods:Medieval',NULL,2,'{"en": "Ayyubid"}','{"en": "Ayyubid"}',NULL,NULL),
(11215,'Periods:Medieval',NULL,3,'{"en": "Mamluk"}','{"en": "Mamluk"}',NULL,NULL),

(11411,'Periods:Modern',NULL,1,'{"en": "1917-1948"}','{"en": "1917-1948"}',NULL,NULL),
(11412,'Periods:Modern',NULL,2,'{"en": "1949-present"}','{"en": "1949-present"}',NULL,NULL);