INSERT INTO `metal_base_types` (`id`, `name`) VALUES
(1,'Unassigned'),
(2, 'Coin'),
(3, 'Nail/Pin'),
(4, 'Modern Weaponry'),
(5, 'TBD'),
(6, 'Unknown');

INSERT INTO `tag_types` (`str_id`, `subject`, `category`, `category_order`, `group_order`, `display_name`, `multiple`, `dependency`) VALUES 
('Metal:Modern-Weaponry','Metal','Markers',3,1,'Modern-weaponry',0, '[["T>Modern Weaponry>4"]]');

INSERT INTO `tags` (`id`, `type`, `tag_type_id`, `order_column`, `name`, `slug`, `created_at`, `updated_at`) VALUES 
(1001,'Metal:Modern-Weaponry',NULL,1,'{"en": "Cartridge"}','{"en": ""}',NULL,NULL),
(1002,'Metal:Modern-Weaponry',NULL,2,'{"en": "Cartridge Case"}','{"en": ""}',NULL,NULL),
(1003,'Metal:Modern-Weaponry',NULL,3,'{"en": "Bullet"}','{"en": ""}',NULL,NULL),
(1004,'Metal:Modern-Weaponry',NULL,4,'{"en": "Shell Head"}','{"en": ""}',NULL,NULL),
(1005,'Metal:Modern-Weaponry',NULL,5,'{"en": "Shrapnel"}','{"en": ""}',NULL,NULL);

