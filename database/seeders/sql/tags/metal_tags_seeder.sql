INSERT INTO `metal_base_types` (`id`, `name`) VALUES
(1,'Unassigned'),
(2, 'Coin'),
(3, 'Nail/Pin'),
(4, 'Modern Weaponry'),
(5, 'TBD'),
(6, 'Unknown');

INSERT INTO `tag_types` (`str_id`, `subject`, `category`, `category_order`, `group_order`, `display_name`, `multiple`, `dependency`) VALUES 
('Metal:Modern-Weaponry','Metal','Modern Weaponry Partition',4,1,'Modern-weaponry',0, '[["L>base_type_id>4"]]');

INSERT INTO `tags` (`id`, `type`, `order_column`, `name`, `created_at`, `updated_at`, `slug`) VALUES 
(5001,'Metal:Modern-Weaponry',1,'{"en": "Cartridge"}',NULL,NULL,'{"en": ""}'),
(5002,'Metal:Modern-Weaponry',2,'{"en": "Cartridge Case"}',NULL,NULL,'{"en": ""}'),
(5003,'Metal:Modern-Weaponry',3,'{"en": "Bullet"}',NULL,NULL,'{"en": ""}'),
(5004,'Metal:Modern-Weaponry',4,'{"en": "Shell Head"}',NULL,NULL,'{"en": ""}'),
(5005,'Metal:Modern-Weaponry',5,'{"en": "Shrapnel"}',NULL,NULL,'{"en": ""}');

