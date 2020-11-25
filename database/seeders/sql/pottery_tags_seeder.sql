INSERT INTO `pottery_base_types` (`id`, `name`) VALUES
(1,'Unassigned'),
(2,'Vessel'),
(3,'Non-Vessel'),
(4,'Plastic Form'),
(5,'Ceramic Production/Waste'),
(6,'Building Material'),
(7,'Miscellenia'),
(20,'Unknown');


INSERT INTO `tag_types` (`str_id`, `name_major`, `name_minor`, `display_name`, `multiple`, `order_column`, `dependency`) VALUES 
/*('Pottery:Fabric','Pottery','Fabric','Fabric',1,1,NULL),
('Pottery:Fabric-Color','Pottery','Fabric-Color','Fabric Color',1,2,NULL),
('Pottery:Common-Types','Pottery','Common-Types','Common-Types',1,1,NULL),*/
('Pottery:Life-Stage','Pottery','Life-Stage','Life Stage',1,3,NULL),
('Pottery:Forming-Technique','Pottery','Forming-Technique','Forming-Technique',1,4,NULL),
('Pottery:Surface-Treatment','Pottery','Surface-Treatment','Surface-Treatment',1,5,NULL),
('Pottery:Vessel-Subtype','Pottery','Vessel-Subtype','Vessel Subtype',1,6,'{"source": "Me", "field_name": "base_type_id", "param_name": "Vessel"}'),
('Pottery:Vessel-Part','Pottery','Part','Vessel Part',1,7,'{"source": "Me", "field_name": "base_type_id", "param_name": "Vessel"}'),
('Pottery:Base-Type','Pottery','Base-Type','Vessel Base Type',1,8,'{"source": "Tag", "tag_type_name": "Pottery:Vessel-Part", "tag_name": "Base"}'),
/*('Pottery:Wall-Type','Pottery','Wall-Type','Wall-Type',1,9,'{"source": "Tag", "tag_type_name": "Pottery:Vessel-Part", "tag_name": "Wall"}'),*/
('Pottery:Rim-Type','Pottery','Rim-Type','Rim-Type',1,10,'{"source": "Tag", "tag_type_name": "Pottery:Vessel-Part", "tag_name": "Rim"}'),
/*('Pottery:Lip-Type','Pottery','Lip-Type','Lip-Type',1,11,'{"source": "Tag", "tag_type_name": "Pottery:Vessel-Part", "tag_name": "Lip"}'),
('Pottery:Spout-Type','Pottery','Spout-Type','Spout-Type',1,12,'{"source": "Tag", "tag_type_name": "Pottery:Vessel-Part", "tag_name": "Spout"}'),*/
('Pottery:Handle-Type','Pottery','Handle-Type','Handle-Type',1,13,'{"source": "Tag", "tag_type_name": "Pottery:Vessel-Part", "tag_name": "Handle"}'),
('Pottery:Non-Vessel-Subtype','Pottery','Non-Vessel-Subtype','Non-Vessel-Subtype',1,14,'{"source": "Me", "field_name": "base_type_id", "param_name": "Non-Vessel"}');

INSERT INTO `tags` (`id`, `name`, `slug`, `type`, `order_column`, `created_at`, `updated_at`) VALUES
(521,'{"en": "Unfired"}','{"en": ""}','Pottery:Life-Stage',1,NULL,NULL),
(523,'{"en": "Reworked Sherd Unperforated"}','{"en": ""}','Pottery:Life-Stage',3,NULL,NULL),
(524,'{"en": "Reworked Sherd Drilled One Side"}','{"en": ""}','Pottery:Life-Stage',4,NULL,NULL),
(525,'{"en": "Reworked Sherd Perforated"}','{"en": ""}','Pottery:Life-Stage',4,NULL,NULL),
(532,'{"en": "Coil"}','{"en": ""}','Pottery:Forming-Technique',2,NULL,NULL),
(533,'{"en": "Slab"}','{"en": ""}','Pottery:Forming-Technique',3,NULL,NULL),
(534,'{"en": "Mat"}','{"en": ""}','Pottery:Forming-Technique',4,NULL,NULL),
(531,'{"en": "Wheel"}','{"en": ""}','Pottery:Forming-Technique',5,NULL,NULL),

(541,'{"en": "Burnish"}','{"en": ""}','Pottery:Surface-Treatment',1,NULL,NULL),
(542,'{"en": "Slip"}','{"en": ""}','Pottery:Surface-Treatment',2,NULL,NULL),
(543,'{"en": "Glaze"}','{"en": ""}','Pottery:Surface-Treatment',3,NULL,NULL),
(544,'{"en": "Paint"}','{"en": ""}','Pottery:Surface-Treatment',4,NULL,NULL),
(545,'{"en": "Punctation"}','{"en": ""}','Pottery:Surface-Treatment',5,NULL,NULL),
(546,'{"en": "Incision"}','{"en": ""}','Pottery:Surface-Treatment',6,NULL,NULL),

(551,'{"en": "Funnel"}','{"en": ""}','Pottery:Non-Vessel-Subtype',1,NULL,NULL),
(552,'{"en": "Baking Tray"}','{"en": ""}','Pottery:Non-Vessel-Subtype',2,NULL,NULL),
(553,'{"en": "Strainer"}','{"en": ""}','Pottery:Non-Vessel-Subtype',3,NULL,NULL),
(554,'{"en": "Stand"}','{"en": ""}','Pottery:Non-Vessel-Subtype',4,NULL,NULL),
(555,'{"en": "Lamp"}','{"en": ""}','Pottery:Non-Vessel-Subtype',5,NULL,NULL),
(556,'{"en": "Cup and Saucer"}','{"en": ""}','Pottery:Non-Vessel-Subtype',6,NULL,NULL),
(557,'{"en": "Pipe"}','{"en": ""}','Pottery:Non-Vessel-Subtype',7,NULL,NULL),
(558,'{"en": "Lid"}','{"en": ""}','Pottery:Non-Vessel-Subtype',8,NULL,NULL),

(561,'{"en": "Bowl"}','{"en": ""}','Pottery:Vessel-Subtype',1,NULL,NULL),
(562,'{"en": "Scoop"}','{"en": ""}','Pottery:Vessel-Subtype',2,NULL,NULL),
(563,'{"en": "Chalice"}','{"en": ""}','Pottery:Vessel-Subtype',3,NULL,NULL),
(564,'{"en": "Goblet"}','{"en": ""}','Pottery:Vessel-Subtype',4,NULL,NULL),
(565,'{"en": "Krater"}','{"en": ""}','Pottery:Vessel-Subtype',5,NULL,NULL),
(566,'{"en": "Cooking Pot"}','{"en": ""}','Pottery:Vessel-Subtype',6,NULL,NULL),
(567,'{"en": "Pithos"}','{"en": ""}','Pottery:Vessel-Subtype',7,NULL,NULL),
(568,'{"en": "Storage Jar"}','{"en": ""}','Pottery:Vessel-Subtype',8,NULL,NULL),
(569,'{"en": "Amphora"}','{"en": ""}','Pottery:Vessel-Subtype',9,NULL,NULL),
(570,'{"en": "Jug"}','{"en": ""}','Pottery:Vessel-Subtype',10,NULL,NULL),
(571,'{"en": "Juglet"}','{"en": ""}','Pottery:Vessel-Subtype',11,NULL,NULL),
(572,'{"en": "Bottle"}','{"en": ""}','Pottery:Vessel-Subtype',12,NULL,NULL),
(573,'{"en": "Pyxide"}','{"en": ""}','Pottery:Vessel-Subtype',13,NULL,NULL),
(574,'{"en": "Flask"}','{"en": ""}','Pottery:Vessel-Subtype',14,NULL,NULL),
(575,'{"en": "Pithos"}','{"en": ""}','Pottery:Vessel-Subtype',15,NULL,NULL),


(591,'{"en": "Base"}','{"en": ""}','Pottery:Vessel-Part',1,NULL,NULL),
(592,'{"en": "Wall"}','{"en": ""}','Pottery:Vessel-Part',2,NULL,NULL),
(593,'{"en": "Rim"}','{"en": ""}','Pottery:Vessel-Part',3,NULL,NULL),
(594,'{"en": "Lip"}','{"en": ""}','Pottery:Vessel-Part',4,NULL,NULL),
(595,'{"en": "Spout"}','{"en": ""}','Pottery:Vessel-Part',5,NULL,NULL),
(596,'{"en": "Handle"}','{"en": ""}','Pottery:Vessel-Part',6,NULL,NULL),



(601,'{"en": "Ring"}','{"en": ""}','Pottery:Base-Type',1,NULL,NULL),
(602,'{"en": "Flat"}','{"en": ""}','Pottery:Base-Type',2,NULL,NULL),
(603,'{"en": "Rounded"}','{"en": ""}','Pottery:Base-Type',3,NULL,NULL),

(621,'{"en": "Straight"}','{"en": ""}','Pottery:Rim-Type',1,NULL,NULL),
(622,'{"en": "Everted"}','{"en": ""}','Pottery:Rim-Type',2,NULL,NULL),
(623,'{"en": "Inverted"}','{"en": ""}','Pottery:Rim-Type',3,NULL,NULL),
(624,'{"en": "Carinated"}','{"en": ""}','Pottery:Rim-Type',4,NULL,NULL),

(681,'{"en": "Ledge - Plain"}','{"en": ""}','Pottery:Handle-Type',1,NULL,NULL),
(682,'{"en": "Ledge - indented"}','{"en": ""}','Pottery:Handle-Type',2,NULL,NULL),
(683,'{"en": "Straight"}','{"en": ""}','Pottery:Handle-Type',3,NULL,NULL),
(684,'{"en": "Loop"}','{"en": ""}','Pottery:Handle-Type',4,NULL,NULL),
(685,'{"en": "Strap"}','{"en": ""}','Pottery:Handle-Type',5,NULL,NULL),
(686,'{"en": "rod"}','{"en": ""}','Pottery:Handle-Type',6,NULL,NULL);