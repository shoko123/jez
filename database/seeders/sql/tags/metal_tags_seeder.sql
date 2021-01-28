INSERT INTO `metal_base_types` (`id`, `name`) VALUES
(1,'Unassigned'),
(2, 'Coin'),
(3, 'Nail/Pin'),
(4, 'Modern Weaponry'),
(5, 'TBD'),
(6, 'Unknown');

INSERT INTO `tag_types` (`str_id`, `name_major`, `name_minor`, `display_name`, `multiple`, `order_column`, `dependency`) VALUES 
('Metal:Modern-Weaponry','Metal','Modern-Weaponry','Modern-weaponry',0,1,
    '[[{"source": "Me", "field_name": "base_type_id", "id": "4", "param_name": "Modern Weaponry"}]]');

INSERT INTO `tags` (`id`, `type`, `tag_type_id`, `order_column`, `name`, `slug`, `created_at`, `updated_at`) VALUES 
(1001,'Metal:Modern-Weaponry',NULL,1,'{"en": "Cartridge"}','{"en": ""}',NULL,NULL),
(1002,'Metal:Modern-Weaponry',NULL,2,'{"en": "Cartridge Case"}','{"en": ""}',NULL,NULL),
(1003,'Metal:Modern-Weaponry',NULL,3,'{"en": "Bullet"}','{"en": ""}',NULL,NULL),
(1004,'Metal:Modern-Weaponry',NULL,4,'{"en": "Shell Head"}','{"en": ""}',NULL,NULL),
(1005,'Metal:Modern-Weaponry',NULL,5,'{"en": "Shrapnel"}','{"en": ""}',NULL,NULL);

