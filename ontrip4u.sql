-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 04, 2018 at 03:10 AM
-- Server version: 10.1.31-MariaDB
-- PHP Version: 5.6.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ontrip4u`
--

-- --------------------------------------------------------

--
-- Table structure for table `bills`
--

CREATE TABLE `bills` (
  `bill_id` int(10) UNSIGNED NOT NULL,
  `store_id` int(10) UNSIGNED NOT NULL,
  `bill_cost` varchar(255) COLLATE utf8_bin NOT NULL,
  `content` text COLLATE utf8_bin NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `qr_code` varchar(255) COLLATE utf8_bin NOT NULL,
  `bill_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `bill_tot_cost` decimal(15,2) DEFAULT NULL,
  `dc_rate` double(4,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `bills`
--

INSERT INTO `bills` (`bill_id`, `store_id`, `bill_cost`, `content`, `created_at`, `updated_at`, `qr_code`, `bill_date`, `bill_tot_cost`, `dc_rate`) VALUES
(1, 2, '1159761', 'Illo officia et totam odit. Qui quia assumenda non nesciunt quae dolor quos nisi. Magnam et sint corrupti tenetur. Est sit qui voluptates ad. Velit voluptas dolore rerum assumenda.', '2018-05-03 00:05:14', '2018-05-03 00:05:14', '498', '2017-08-03 00:47:06', '6562830.00', 31.00),
(2, 2, '215618', 'Eligendi repellendus ea rerum aliquid perferendis. Quidem rerum officiis aut. A aut molestiae magnam repudiandae itaque enim assumenda. Quia vero sed officiis voluptatibus.', '2018-05-03 00:05:14', '2018-05-03 00:05:14', '1552', '2017-06-26 18:10:14', '15978287.00', 23.00),
(3, 3, '1484033', 'Libero blanditiis nulla quidem et. Distinctio error consequatur hic quibusdam dicta. Inventore non impedit adipisci doloribus. Molestias atque ipsum cupiditate ut aut itaque.', '2018-05-03 00:05:14', '2018-05-03 00:05:14', '1041', '2017-08-08 14:27:22', '13877531.00', 23.00),
(4, 3, '1620529', 'Reiciendis consequatur dolorem labore possimus. Quam aut aliquid molestiae. Reiciendis nam fuga vitae nostrum ut temporibus enim. Quia nostrum tenetur quia ratione enim incidunt itaque.', '2018-05-03 00:05:14', '2018-05-03 00:05:14', '659', '2017-06-16 07:10:07', '5010221.00', 44.00);

-- --------------------------------------------------------

--
-- Table structure for table `bill_details`
--

CREATE TABLE `bill_details` (
  `bill_detail_id` int(10) UNSIGNED NOT NULL,
  `guider_id` int(10) UNSIGNED NOT NULL,
  `company_id` int(10) UNSIGNED NOT NULL,
  `city_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `cities`
--

CREATE TABLE `cities` (
  `city_id` int(10) UNSIGNED NOT NULL,
  `city_name` varchar(255) COLLATE utf8_bin NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `city_ko_name` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `city_en_name` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `city_vn_name` varchar(255) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `cities`
--

INSERT INTO `cities` (`city_id`, `city_name`, `created_at`, `updated_at`, `city_ko_name`, `city_en_name`, `city_vn_name`) VALUES
(1, 'Seoun', NULL, NULL, 'Seoun', 'Seoun', 'Seoun');

-- --------------------------------------------------------

--
-- Table structure for table `companies`
--

CREATE TABLE `companies` (
  `company_id` int(10) UNSIGNED NOT NULL,
  `company_name` varchar(255) COLLATE utf8_bin NOT NULL,
  `company_address` text COLLATE utf8_bin,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `country_id` int(10) UNSIGNED NOT NULL,
  `city_id` int(10) UNSIGNED NOT NULL,
  `company_tel` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `ceo_name` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `guid_fee_rate` double(4,2) DEFAULT NULL,
  `home_page` varchar(255) COLLATE utf8_bin NOT NULL,
  `guide_level` smallint(6) NOT NULL DEFAULT '1',
  `commission_rate` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `contact_persion` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `contact_email` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `parent_commission_rate` double(4,2) NOT NULL DEFAULT '0.00',
  `parent_company` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `companies`
--

INSERT INTO `companies` (`company_id`, `company_name`, `company_address`, `created_at`, `updated_at`, `country_id`, `city_id`, `company_tel`, `ceo_name`, `guid_fee_rate`, `home_page`, `guide_level`, `commission_rate`, `contact_persion`, `contact_email`, `parent_commission_rate`, `parent_company`) VALUES
(1, 'company', 'aaa', NULL, NULL, 1, 1, '0123456789', 'seo name', 1.00, 'homepage.com', 5, '1', NULL, NULL, 0.00, NULL),
(2, 'Schamberger-McClure', '5017 Wilfrid Island Apt. 854\nRahultown, WA 45312-8483', '2018-05-03 00:05:14', '2018-05-03 00:05:14', 1, 1, '(809) 787-2337 x766', 'Brad Lind', 1.00, 'harvey.com', 2, '1', NULL, NULL, 0.00, NULL),
(3, 'Runolfsson-Jacobs', '9151 Pietro Gateway\nEast Clarabelle, IN 83315-5744', '2018-05-03 00:05:14', '2018-05-03 00:05:14', 1, 1, '1-874-595-2999', 'Pamela Gorczany', 1.00, 'kris.com', 1, '1', NULL, NULL, 0.00, NULL),
(4, 'Williamson-Stracke', '7708 Kerluke Burgs\nWest Manuel, NH 93787-0061', '2018-05-03 00:05:14', '2018-05-03 00:05:14', 1, 1, '+1-403-647-0252', 'Mr. Trace Walter I', 1.00, 'johnston.com', 4, '1', NULL, NULL, 0.00, NULL),
(5, 'Hand LLC', '146 Brisa Mountain Suite 725\nPort Connorside, HI 86865-6843', '2018-05-03 00:05:14', '2018-05-03 00:05:14', 1, 1, '(914) 781-6301', 'Genevieve Marks', 1.00, 'hyatt.info', 2, '1', NULL, NULL, 0.00, NULL),
(6, 'Dicki and Sons', '42961 Sydnee Extension Apt. 366\nPort Grady, WV 40076-6641', '2018-05-03 00:05:14', '2018-05-03 00:05:14', 1, 1, '(618) 730-5549', 'Kenya Pfeffer', 1.00, 'greenholt.com', 2, '1', NULL, NULL, 0.00, NULL),
(7, 'Runte-Schultz', '26501 Kuphal Junctions Suite 225\nPagacborough, DC 19484', '2018-05-03 00:05:14', '2018-05-03 00:05:14', 1, 1, '910-559-9500 x4684', 'Daniela Torp', 1.00, 'sauer.com', 1, '1', NULL, NULL, 0.00, NULL),
(8, 'Stehr, Lesch and Hills', '9418 Charlotte Drives Apt. 901\nEast Malliemouth, AK 27210-5879', '2018-05-03 00:05:14', '2018-05-03 00:05:14', 1, 1, '+1 (264) 225-4125', 'Lloyd Parker', 1.00, 'beier.org', 1, '1', NULL, NULL, 0.00, NULL),
(9, 'Larson PLC', '10821 Tommie Junctions\nYadirastad, NJ 35421', '2018-05-03 00:05:14', '2018-05-03 00:05:14', 1, 1, '229-517-4487 x3375', 'Armand White', 1.00, 'welch.net', 5, '1', NULL, NULL, 0.00, NULL),
(10, 'Herzog and Sons', '2235 Josue Alley Apt. 141\nRyanbury, NJ 61848-0932', '2018-05-03 00:05:14', '2018-05-03 00:05:14', 1, 1, '+1 (707) 780-1850', 'Germaine Koss', 1.00, 'wehner.com', 2, '1', NULL, NULL, 0.00, NULL),
(11, 'Greenholt-Yost', '3515 Morissette Rue\nNew Verlie, DE 37561', '2018-05-03 00:05:14', '2018-05-03 00:05:14', 1, 1, '(706) 734-7868', 'Dr. Ole Strosin DVM', 1.00, 'davis.com', 1, '1', NULL, NULL, 0.00, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `countries`
--

CREATE TABLE `countries` (
  `country_id` int(10) UNSIGNED NOT NULL,
  `country_name` varchar(255) COLLATE utf8_bin NOT NULL,
  `city_ko_name` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `city_en_name` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `city_vn_name` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `countries`
--

INSERT INTO `countries` (`country_id`, `country_name`, `city_ko_name`, `city_en_name`, `city_vn_name`, `created_at`, `updated_at`) VALUES
(1, 'Korea', 'Seoun', 'Seoun', 'Seoun', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `guiders`
--

CREATE TABLE `guiders` (
  `guid_id` varchar(11) COLLATE utf8_bin NOT NULL,
  `guid_name` varchar(255) COLLATE utf8_bin NOT NULL,
  `guid_phone` bigint(20) DEFAULT NULL,
  `guid_resident_number` varchar(20) COLLATE utf8_bin DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `manager_guid_id` int(11) NOT NULL DEFAULT '0',
  `guid_level` smallint(5) UNSIGNED NOT NULL COMMENT 'Update from SP',
  `guid_status` smallint(5) UNSIGNED NOT NULL COMMENT '0-Act, 1-unAct',
  `user_id` int(11) DEFAULT NULL,
  `company_id` int(10) UNSIGNED NOT NULL,
  `city_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `guiders`
--

INSERT INTO `guiders` (`guid_id`, `guid_name`, `guid_phone`, `guid_resident_number`, `created_at`, `updated_at`, `manager_guid_id`, `guid_level`, `guid_status`, `user_id`, `company_id`, `city_id`) VALUES
('1', 'guider', 123654789, '1', NULL, NULL, 1, 1, 1, 3, 1, 1),
('12612782', 'David Upton', 260, '1', '2018-05-03 00:05:14', '2018-05-03 00:05:14', 1, 1, 1, NULL, 2, 1),
('14751458', 'Lewis Cartwright', 831, '1', '2018-05-03 00:05:14', '2018-05-03 00:05:14', 1, 1, 1, NULL, 3, 1),
('17157950', 'Prof. Keshawn Kiehn', 139, '1', '2018-05-03 00:05:14', '2018-05-03 00:05:14', 1, 1, 1, NULL, 5, 1),
('19487907', 'Keyshawn O\'Kon', 309, '1', '2018-05-03 00:05:14', '2018-05-03 00:05:14', 1, 1, 1, NULL, 4, 1),
('19821765', 'Melyssa Collier I', 332, '1', '2018-05-03 00:05:14', '2018-05-03 00:05:14', 1, 1, 1, NULL, 5, 1),
('19949294', 'Mrs. Corine Gislason Jr.', 801, '1', '2018-05-03 00:05:14', '2018-05-03 00:05:14', 1, 1, 1, NULL, 4, 1),
('2168745', 'Sammie Stroman', 634, '1', '2018-05-03 00:05:14', '2018-05-03 00:05:14', 1, 1, 1, NULL, 4, 1),
('2967488', 'Serenity Johns', 818, '1', '2018-05-03 00:05:14', '2018-05-03 00:05:14', 1, 1, 1, NULL, 1, 1),
('4202896', 'Shana Koepp', 321, '1', '2018-05-03 00:05:14', '2018-05-03 00:05:14', 1, 1, 1, NULL, 5, 1),
('5308605', 'Lydia Koch V', 1001, '1', '2018-05-03 00:05:14', '2018-05-03 00:05:14', 1, 1, 1, NULL, 5, 1);

-- --------------------------------------------------------

--
-- Table structure for table `info_guider_fee_rate`
--

CREATE TABLE `info_guider_fee_rate` (
  `company_id` int(10) UNSIGNED NOT NULL,
  `seller_level` smallint(5) UNSIGNED NOT NULL,
  `guid_level` smallint(5) UNSIGNED NOT NULL,
  `guid_rate` double(4,2) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) COLLATE utf8_bin NOT NULL,
  `payload` longtext COLLATE utf8_bin NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `link_company_store`
--

CREATE TABLE `link_company_store` (
  `store_id` int(10) UNSIGNED NOT NULL,
  `company_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `link_store_id` int(10) UNSIGNED NOT NULL,
  `dc_rate` double(4,2) DEFAULT NULL,
  `company_fee_rate` double(4,2) DEFAULT NULL,
  `user_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `link_company_store`
--

INSERT INTO `link_company_store` (`store_id`, `company_id`, `created_at`, `updated_at`, `link_store_id`, `dc_rate`, `company_fee_rate`, `user_id`) VALUES
(1, 1, NULL, NULL, 10, 10.00, 10.00, 4),
(8, 7, '2018-05-03 00:05:14', '2018-05-03 00:05:14', 6511, 1.00, 1.00, NULL),
(7, 8, '2018-05-03 00:05:14', '2018-05-03 00:05:14', 9063, 1.00, 1.00, NULL),
(4, 4, '2018-05-03 00:05:14', '2018-05-03 00:05:14', 9810, 1.00, 1.00, NULL),
(3, 2, '2018-05-03 00:05:14', '2018-05-03 00:05:14', 16812, 1.00, 1.00, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `link_qr_companies`
--

CREATE TABLE `link_qr_companies` (
  `link_qr_id` int(10) UNSIGNED NOT NULL,
  `qr_code` varchar(100) COLLATE utf8_bin NOT NULL,
  `city_id` int(10) UNSIGNED NOT NULL,
  `company_id` int(10) UNSIGNED NOT NULL,
  `guid_id` int(10) UNSIGNED NOT NULL,
  `link_from_date` timestamp NULL DEFAULT NULL,
  `link_to_date` timestamp NULL DEFAULT NULL,
  `content` text COLLATE utf8_bin,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `link_qr_companies`
--

INSERT INTO `link_qr_companies` (`link_qr_id`, `qr_code`, `city_id`, `company_id`, `guid_id`, `link_from_date`, `link_to_date`, `content`, `created_at`, `updated_at`) VALUES
(1, '498', 1, 2, 1, '1985-09-06 20:21:53', '2004-02-04 04:44:34', 'Animi minus voluptatibus sint et quo magni reiciendis. Nobis qui quia harum architecto. Suscipit ipsam nobis deleniti quod quis.', '2018-05-03 00:05:14', '2018-05-03 00:05:14'),
(2, '1552', 1, 2, 1, '1972-04-01 17:46:27', '1993-09-15 09:58:58', 'Pariatur quia molestias sit commodi ipsa et. Tempore voluptas error soluta tenetur aliquid eaque.', '2018-05-03 00:05:14', '2018-05-03 00:05:14'),
(3, '1041', 1, 1, 1, '1974-01-02 02:06:35', '1977-02-13 07:01:28', 'Ut dolores sit voluptas tempore. Voluptate voluptas et cum dolor. Quidem voluptate illum minus qui numquam quia sed reiciendis.', '2018-05-03 00:05:14', '2018-05-03 00:05:14'),
(4, '659', 1, 1, 1, '1971-03-19 10:34:26', '2000-07-16 03:05:42', 'Cupiditate sint est qui odio ipsum dolorem distinctio velit. Numquam ratione dolore vitae. Tempora exercitationem atque adipisci rerum aut atque.', '2018-05-03 00:05:14', '2018-05-03 00:05:14');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8_bin NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(190, '2014_10_12_000000_create_users_table', 1),
(191, '2014_10_12_100000_create_password_resets_table', 1),
(192, '2018_02_21_044003_create_companies_table', 1),
(193, '2018_02_22_043311_create_stores_table', 1),
(194, '2018_02_22_043434_create_guiders_table', 1),
(195, '2018_02_22_044014_create_bills_table', 1),
(196, '2018_02_22_062143_create_profits_table', 1),
(197, '2018_02_22_095242_entrust_setup_tables', 1),
(198, '2018_02_26_022553_create_user_verifications_table', 1),
(199, '2018_02_26_082823_create_percents_table', 1),
(200, '2018_02_26_083031_create_divs_table', 1),
(201, '2018_02_26_093351_remove_guider_id_from_guiders_table', 1),
(202, '2018_02_26_094502_remove_store_id_from_stores_table', 1),
(203, '2018_02_27_021935_add_number_to_guiders_tables', 1),
(204, '2018_03_02_073237_update_database_tables', 1),
(205, '2018_03_06_063920_add_timestamp_to_user_verificatons_table', 1),
(206, '2018_03_06_071202_create_jobs_table', 1),
(207, '2018_03_12_014328_update_database_8_3_tables', 1),
(208, '2018_03_12_033935_create_v_rpt_bills_views', 1),
(209, '2018_03_12_071955_add_user_id_to_companies_tables', 1),
(210, '2018_03_13_030216_rename_column_in_companies_tables', 1),
(211, '2018_03_15_040449_add_user_id_to_guiders_table', 1),
(212, '2018_03_21_042730_update_db_19_3_tables', 1),
(213, '2018_03_22_083100_add_user_id_to_stores_table', 1),
(214, '2018_03_23_011855_rename_phone_to_guiders_table', 1),
(215, '2018_03_27_091734_update_link_store_id_in_link_company_store', 1),
(216, '2018_03_28_080513_add_homepage_to_companies_tables', 1),
(217, '2018_03_28_094347_change_name_table', 1),
(218, '2018_03_28_095715_create_view_report_test', 1),
(219, '2018_03_30_043124_add_commission_rate_to_companies_table', 1),
(220, '2018_04_05_080242_add_homepage_to_stores_table', 1),
(221, '2018_04_05_091356_create_types_table', 1),
(222, '2018_04_06_022413_add_city_id_to_guiders_table', 1),
(223, '2018_04_06_060719_change_manager_guid_id_in_guiders_table', 1),
(224, '2018_04_11_084941_add_company_id_to_users_table', 1),
(225, '2018_04_16_040515_change_guid_resident_number_in_giuders_table', 1),
(226, '2018_04_18_085346_change_view_report', 1),
(227, '2018_04_24_100903_add_parent_id_to_users_table', 1),
(228, '2018_04_26_064820_update_db_24_4_tables', 1),
(229, '2018_04_27_094332_change_link_store_id_in_link_company_store_table', 1),
(230, '2018_05_03_023009_add_contact_to_companies_table', 1),
(231, '2018_05_03_044010_create_rv_store_rep_view', 1);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8_bin NOT NULL,
  `token` varchar(255) COLLATE utf8_bin NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `permission_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8_bin NOT NULL,
  `display_name` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `description` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`permission_id`, `name`, `display_name`, `description`, `created_at`, `updated_at`) VALUES
(1, 'role-view', 'Display Role Listing', 'See only Listing Of Role', NULL, NULL),
(2, 'role-create', 'Create Role', 'Create New Role', NULL, NULL),
(3, 'role-edit', 'Edit Role', 'Edit Role', NULL, NULL),
(4, 'role-delete', 'Delete Role', 'Delete Role', NULL, NULL),
(5, 'user-view', 'Display user Listing', 'See only Listing Of user', NULL, NULL),
(6, 'user-create', 'Create user', 'Create New user', NULL, NULL),
(7, 'user-edit', 'Edit user', 'Edit user', NULL, NULL),
(8, 'user-delete', 'Delete user', 'Delete user', NULL, NULL),
(9, 'bill-view', 'Display bill Listing', 'See only Listing Of bill', NULL, NULL),
(10, 'bill-create', 'Create bill', 'Create New bill', NULL, NULL),
(11, 'bill-edit', 'Edit bill', 'Edit bill', NULL, NULL),
(12, 'bill-delete', 'Delete bill', 'Delete bill', NULL, NULL),
(13, 'location-view', 'Display location Listing', 'See only Listing Of location', NULL, NULL),
(14, 'location-create', 'Create location', 'Create New location', NULL, NULL),
(15, 'location-edit', 'Edit location', 'Edit location', NULL, NULL),
(16, 'location-delete', 'Delete location', 'Delete location', NULL, NULL),
(17, 'company-view', 'Display company Listing', 'See only Listing Of company', NULL, NULL),
(18, 'company-create', 'Create company', 'Create New company', NULL, NULL),
(19, 'company-edit', 'Edit company', 'Edit company', NULL, NULL),
(20, 'company-delete', 'Delete company', 'Delete company', NULL, NULL),
(21, 'guider-view', 'Display guider Listing', 'See only Listing Of guider', NULL, NULL),
(22, 'guider-create', 'Create guider', 'Create New guider', NULL, NULL),
(23, 'guider-edit', 'Edit guider', 'Edit guider', NULL, NULL),
(24, 'guider-delete', 'Delete guider', 'Delete guider', NULL, NULL),
(25, 'store-view', 'Display store Listing', 'See only Listing Of store', NULL, NULL),
(26, 'store-create', 'Create store', 'Create New store', NULL, NULL),
(27, 'store-edit', 'Edit store', 'Edit store', NULL, NULL),
(28, 'store-delete', 'Delete store', 'Delete store', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `permission_role`
--

CREATE TABLE `permission_role` (
  `permission_id` int(10) UNSIGNED NOT NULL,
  `role_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `permission_role`
--

INSERT INTO `permission_role` (`permission_id`, `role_id`) VALUES
(1, 1),
(1, 2),
(2, 1),
(3, 1),
(4, 1),
(5, 1),
(5, 2),
(6, 1),
(6, 2),
(7, 1),
(7, 2),
(8, 1),
(8, 2),
(17, 1),
(18, 1),
(19, 1),
(20, 1),
(21, 2),
(22, 2),
(23, 2),
(24, 2),
(25, 2),
(26, 2),
(27, 2),
(28, 2);

-- --------------------------------------------------------

--
-- Table structure for table `profits`
--

CREATE TABLE `profits` (
  `profit_id` int(10) UNSIGNED NOT NULL,
  `cost` int(11) NOT NULL,
  `profitable_id` int(11) NOT NULL,
  `profitable_type` varchar(255) COLLATE utf8_bin NOT NULL,
  `bill_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Stand-in structure for view `reports`
-- (See below for the actual view)
--
CREATE TABLE `reports` (
`bill_date` timestamp
,`bill_id` int(10) unsigned
,`store_id` int(10) unsigned
,`store_name` varchar(255)
,`company_id` int(10) unsigned
,`company_name` varchar(255)
,`guid_id` int(10) unsigned
,`guid_name` varchar(255)
,`bill_tot_cost` decimal(15,2)
,`dc_rate` double(4,2)
,`bill_cost` varchar(255)
,`company_fee` decimal(18,3)
);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `role_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8_bin NOT NULL,
  `display_name` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `description` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`role_id`, `name`, `display_name`, `description`, `created_at`, `updated_at`) VALUES
(1, 'primarynet', 'primarynet', 'primarynet', NULL, NULL),
(2, 'company', 'company', 'company', NULL, NULL),
(3, 'guider', 'guider', 'guider', NULL, NULL),
(4, 'store', 'store', 'store', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `role_user`
--

CREATE TABLE `role_user` (
  `user_id` int(10) UNSIGNED NOT NULL,
  `role_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `role_user`
--

INSERT INTO `role_user` (`user_id`, `role_id`) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4);

-- --------------------------------------------------------

--
-- Table structure for table `stores`
--

CREATE TABLE `stores` (
  `store_id` int(10) UNSIGNED NOT NULL,
  `store_name` varchar(255) COLLATE utf8_bin NOT NULL,
  `store_phone` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `store_address` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `city_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `country_id` int(10) UNSIGNED NOT NULL,
  `GPSX` double(12,8) NOT NULL DEFAULT '0.00000000' COMMENT '경도',
  `GPSY` double(12,8) NOT NULL DEFAULT '0.00000000' COMMENT '위도',
  `home_page` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `description` text COLLATE utf8_bin,
  `type_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `stores`
--

INSERT INTO `stores` (`store_id`, `store_name`, `store_phone`, `store_address`, `city_id`, `created_at`, `updated_at`, `country_id`, `GPSX`, `GPSY`, `home_page`, `description`, `type_id`) VALUES
(1, 'Namaka jewelry', '0132569874', '1548 Anabelle Meadows\r\nGwendolynbury, MD 19145-4977', 1, NULL, NULL, 1, 1.00000000, 1.00000000, 'home_page', 'he best shop in danang with cheap price', 1),
(2, 'Namaka join', '0132569874', 'Vietnam', 1, NULL, NULL, 1, 1.00000000, 1.00000000, 'home_page', 'he best shop in danang with cheap price', 2),
(3, 'jery', '0132569874', '1862 Dickens Mission\r\nSchoenbury, RI 22713-2438', 1, NULL, NULL, 1, 1.00000000, 1.00000000, 'home_page', 'he best shop in danang with cheap price', 3),
(4, 'Tom', '0132569874', '616 Koepp Circle Suite 737\r\nPaucekmouth, ME 26211', 1, NULL, NULL, 1, 1.00000000, 1.00000000, 'home_page', 'he best shop in danang with cheap price ', 4),
(5, 'Tomy', '0132569874', '121 Johnathon Valleys\r\nPort Venamouth, NY 90840', 1, NULL, NULL, 1, 1.00000000, 1.00000000, 'home_page', 'he best shop in danang with cheap price ', 5),
(6, 'tony', '0132569874', '1548 Anabelle Meadows\r\nGwendolynbury, MD 19145-4977', 1, NULL, NULL, 1, 1.00000000, 1.00000000, 'home_page', 'he best shop in danang with cheap price ', 6);

-- --------------------------------------------------------

--
-- Table structure for table `types`
--

CREATE TABLE `types` (
  `type_id` int(10) UNSIGNED NOT NULL,
  `type_name` varchar(255) COLLATE utf8_bin NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `types`
--

INSERT INTO `types` (`type_id`, `type_name`, `created_at`, `updated_at`) VALUES
(1, 'Restaurant', NULL, NULL),
(2, 'Spa/Massage', NULL, NULL),
(3, 'Shopping', NULL, NULL),
(4, 'Café', NULL, NULL),
(5, 'Others', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8_bin NOT NULL,
  `email` varchar(255) COLLATE utf8_bin NOT NULL,
  `password` varchar(255) COLLATE utf8_bin NOT NULL,
  `remember_token` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `is_verified` tinyint(1) NOT NULL DEFAULT '0',
  `company_id` int(11) DEFAULT NULL,
  `parent_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `name`, `email`, `password`, `remember_token`, `created_at`, `updated_at`, `is_verified`, `company_id`, `parent_id`) VALUES
(1, 'admin', 'admin@primarynet.com', '$2y$10$kihh.Whcn2mXLhwGMt868e5bFJqho2eYbGi8ilDixGV0hBuTHHdMK', NULL, '2018-05-03 00:05:10', '2018-05-03 00:05:10', 1, NULL, NULL),
(2, 'company', 'company@company.com', '$2y$10$f005Dzd5eEVF8InshVEunuGa8pk/Jweb4iVeoZVWI1DtzrTRX038y', NULL, '2018-05-03 00:05:11', '2018-05-03 00:05:11', 1, 1, 1),
(3, 'guider', 'guider@guider.com', '$2y$10$USGD3f6HZ9l9obSb/2pgUePk96oBTUMCBTU85H7/BxgcuyZM6wNvm', NULL, '2018-05-03 00:05:11', '2018-05-03 00:05:11', 1, NULL, 2),
(4, 'stores', 'stores@stores.com', '$2y$10$LdVAYosz0qv4KiC8v.6M5u9392HyvkzzlikenDh/hzTP.RiakS6gK', NULL, '2018-05-03 00:05:11', '2018-05-03 00:05:11', 1, NULL, 2),
(5, 'Alden Kulas', 'olaf.kshlerin@example.org', '$2y$10$hqDryRewNIDOOsuV6dms8eqGx7hcjO3vmp.PwjG5vKxQOaYnFni0e', 'xqw6jyKup5', '2018-05-03 00:05:14', '2018-05-03 00:05:14', 0, NULL, 1),
(6, 'Kale Gibson', 'timothy.schimmel@example.org', '$2y$10$gAoYok7L/HMLcAHTHi6apeEnV2/ULT4zhjOynrUQdCzBbT7eUbV3S', 'ZAvMJFZGYq', '2018-05-03 00:05:14', '2018-05-03 00:05:14', 0, NULL, 1),
(7, 'Mallie Rau', 'anahi.lindgren@example.net', '$2y$10$VGRJhrVNOCMBQ8fQSZsK5e.0iVfg.jkd58O4uTxOG7LIfcpduTMMC', 'ZGKDnVVHLK', '2018-05-03 00:05:14', '2018-05-03 00:05:14', 0, NULL, 1),
(8, 'Prof. Emanuel Walker DDS', 'judy53@example.org', '$2y$10$MbnUS9M1oJnUVytAovuVXOBqUnjZ1FJ3G0V3iR9xU3lOCR84jFQsS', 'Pm9sz3aUzh', '2018-05-03 00:05:14', '2018-05-03 00:05:14', 0, NULL, 1),
(9, 'Garrett Champlin', 'buckridge.adalberto@example.org', '$2y$10$bIbi4wOjZNst3K66YPocRuvyR0WPlZuR6yYAJXJl0k9I8dxxfXJzq', 'VcI3OQqC2m', '2018-05-03 00:05:14', '2018-05-03 00:05:14', 0, NULL, 1),
(10, 'Ava Turcotte MD', 'nboyle@example.com', '$2y$10$QD.JJuXY8nwk1GBs2CiWF.GIx833uGOmEBf8CMo.sz4erQFIhg9d.', 'jsLTvUJGks', '2018-05-03 00:05:14', '2018-05-03 00:05:14', 0, NULL, 1),
(11, 'Elfrieda Wilkinson', 'mckenzie.frances@example.org', '$2y$10$gSzGl7tLUivD3MvwYS/V8.5LyLFiafuGm1BlGSi/yGNpfrAEn3GN.', 'raUFVbIoyZ', '2018-05-03 00:05:14', '2018-05-03 00:05:14', 0, NULL, 1),
(12, 'Kali Wehner', 'henry97@example.org', '$2y$10$odPP0DHRK0ztK8OAMda4NuTN1v7rC5OdbKTEisxzvJUGTLuIaswiC', 'ScZAlXi80W', '2018-05-03 00:05:14', '2018-05-03 00:05:14', 0, NULL, 1),
(13, 'Rupert Schaefer', 'jonathan.franecki@example.com', '$2y$10$RMWb.rshfjBPkxO0Fdf5SedG44ZAxnlIMHDwx6KDjOSCRLTbIw5d6', 'evr9vHiLHr', '2018-05-03 00:05:14', '2018-05-03 00:05:14', 0, NULL, 1),
(14, 'Trevion Lemke', 'vern14@example.org', '$2y$10$HCaF/XVj7UsESkXtucxwhOrLZK0jbfsqrJ1c35v9Q60JxSNQxAG5S', 'FiY5J1xiiD', '2018-05-03 00:05:14', '2018-05-03 00:05:14', 0, NULL, 1),
(15, 'Mrs. Jolie Grimes', 'kaitlin.tromp@example.com', '$2y$10$5QEYYtHwrUJ4clKCUQFTveWuwLZi88iq9FCe0QvWahBgacJ6lJAOa', 'ynqBLibuw6', '2018-05-03 00:05:14', '2018-05-03 00:05:14', 0, NULL, 1),
(16, 'Coby O\'Hara', 'madisen87@example.net', '$2y$10$XEnpKLhN.DwxsfrCzZoboee2kyPV08XwZAhtL9WFEYu8.5reu8uuO', '22SDukNLHN', '2018-05-03 00:05:14', '2018-05-03 00:05:14', 0, NULL, 1),
(17, 'Madalyn Trantow', 'don.jerde@example.com', '$2y$10$fPUo0sK4ujtcNoobQmluT.miXJZfqfDny0ipd.InbwA5xs410saZ6', '8A3ikeQgi2', '2018-05-03 00:05:14', '2018-05-03 00:05:14', 0, NULL, 1),
(18, 'Reymundo Fay PhD', 'clarabelle.rutherford@example.com', '$2y$10$vgR2.mz.59K6YNTt8deBfO.gi95tbYrasOxJPHNZaKW.O/WGbR85.', 'jVbtwa9zgC', '2018-05-03 00:05:14', '2018-05-03 00:05:14', 0, NULL, 1),
(19, 'Jessie Spinka V', 'bahringer.verna@example.com', '$2y$10$ltGFUKbP/hJYUVsMMrCvd.lKovYcCugjZoWfbrM0ulrg0XiHDccXK', 'XFSo6G69P4', '2018-05-03 00:05:14', '2018-05-03 00:05:14', 0, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `user_verifications`
--

CREATE TABLE `user_verifications` (
  `user_verification_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `token` varchar(255) COLLATE utf8_bin NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Stand-in structure for view `v_rpt_bills`
-- (See below for the actual view)
--
CREATE TABLE `v_rpt_bills` (
`bill_date` timestamp
,`bill_id` int(10) unsigned
,`store_id` int(10) unsigned
,`store_name` varchar(255)
,`company_id` int(10) unsigned
,`company_name` varchar(255)
,`guid_id` int(10) unsigned
,`guid_name` varchar(255)
,`bill_tot_cost` decimal(15,2)
,`dc_rate` double(4,2)
,`bill_cost` varchar(255)
,`company_fee` double(23,6)
);

-- --------------------------------------------------------

--
-- Structure for view `reports`
--
DROP TABLE IF EXISTS `reports`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `reports`  AS  select `b`.`bill_date` AS `bill_date`,`b`.`bill_id` AS `bill_id`,`s`.`store_id` AS `store_id`,`s`.`store_name` AS `store_name`,`l`.`company_id` AS `company_id`,`c`.`company_name` AS `company_name`,`l`.`guid_id` AS `guid_id`,`g`.`guid_name` AS `guid_name`,`b`.`bill_tot_cost` AS `bill_tot_cost`,`b`.`dc_rate` AS `dc_rate`,`b`.`bill_cost` AS `bill_cost`,(`b`.`bill_tot_cost` * (1.0 - 0.3)) AS `company_fee` from ((((`bills` `b` join `stores` `s` on((`b`.`store_id` = `s`.`store_id`))) join `link_qr_companies` `l` on((`b`.`qr_code` = `l`.`qr_code`))) join `companies` `c` on((`l`.`company_id` = `c`.`company_id`))) join `guiders` `g` on((`l`.`company_id` = `g`.`company_id`))) ;

-- --------------------------------------------------------

--
-- Structure for view `v_rpt_bills`
--
DROP TABLE IF EXISTS `v_rpt_bills`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_rpt_bills`  AS  select `b`.`bill_date` AS `bill_date`,`b`.`bill_id` AS `bill_id`,`s`.`store_id` AS `store_id`,`s`.`store_name` AS `store_name`,`l`.`company_id` AS `company_id`,`c`.`company_name` AS `company_name`,`l`.`guid_id` AS `guid_id`,`g`.`guid_name` AS `guid_name`,`b`.`bill_tot_cost` AS `bill_tot_cost`,`b`.`dc_rate` AS `dc_rate`,`b`.`bill_cost` AS `bill_cost`,(`b`.`bill_tot_cost` * (1.0 - (`lcs`.`company_fee_rate` / 100))) AS `company_fee` from (((((`bills` `b` join `stores` `s` on((`b`.`store_id` = `s`.`store_id`))) join `link_qr_companies` `l` on(((`b`.`qr_code` = `l`.`qr_code`) and (`s`.`city_id` = `l`.`city_id`)))) join `companies` `c` on((`l`.`company_id` = `c`.`company_id`))) join `guiders` `g` on((`c`.`company_id` = `g`.`company_id`))) join `link_company_store` `lcs` on(((`lcs`.`store_id` = `s`.`store_id`) and (`lcs`.`company_id` = `c`.`company_id`)))) ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bills`
--
ALTER TABLE `bills`
  ADD PRIMARY KEY (`bill_id`),
  ADD KEY `bills_store_id_foreign` (`store_id`);

--
-- Indexes for table `bill_details`
--
ALTER TABLE `bill_details`
  ADD PRIMARY KEY (`bill_detail_id`);

--
-- Indexes for table `cities`
--
ALTER TABLE `cities`
  ADD PRIMARY KEY (`city_id`);

--
-- Indexes for table `companies`
--
ALTER TABLE `companies`
  ADD PRIMARY KEY (`company_id`);

--
-- Indexes for table `countries`
--
ALTER TABLE `countries`
  ADD PRIMARY KEY (`country_id`);

--
-- Indexes for table `guiders`
--
ALTER TABLE `guiders`
  ADD PRIMARY KEY (`guid_id`),
  ADD UNIQUE KEY `guiders_guid_id_unique` (`guid_id`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_reserved_at_index` (`queue`,`reserved_at`);

--
-- Indexes for table `link_company_store`
--
ALTER TABLE `link_company_store`
  ADD PRIMARY KEY (`link_store_id`),
  ADD UNIQUE KEY `link_company_store_link_store_id_unique` (`link_store_id`),
  ADD KEY `percents_store_id_foreign` (`store_id`),
  ADD KEY `percents_company_id_foreign` (`company_id`);

--
-- Indexes for table `link_qr_companies`
--
ALTER TABLE `link_qr_companies`
  ADD PRIMARY KEY (`link_qr_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`permission_id`),
  ADD UNIQUE KEY `permissions_name_unique` (`name`);

--
-- Indexes for table `permission_role`
--
ALTER TABLE `permission_role`
  ADD PRIMARY KEY (`permission_id`,`role_id`),
  ADD KEY `permission_role_role_id_foreign` (`role_id`);

--
-- Indexes for table `profits`
--
ALTER TABLE `profits`
  ADD PRIMARY KEY (`profit_id`),
  ADD KEY `profits_bill_id_foreign` (`bill_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`role_id`),
  ADD UNIQUE KEY `roles_name_unique` (`name`);

--
-- Indexes for table `role_user`
--
ALTER TABLE `role_user`
  ADD PRIMARY KEY (`user_id`,`role_id`),
  ADD KEY `role_user_role_id_foreign` (`role_id`);

--
-- Indexes for table `stores`
--
ALTER TABLE `stores`
  ADD PRIMARY KEY (`store_id`);

--
-- Indexes for table `types`
--
ALTER TABLE `types`
  ADD PRIMARY KEY (`type_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `user_verifications`
--
ALTER TABLE `user_verifications`
  ADD PRIMARY KEY (`user_verification_id`),
  ADD KEY `user_verifications_user_id_foreign` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bills`
--
ALTER TABLE `bills`
  MODIFY `bill_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `bill_details`
--
ALTER TABLE `bill_details`
  MODIFY `bill_detail_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cities`
--
ALTER TABLE `cities`
  MODIFY `city_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `companies`
--
ALTER TABLE `companies`
  MODIFY `company_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `countries`
--
ALTER TABLE `countries`
  MODIFY `country_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `link_company_store`
--
ALTER TABLE `link_company_store`
  MODIFY `link_store_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16813;

--
-- AUTO_INCREMENT for table `link_qr_companies`
--
ALTER TABLE `link_qr_companies`
  MODIFY `link_qr_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=232;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `permission_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `profits`
--
ALTER TABLE `profits`
  MODIFY `profit_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `role_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `stores`
--
ALTER TABLE `stores`
  MODIFY `store_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `types`
--
ALTER TABLE `types`
  MODIFY `type_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `user_verifications`
--
ALTER TABLE `user_verifications`
  MODIFY `user_verification_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bills`
--
ALTER TABLE `bills`
  ADD CONSTRAINT `bills_store_id_foreign` FOREIGN KEY (`store_id`) REFERENCES `stores` (`store_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `permission_role`
--
ALTER TABLE `permission_role`
  ADD CONSTRAINT `permission_role_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`permission_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `permission_role_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `profits`
--
ALTER TABLE `profits`
  ADD CONSTRAINT `profits_bill_id_foreign` FOREIGN KEY (`bill_id`) REFERENCES `bills` (`bill_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `role_user`
--
ALTER TABLE `role_user`
  ADD CONSTRAINT `role_user_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `role_user_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
