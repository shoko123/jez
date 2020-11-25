
INSERT INTO `glass_base_types` (`id`, `name`) VALUES
(1,'Unassigned'),
(2, 'Vessel/Lamp'),
(3, 'Bead'),
(4, 'Bangle'),
(5, 'Window Glass'),
(6, 'Tbd'),
(7, 'Unknown');

INSERT INTO `tag_types` (`str_id`, `name_major`, `name_minor`, `display_name`, `multiple`, `order_column`, `dependency`) VALUES 
('Glass:Color','Glass','Color','Color',1,204,NULL),
('Glass:Production','Glass','Production','Production',1,23,NULL),
('Glass:Vessel-Subtype','Glass','Vessel-Subtype','Vessel/Lamp Subtype',1,22,'{ "source": "Me", "field_name": "base_type_id", "param_name": "Vessel/Lamp"}'),
('Glass:Weathering','Glass','Weathering','Weathering',1,205,NULL),
('Glass:Weathering-Type','Glass','Weathering-Type','Weathering-Type',1,206,NULL);



INSERT INTO `tags` (`id`, `name`, `slug`, `type`, `order_column`, `created_at`, `updated_at`) VALUES
(201,'{"en": "Decolorized"}','{"en": "decolorized"}','Glass:Color',1,NULL,NULL),
(202,'{"en": "Blue/Green"}','{"en": "blue-green"}','Glass:Color',2,NULL,NULL),
(203,'{"en": "Cobalt Blue"}','{"en": "Cobalt Blue"}','Glass:Color',3,NULL,NULL),
(204,'{"en": "Light Blue"}','{"en": "light-blue"}','Glass:Color',4,NULL,NULL),
(205,'{"en": "Opaque Teal"}','{"en": "opaque-eal"}','Glass:Color',5,NULL,NULL),
(206,'{"en": "Light Green"}','{"en": "light-reen"}','Glass:Color',6,NULL,NULL),
(207,'{"en": "Dark Green"}','{"en": "dark-green"}','Glass:Color',7,NULL,NULL),
(208,'{"en": "Greenish Yellow"}','{"en": "greenish-yellow"}','Glass:Color',8,NULL,NULL),
(209,'{"en": "Yellow"}','{"en": "yellow"}','Glass:Color',9,NULL,NULL),
(210,'{"en": "Pinkish-tan"}','{"en": "pinkish-tanl"}','Glass:Color',10,NULL,NULL),
(211,'{"en": "Brown"}','{"en": "brown"}','Glass:Color',11,NULL,NULL),
(212,'{"en": "Light Grey"}','{"en": "light-gey"}','Glass:Color',12,NULL,NULL),
(213,'{"en": "Multicolored"}','{"en": "multicolored"}','Glass:Color',13,NULL,NULL),

(221,'{"en": "Free Blown"}','{"en": "free-blown"}','Glass:Production',1,NULL,NULL),
(222,'{"en": "Mold Blown"}','{"en": "mold-blown"}','Glass:Production',2,NULL,NULL),
(223,'{"en": "Machine Blown"}','{"en": "machine-blown"}','Glass:Production',3,NULL,NULL),
(224,'{"en": "Machine Pressed"}','{"en": "machine-pressed"}','Glass:Production',4,NULL,NULL),
(225,'{"en": "Polished"}','{"en": "polished"}','Glass:Production',5,NULL,NULL),
(226,'{"en": "Incised"}','{"en": "incised"}','Glass:Production',6,NULL,NULL),
(227,'{"en": "Pontil Mark"}','{"en": "pontil-mark"}','Glass:Production',7,NULL,NULL),
(228,'{"en": "Plain Decorative Wrap"}','{"en": "plain-decorative-wrap"}','Glass:Production',8,NULL,NULL),
(229,'{"en": "Twisted Decorative Wrap"}','{"en": "twisted-decorative-wrap"}','Glass:Production',9,NULL,NULL),
(230,'{"en": "Pinched Wrap"}','{"en": "pinched-wrap"}','Glass:Production',10,NULL,NULL),
(231,'{"en": "Tool Mark"}','{"en": "tool-mark"}','Glass:Production',11,NULL,NULL),

(241,'{"en": "Very Light"}','{"en": "very-light"}','Glass:Weathering',1,NULL,NULL),
(242,'{"en": "Light"}','{"en": "light"}','Glass:Weathering',2,NULL,NULL),
(243,'{"en": "Very Light"}','{"en": "very-light"}','Glass:Weathering',3,NULL,NULL),
(244,'{"en": "Medium"}','{"en": "medium"}','Glass:Weathering',4,NULL,NULL),
(245,'{"en": "Heavy"}','{"en": "heavy"}','Glass:Weathering',5,NULL,NULL),
(246,'{"en": "Very Heavy"}','{"en": "very-heavy"}','Glass:Weathering',6,NULL,NULL),
(247,'{"en": "Opaque"}','{"en": "opaque"}','Glass:Weathering',7,NULL,NULL),

(251,'{"en": "Silica Rich Layer"}','{"en": "silica-rich-layer"}','Glass:Weathering-Type',1,NULL,NULL),
(252,'{"en": "White"}','{"en": "white"}','Glass:Weathering-Type',2,NULL,NULL),
(253,'{"en": "Black"}','{"en": "black"}','Glass:Weathering-Type',3,NULL,NULL),
(254,'{"en": "Yellow"}','{"en": "yellow"}','Glass:Weathering-Type',4,NULL,NULL),
(255,'{"en": "Pitted"}','{"en": "pitted"}','Glass:Weathering-Type',5,NULL,NULL),

(261,'{"en": "Beaker"}','{"en": "Beaker"}','Glass:Vessel-Subtype',1,NULL,NULL),
(262,'{"en": "Bottle"}','{"en": "Bottle"}','Glass:Vessel-Subtype',2,NULL,NULL),
(263,'{"en": "Bowl"}','{"en": "bowl"}','Glass:Vessel-Subtype',3,NULL,NULL),
(264,'{"en": "Cup"}','{"en": "cup"}','Glass:Vessel-Subtype',4,NULL,NULL),
(265,'{"en": "Dish"}','{"en": "dish"}','Glass:Vessel-Subtype',5,NULL,NULL),
(266,'{"en": "Footed Cup"}','{"en": "footed-cup"}','Glass:Vessel-Subtype',6,NULL,NULL),
(267,'{"en": "Goblet"}','{"en": "goblet"}','Glass:Vessel-Subtype',7,NULL,NULL),
(268,'{"en": "Lamp"}','{"en": "lamp"}','Glass:Vessel-Subtype',8,NULL,NULL),
(269,'{"en": "Plate"}','{"en": "plate"}','Glass:Vessel-Subtype',9,NULL,NULL),
(270,'{"en": "Rim"}','{"en": "rim"}','Glass:Vessel-Subtype',10,NULL,NULL),
(271,'{"en": "Outward Folded Rim"}','{"en": "outward-folded-rim"}','Glass:Vessel-Subtype',11,NULL,NULL),
(272,'{"en": "Body"}','{"en": "body"}','Glass:Vessel-Subtype',12,NULL,NULL),
(273,'{"en": "Handle"}','{"en": "handle"}','Glass:Vessel-Subtype',13,NULL,NULL),
(274,'{"en": "Base"}','{"en": "base"}','Glass:Vessel-Subtype',14,NULL,NULL),
(275,'{"en": "Hollow Ring Base"}','{"en": "hollow-ring-base"}','Glass:Vessel-Subtype',15,NULL,NULL),
(276,'{"en": "Solid Ring Base"}','{"en": "solid-ring-base"}','Glass:Vessel-Subtype',16,NULL,NULL);