INSERT INTO `groundstones` (`quantity`, `description`, `notes`) VALUES
('2', NULL, NULL),
('1', NULL, NULL),
('1', NULL, NULL),
('1', NULL, NULL),
('1', NULL, NULL),
('1', NULL, NULL),
('1', NULL, 'Bowl'),
('4', NULL, NULL),
('11', NULL, '5 + 5 + 1'),
('20', NULL, '5 + 1 + 14 Does not appear on locus sheets');

INSERT INTO  `finds` (`registration_category`, `locus_id`, `basket_no`, `item_no`, `related_pottery_basket`, `date`, `quantity`, `description`, `notes`, `findable_type`, `findable_id`) VALUES
('GS', 125, 1, 0, NULL, NULL, '2', NULL, NULL, 'Groundstone',  1),
('GS', 91, 1, 0, NULL, NULL, '1', NULL, NULL, 'Groundstone',  2),
('GS', 91, 2, 0, NULL, NULL, '1', NULL, NULL, 'Groundstone',  3),
('GS', 93, 1, 0, 2, '2015-05-27 00:00:00', '1', NULL, NULL, 'Groundstone',  4),
('GS', 94, 1, 0, NULL, NULL, '1', NULL, NULL, 'Groundstone',  5),
('GS', 99, 1, 0, 3, '2015-05-29 00:00:00', '1', NULL, NULL, 'Groundstone',  6),
('GS', 101, 1, 0, 1, '2015-05-27 00:00:00', '1', NULL, 'Bowl', 'Groundstone',  7),
('GS', 102, 1, 0, NULL, NULL, '4', NULL, NULL, 'Groundstone',  8),
('GS', 103, 1, 0, NULL, NULL, '11', NULL, '5 + 5 + 1', 'Groundstone',  9),
('GS', 104, 1, 0, NULL, NULL, '20', NULL, '5 + 1 + 14 Does not appear on locus sheets', 'Groundstone',  10);