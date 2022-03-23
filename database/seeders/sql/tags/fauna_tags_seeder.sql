INSERT INTO `fauna_taxa_L1` (`id`, `name`) VALUES
(1, 'Unassigned'),
(2, 'Tbd'),
(3, 'Mammal'),
(4, 'Bird'),
(5, 'Fish'),
(6, 'Insect'),
(7, 'Reptile'),
(8, 'Mollusca'),
(10, 'Microfauna');

INSERT INTO `fauna_elements_L1` (`id`, `name`) VALUES
(1, 'Unassigned'),
(2, 'Tbd'),
(3, 'Bone - long'),
(4, 'Bone - short'),
(5, 'Bone - flat'),
(6, 'Bone - irregular'),
(7, 'Bone - sesamoid'),
(8, 'Tooth'),
(9, 'Horn/Antler/Hoof'),
(10, 'Shell'),
(11, 'Carapace/Spicule');

INSERT INTO `tag_types` (`str_id`, `subject`, `category`, `category_order`, `group_order`, `display_name`, `multiple`, `dependency`) VALUES 

/*registration comes here 1.1,2... */
/*periods come here 2.1,2...)*/
/*preservation comes here 3.1 (preservation_id)*/
/*material comes here 3.2 (preservation_id)*/

('Fauna:Taxa-Mammal','Fauna','Taxa',2,2,'Mammal',0,'[["L>fauna_taxa_L1_id>3"]]'),
('Fauna:Taxa-Bird','Fauna','Taxa',2,3,'Bird',0,'[["L>fauna_taxa_L1_id>4"]]'),

('Fauna:Element-bone-long','Fauna','Element',3,8,'Long Bone',0,'[["L>fauna_elements_L1_id>3"]]'),
('Fauna:Element-bone-short','Fauna','Element',3,9,'Short Bone',0,'[["L>fauna_elements_L1_id>4"]]'),
('Fauna:Carpals','Fauna','Element',3,9,'Carpals',0,'[["T>Fauna:Element-bone-short>7220"]]'),
('Fauna:Tarsals','Fauna','Element',3,10,'Tarsals',0,'[["L>Fauna:Element-bone-short>7230"]]'),

('Fauna:Element-bone-flat','Fauna','Element',3,11,'Flat Bone',0,'[["L>fauna_elements_L1_id>5"]]'),
('Fauna:Element-bone-irregular','Fauna','Element',3,12,'Irregular Bone',0,'[["L>fauna_elements_L1_id>6"]]'),
('Fauna:Element-tooth','Fauna','Element',3,13,'Tooth',0,'[["L>fauna_elements_L1_id>8"]]');

INSERT INTO `tags` (`id`, `type`, `order_column`, `name`, `created_at`, `updated_at`, `slug`) VALUES
(7011,'Fauna:Taxa-Mammal',1,'{\"en\": \"Ovis\"}',NULL,NULL,'{\"en\": \"\"}'),
(7012,'Fauna:Taxa-Mammal',2,'{\"en\": \"Capra\"}',NULL,NULL,'{\"en\": \"\"}'),
(7013,'Fauna:Taxa-Mammal',3,'{\"en\": \"Ovis/Capra\"}',NULL,NULL,'{\"en\": \"\"}'),
(7014,'Fauna:Taxa-Mammal',4,'{\"en\": \"Bos\"}',NULL,NULL,'{\"en\": \"\"}'),
(7015,'Fauna:Taxa-Mammal',5,'{\"en\": \"Equus\"}',NULL,NULL,'{\"en\": \"\"}'),
(7016,'Fauna:Taxa-Mammal',6,'{\"en\": \"Canis\"}',NULL,NULL,'{\"en\": \"\"}'),
(7017,'Fauna:Taxa-Mammal',7,'{\"en\": \"Sus\"}',NULL,NULL,'{\"en\": \"\"}'),
(7018,'Fauna:Taxa-Mammal',8,'{\"en\": \"Dama\"}',NULL,NULL,'{\"en\": \"\"}'),
(7019,'Fauna:Taxa-Mammal',9,'{\"en\": \"Lepus\"}',NULL,NULL,'{\"en\": \"\"}'),
(7020,'Fauna:Taxa-Mammal',10,'{\"en\": \"Hyrax\"}',NULL,NULL,'{\"en\": \"\"}'),
(7021,'Fauna:Taxa-Mammal',11,'{\"en\": \"Badger\"}',NULL,NULL,'{\"en\": \"\"}'),
(7022,'Fauna:Taxa-Mammal',12,'{\"en\": \"Mus\"}',NULL,NULL,'{\"en\": \"\"}'),
(7023,'Fauna:Taxa-Mammal',13,'{\"en\": \"Felis\"}',NULL,NULL,'{\"en\": \"\"}'),
(7101,'Fauna:Taxa-Bird',1,'{\"en\": \"Bird of prey\"}',NULL,NULL,'{\"en\": \"\"}'),
(7102,'Fauna:Taxa-Bird',5,'{\"en\": \"Chicken\"}',NULL,NULL,'{\"en\": \"\"}'),
(7103,'Fauna:Taxa-Bird',6,'{\"en\": \"Goose\"}',NULL,NULL,'{\"en\": \"\"}'),
(7104,'Fauna:Taxa-Bird',7,'{\"en\": \"Partridge\"}',NULL,NULL,'{\"en\": \"\"}'),

(7200,'Fauna:Element-bone-long',1,'{\"en\": \"femur\"}',NULL,NULL,'{\"en\": \"\"}'),
(7201,'Fauna:Element-bone-long',2,'{\"en\": \"tibia\"}',NULL,NULL,'{\"en\": \"\"}'),
(7202,'Fauna:Element-bone-long',3,'{\"en\": \"fibula\"}',NULL,NULL,'{\"en\": \"\"}'),
(7203,'Fauna:Element-bone-long',4,'{\"en\": \"humerus\"}',NULL,NULL,'{\"en\": \"\"}'),
(7204,'Fauna:Element-bone-long',5,'{\"en\": \"radius\"}',NULL,NULL,'{\"en\": \"\"}'),
(7205,'Fauna:Element-bone-long',6,'{\"en\": \"ulna\"}',NULL,NULL,'{\"en\": \"\"}'),
(7206,'Fauna:Element-bone-long',7,'{\"en\": \"metapodial\"}',NULL,NULL,'{\"en\": \"\"}'),
(7207,'Fauna:Element-bone-long',8,'{\"en\": \"metacarpal\"}',NULL,NULL,'{\"en\": \"\"}'),
(7208,'Fauna:Element-bone-long',9,'{\"en\": \"metatarsal\"}',NULL,NULL,'{\"en\": \"\"}'),
(7209,'Fauna:Element-bone-long',10,'{\"en\": \"phalanx\"}',NULL,NULL,'{\"en\": \"\"}'),
(7210,'Fauna:Element-bone-long',11,'{\"en\": \"clavicle\"}',NULL,NULL,'{\"en\": \"\"}'),


(7220,'Fauna:Element-bone-short',1,'{\"en\": \"Tarsals\"}',NULL,NULL,'{\"en\": \"\"}'),
(7221,'Fauna:Tarsals',1,'{\"en\": \"Calcaneus\"}',NULL,NULL,'{\"en\": \"\"}'),
(7222,'Fauna:Tarsals',2,'{\"en\": \"Talus\"}',NULL,NULL,'{\"en\": \"\"}'),
(7223,'Fauna:Tarsals',3,'{\"en\": \"Cuboid\"}',NULL,NULL,'{\"en\": \"\"}'),
(7224,'Fauna:Tarsals',4,'{\"en\": \"Navicular\"}',NULL,NULL,'{\"en\": \"\"}'),
(7225,'Fauna:Tarsals',5,'{\"en\": \"Cuneiform\"}',NULL,NULL,'{\"en\": \"\"}'),

(7230,'Fauna:Element-bone-short',2,'{\"en\": \"Carpals\"}',NULL,NULL,'{\"en\": \"\"}'),
(7231,'Fauna:Carpals',1,'{\"en\": \"Scaphoid\"}',NULL,NULL,'{\"en\": \"\"}'),
(7232,'Fauna:Carpals',2,'{\"en\": \"Trapezium\"}',NULL,NULL,'{\"en\": \"\"}'),
(7233,'Fauna:Carpals',3,'{\"en\": \"Trapezoid\"}',NULL,NULL,'{\"en\": \"\"}'),
(7234,'Fauna:Carpals',4,'{\"en\": \"Lunate\"}',NULL,NULL,'{\"en\": \"\"}'),
(7235,'Fauna:Carpals',5,'{\"en\": \"Capitate\"}',NULL,NULL,'{\"en\": \"\"}'),
(7236,'Fauna:Carpals',6,'{\"en\": \"Triquetrum\"}',NULL,NULL,'{\"en\": \"\"}'),
(7237,'Fauna:Carpals',7,'{\"en\": \"Pisiform\"}',NULL,NULL,'{\"en\": \"\"}'),
(7238,'Fauna:Carpals',8,'{\"en\": \"Hamate\"}',NULL,NULL,'{\"en\": \"\"}'),
(7239,'Fauna:Element-bone-short',3,'{\"en\": \"Patella\"}',NULL,NULL,'{\"en\": \"\"}'),


(7241,'Fauna:Element-bone-flat',1,'{\"en\": \"Occipital\"}',NULL,NULL,'{\"en\": \"\"}'),
(7242,'Fauna:Element-bone-flat',2,'{\"en\": \"Parietal\"}',NULL,NULL,'{\"en\": \"\"}'),
(7243,'Fauna:Element-bone-flat',3,'{\"en\": \"Frontal\"}',NULL,NULL,'{\"en\": \"\"}'),
(7244,'Fauna:Element-bone-flat',4,'{\"en\": \"Nasal\"}',NULL,NULL,'{\"en\": \"\"}'),
(7245,'Fauna:Element-bone-flat',5,'{\"en\": \"Lacrimal\"}',NULL,NULL,'{\"en\": \"\"}'),

(7250,'Fauna:Element-bone-flat',6,'{\"en\": \"Hip\"}',NULL,NULL,'{\"en\": \"\"}'),
(7251,'Fauna:Element-bone-flat',7,'{\"en\": \"Ilium\"}',NULL,NULL,'{\"en\": \"\"}'),
(7252,'Fauna:Element-bone-flat',8,'{\"en\": \"Ischium\"}',NULL,NULL,'{\"en\": \"\"}'),
(7253,'Fauna:Element-bone-flat',9,'{\"en\": \"Pubis\"}',NULL,NULL,'{\"en\": \"\"}'),
(7254,'Fauna:Element-bone-flat',10,'{\"en\": \"Sternum\"}',NULL,NULL,'{\"en\": \"\"}'),
(7255,'Fauna:Element-bone-flat',11,'{\"en\": \"Rib\"}',NULL,NULL,'{\"en\": \"\"}'),
(7256,'Fauna:Element-bone-flat',12,'{\"en\": \"Scapula\"}',NULL,NULL,'{\"en\": \"\"}'),
(7257,'Fauna:Element-bone-flat',13,'{\"en\": \"Furcula\"}',NULL,NULL,'{\"en\": \"\"}'),

(7260,'Fauna:Element-bone-irregular',1,'{\"en\": \"Vertebra\"}',NULL,NULL,'{\"en\": \"\"}'),
(7261,'Fauna:Element-bone-irregular',2,'{\"en\": \"Sacrun\"}',NULL,NULL,'{\"en\": \"\"}'),
(7262,'Fauna:Element-bone-irregular',3,'{\"en\": \"Coccyx\"}',NULL,NULL,'{\"en\": \"\"}'),
(7263,'Fauna:Element-bone-irregular',4,'{\"en\": \"Temporal\"}',NULL,NULL,'{\"en\": \"\"}'),
(7264,'Fauna:Element-bone-irregular',5,'{\"en\": \"Sphenoid\"}',NULL,NULL,'{\"en\": \"\"}'),
(7265,'Fauna:Element-bone-irregular',6,'{\"en\": \"Vomer\"}',NULL,NULL,'{\"en\": \"\"}'),
(7266,'Fauna:Element-bone-irregular',7,'{\"en\": \"Ethmoid\"}',NULL,NULL,'{\"en\": \"\"}'),
(7267,'Fauna:Element-bone-irregular',8,'{\"en\": \"Zygomatic\"}',NULL,NULL,'{\"en\": \"\"}'),
(7268,'Fauna:Element-bone-irregular',9,'{\"en\": \"Maxilla\"}',NULL,NULL,'{\"en\": \"\"}'),
(7269,'Fauna:Element-bone-irregular',10,'{\"en\": \"Mandible\"}',NULL,NULL,'{\"en\": \"\"}'),
(7270,'Fauna:Element-bone-irregular',11,'{\"en\": \"Palatine\"}',NULL,NULL,'{\"en\": \"\"}'),
(7271,'Fauna:Element-bone-irregular',12,'{\"en\": \"Inferior nasal concha\"}',NULL,NULL,'{\"en\": \"\"}'),
(7272,'Fauna:Element-bone-irregular',13,'{\"en\": \"Hyoid\"}',NULL,NULL,'{\"en\": \"\"}');