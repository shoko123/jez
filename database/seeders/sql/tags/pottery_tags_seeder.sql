INSERT INTO `pottery_base_types` (`id`, `name`) VALUES
(1,'Unassigned'),
(2,'Vessel'),
(3, 'Lamp'),
(4,'Ceramic Artifact'),
(5,'Architectural/Installation'),
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

('Pottery:Ware-Coarseness','Pottery','Ware', 4, 1,'Ware Coarseness',1,NULL),
('Pottery:Ware-Color','Pottery','Ware', 4, 2, 'Ware Color',1 ,NULL),
('Pottery:Ware-Temper','Pottery','Ware',4,3, 'Ware Temper',1,NULL),
('Pottery:Ware-Grit-Color','Pottery','Ware', 4, 4, 'Grit Color',1 ,NULL),


/*preservation comes here 5.1 (preservation_id)*/
('Pottery:Life-Stage','Pottery','Basic Characteristics',5,2,'Life Stage',1,NULL),
('Pottery:Production','Pottery','Basic Characteristics',5,3,'Production',1,NULL),




/*('Pottery:Chalcolithic-Groups','Pottery','Group(s)',5,1,'Chalcolithic',1,NULL),
('Pottery:Bronze-Groups','Pottery','Group(s)',5,2,'Bronze',1,'[["T>Periods:Top-Level>10500"]]'),
('Pottery:Iron-Groups','Pottery','Group(s)',5,3,'Iron',1,'[["T>Periods:Top-Level>10600"]]'),*/



/*base partition comes here 8.1 (base_type_id)*/


('Pottery:Vessel-Part','Pottery','Typology',11,2,'Vessel Part',1,
'[["L>base_type_id>2"]]'),

('Pottery:Vessel-Base-Type','Pottery','Typology',11,3,'Base',1,
'[["T>Pottery:Vessel-Part>1301"]]'),

('Pottery:Foot-Type','Pottery','Typology',11,4,'Foot',1,
'[["T>Pottery:Vessel-Part>1302"]]'),

('Pottery:Rim-Type','Pottery','Typology',11,5,'Rim',1,
'[["T>Pottery:Vessel-Part>1306"]]'),

('Pottery:Handle','Pottery','Typology',11,6,'Handle',1,
'[["T>Pottery:Vessel-Part>1308"]]'),



('Pottery:Vessel-Shape-Types','Pottery','Typology',12,1,'Vessel Shape Typology',1,
'[["L>base_type_id>2"]]'),


('Pottery:Ceramic-Artifact','Pottery','Typology',12,7,'Ceramic Artifact Typology',1,
'[["L>base_type_id>4"]]'),

('Pottery:Architectural','Pottery','Typology',12,8,'Architectural/Installation Typology',1,
'[["L>base_type_id>5"]]'),





/*STF = Surface-Treatment-Flat*/
('Pottery:STF','Pottery','Surface-Treatment',20,1,'Surface',1,
'[["L>base_type_id>2", "L>base_type_id>4"]]'),

('Pottery:STF-Slip-Color','Pottery','Surface-Treatment',20,2,'Slip Color',1,
'[["T>Pottery:STF>1702"]]'),

('Pottery:STF-Paint-Color','Pottery','Surface-Treatment',20,4,'Paint Color',1,
'[["T>Pottery:STF>1703"]]'),

('Pottery:STF-Paint-Slip-Pattern','Pottery','Surface-Treatment',20,5,'Paint/Slip Pattern',1,
'[["T>Pottery:STF>1702", "T>Pottery:STF>1703"]]'),




('Pottery:ST-Reductive','Pottery','Surface-Treatment',20,21,'Reductive',1,
'[["L>base_type_id>2", "L>base_type_id>4"]]'),

('Pottery:ST-Additive','Pottery','Surface-Treatment',20,31,'Additive',1,
'[["L>base_type_id>2", "L>base_type_id>4"]]');


INSERT INTO `tags` (`id`, `type`, `order_column`, `name`, `created_at`, `updated_at`, `slug`) VALUES
(1005,'Pottery:Ware-Coarseness',1,'{"en": "Fine"}',NULL,NULL,'{"en": ""}'),
(1006,'Pottery:Ware-Coarseness',1,'{"en": "Coarse"}',NULL,NULL,'{"en": ""}'),
(1010,'Pottery:Ware-Color',1,'{"en": "Grey"}',NULL,NULL,'{"en": ""}'),
(1011,'Pottery:Ware-Color',2,'{"en": "Brown"}',NULL,NULL,'{"en": ""}'),
(1012,'Pottery:Ware-Color',3,'{"en": "Yellow"}',NULL,NULL,'{"en": ""}'),
(1013,'Pottery:Ware-Color',4,'{"en": "Red"}',NULL,NULL,'{"en": ""}'),
(1014,'Pottery:Ware-Color',5,'{"en": "Black"}',NULL,NULL,'{"en": ""}'),
(1015,'Pottery:Ware-Color',6,'{"en": "White"}',NULL,NULL,'{"en": ""}'),
(1016,'Pottery:Ware-Temper',1,'{"en": "Plant Fiber"}',NULL,NULL,'{"en": ""}'),
(1017,'Pottery:Ware-Temper',2,'{"en": "Sand"}',NULL,NULL,'{"en": ""}'),
(1018,'Pottery:Ware-Temper',3,'{"en": "Limestone"}',NULL,NULL,'{"en": ""}'),
(1019,'Pottery:Ware-Temper',4,'{"en": "Charcoal"}',NULL,NULL,'{"en": ""}'),
(1020,'Pottery:Ware-Grit-Color',1,'{"en": "White"}',NULL,NULL,'{"en": ""}'),
(1021,'Pottery:Ware-Grit-Color',2,'{"en": "Black"}',NULL,NULL,'{"en": ""}'),
(1022,'Pottery:Ware-Grit-Color',3,'{"en": "Red"}',NULL,NULL,'{"en": ""}'),
(1023,'Pottery:Ware-Grit-Color',4,'{"en": "Silver"}',NULL,NULL,'{"en": ""}'),



(1101,'Pottery:Life-Stage',1,'{"en": "Unfired"}',NULL,NULL,'{"en": ""}'),
(1102,'Pottery:Life-Stage',2,'{"en": "Reworked Sherd"}',NULL,NULL,'{"en": ""}'),
(1103,'Pottery:Life-Stage',3,'{"en": "Fire Exposure Evidence"}',NULL,NULL,'{"en": ""}'),

(1111,'Pottery:Production',1,'{"en": "Wheel"}',NULL,NULL,'{"en": ""}'),
(1112,'Pottery:Production',2,'{"en": "Coil"}',NULL,NULL,'{"en": ""}'),
(1113,'Pottery:Production',3,'{"en": "Slab"}',NULL,NULL,'{"en": ""}'),
(1114,'Pottery:Production',4,'{"en": "Mold Technique"}',NULL,NULL,'{"en": ""}'),
(1115,'Pottery:Production',5,'{"en": "Mat Marks"}',NULL,NULL,'{"en": ""}'),

(1201,'Pottery:Ceramic-Artifact',1,'{"en": "Stand"}',NULL,NULL,'{"en": ""}'),
(1203,'Pottery:Ceramic-Artifact',3,'{"en": "Figurine"}',NULL,NULL,'{"en": ""}'),
(1205,'Pottery:Ceramic-Artifact',5,'{"en": "Lid"}',NULL,NULL,'{"en": ""}'),
(1206,'Pottery:Ceramic-Artifact',6,'{"en": "Bead"}',NULL,NULL,'{"en": ""}'),
(1207,'Pottery:Ceramic-Artifact',7,'{"en": "Pipe"}',NULL,NULL,'{"en": ""}'),
(1208,'Pottery:Ceramic-Artifact',8,'{"en": "Loom weight"}',NULL,NULL,'{"en": ""}'),
(1209,'Pottery:Ceramic-Artifact',9,'{"en": "Andiron"}',NULL,NULL,'{"en": ""}'),

(1250,'Pottery:Architectural',1,'{"en": "Brick"}',NULL,NULL,'{"en": ""}'),
(1251,'Pottery:Architectural',2,'{"en": "Oven"}',NULL,NULL,'{"en": ""}'),
(1252,'Pottery:Architectural',3,'{"en": "Tile"}',NULL,NULL,'{"en": ""}'),
(1253,'Pottery:Architectural',4,'{"en": "Ceramic Installation"}',NULL,NULL,'{"en": ""}'),


(1301,'Pottery:Vessel-Part',1,'{"en": "Base"}',NULL,NULL,'{"en": ""}'),
(1302,'Pottery:Vessel-Part',2,'{"en": "Foot"}',NULL,NULL,'{"en": ""}'),
(1303,'Pottery:Vessel-Part',3,'{"en": "Wall"}',NULL,NULL,'{"en": ""}'),
(1304,'Pottery:Vessel-Part',4,'{"en": "Body"}',NULL,NULL,'{"en": ""}'),
(1305,'Pottery:Vessel-Part',5,'{"en": "Neck"}',NULL,NULL,'{"en": ""}'),
(1306,'Pottery:Vessel-Part',6,'{"en": "Rim"}',NULL,NULL,'{"en": ""}'),
(1307,'Pottery:Vessel-Part',7,'{"en": "Spout"}',NULL,NULL,'{"en": ""}'),
(1308,'Pottery:Vessel-Part',8,'{"en": "Handle"}',NULL,NULL,'{"en": ""}'),
(1351,'Pottery:Vessel-Base-Type',1,'{"en": "Flat"}',NULL,NULL,'{"en": ""}'),
(1352,'Pottery:Vessel-Base-Type',2,'{"en": "Ring"}',NULL,NULL,'{"en": ""}'),
(1353,'Pottery:Vessel-Base-Type',3,'{"en": "Disc"}',NULL,NULL,'{"en": ""}'),
(1354,'Pottery:Vessel-Base-Type',4,'{"en": "Rounded"}',NULL,NULL,'{"en": ""}'),
(1380,'Pottery:Foot-Type',1,'{"en": "Fenstrated"}',NULL,NULL,'{"en": ""}'),
(1381,'Pottery:Foot-Type',2,'{"en": "Unusual"}',NULL,NULL,'{"en": ""}'),
(1401,'Pottery:Rim-Type',1,'{"en": "Straight"}',NULL,NULL,'{"en": ""}'),
(1402,'Pottery:Rim-Type',2,'{"en": "Everted"}',NULL,NULL,'{"en": ""}'),
(1403,'Pottery:Rim-Type',3,'{"en": "Inverted"}',NULL,NULL,'{"en": ""}'),
(1404,'Pottery:Rim-Type',4,'{"en": "Carinated"}',NULL,NULL,'{"en": ""}'),
(1451,'Pottery:Handle',1,'{"en": "Lug"}',NULL,NULL,'{"en": ""}'),
(1452,'Pottery:Handle',2,'{"en": "Straight"}',NULL,NULL,'{"en": ""}'),
(1453,'Pottery:Handle',3,'{"en": "Loop"}',NULL,NULL,'{"en": ""}'),
(1454,'Pottery:Handle',2,'{"en": "Ledge"}',NULL,NULL,'{"en": ""}'),
(1455,'Pottery:Handle',2,'{"en": "Indented"}',NULL,NULL,'{"en": ""}'),
(1456,'Pottery:Handle',4,'{"en": "Horizontal"}',NULL,NULL,'{"en": ""}'),
(1457,'Pottery:Handle',5,'{"en": "Vertical"}',NULL,NULL,'{"en": ""}'),
(1458,'Pottery:Handle',6,'{"en": "Perforation"}',NULL,NULL,'{"en": ""}'),


(1501,'Pottery:Vessel-Shape-Types',1,'{"en": "Baking Tray"}',NULL,NULL,'{"en": ""}'),
(1502,'Pottery:Vessel-Shape-Types',2,'{"en": "Plate/Platter"}',NULL,NULL,'{"en": ""}'),
(1503,'Pottery:Vessel-Shape-Types',3,'{"en": "Bowl"}',NULL,NULL,'{"en": ""}'),
(1504,'Pottery:Vessel-Shape-Types',4,'{"en": "Krater/Cooking Pot"}',NULL,NULL,'{"en": ""}'),
(1505,'Pottery:Vessel-Shape-Types',5,'{"en": "Chalice/Goblet"}',NULL,NULL,'{"en": ""}'),
(1506,'Pottery:Vessel-Shape-Types',6,'{"en": "Holemouth/Pithos/Jar/Storage Jar"}',NULL,NULL,'{"en": ""}'),
(1507,'Pottery:Vessel-Shape-Types',7,'{"en": "Jug/Juglet"}',NULL,NULL,'{"en": ""}'),
(1508,'Pottery:Vessel-Shape-Types',8,'{"en": "Bottle/Flask"}',NULL,NULL,'{"en": ""}'),
/*(1510,'Pottery:Vessel-Shape-Types',10,'{"en": "Lamp"}',NULL,NULL,'{"en": ""}'), */
(1511,'Pottery:Vessel-Shape-Types',11,'{"en": "Something Fancy"}',NULL,NULL,'{"en": ""}'),


(1701,'Pottery:STF',1,'{"en": "Burnish"}',NULL,NULL,'{"en": ""}'),
(1702,'Pottery:STF',2,'{"en": "Slip"}',NULL,NULL,'{"en": ""}'),
(1703,'Pottery:STF',4,'{"en": "Paint"}',NULL,NULL,'{"en": ""}'),
(1704,'Pottery:STF',5,'{"en": "Glaze"}',NULL,NULL,'{"en": ""}'),

(1710,'Pottery:STF-Slip-Color',1,'{"en": "Red"}',NULL,NULL,'{"en": ""}'),
(1711,'Pottery:STF-Slip-Color',2,'{"en": "Black"}',NULL,NULL,'{"en": ""}'),
(1712,'Pottery:STF-Slip-Color',3,'{"en": "White"}',NULL,NULL,'{"en": ""}'),
(1713,'Pottery:STF-Slip-Color',4,'{"en": "Brown"}',NULL,NULL,'{"en": ""}'),
(1714,'Pottery:STF-Slip-Color',5,'{"en": "Yellow"}',NULL,NULL,'{"en": ""}'),
(1715,'Pottery:STF-Slip-Color',6,'{"en": "Grey"}',NULL,NULL,'{"en": ""}'),

(1801,'Pottery:STF-Paint-Color',1,'{"en": "Red"}',NULL,NULL,'{"en": ""}'),
(1802,'Pottery:STF-Paint-Color',2,'{"en": "Black"}',NULL,NULL,'{"en": ""}'),
(1803,'Pottery:STF-Paint-Color',3,'{"en": "White"}',NULL,NULL,'{"en": ""}'),
(1804,'Pottery:STF-Paint-Color',4,'{"en": "Brown"}',NULL,NULL,'{"en": ""}'),
(1805,'Pottery:STF-Paint-Color',5,'{"en": "Yellow"}',NULL,NULL,'{"en": ""}'),
(1806,'Pottery:STF-Paint-Color',6,'{"en": "Grey"}',NULL,NULL,'{"en": ""}'),
(1807,'Pottery:STF-Paint-Color',7,'{"en": "Blue"}',NULL,NULL,'{"en": ""}'),

(1831,'Pottery:STF-Paint-Slip-Pattern',1,'{"en": "Full Coverage"}',NULL,NULL,'{"en": ""}'),
(1832,'Pottery:STF-Paint-Slip-Pattern',2,'{"en": "Bands"}',NULL,NULL,'{"en": ""}'),
(1833,'Pottery:STF-Paint-Slip-Pattern',3,'{"en": "Circles"}',NULL,NULL,'{"en": ""}'),
(1834,'Pottery:STF-Paint-Slip-Pattern',4,'{"en": "Lines"}',NULL,NULL,'{"en": ""}'),
(1835,'Pottery:STF-Paint-Slip-Pattern',5,'{"en": "Geometric"}',NULL,NULL,'{"en": ""}'),
(1836,'Pottery:STF-Paint-Slip-Pattern',6,'{"en": "Free"}',NULL,NULL,'{"en": ""}'),

/*
(1861,'Pottery:STF-Paint-Motifs',1,'{"en": "Ladders"}',NULL,NULL,'{"en": ""}'),
(1862,'Pottery:STF-Paint-Motifs',2,'{"en": "Wines"}',NULL,NULL,'{"en": ""}'),
(1863,'Pottery:STF-Paint-Motifs',3,'{"en": "Nautical"}',NULL,NULL,'{"en": ""}'),
(1864,'Pottery:STF-Paint-Motifs',4,'{"en": "Ducks on Parade"}',NULL,NULL,'{"en": ""}'),
(1865,'Pottery:STF-Paint-Motifs',5,'{"en": "Furry Mamals"}',NULL,NULL,'{"en": ""}'),
(1866,'Pottery:STF-Paint-Motifs',6,'{"en": "Abstract"}',NULL,NULL,'{"en": ""}'),
*/

(1881,'Pottery:ST-Reductive',1,'{"en": "Incision"}',NULL,NULL,'{"en": ""}'),
(1882,'Pottery:ST-Reductive',2,'{"en": "Combing"}',NULL,NULL,'{"en": ""}'),
(1883,'Pottery:ST-Reductive',3,'{"en": "Impressions"}',NULL,NULL,'{"en": ""}'),
(1884,'Pottery:ST-Reductive',4,'{"en": "Pontil Points"}',NULL,NULL,'{"en": ""}'),
(1891,'Pottery:ST-Additive',1,'{"en": "Knobs"}',NULL,NULL,'{"en": ""}'),
(1892,'Pottery:ST-Additive',2,'{"en": "Broomsticks"}',NULL,NULL,'{"en": ""}'),

(1901,'Pottery:Named-Groups-I',1,'{"en": "Yarmukian"}',NULL,NULL,'{"en": ""}'),
(1902,'Pottery:Named-Groups-I',2,'{"en": "Wadi Rabah"}',NULL,NULL,'{"en": ""}'),
(1903,'Pottery:Named-Groups-I',3,'{"en": "Gray Burnished"}',NULL,NULL,'{"en": ""}'),
(1904,'Pottery:Named-Groups-I',4,'{"en": "Metallic (Abydos)"}',NULL,NULL,'{"en": ""}'),
(1905,'Pottery:Named-Groups-I',5,'{"en": "Grain-wash/Band slip"}',NULL,NULL,'{"en": ""}'),
(1906,'Pottery:Named-Groups-I',6,'{"en": "Khirbet Kerak"}',NULL,NULL,'{"en": ""}');
