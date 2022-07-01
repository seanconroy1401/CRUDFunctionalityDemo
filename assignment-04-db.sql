-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 03, 2022 at 11:01 PM
-- Server version: 10.3.31-MariaDB-0+deb10u1
-- PHP Version: 7.3.31-1~deb10u1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cs230_u210335`
--

-- --------------------------------------------------------

--
-- Table structure for table `assignment-04-db`
--

CREATE TABLE `assignment-04-db` (
  `ID` int(11) UNSIGNED NOT NULL,
  `TITLE` varchar(80) NOT NULL,
  `NAME` varchar(80) NOT NULL,
  `SURNAME` varchar(80) NOT NULL,
  `PHONE` int(11) NOT NULL,
  `EMAIL` varchar(80) NOT NULL,
  `LINE1A` varchar(80) NOT NULL,
  `LINE2A` varchar(80) NOT NULL,
  `CITY` varchar(80) NOT NULL,
  `COUNTY` varchar(80) NOT NULL,
  `EIRCODE` varchar(80) NOT NULL,
  `LINE1B` varchar(80) NOT NULL,
  `LINE2B` varchar(80) NOT NULL,
  `CITY2` varchar(80) NOT NULL,
  `COUNTY2` varchar(80) NOT NULL,
  `EIRCODE2` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `assignment-04-db`
--

INSERT INTO `assignment-04-db` (`ID`, `TITLE`, `NAME`, `SURNAME`, `PHONE`, `EMAIL`, `LINE1A`, `LINE2A`, `CITY`, `COUNTY`, `EIRCODE`, `LINE1B`, `LINE2B`, `CITY2`, `COUNTY2`, `EIRCODE2`) VALUES
(2, 'Mr', 'Daire', 'Casey', 123456789, 'dc@mu.ie', '54 Cluain Aoibhinn', '', 'Maynooth', 'Co. Kildare', 'W23 Y2N5', '54', '', 'Maynooth', 'Co. Kildare', 'W23 Y2N5'),
(21, 'Mr', 'Sean', 'Conroy', 871170453, 'sc@mu.ie', '22 Jigginstown Green', 'Newbridge Road', 'Naas', 'Co. Kildare', 'W19 YK5D', '54 Cluain Aoibhinn', 'Collegeland', 'Maynooth', 'Co. Kildare', 'sc@mu.ie');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `assignment-04-db`
--
ALTER TABLE `assignment-04-db`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID` (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `assignment-04-db`
--
ALTER TABLE `assignment-04-db`
  MODIFY `ID` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
