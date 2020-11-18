INSERT INTO `metal_base_types` (`id`, `name`) VALUES
(1,'Unassigned'),
(2, 'Coin'),
(3, 'Nail/Pin'),
(4, 'Modern Weaponry'),
(5, 'TBD'),
(6, 'Unknown');

INSERT INTO `tag_types` (`str_id`, `name_major`, `name_minor`, `display_name`, `multiple`, `order_column`, `dependency`) VALUES 
('Metal:Modern-Weaponry','Metal','Modern-Weaponry','Modern-weaponry',0,1,'{"depends_on_tag": false, "field_name": "base_type_id", "param_name": "Modern Weaponry" }');

INSERT INTO `tags` (`id`, `name`, `slug`, `type`, `order_column`, `created_at`, `updated_at`) VALUES
(1001,'{"en": "Cartidige"}','{"en": ""}','Metal:Modern-Weaponry',1,NULL,NULL),
(1002,'{"en": "Cartridge Case"}','{"en": ""}','Metal:Modern-Weaponry',1,NULL,NULL),
(1003,'{"en": "Bullet"}','{"en": ""}','Metal:Modern-Weaponry',1,NULL,NULL),
(1004,'{"en": "Shell Head"}','{"en": ""}','Metal:Modern-Weaponry',1,NULL,NULL),
(1005,'{"en": "Shrapnel"}','{"en": ""}','Metal:Modern-Weaponry',1,NULL,NULL);

