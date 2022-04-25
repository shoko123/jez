INSERT INTO `preservations` (`id`, `name`) VALUES
(1,'Unassigned'),
(2,'Incomplete'),
(3,'Fragment'),
(4,'Complete');

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

INSERT INTO `flora_base_types` (`id`, `name`) VALUES
(1,'Unassigned'),
(2,'Seed'),
(3,'Charcoal'),
(4,'Tbd');

INSERT INTO `glass_base_types` (`id`, `name`) VALUES
(1,'Unassigned'),
(2, 'Vessel/Lamp'),
(3, 'Bead'),
(4, 'Bangle'),
(5, 'Window Glass'),
(6, 'Tbd'),
(7, 'Unknown');

INSERT INTO `lithic_base_types` (`id`, `name`) VALUES
(1,'Unassigned'),
(2, 'Debitage'),
(3, 'CTE'),
(4, 'Burin spall'),
(5, 'Biface spall'),
(6, 'MBT'),
(7, 'Core'),
(8, 'Hammer Stone'),
(9, 'Debris Chunk'),
(10, 'Debris Chip'),
(11, 'Tool'),
(20, 'Tbd');

INSERT INTO `metal_base_types` (`id`, `name`) VALUES 
(1,'Unassigned'),
(20,'Nail'),
(21,'Horseshoe'),
(30,'Ornament/Accessory'),
(40,'Modern Weaponry'),
(50,'Coin'),
(100,'Unknown');

INSERT INTO `metal_materials` (`id`, `name`) VALUES
(1,'Unassigned'),
(2, 'Iron'),
(3, 'Steel'),
(4, 'Copper'),
(5, 'Brass'),
(6, 'Bronze'),
(7, 'Lead'),
(8, 'Tin'),
(9, 'Zinc'),
(10, 'Silver'),
(11, 'Gold'),
(20, 'Unknown');

INSERT INTO `pottery_base_types` (`id`, `name`) VALUES
(1,'Unassigned'),
(2,'Vessel/Lid'),
(3, 'Lamp'),
(4,'Ceramic Artifact'),
(5,'Architectural/Installation'),
(6,'Ceramic Production/Waste'),
(7,'Miscellenia');

INSERT INTO `stone_materials` (`id`, `name`) VALUES
(1,'Unassigned'),
(2,'Basalt-vesicular'),
(3,'Basalt-dense'),
(4,'Scoria'),
(5,'Pumice'),
(6,'Limestone'),
(7,'Chalk'),
(8,'Flint or Chert'),
(9,'Sandstone'),
(10,'Granite'),
(11,'amethyst'),
(12,'Steatite'),
(100,'unknown');

INSERT INTO `stone_base_types` (`id`, `name`) VALUES
(1,'Unassigned'),
(2,'Passive'),
(3,'Active (handheld)'),
(4,'Indeterminate Slab or Upper Grinding Stone'),
(5,'Vessel'),
(6,'Non-Processor'),
(7,'Tbd');





