INSERT INTO `pottery_base_types` (`id`, `name`) VALUES
(1,'Unassigned'),
(2,'Vessel'),
(3,'Non-Vessel'),
(4,'Plastic Form'),
(5,'Building Material'),
(6,'Ceramic Production/Waste'),
(7,'Miscellenia');

INSERT INTO `tag_types` (`str_id`, `subject`, `category`, `category_order`, `group_order`, `display_name`, `multiple`, `dependency`) VALUES 

/*registration comes here 1.1,2... */
/*periods come here 2.1,2...)*/

('Pottery:Named-Groups-I','Pottery','Group(s)',3,1,'Named Groups I',1,
'[["T>Periods:Top-Level>10300", "T>Periods:Top-Level>10400", "T>Periods:Top-Level>10500", "T>Periods:Top-Level>10600", "T>Periods:Top-Level>10700"]]'),

('Pottery:Named-Groups-II','Pottery','Group(s)',3,2,'Named Groups II',1,
'[["T>Periods:Top-Level>10800", "T>Periods:Top-Level>10900", "T>Periods:Top-Level>11000"]]'),

('Pottery:Named-Groups-III','Pottery','Group(s)',3,3,'Named Groups III',1,
'[["T>Periods:Top-Level>11100", "T>Periods:Top-Level>11200", "T>Periods:Top-Level>11300", "T>Periods:Top-Level>11400"]]'),

('Pottery:Ware-Type','Pottery','Ware', 4, 1,'Type',1,NULL),
('Pottery:Ware-Color','Pottery','Ware', 4, 2, 'Color',1 ,NULL),
('Pottery:Ware-Temper','Pottery','Ware',4,3, 'Temper',1,NULL),

/*preservation comes here 5.1 (preservation_id)*/
('Pottery:Life-Stage','Pottery','Characteristics',5,2,'Life Stage',1,NULL),
('Pottery:Production','Pottery','Characteristics',5,3,'Production',1,NULL),




/*('Pottery:Chalcolithic-Groups','Pottery','Group(s)',5,1,'Chalcolithic',1,NULL),
('Pottery:Bronze-Groups','Pottery','Group(s)',5,2,'Bronze',1,'[["T>Periods:Top-Level>10500"]]'),
('Pottery:Iron-Groups','Pottery','Group(s)',5,3,'Iron',1,'[["T>Periods:Top-Level>10600"]]'),*/



/*base partition comes here 8.1 (base_type_id)*/


('Pottery:Vessel-Part','Pottery','Typology',11,2,'Vessel Part',1,
'[["L>base_type_id>2"]]'),

('Pottery:Base-Type','Pottery','Typology',11,3,'Base',1,
'[["T>Pottery:Vessel-Part>1091"]]'),

('Pottery:Foot-Type','Pottery','Typology',11,4,'Foot',1,
'[["T>Pottery:Vessel-Part>1092"]]'),

('Pottery:Rim-Type','Pottery','Typology',11,5,'Rim',1,
'[["T>Pottery:Vessel-Part>1096"]]'),

('Pottery:Handle','Pottery','Typology',11,6,'Handle',1,
'[["T>Pottery:Vessel-Part>1098"]]'),

('Pottery:Vessel-Shape-Partition','Pottery','Typology',12,1,'Vessel Shape Partition',1,
'[["L>base_type_id>2"]]'),

('Pottery:Vessel-Open-Types','Pottery','Typology',12,2,'Open Types',1,
'[["T>Pottery:Vessel-Shape-Partition>1060"]]'),

('Pottery:Vessel-Closed-Types','Pottery','Typology',12,3,'Closed Types',1,
'[["T>Pottery:Vessel-Shape-Partition>1061"]]'),

('Pottery:Non-Vessel-Typology','Pottery','Typology',12,7,'Non-Vessel Typology',1,
'[["L>base_type_id>3"]]'),






/*STF = Surface-Treatment-Flat*/
('Pottery:STF','Pottery','Surface-Treatment',20,1,'Surface Application',1,
'[["L>base_type_id>2", "L>base_type_id>3"]]'),

('Pottery:STF-Slip-Color','Pottery','Surface-Treatment',20,2,'Slip Color',1,
'[["T>Pottery:STF>1202"]]'),

('Pottery:STF-Slip-Pattern','Pottery','Surface-Treatment',20,3,'Slip Pattern',1,
'[["T>Pottery:STF>1202"]]'),

('Pottery:STF-Paint-Color','Pottery','Surface-Treatment',20,4,'Paint Color',1,
'[["T>Pottery:STF>1204"]]'),

('Pottery:STF-Paint-Pattern','Pottery','Surface-Treatment',20,5,'Paint Pattern',1,
'[["T>Pottery:STF>1204"]]'),

('Pottery:STF-Paint-Motifs','Pottery','Surface-Treatment',20,6,'Paint Motifs',1,
'[["T>Pottery:STF-Paint-Pattern>1225", "T>Pottery:STF-Paint-Pattern>1226"]]'),


('Pottery:ST-Reductive','Pottery','Surface-Treatment',20,21,'Reductive',1,
'[["L>base_type_id>2", "L>base_type_id>3"]]'),

('Pottery:ST-Additive','Pottery','Surface-Treatment',20,31,'Additive',1,
'[["L>base_type_id>2", "L>base_type_id>3"]]');


INSERT INTO `tags` (`id`, `type`, `order_column`, `name`, `created_at`, `updated_at`, `slug`) VALUES
(1005,'Pottery:Ware-Type',1,'{"en": "Fine"}',NULL,NULL,'{"en": ""}'),
(1006,'Pottery:Ware-Type',1,'{"en": "Coarse"}',NULL,NULL,'{"en": ""}'),
(1010,'Pottery:Ware-Color',1,'{"en": "Grey"}',NULL,NULL,'{"en": ""}'),
(1011,'Pottery:Ware-Color',2,'{"en": "Brown"}',NULL,NULL,'{"en": ""}'),
(1012,'Pottery:Ware-Color',3,'{"en": "Yellow"}',NULL,NULL,'{"en": ""}'),
(1013,'Pottery:Ware-Color',4,'{"en": "Red"}',NULL,NULL,'{"en": ""}'),
(1014,'Pottery:Ware-Color',5,'{"en": "Black"}',NULL,NULL,'{"en": ""}'),
(1015,'Pottery:Ware-Color',6,'{"en": "Grey"}',NULL,NULL,'{"en": ""}'),
(1016,'Pottery:Ware-Temper',1,'{"en": "Plant-Fiber"}',NULL,NULL,'{"en": ""}'),
(1017,'Pottery:Ware-Temper',1,'{"en": "Sand"}',NULL,NULL,'{"en": ""}'),
(1018,'Pottery:Ware-Temper',1,'{"en": "Limestone"}',NULL,NULL,'{"en": ""}'),
(1019,'Pottery:Ware-Temper',1,'{"en": "Charcoal"}',NULL,NULL,'{"en": ""}'),
(1021,'Pottery:Life-Stage',1,'{"en": "Unfired"}',NULL,NULL,'{"en": ""}'),
(1023,'Pottery:Life-Stage',3,'{"en": "Reworked Sherd"}',NULL,NULL,'{"en": ""}'),
(1024,'Pottery:Life-Stage',4,'{"en": "Fire Exposure Evidence"}',NULL,NULL,'{"en": ""}'),
(1031,'Pottery:Production',1,'{"en": "Wheel"}',NULL,NULL,'{"en": ""}'),
(1032,'Pottery:Production',2,'{"en": "Coil"}',NULL,NULL,'{"en": ""}'),
(1033,'Pottery:Production',3,'{"en": "Slab"}',NULL,NULL,'{"en": ""}'),
(1034,'Pottery:Production',3,'{"en": "Mold Technique"}',NULL,NULL,'{"en": ""}'),
(1035,'Pottery:Production',4,'{"en": "Mat Marks"}',NULL,NULL,'{"en": ""}'),
(1051,'Pottery:Non-Vessel-Typology',1,'{"en": "Funnel"}',NULL,NULL,'{"en": ""}'),
(1052,'Pottery:Non-Vessel-Typology',2,'{"en": "Baking Tray"}',NULL,NULL,'{"en": ""}'),
(1053,'Pottery:Non-Vessel-Typology',3,'{"en": "Strainer"}',NULL,NULL,'{"en": ""}'),
(1054,'Pottery:Non-Vessel-Typology',4,'{"en": "Stand"}',NULL,NULL,'{"en": ""}'),
(1055,'Pottery:Non-Vessel-Typology',5,'{"en": "Lamp"}',NULL,NULL,'{"en": ""}'),
(1056,'Pottery:Non-Vessel-Typology',6,'{"en": "Cup and Saucer"}',NULL,NULL,'{"en": ""}'),
(1057,'Pottery:Non-Vessel-Typology',7,'{"en": "Pipe"}',NULL,NULL,'{"en": ""}'),
(1058,'Pottery:Non-Vessel-Typology',8,'{"en": "Lid"}',NULL,NULL,'{"en": ""}'),
(1060,'Pottery:Vessel-Shape-Partition',1,'{"en": "Open Shape"}',NULL,NULL,'{"en": ""}'),
(1061,'Pottery:Vessel-Shape-Partition',2,'{"en": "Close Shape"}',NULL,NULL,'{"en": ""}'),
(1062,'Pottery:Vessel-Shape-Partition',3,'{"en": "miscellanea"}',NULL,NULL,'{"en": ""}'),
(1070,'Pottery:Vessel-Open-Types',1,'{"en": "Bowl"}',NULL,NULL,'{"en": ""}'),
(1071,'Pottery:Vessel-Open-Types',2,'{"en": "Krater"}',NULL,NULL,'{"en": ""}'),
(1072,'Pottery:Vessel-Open-Types',3,'{"en": "Chalice"}',NULL,NULL,'{"en": ""}'),
(1073,'Pottery:Vessel-Open-Types',4,'{"en": "Goblet"}',NULL,NULL,'{"en": ""}'),
(1074,'Pottery:Vessel-Open-Types',5,'{"en": "Pot"}',NULL,NULL,'{"en": ""}'),
(1075,'Pottery:Vessel-Open-Types',7,'{"en": "Pithos"}',NULL,NULL,'{"en": ""}'),
(1076,'Pottery:Vessel-Open-Types',8,'{"en": "Storage Jar"}',NULL,NULL,'{"en": ""}'),
(1082,'Pottery:Vessel-Closed-Types',9,'{"en": "Amphora"}',NULL,NULL,'{"en": ""}'),
(1083,'Pottery:Vessel-Closed-Types',10,'{"en": "Jug"}',NULL,NULL,'{"en": ""}'),
(1084,'Pottery:Vessel-Closed-Types',11,'{"en": "Juglet"}',NULL,NULL,'{"en": ""}'),
(1085,'Pottery:Vessel-Closed-Types',12,'{"en": "Bottle"}',NULL,NULL,'{"en": ""}'),
(1086,'Pottery:Vessel-Closed-Types',13,'{"en": "Jar"}',NULL,NULL,'{"en": ""}'),
(1091,'Pottery:Vessel-Part',1,'{"en": "Base"}',NULL,NULL,'{"en": ""}'),
(1092,'Pottery:Vessel-Part',2,'{"en": "Foot"}',NULL,NULL,'{"en": ""}'),
(1093,'Pottery:Vessel-Part',3,'{"en": "Wall"}',NULL,NULL,'{"en": ""}'),
(1094,'Pottery:Vessel-Part',4,'{"en": "Body"}',NULL,NULL,'{"en": ""}'),
(1095,'Pottery:Vessel-Part',5,'{"en": "Neck"}',NULL,NULL,'{"en": ""}'),
(1096,'Pottery:Vessel-Part',6,'{"en": "Rim"}',NULL,NULL,'{"en": ""}'),
(1097,'Pottery:Vessel-Part',7,'{"en": "Spout"}',NULL,NULL,'{"en": ""}'),
(1098,'Pottery:Vessel-Part',8,'{"en": "Handle"}',NULL,NULL,'{"en": ""}'),
(1101,'Pottery:Base-Type',1,'{"en": "Flat"}',NULL,NULL,'{"en": ""}'),
(1102,'Pottery:Base-Type',2,'{"en": "Ring"}',NULL,NULL,'{"en": ""}'),
(1103,'Pottery:Base-Type',3,'{"en": "Disc"}',NULL,NULL,'{"en": ""}'),
(1104,'Pottery:Base-Type',4,'{"en": "Rounded"}',NULL,NULL,'{"en": ""}'),
(1110,'Pottery:Foot-Type',1,'{"en": "Fenstrated"}',NULL,NULL,'{"en": ""}'),
(1111,'Pottery:Foot-Type',2,'{"en": "Unusual"}',NULL,NULL,'{"en": ""}'),
(1121,'Pottery:Rim-Type',1,'{"en": "Straight"}',NULL,NULL,'{"en": ""}'),
(1122,'Pottery:Rim-Type',2,'{"en": "Everted"}',NULL,NULL,'{"en": ""}'),
(1123,'Pottery:Rim-Type',3,'{"en": "Inverted"}',NULL,NULL,'{"en": ""}'),
(1124,'Pottery:Rim-Type',4,'{"en": "Carinated"}',NULL,NULL,'{"en": ""}'),
(1151,'Pottery:Handle',1,'{"en": "Lug"}',NULL,NULL,'{"en": ""}'),
(1152,'Pottery:Handle',2,'{"en": "Straight"}',NULL,NULL,'{"en": ""}'),
(1153,'Pottery:Handle',3,'{"en": "Loop"}',NULL,NULL,'{"en": ""}'),
(1154,'Pottery:Handle',2,'{"en": "Ledge - indented"}',NULL,NULL,'{"en": ""}'),
(1157,'Pottery:Handle',4,'{"en": "Horizontal"}',NULL,NULL,'{"en": ""}'),
(1158,'Pottery:Handle',5,'{"en": "Vertical"}',NULL,NULL,'{"en": ""}'),
(1159,'Pottery:Handle',6,'{"en": "Perforation"}',NULL,NULL,'{"en": ""}'),
(1201,'Pottery:STF',1,'{"en": "Burnish"}',NULL,NULL,'{"en": ""}'),
(1202,'Pottery:STF',2,'{"en": "Slip"}',NULL,NULL,'{"en": ""}'),
(1204,'Pottery:STF',4,'{"en": "Paint"}',NULL,NULL,'{"en": ""}'),
(1205,'Pottery:STF',5,'{"en": "Glaze"}',NULL,NULL,'{"en": ""}'),

(1210,'Pottery:STF-Slip-Color',1,'{"en": "Red"}',NULL,NULL,'{"en": ""}'),
(1211,'Pottery:STF-Slip-Color',2,'{"en": "Black"}',NULL,NULL,'{"en": ""}'),
(1212,'Pottery:STF-Slip-Color',3,'{"en": "White"}',NULL,NULL,'{"en": ""}'),
(1213,'Pottery:STF-Slip-Color',4,'{"en": "Brown"}',NULL,NULL,'{"en": ""}'),
(1214,'Pottery:STF-Slip-Color',5,'{"en": "Yellow"}',NULL,NULL,'{"en": ""}'),
(1215,'Pottery:STF-Slip-Color',6,'{"en": "Grey"}',NULL,NULL,'{"en": ""}'),

(1251,'Pottery:STF-Slip-Pattern',1,'{"en": "Full Coverage"}',NULL,NULL,'{"en": ""}'),
(1252,'Pottery:STF-Slip-Pattern',2,'{"en": "Bands"}',NULL,NULL,'{"en": ""}'),
(1253,'Pottery:STF-Slip-Pattern',3,'{"en": "Circles"}',NULL,NULL,'{"en": ""}'),
(1254,'Pottery:STF-Slip-Pattern',4,'{"en": "Lines"}',NULL,NULL,'{"en": ""}'),

(1311,'Pottery:STF-Paint-Color',1,'{"en": "Red"}',NULL,NULL,'{"en": ""}'),
(1312,'Pottery:STF-Paint-Color',2,'{"en": "Black"}',NULL,NULL,'{"en": ""}'),
(1313,'Pottery:STF-Paint-Color',3,'{"en": "White"}',NULL,NULL,'{"en": ""}'),
(1314,'Pottery:STF-Paint-Color',4,'{"en": "Brown"}',NULL,NULL,'{"en": ""}'),
(1315,'Pottery:STF-Paint-Color',5,'{"en": "Yellow"}',NULL,NULL,'{"en": ""}'),
(1316,'Pottery:STF-Paint-Color',6,'{"en": "Grey"}',NULL,NULL,'{"en": ""}'),
(1317,'Pottery:STF-Paint-Color',7,'{"en": "Blue"}',NULL,NULL,'{"en": ""}'),

(1221,'Pottery:STF-Paint-Pattern',1,'{"en": "Full Coverage"}',NULL,NULL,'{"en": ""}'),
(1222,'Pottery:STF-Paint-Pattern',2,'{"en": "Bands"}',NULL,NULL,'{"en": ""}'),
(1223,'Pottery:STF-Paint-Pattern',3,'{"en": "Circles"}',NULL,NULL,'{"en": ""}'),
(1224,'Pottery:STF-Paint-Pattern',4,'{"en": "Lines"}',NULL,NULL,'{"en": ""}'),
(1225,'Pottery:STF-Paint-Pattern',5,'{"en": "Geometric"}',NULL,NULL,'{"en": ""}'),
(1226,'Pottery:STF-Paint-Pattern',6,'{"en": "Free"}',NULL,NULL,'{"en": ""}'),

(1271,'Pottery:STF-Paint-Motifs',1,'{"en": "Ladders"}',NULL,NULL,'{"en": ""}'),
(1272,'Pottery:STF-Paint-Motifs',2,'{"en": "Wines"}',NULL,NULL,'{"en": ""}'),
(1273,'Pottery:STF-Paint-Motifs',3,'{"en": "Nautical"}',NULL,NULL,'{"en": ""}'),
(1274,'Pottery:STF-Paint-Motifs',4,'{"en": "Ducks on Parade"}',NULL,NULL,'{"en": ""}'),
(1275,'Pottery:STF-Paint-Motifs',5,'{"en": "Furry Mamals"}',NULL,NULL,'{"en": ""}'),
(1276,'Pottery:STF-Paint-Motifs',6,'{"en": "Abstract"}',NULL,NULL,'{"en": ""}'),




(1431,'Pottery:ST-Reductive',1,'{"en": "Incision"}',NULL,NULL,'{"en": ""}'),
(1432,'Pottery:ST-Reductive',2,'{"en": "Combing"}',NULL,NULL,'{"en": ""}'),
(1433,'Pottery:ST-Reductive',3,'{"en": "Impressions"}',NULL,NULL,'{"en": ""}'),
(1434,'Pottery:ST-Reductive',4,'{"en": "Pontil Points"}',NULL,NULL,'{"en": ""}'),
(1441,'Pottery:ST-Additive',1,'{"en": "Knobs"}',NULL,NULL,'{"en": ""}'),
(1442,'Pottery:ST-Additive',2,'{"en": "Broomsticks"}',NULL,NULL,'{"en": ""}'),

(1801,'Pottery:Named-Groups-I',1,'{"en": "Yarmukian"}',NULL,NULL,'{"en": ""}'),
(1802,'Pottery:Named-Groups-I',2,'{"en": "Wadi Raba"}',NULL,NULL,'{"en": ""}'),
(1803,'Pottery:Named-Groups-I',3,'{"en": "Khirbet-Kerak"}',NULL,NULL,'{"en": ""}');