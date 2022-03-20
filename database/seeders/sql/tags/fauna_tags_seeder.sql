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

('Fauna:Taxa-Mammal','Fauna','Taxa',3,4,'Taxa',0,'[["L>fauna_taxa_L1_id>3"]]'),
('Fauna:Taxa-Bird','Fauna','Taxa',3,5,'Taxa',0,'[["L>fauna_taxa_L1_id>4"]]'),

('Fauna:Element-bone-long','Fauna','Taxa',3,7,'Taxa',0,'[["L>fauna_elements_L1_id>3"]]'),
('Fauna:Element-bone-short','Fauna','Taxa',3,8,'Taxa',0,'[["L>fauna_elements_L1_id>4"]]'),
('Fauna:Element-bone-flat','Fauna','Taxa',3,9,'Taxa',0,'[["L>fauna_elements_L1_id>5"]]'),
('Fauna:Element-bone-irregular','Fauna','Taxa',3,10,'Taxa',0,'[["L>fauna_elements_L1_id>6"]]'),
('Fauna:Element-tooth','Fauna','Taxa',3,11,'Taxa',0,'[["L>fauna_elements_L1_id>8"]]');

INSERT INTO `tags` (`id`, `type`, `order_column`, `name`, `created_at`, `updated_at`, `slug`) VALUES
(7011,'Fauna:Taxa-Mammal',1,'{\"en\": \"Ovis\"}',NULL,NULL,'{\"en\": \"\"}'),
(7012,'Fauna:Taxa-Mammal',1,'{\"en\": \"Capra\"}',NULL,NULL,'{\"en\": \"\"}'),
(7013,'Fauna:Taxa-Mammal',1,'{\"en\": \"Ovis/Capra\"}',NULL,NULL,'{\"en\": \"\"}'),
(7014,'Fauna:Taxa-Mammal',1,'{\"en\": \"Bos\"}',NULL,NULL,'{\"en\": \"\"}'),
(7015,'Fauna:Taxa-Mammal',1,'{\"en\": \"Equus\"}',NULL,NULL,'{\"en\": \"\"}'),
(7016,'Fauna:Taxa-Mammal',1,'{\"en\": \"Canis\"}',NULL,NULL,'{\"en\": \"\"}'),
(7017,'Fauna:Taxa-Mammal',1,'{\"en\": \"Sus\"}',NULL,NULL,'{\"en\": \"\"}'),
(7018,'Fauna:Taxa-Mammal',1,'{\"en\": \"Dama\"}',NULL,NULL,'{\"en\": \"\"}'),
(7019,'Fauna:Taxa-Mammal',1,'{\"en\": \"Lepus\"}',NULL,NULL,'{\"en\": \"\"}'),
(7020,'Fauna:Taxa-Mammal',1,'{\"en\": \"Hyrax\"}',NULL,NULL,'{\"en\": \"\"}'),
(7021,'Fauna:Taxa-Mammal',1,'{\"en\": \"Badger\"}',NULL,NULL,'{\"en\": \"\"}'),
(7022,'Fauna:Taxa-Mammal',1,'{\"en\": \"Mus\"}',NULL,NULL,'{\"en\": \"\"}'),
(7023,'Fauna:Taxa-Mammal',1,'{\"en\": \"Felis\"}',NULL,NULL,'{\"en\": \"\"}'),
(7101,'Fauna:Taxa-Bird',1,'{\"en\": \"Bird of prey\"}',NULL,NULL,'{\"en\": \"\"}'),
(7102,'Fauna:Taxa-Bird',1,'{\"en\": \"Chicken\"}',NULL,NULL,'{\"en\": \"\"}'),
(7103,'Fauna:Taxa-Bird',1,'{\"en\": \"Goose\"}',NULL,NULL,'{\"en\": \"\"}'),
(7104,'Fauna:Taxa-Bird',1,'{\"en\": \"Partridge\"}',NULL,NULL,'{\"en\": \"\"}');

