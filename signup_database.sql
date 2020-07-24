-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 21, 2020 at 12:32 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.2.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `signup_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `log_table`
--

CREATE TABLE `log_table` (
  `USER_ID` varchar(15) DEFAULT NULL,
  `EMAIL_ID` varchar(50) DEFAULT NULL,
  `MOBILE_NO` bigint(10) DEFAULT NULL,
  `MSG_ID` varchar(500) DEFAULT NULL,
  `PASSWORD` varchar(25) DEFAULT NULL,
  `IP_ADD` varchar(150) DEFAULT NULL,
  `DATE` varchar(100) DEFAULT NULL,
  `TIME` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `signup_table`
--

CREATE TABLE `signup_table` (
  `USER_ID` bigint(6) DEFAULT NULL,
  `EMP_ID` bigint(6) DEFAULT NULL,
  `EMAIL_ID` varchar(50) DEFAULT NULL,
  `NAME` varchar(50) DEFAULT NULL,
  `MOBILE_NO` bigint(10) DEFAULT NULL,
  `DEPARTMENT` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `signup_table`
--

INSERT INTO `signup_table` (`USER_ID`, `EMP_ID`, `EMAIL_ID`, `NAME`, `MOBILE_NO`, `DEPARTMENT`) VALUES
(123456, 123456, 'hrithikasarkar2@gmail.com', 'Hrithika Sarkar', 8987930418, 'ITS'),
(190676, 190676, 'somasarkar1906@gmail.com', 'Soma Bhatta4g', 9973947003, 'HR');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
