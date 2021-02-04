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
('Pottery:Ware-Type','Pottery','Ware', 3, 1,'Ware-Type',1,NULL),
('Pottery:Ware-Color','Pottery','Ware', 3, 2, 'Ware Color',1 ,NULL),
('Pottery:Ware-Temper','Pottery','Ware',3,3, 'Ware-Temper',1,NULL),
/*preservation comes here 4.1 (preservation_id)*/
('Pottery:Life-Stage','Pottery','Charectaristics',4,2,'Life Stage',1,NULL),
('Pottery:Production','Pottery','Charectaristics',4,3,'Production',1,NULL),

('Pottery:Neolithic-Groups','Pottery','Group(s)',5,1,'Neolithic',1,'[["T>Periods:Top-Level>10300"]]'),
/*('Pottery:Chalcolithic-Groups','Pottery','Group(s)',5,1,'Chalcolithic',1,NULL),*/
('Pottery:Bronze-Groups','Pottery','Group(s)',5,2,'Bronze',1,'[["T>Periods:Top-Level>10500"]]'),
('Pottery:Iron-Groups','Pottery','Group(s)',5,3,'Iron',1,'[["T>Periods:Top-Level>10600"]]'),



/*base partition comes here 8.1 (base_type_id)*/


('Pottery:Vessel-Part','Pottery','Vessel Part',11,2,'Vessel Part',1,
'[["L>base_type_id>2"]]'),

('Pottery:Base-Type','Pottery','Vessel Part',11,3,'Base',1,
'[["T>Pottery:Vessel-Part>591"]]'),

('Pottery:Foot-Type','Pottery','Vessel Part',11,4,'Foot',1,
'[["T>Pottery:Vessel-Part>592"]]'),

('Pottery:Rim-Type','Pottery','Vessel Part',11,5,'Rim',1,
'[["T>Pottery:Vessel-Part>596"]]'),

('Pottery:Handle','Pottery','Vessel Part',11,6,'Handle',1,
'[["T>Pottery:Vessel-Part>598"]]'),

('Pottery:Vessel-Open-Types','Pottery','Vessel Typology',12,1,'Open Types',1,
'[["L>base_type_id>2"]]'),

('Pottery:Vessel-Closed-Types','Pottery','Vessel Typology',12,2,'Closed Types',1,
'[["L>base_type_id>2"]]'),

('Pottery:Non-Vessel-Typology','Pottery','Non-Vessel-Typology',12,7,'Non-Vessel Typology',1,
'[["L>base_type_id>3"]]'),


('Pottery:ST-Surface','Pottery','Surface-Treatment',20,1,'Surface Application',1,
'[["L>base_type_id>2", "L>base_type_id>3"]]'),

('Pottery:ST-Color','Pottery','Surface-Treatment',20,2,'Color',1,
'[["L>base_type_id>2", "L>base_type_id>3"]]'),

('Pottery:ST-Pattern','Pottery','Surface-Treatment',20,3,'Color Pattern',1,
'[["L>base_type_id>2", "L>base_type_id>3"]]'),

('Pottery:ST-Reductive','Pottery','Surface-Treatment',20,4,'Reductive',1,
'[["L>base_type_id>2", "L>base_type_id>3"]]'),

('Pottery:ST-Additive','Pottery','Surface-Treatment',20,5,'Additive',1,
'[["L>base_type_id>2", "L>base_type_id>3"]]');



INSERT INTO `tags` (`id`, `type`, `tag_type_id`, `order_column`, `name`, `slug`, `created_at`, `updated_at`) VALUES

(505,'Pottery:Ware-Type',NULL,1,'{"en": "Fine"}','{"en": ""}',NULL,NULL),
(506,'Pottery:Ware-Type',NULL,1,'{"en": "Coarse"}','{"en": ""}',NULL,NULL),
(510,'Pottery:Ware-Color',NULL,1,'{"en": "Grey"}','{"en": ""}',NULL,NULL),
(511,'Pottery:Ware-Color',NULL,2,'{"en": "Brown"}','{"en": ""}',NULL,NULL),
(512,'Pottery:Ware-Color',NULL,3,'{"en": "Yellow"}','{"en": ""}',NULL,NULL),
(513,'Pottery:Ware-Color',NULL,4,'{"en": "Red"}','{"en": ""}',NULL,NULL),
(514,'Pottery:Ware-Color',NULL,5,'{"en": "Black"}','{"en": ""}',NULL,NULL),
(515,'Pottery:Ware-Color',NULL,6,'{"en": "Grey"}','{"en": ""}',NULL,NULL),
(516,'Pottery:Ware-Temper',NULL,1,'{"en": "Plant-Fiber"}','{"en": ""}',NULL,NULL),
(517,'Pottery:Ware-Temper',NULL,1,'{"en": "Sand"}','{"en": ""}',NULL,NULL),
(518,'Pottery:Ware-Temper',NULL,1,'{"en": "Limestone"}','{"en": ""}',NULL,NULL),
(519,'Pottery:Ware-Temper',NULL,1,'{"en": "Charcoal"}','{"en": ""}',NULL,NULL),

(521,'Pottery:Life-Stage',NULL,1,'{"en": "Unfired"}','{"en": ""}',NULL,NULL),
(523,'Pottery:Life-Stage',NULL,3,'{"en": "Reworked Sherd"}','{"en": ""}',NULL,NULL),
(524,'Pottery:Life-Stage',NULL,4,'{"en": "Fire Exposure Evidence"}','{"en": ""}',NULL,NULL),

(531,'Pottery:Production',NULL,1,'{"en": "Wheel"}','{"en": ""}',NULL,NULL),
(532,'Pottery:Production',NULL,2,'{"en": "Coil"}','{"en": ""}',NULL,NULL),
(533,'Pottery:Production',NULL,3,'{"en": "Slab"}','{"en": ""}',NULL,NULL),
(534,'Pottery:Production',NULL,3,'{"en": "Mold Technique"}','{"en": ""}',NULL,NULL),
(535,'Pottery:Production',NULL,4,'{"en": "Mat Marks"}','{"en": ""}',NULL,NULL),

(540,'Pottery:Neolithic-Groups',NULL,1,'{"en": "Wadi Raba"}','{"en": ""}',NULL, NULL),
(541,'Pottery:Neolithic-Groups',NULL,2,'{"en": "Yarmukian"}','{"en": ""}',NULL, NULL),
(542,'Pottery:Bronze-Groups',NULL,2,'{"en": "Khirbet-Kerak"}','{"en": ""}',NULL, NULL),

(551,'Pottery:Non-Vessel-Typology',NULL,1,'{"en": "Funnel"}','{"en": ""}',NULL,NULL),
(552,'Pottery:Non-Vessel-Typology',NULL,2,'{"en": "Baking Tray"}','{"en": ""}',NULL,NULL),
(553,'Pottery:Non-Vessel-Typology',NULL,3,'{"en": "Strainer"}','{"en": ""}',NULL,NULL),
(554,'Pottery:Non-Vessel-Typology',NULL,4,'{"en": "Stand"}','{"en": ""}',NULL,NULL),
(555,'Pottery:Non-Vessel-Typology',NULL,5,'{"en": "Lamp"}','{"en": ""}',NULL,NULL),
(556,'Pottery:Non-Vessel-Typology',NULL,6,'{"en": "Cup and Saucer"}','{"en": ""}',NULL,NULL),
(557,'Pottery:Non-Vessel-Typology',NULL,7,'{"en": "Pipe"}','{"en": ""}',NULL,NULL),
(558,'Pottery:Non-Vessel-Typology',NULL,8,'{"en": "Lid"}','{"en": ""}',NULL,NULL),


(561,'Pottery:Vessel-Open-Types',NULL,1,'{"en": "Bowl"}','{"en": ""}',NULL,NULL),
(562,'Pottery:Vessel-Open-Types',NULL,2,'{"en": "Krater"}','{"en": ""}',NULL,NULL),
(563,'Pottery:Vessel-Open-Types',NULL,3,'{"en": "Chalice"}','{"en": ""}',NULL,NULL),
(564,'Pottery:Vessel-Open-Types',NULL,4,'{"en": "Goblet"}','{"en": ""}',NULL,NULL),
(565,'Pottery:Vessel-Open-Types',NULL,5,'{"en": "Pot"}','{"en": ""}',NULL,NULL),

(567,'Pottery:Vessel-Open-Types',NULL,7,'{"en": "Pithos"}','{"en": ""}',NULL,NULL),
(568,'Pottery:Vessel-Open-Types',NULL,8,'{"en": "Storage Jar"}','{"en": ""}',NULL,NULL),
(569,'Pottery:Vessel-Closed-Types',NULL,9,'{"en": "Amphora"}','{"en": ""}',NULL,NULL),
(570,'Pottery:Vessel-Closed-Types',NULL,10,'{"en": "Jug"}','{"en": ""}',NULL,NULL),
(571,'Pottery:Vessel-Closed-Types',NULL,11,'{"en": "Juglet"}','{"en": ""}',NULL,NULL),
(572,'Pottery:Vessel-Closed-Types',NULL,12,'{"en": "Bottle"}','{"en": ""}',NULL,NULL),
(573,'Pottery:Vessel-Closed-Types',NULL,13,'{"en": "Jar"}','{"en": ""}',NULL,NULL),
(574,'Pottery:Vessel-Closed-Types',NULL,14,'{"en": "Carinated Bowl"}','{"en": ""}',NULL,NULL),

(591,'Pottery:Vessel-Part',NULL,1,'{"en": "Base"}','{"en": ""}',NULL,NULL),
(592,'Pottery:Vessel-Part',NULL,2,'{"en": "Foot"}','{"en": ""}',NULL,NULL),
(593,'Pottery:Vessel-Part',NULL,3,'{"en": "Wall"}','{"en": ""}',NULL,NULL),
(594,'Pottery:Vessel-Part',NULL,4,'{"en": "Body"}','{"en": ""}',NULL,NULL),
(595,'Pottery:Vessel-Part',NULL,5,'{"en": "Neck"}','{"en": ""}',NULL,NULL),
(596,'Pottery:Vessel-Part',NULL,6,'{"en": "Rim"}','{"en": ""}',NULL,NULL),
(597,'Pottery:Vessel-Part',NULL,7,'{"en": "Spout"}','{"en": ""}',NULL,NULL),
(598,'Pottery:Vessel-Part',NULL,8,'{"en": "Handle"}','{"en": ""}',NULL,NULL),

(601,'Pottery:Base-Type',NULL,1,'{"en": "Flat"}','{"en": ""}',NULL,NULL),
(602,'Pottery:Base-Type',NULL,2,'{"en": "Ring"}','{"en": ""}',NULL,NULL),
(603,'Pottery:Base-Type',NULL,3,'{"en": "Disc"}','{"en": ""}',NULL,NULL),
(604,'Pottery:Base-Type',NULL,4,'{"en": "Rounded"}','{"en": ""}',NULL,NULL),

(610,'Pottery:Foot-Type',NULL,1,'{"en": "Fenstrated"}','{"en": ""}',NULL,NULL),
(611,'Pottery:Foot-Type',NULL,2,'{"en": "Unusual"}','{"en": ""}',NULL,NULL),

(621,'Pottery:Rim-Type',NULL,1,'{"en": "Straight"}','{"en": ""}',NULL,NULL),
(622,'Pottery:Rim-Type',NULL,2,'{"en": "Everted"}','{"en": ""}',NULL,NULL),
(623,'Pottery:Rim-Type',NULL,3,'{"en": "Inverted"}','{"en": ""}',NULL,NULL),
(624,'Pottery:Rim-Type',NULL,4,'{"en": "Carinated"}','{"en": ""}',NULL,NULL),


(651,'Pottery:Handle',NULL,1,'{"en": "Lug"}','{"en": ""}',NULL,NULL),
(652,'Pottery:Handle',NULL,2,'{"en": "Straight"}','{"en": ""}',NULL,NULL),
(653,'Pottery:Handle',NULL,3,'{"en": "Loop"}','{"en": ""}',NULL,NULL),
(657,'Pottery:Handle',NULL,4,'{"en": "Horizontal"}','{"en": ""}',NULL,NULL),
(658,'Pottery:Handle',NULL,5,'{"en": "Vertical"}','{"en": ""}',NULL,NULL),
(659,'Pottery:Handle',NULL,6,'{"en": "Perforation"}','{"en": ""}',NULL,NULL),

(654,'Pottery:Handle',NULL,2,'{"en": "Ledge - indented"}','{"en": ""}',NULL,NULL),

(701,'Pottery:ST-Surface',NULL,1,'{"en": "Burnish"}','{"en": ""}',NULL,NULL),
(702,'Pottery:ST-Surface',NULL,2,'{"en": "Slip-Exterior"}','{"en": ""}',NULL,NULL),
(703,'Pottery:ST-Surface',NULL,3,'{"en": "Slip-Interior"}','{"en": ""}',NULL,NULL),
(704,'Pottery:ST-Surface',NULL,4,'{"en": "Paint"}','{"en": ""}',NULL,NULL),
(705,'Pottery:ST-Surface',NULL,5,'{"en": "Glaze"}','{"en": ""}',NULL,NULL),

(710,'Pottery:ST-Color',NULL,1,'{"en": "Red"}','{"en": ""}',NULL,NULL),
(711,'Pottery:ST-Color',NULL,2,'{"en": "Black"}','{"en": ""}',NULL,NULL),
(712,'Pottery:ST-Color',NULL,3,'{"en": "White"}','{"en": ""}',NULL,NULL),
(713,'Pottery:ST-Color',NULL,4,'{"en": "Brown"}','{"en": ""}',NULL,NULL),

(720,'Pottery:ST-Pattern',NULL,1,'{"en": "Full Coverage"}','{"en": ""}',NULL,NULL),
(721,'Pottery:ST-Pattern',NULL,2,'{"en": "Parallel Lines"}','{"en": ""}',NULL,NULL),
(722,'Pottery:ST-Pattern',NULL,3,'{"en": "Geometric"}','{"en": ""}',NULL,NULL),
(723,'Pottery:ST-Pattern',NULL,4,'{"en": "Floral"}','{"en": ""}',NULL,NULL),

(730,'Pottery:ST-Reductive',NULL,1,'{"en": "Incision"}','{"en": ""}',NULL,NULL),
(731,'Pottery:ST-Reductive',NULL,2,'{"en": "Combing"}','{"en": ""}',NULL,NULL),
(732,'Pottery:ST-Reductive',NULL,3,'{"en": "Impressions"}','{"en": ""}',NULL,NULL),

(740,'Pottery:ST-Additive',NULL,1,'{"en": "Knobs"}','{"en": ""}',NULL,NULL),
(741,'Pottery:ST-Additive',NULL,2,'{"en": "Broomsticks"}','{"en": ""}',NULL,NULL);





