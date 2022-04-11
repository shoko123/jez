INSERT INTO `fauna_taxon_L1` (`id`, `name`) VALUES
(1, 'Unassigned'),
(2, 'Tbd'),
(3, 'Human'),
(4, 'Mammal'),
(5, 'Bird'),
(6, 'Fish'),
(7, 'Insect'),
(8, 'Reptile'),
(9, 'Mollusca');
/*
(10, 'Microfauna');
*/
INSERT INTO `fauna_elements_L1` (`id`, `name`) VALUES
(1, 'Unassigned'),
(2, 'Tbd'),
(3, 'Bone'),
(4, 'Tooth'),
(5, 'Horn/Antler/Hoof'),
(6, 'Leather'),
(7, 'Shell'),
(8, 'Carapace/Spicule');

INSERT INTO `tag_types` (`str_id`, `subject`, `category`, `category_order`, `group_order`, `display_name`, `multiple`, `dependency`) VALUES 

/*registration comes here 1.1,2... */
/*periods come here 2.1,2...)*/
/*preservation comes here 3.1 (preservation_id)*/
/*material comes here 3.2 (preservation_id)*/

('Fauna:Mammal','Fauna','Taxon',3,2,'Mammal',0,'[["L>taxon_L1_id>4"]]'),
('Fauna:Bird','Fauna','Taxon',3,3,'Bird',0,'[["L>taxon_L1_id>5"]]'),

('Fauna:Bone-partition','Fauna','Bone',4,1,'Bone Type',0,'[["L>element_L1_id>3"]]'),
('Fauna:Bone-long','Fauna','Bone',4,2,'Long Bone',0,'[["T>7151"]]'),
('Fauna:Bone-short','Fauna','Bone',4,3,'Short Bone',0,'[["T>7152"]]'),
('Fauna:Bone-flat','Fauna','Bone',4,4,'Flat Bone',0,'[["T>7153"]]'),
('Fauna:Bone-irregular','Fauna','Bone',4,5,'Irregular Bone',0,'[["T>7154"]]'),
('Fauna:Bone-symmetry','Fauna','Bone',4,6,'Symmetry',0,'[["L>element_L1_id>3"]]'),
('Fauna:Bone-fusion','Fauna','Bone',4,7,'Fusion',0,'[["L>element_L1_id>3"]]'),
('Fauna:Tooth-name','Fauna','Tooth',5,1,'Tooth Name',0,'[["L>element_L1_id>4"]]'),
('Fauna:Tooth-age','Fauna','Tooth',5,2,'Tooth Age',0,'[["L>element_L1_id>4"]]'),
('Fauna:Tooth-wear','Fauna','Tooth',5,3,'Tooth Wear',1,'[["L>element_L1_id>4"]]'),

('Fauna:Life-Stage','Fauna','Basic Characteristics',2,2,'Life Stage',1,NULL);

INSERT INTO `tags` (`id`, `type`, `order_column`, `name`, `created_at`, `updated_at`, `slug`) VALUES
(7011,'Fauna:Mammal',1,'{\"en\": \"Ovis\"}',NULL,NULL,'{\"en\": \"\"}'),
(7012,'Fauna:Mammal',2,'{\"en\": \"Capra\"}',NULL,NULL,'{\"en\": \"\"}'),
(7013,'Fauna:Mammal',3,'{\"en\": \"Ovis/Capra\"}',NULL,NULL,'{\"en\": \"\"}'),
(7014,'Fauna:Mammal',4,'{\"en\": \"Bos\"}',NULL,NULL,'{\"en\": \"\"}'),
(7015,'Fauna:Mammal',5,'{\"en\": \"Equus\"}',NULL,NULL,'{\"en\": \"\"}'),
(7016,'Fauna:Mammal',6,'{\"en\": \"Canis\"}',NULL,NULL,'{\"en\": \"\"}'),
(7017,'Fauna:Mammal',7,'{\"en\": \"Sus\"}',NULL,NULL,'{\"en\": \"\"}'),
(7018,'Fauna:Mammal',8,'{\"en\": \"Dama\"}',NULL,NULL,'{\"en\": \"\"}'),
(7019,'Fauna:Mammal',9,'{\"en\": \"Lepus\"}',NULL,NULL,'{\"en\": \"\"}'),
(7020,'Fauna:Mammal',10,'{\"en\": \"Hyrax\"}',NULL,NULL,'{\"en\": \"\"}'),
(7021,'Fauna:Mammal',11,'{\"en\": \"Badger\"}',NULL,NULL,'{\"en\": \"\"}'),
(7022,'Fauna:Mammal',12,'{\"en\": \"Mus\"}',NULL,NULL,'{\"en\": \"\"}'),
(7023,'Fauna:Mammal',13,'{\"en\": \"Felis\"}',NULL,NULL,'{\"en\": \"\"}'),
(7101,'Fauna:Bird',1,'{\"en\": \"Bird of prey\"}',NULL,NULL,'{\"en\": \"\"}'),
(7102,'Fauna:Bird',5,'{\"en\": \"Chicken\"}',NULL,NULL,'{\"en\": \"\"}'),
(7103,'Fauna:Bird',6,'{\"en\": \"Goose\"}',NULL,NULL,'{\"en\": \"\"}'),
(7104,'Fauna:Bird',7,'{\"en\": \"Partridge\"}',NULL,NULL,'{\"en\": \"\"}'),
(7151,'Fauna:Bone-partition',1,'{\"en\": \"Long\"}',NULL,NULL,'{\"en\": \"\"}'),
(7152,'Fauna:Bone-partition',2,'{\"en\": \"Short\"}',NULL,NULL,'{\"en\": \"\"}'),
(7153,'Fauna:Bone-partition',3,'{\"en\": \"Flat\"}',NULL,NULL,'{\"en\": \"\"}'),
(7154,'Fauna:Bone-partition',4,'{\"en\": \"Irregular\"}',NULL,NULL,'{\"en\": \"\"}'),

(7200,'Fauna:Bone-long',1,'{\"en\": \"Femur\"}',NULL,NULL,'{\"en\": \"\"}'),
(7201,'Fauna:Bone-long',2,'{\"en\": \"Tibia\"}',NULL,NULL,'{\"en\": \"\"}'),
(7202,'Fauna:Bone-long',3,'{\"en\": \"Fibula\"}',NULL,NULL,'{\"en\": \"\"}'),
(7203,'Fauna:Bone-long',4,'{\"en\": \"Humerus\"}',NULL,NULL,'{\"en\": \"\"}'),
(7204,'Fauna:Bone-long',5,'{\"en\": \"Radius\"}',NULL,NULL,'{\"en\": \"\"}'),
(7205,'Fauna:Bone-long',6,'{\"en\": \"Ulna\"}',NULL,NULL,'{\"en\": \"\"}'),
(7206,'Fauna:Bone-long',7,'{\"en\": \"Metapodial\"}',NULL,NULL,'{\"en\": \"\"}'),
(7207,'Fauna:Bone-long',8,'{\"en\": \"Metacarpal\"}',NULL,NULL,'{\"en\": \"\"}'),
(7208,'Fauna:Bone-long',9,'{\"en\": \"Metatarsal\"}',NULL,NULL,'{\"en\": \"\"}'),
(7209,'Fauna:Bone-long',10,'{\"en\": \"Phalanx\"}',NULL,NULL,'{\"en\": \"\"}'),
(7210,'Fauna:Bone-long',11,'{\"en\": \"Clavicle\"}',NULL,NULL,'{\"en\": \"\"}'),
(7220,'Fauna:Bone-short',1,'{\"en\": \"Tarsals\"}',NULL,NULL,'{\"en\": \"\"}'),
(7230,'Fauna:Bone-short',2,'{\"en\": \"Carpals\"}',NULL,NULL,'{\"en\": \"\"}'),
(7239,'Fauna:Bone-short',3,'{\"en\": \"Patella\"}',NULL,NULL,'{\"en\": \"\"}'),
(7241,'Fauna:Bone-flat',1,'{\"en\": \"Occipital\"}',NULL,NULL,'{\"en\": \"\"}'),
(7242,'Fauna:Bone-flat',2,'{\"en\": \"Parietal\"}',NULL,NULL,'{\"en\": \"\"}'),
(7243,'Fauna:Bone-flat',3,'{\"en\": \"Frontal\"}',NULL,NULL,'{\"en\": \"\"}'),
(7244,'Fauna:Bone-flat',4,'{\"en\": \"Nasal\"}',NULL,NULL,'{\"en\": \"\"}'),
(7245,'Fauna:Bone-flat',5,'{\"en\": \"Lacrimal\"}',NULL,NULL,'{\"en\": \"\"}'),
(7250,'Fauna:Bone-flat',6,'{\"en\": \"Hip\"}',NULL,NULL,'{\"en\": \"\"}'),
(7251,'Fauna:Bone-flat',7,'{\"en\": \"Ilium\"}',NULL,NULL,'{\"en\": \"\"}'),
(7252,'Fauna:Bone-flat',8,'{\"en\": \"Ischium\"}',NULL,NULL,'{\"en\": \"\"}'),
(7253,'Fauna:Bone-flat',9,'{\"en\": \"Pubis\"}',NULL,NULL,'{\"en\": \"\"}'),
(7254,'Fauna:Bone-flat',10,'{\"en\": \"Sternum\"}',NULL,NULL,'{\"en\": \"\"}'),
(7255,'Fauna:Bone-flat',11,'{\"en\": \"Rib\"}',NULL,NULL,'{\"en\": \"\"}'),
(7256,'Fauna:Bone-flat',12,'{\"en\": \"Scapula\"}',NULL,NULL,'{\"en\": \"\"}'),
(7257,'Fauna:Bone-flat',13,'{\"en\": \"Furcula\"}',NULL,NULL,'{\"en\": \"\"}'),
(7260,'Fauna:Bone-irregular',1,'{\"en\": \"Vertebra\"}',NULL,NULL,'{\"en\": \"\"}'),
(7261,'Fauna:Bone-irregular',2,'{\"en\": \"Sacrun\"}',NULL,NULL,'{\"en\": \"\"}'),
(7262,'Fauna:Bone-irregular',3,'{\"en\": \"Coccyx\"}',NULL,NULL,'{\"en\": \"\"}'),
(7263,'Fauna:Bone-irregular',4,'{\"en\": \"Temporal\"}',NULL,NULL,'{\"en\": \"\"}'),
(7264,'Fauna:Bone-irregular',5,'{\"en\": \"Sphenoid\"}',NULL,NULL,'{\"en\": \"\"}'),
(7265,'Fauna:Bone-irregular',6,'{\"en\": \"Vomer\"}',NULL,NULL,'{\"en\": \"\"}'),
(7266,'Fauna:Bone-irregular',7,'{\"en\": \"Ethmoid\"}',NULL,NULL,'{\"en\": \"\"}'),
(7267,'Fauna:Bone-irregular',8,'{\"en\": \"Zygomatic\"}',NULL,NULL,'{\"en\": \"\"}'),
(7268,'Fauna:Bone-irregular',9,'{\"en\": \"Maxilla\"}',NULL,NULL,'{\"en\": \"\"}'),
(7269,'Fauna:Bone-irregular',10,'{\"en\": \"Mandible\"}',NULL,NULL,'{\"en\": \"\"}'),
(7270,'Fauna:Bone-irregular',11,'{\"en\": \"Palatine\"}',NULL,NULL,'{\"en\": \"\"}'),
(7271,'Fauna:Bone-irregular',12,'{\"en\": \"Inferior nasal concha\"}',NULL,NULL,'{\"en\": \"\"}'),
(7272,'Fauna:Bone-irregular',13,'{\"en\": \"Hyoid\"}',NULL,NULL,'{\"en\": \"\"}'),
(7280,'Fauna:Bone-symmetry',1,'{\"en\": \"Left\"}',NULL,NULL,'{\"en\": \"\"}'),
(7281,'Fauna:Bone-symmetry',1,'{\"en\": \"Right\"}',NULL,NULL,'{\"en\": \"\"}'),
(7290,'Fauna:Bone-fusion',1,'{\"en\": \"Fused\"}',NULL,NULL,'{\"en\": \"\"}'),
(7291,'Fauna:Bone-fusion',1,'{\"en\": \"Unfused\"}',NULL,NULL,'{\"en\": \"\"}'),
(7300,'Fauna:Tooth-name',1,'{\"en\": \"Incisor\"}',NULL,NULL,'{\"en\": \"\"}'),
(7301,'Fauna:Tooth-name',2,'{\"en\": \"Canine\"}',NULL,NULL,'{\"en\": \"\"}'),
(7302,'Fauna:Tooth-name',3,'{\"en\": \"Premolar\"}',NULL,NULL,'{\"en\": \"\"}'),
(7303,'Fauna:Tooth-name',4,'{\"en\": \"Molar\"}',NULL,NULL,'{\"en\": \"\"}'),

(7310,'Fauna:Tooth-age',1,'{\"en\": \"Erupting\"}',NULL,NULL,'{\"en\": \"\"}'),
(7311,'Fauna:Tooth-age',1,'{\"en\": \"Deciduous\"}',NULL,NULL,'{\"en\": \"\"}'),
(7312,'Fauna:Tooth-age',1,'{\"en\": \"Permanent\"}',NULL,NULL,'{\"en\": \"\"}'),
(7320,'Fauna:Tooth-wear',1,'{\"en\": \"a\"}',NULL,NULL,'{\"en\": \"\"}'),
(7321,'Fauna:Tooth-wear',1,'{\"en\": \"b\"}',NULL,NULL,'{\"en\": \"\"}'),
(7322,'Fauna:Tooth-wear',1,'{\"en\": \"c\"}',NULL,NULL,'{\"en\": \"\"}'),
(7323,'Fauna:Tooth-wear',1,'{\"en\": \"d\"}',NULL,NULL,'{\"en\": \"\"}'),
(7324,'Fauna:Tooth-wear',1,'{\"en\": \"e\"}',NULL,NULL,'{\"en\": \"\"}'),
(7325,'Fauna:Tooth-wear',1,'{\"en\": \"f\"}',NULL,NULL,'{\"en\": \"\"}'),
(7326,'Fauna:Tooth-wear',1,'{\"en\": \"g\"}',NULL,NULL,'{\"en\": \"\"}'),
(7327,'Fauna:Tooth-wear',1,'{\"en\": \"h\"}',NULL,NULL,'{\"en\": \"\"}'),





(7400,'Fauna:Life-Stage',1,'{\"en\": \"Secondary Use\"}',NULL,NULL,'{\"en\": \"\"}'),
(7401,'Fauna:Life-Stage',1,'{\"en\": \"Butchery\"}',NULL,NULL,'{\"en\": \"\"}'),
(7402,'Fauna:Life-Stage',1,'{\"en\": \"Burning\"}',NULL,NULL,'{\"en\": \"\"}'),
(7403,'Fauna:Life-Stage',1,'{\"en\": \"Other BSM\"}',NULL,NULL,'{\"en\": \"\"}');