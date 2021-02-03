INSERT INTO `pottery_base_types` (`id`, `name`) VALUES
(1,'Unassigned'),
(2,'Vessel'),
(3,'Non-Vessel'),
(4,'Plastic Form'),
(5,'Ceramic Production/Waste'),
(6,'Building Material'),
(7,'Miscellenia'),
(20,'Unknown');

INSERT INTO `tag_types` (`str_id`, `subject`, `category`, `category_order`, `group_order`, `display_name`, `multiple`, `dependency`) VALUES 
/*('Pottery:Fabric','Pottery','Fabric','Fabric',1,1,NULL),
('Pottery:Fabric-Color','Pottery','Fabric-Color','Fabric Color',1,2,NULL),
('Pottery:Common-Types','Pottery','Common-Types','Common-Types',1,1,NULL),*/
('Pottery:Base-Type','Pottery','Markers',3,3,'Vessel Base Type',1,
'[[{"id": "591", "source": "Tag", "tag_name": "Base", "tag_type_str_id": "Pottery:Vessel-Part"}]]'),

('Pottery:Forming-Technique','Pottery','Markers',3,4,'Production',1,NULL),

('Pottery:Vessel-Subtype','Pottery','Vessel Subtype',4,5,'Vessel Subtype',1,
'[[{"id": "2", "source": "Me", "field_name": "base_type_id", "param_name": "Vessel"}]]'),

('Pottery:Non-Vessel-Subtype','Pottery','Non-Vessel-Subtype',5,6,'Non-Vessel-Subtype',1,
'[[{"id": "3", "source": "Me", "field_name": "base_type_id", "param_name": "Non-Vessel"}]]'),

('Pottery:Life-Stage','Pottery','Markers',10,10,'Life Stage',1,NULL),

('Pottery:Surface-Treatment','Pottery','Surface-Treatment',6,12,'Surface-Treatment',1,
'[[{"id": "2", "source": "Me", "field_name": "base_type_id", "param_name": "Vessel"}]]'),

('Pottery:Vessel-Part','Pottery','Part',7,2,'Vessel Part',1,
'[[{"id": "2", "source": "Me", "field_name": "base_type_id", "param_name": "Vessel"}]]'),

('Pottery:Rim-Type','Pottery','Part',7,3,'Rim-Type',1,
'[[{"id": "593", "source": "Tag", "tag_name": "Rim", "tag_type_str_id": "Pottery:Vessel-Part"}]]'),

('Pottery:Handle-Type','Pottery','Part',7,4,'Handle-Type',1,
'[[{"id": "596", "source": "Tag", "tag_name": "Handle", "tag_type_str_id": "Pottery:Vessel-Part"}]]');




INSERT INTO `tags` (`id`, `type`, `tag_type_id`, `order_column`, `name`, `slug`, `created_at`, `updated_at`) VALUES
(521,'Pottery:Life-Stage',NULL,1,'{"en": "Unfired"}','{"en": ""}',NULL,NULL),
(523,'Pottery:Life-Stage',NULL,3,'{"en": "Reworked Sherd Unperforated"}','{"en": ""}',NULL,NULL),
(524,'Pottery:Life-Stage',NULL,4,'{"en": "Reworked Sherd Drilled One Side"}','{"en": ""}',NULL,NULL),
(525,'Pottery:Life-Stage',NULL,4,'{"en": "Reworked Sherd Perforated"}','{"en": ""}',NULL,NULL),
(531,'Pottery:Forming-Technique',NULL,1,'{"en": "Wheel"}','{"en": ""}',NULL,NULL),
(532,'Pottery:Forming-Technique',NULL,2,'{"en": "Coil"}','{"en": ""}',NULL,NULL),
(533,'Pottery:Forming-Technique',NULL,3,'{"en": "Slab"}','{"en": ""}',NULL,NULL),
(534,'Pottery:Forming-Technique',NULL,4,'{"en": "Mat"}','{"en": ""}',NULL,NULL),
(541,'Pottery:Surface-Treatment',NULL,1,'{"en": "Burnish"}','{"en": ""}',NULL,NULL),
(542,'Pottery:Surface-Treatment',NULL,2,'{"en": "Slip"}','{"en": ""}',NULL,NULL),
(543,'Pottery:Surface-Treatment',NULL,3,'{"en": "Glaze"}','{"en": ""}',NULL,NULL),
(544,'Pottery:Surface-Treatment',NULL,4,'{"en": "Paint"}','{"en": ""}',NULL,NULL),
(545,'Pottery:Surface-Treatment',NULL,5,'{"en": "Punctation"}','{"en": ""}',NULL,NULL),
(546,'Pottery:Surface-Treatment',NULL,6,'{"en": "Incision"}','{"en": ""}',NULL,NULL),
(551,'Pottery:Non-Vessel-Subtype',NULL,1,'{"en": "Funnel"}','{"en": ""}',NULL,NULL),
(552,'Pottery:Non-Vessel-Subtype',NULL,2,'{"en": "Baking Tray"}','{"en": ""}',NULL,NULL),
(553,'Pottery:Non-Vessel-Subtype',NULL,3,'{"en": "Strainer"}','{"en": ""}',NULL,NULL),
(554,'Pottery:Non-Vessel-Subtype',NULL,4,'{"en": "Stand"}','{"en": ""}',NULL,NULL),
(555,'Pottery:Non-Vessel-Subtype',NULL,5,'{"en": "Lamp"}','{"en": ""}',NULL,NULL),
(556,'Pottery:Non-Vessel-Subtype',NULL,6,'{"en": "Cup and Saucer"}','{"en": ""}',NULL,NULL),
(557,'Pottery:Non-Vessel-Subtype',NULL,7,'{"en": "Pipe"}','{"en": ""}',NULL,NULL),
(558,'Pottery:Non-Vessel-Subtype',NULL,8,'{"en": "Lid"}','{"en": ""}',NULL,NULL),
(561,'Pottery:Vessel-Subtype',NULL,1,'{"en": "Bowl"}','{"en": ""}',NULL,NULL),
(562,'Pottery:Vessel-Subtype',NULL,2,'{"en": "Scoop"}','{"en": ""}',NULL,NULL),
(563,'Pottery:Vessel-Subtype',NULL,3,'{"en": "Chalice"}','{"en": ""}',NULL,NULL),
(564,'Pottery:Vessel-Subtype',NULL,4,'{"en": "Goblet"}','{"en": ""}',NULL,NULL),
(565,'Pottery:Vessel-Subtype',NULL,5,'{"en": "Krater"}','{"en": ""}',NULL,NULL),
(566,'Pottery:Vessel-Subtype',NULL,6,'{"en": "Cooking Pot"}','{"en": ""}',NULL,NULL),
(567,'Pottery:Vessel-Subtype',NULL,7,'{"en": "Pithos"}','{"en": ""}',NULL,NULL),
(568,'Pottery:Vessel-Subtype',NULL,8,'{"en": "Storage Jar"}','{"en": ""}',NULL,NULL),
(569,'Pottery:Vessel-Subtype',NULL,9,'{"en": "Amphora"}','{"en": ""}',NULL,NULL),
(570,'Pottery:Vessel-Subtype',NULL,10,'{"en": "Jug"}','{"en": ""}',NULL,NULL),
(571,'Pottery:Vessel-Subtype',NULL,11,'{"en": "Juglet"}','{"en": ""}',NULL,NULL),
(572,'Pottery:Vessel-Subtype',NULL,12,'{"en": "Bottle"}','{"en": ""}',NULL,NULL),
(573,'Pottery:Vessel-Subtype',NULL,13,'{"en": "Pyxide"}','{"en": ""}',NULL,NULL),
(574,'Pottery:Vessel-Subtype',NULL,14,'{"en": "Flask"}','{"en": ""}',NULL,NULL),
(575,'Pottery:Vessel-Subtype',NULL,15,'{"en": "Pithos"}','{"en": ""}',NULL,NULL),
(591,'Pottery:Vessel-Part',NULL,1,'{"en": "Base"}','{"en": ""}',NULL,NULL),
(592,'Pottery:Vessel-Part',NULL,2,'{"en": "Wall"}','{"en": ""}',NULL,NULL),
(593,'Pottery:Vessel-Part',NULL,3,'{"en": "Rim"}','{"en": ""}',NULL,NULL),
(594,'Pottery:Vessel-Part',NULL,4,'{"en": "Lip"}','{"en": ""}',NULL,NULL),
(595,'Pottery:Vessel-Part',NULL,5,'{"en": "Spout"}','{"en": ""}',NULL,NULL),
(596,'Pottery:Vessel-Part',NULL,6,'{"en": "Handle"}','{"en": ""}',NULL,NULL),
(601,'Pottery:Base-Type',NULL,1,'{"en": "Ring"}','{"en": ""}',NULL,NULL),
(602,'Pottery:Base-Type',NULL,2,'{"en": "Flat"}','{"en": ""}',NULL,NULL),
(603,'Pottery:Base-Type',NULL,3,'{"en": "Rounded"}','{"en": ""}',NULL,NULL),
(621,'Pottery:Rim-Type',NULL,1,'{"en": "Straight"}','{"en": ""}',NULL,NULL),
(622,'Pottery:Rim-Type',NULL,2,'{"en": "Everted"}','{"en": ""}',NULL,NULL),
(623,'Pottery:Rim-Type',NULL,3,'{"en": "Inverted"}','{"en": ""}',NULL,NULL),
(624,'Pottery:Rim-Type',NULL,4,'{"en": "Carinated"}','{"en": ""}',NULL,NULL),
(681,'Pottery:Handle-Type',NULL,1,'{"en": "Ledge - Plain"}','{"en": ""}',NULL,NULL),
(682,'Pottery:Handle-Type',NULL,2,'{"en": "Ledge - indented"}','{"en": ""}',NULL,NULL),
(683,'Pottery:Handle-Type',NULL,3,'{"en": "Straight"}','{"en": ""}',NULL,NULL),
(684,'Pottery:Handle-Type',NULL,4,'{"en": "Loop"}','{"en": ""}',NULL,NULL),
(685,'Pottery:Handle-Type',NULL,5,'{"en": "Strap"}','{"en": ""}',NULL,NULL),
(686,'Pottery:Handle-Type',NULL,6,'{"en": "rod"}','{"en": ""}',NULL,NULL);