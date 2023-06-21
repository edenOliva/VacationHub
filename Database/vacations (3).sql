-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 24, 2023 at 10:54 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacations`
--
CREATE DATABASE IF NOT EXISTS `vacations` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `vacations`;

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `userId` int(11) NOT NULL,
  `vacationId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `likes`
--

INSERT INTO `likes` (`userId`, `vacationId`) VALUES
(10, 9),
(10, 15),
(10, 16),
(10, 20),
(11, 9),
(11, 16);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `roleId` int(11) NOT NULL,
  `roleName` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`roleId`, `roleName`) VALUES
(1, 'Admin'),
(2, 'User');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `firstName` varchar(25) NOT NULL,
  `lastName` varchar(30) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(150) NOT NULL,
  `roleId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `firstName`, `lastName`, `email`, `password`, `roleId`) VALUES
(9, 'Shahar', 'Oliva', 'shahar@gmail.com', 'c9839195ed989864489e9074dd444f4bc409d68c78c7824fa869f3f40d7fb70ccaf27a2b7df666f089eca174b08a94f9637d9a943e5ccdbb91420a84bb4b720c', 1),
(10, 'Neta', 'Oliva', 'neta@gmail.com', 'e9b587facae8375460af7b4b1609a03b76f499a8ba0dcfa2a4b6160f24cf180846bf3b737eabcd677e064bb7612def430ed5617ca92134df7ce8b1b1620ca431', 2),
(11, 'Eden', 'Oliva', 'eden@gmail.com', '288a0a5183db42c47657b199bcae06be159a14eade6ac15607bf67e5c39a6833ef81b6f240dd0ab62e8def212ed89dbc804a1fb532a6d18dad823ac78afe04f2', 2);

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacationId` int(11) NOT NULL,
  `destination` varchar(30) NOT NULL,
  `description` varchar(300) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `price` decimal(6,2) NOT NULL,
  `imageName` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationId`, `destination`, `description`, `startDate`, `endDate`, `price`, `imageName`) VALUES
(9, 'San Juan', 'Puerto Rico is a Caribbean island paradise known for its beautiful beaches, rich culture, and warm, welcoming people. A vacation in Puerto Rico can offer a little something for everyone.', '2023-03-30', '2023-04-20', '1900.00', 'e843d6b6-30c9-4237-adf4-85ea9153594a.jpg'),
(10, 'Las Vegas', 'Las Vegas is a world-famous destination known for its glitz, glamour, and non-stop entertainment. A vacation in Las Vegas offers visitors the chance to explore some of the most luxurious hotels, dine at world-class restaurants, catch breathtaking shows and performances, and try their luck.', '2023-04-01', '2023-04-23', '2300.00', 'a9a8df49-66f1-4212-b775-8c07c0b2accc.jpg'),
(11, 'Athens', 'Greece is a beautiful country with a rich history and culture, making it an ideal vacation destination for travelers looking for both relaxation and cultural enrichment. The country boasts a diverse landscape of stunning beaches, rugged mountains, and charming villages.', '2023-04-12', '2023-04-19', '690.00', 'c6de7560-7007-4436-9996-fad6e1ee8127.jpg'),
(13, 'Honolulu', 'Hawaii is a tropical paradise with pristine beaches, lush green forests, and a unique cultural heritage. The state consists of eight main islands, each with its own distinct personality and attractions. ', '2023-03-01', '2023-05-01', '1499.00', '9ac1a56f-79fd-413d-a78a-abaa97eae84b.jpg'),
(15, 'Phatthaya', 'Thailand is a vibrant and colorful country in Southeast Asia, known for its stunning beaches, ancient temples, and bustling cities. It is a popular vacation spot for travelers seeking adventure, relaxation, and cultural experiences.', '2023-05-06', '2023-05-31', '2399.00', 'c14fe441-a871-4c81-b884-0c7557484193.jpg'),
(16, 'Paris', 'The capital city of France, is a popular destination for travelers seeking romance, art, and architecture. Visitors can enjoy the city\'s world-class museums, such as the Louvre and the Musée d\'Orsay, as well as its vibrant café culture and chic shopping districts.', '2023-03-18', '2023-03-25', '999.00', '1bc1d411-cdab-4baf-b034-eeb0e1ee8a68.jpg'),
(17, 'Lisbon', 'Portugal is a beautiful country located on the western coast of the Iberian Peninsula, famous for its warm climate, stunning beaches, and vibrant culture. It is a popular vacation spot for travelers looking to relax, explore history and indulge in delicious food and wine.', '2023-06-01', '2023-06-08', '659.00', '6320ceec-a72e-4d64-997f-d44a46945737.jpg'),
(18, 'Tokyo', 'The capital city of Japan, is a vibrant metropolis known for its towering skyscrapers, bustling streets, and vibrant street culture. Visitors can explore its many attractions, including the Imperial Palace, the Meiji Shrine, and the famous Tsukiji Fish Market.', '2023-04-01', '2023-04-30', '3299.00', '2ce98294-22d3-4237-81f5-7ae45a4bb14a.jpg'),
(19, 'California', 'California is a beautiful and diverse state located on the west coast of the United States, famous for its stunning beaches, national parks, and vibrant cities. It is a popular vacation spot for travelers seeking sun, fun, and adventure.', '2023-07-02', '2023-07-29', '3590.00', 'c47e56b5-22ac-41e3-8944-46cc1e929249.jpg'),
(20, 'Zefat', 'Zefat in Israel (also known as Safed) is a historic city in northern Israel that is rich in culture and spirituality. It is one of the four holy cities in Judaism and has a long and fascinating history, which is reflected in its beautiful architecture, ancient synagogues, and colorful markets.', '2023-04-14', '2023-04-16', '299.00', '4120b0ac-f969-4a69-889a-fb855dc444b8.jpg'),
(27, 'Rome', 'Rome, the capital city of Italy, is a vibrant and historic city famous for its ancient ruins, stunning architecture, and delicious food. It is a popular vacation spot for travelers seeking culture, history, and romance.', '2023-05-01', '2023-05-06', '1599.00', '1f9f3109-b7ac-490e-8ae9-f41fc18d6979.jpg'),
(28, 'Dubai', 'Dubai is a cosmopolitan city located in the United Arab Emirates, known for its luxurious lifestyle and modern architecture. A vacation in Dubai offers visitors the chance to experience some of the world\'s most impressive landmarks.', '2023-04-25', '2023-04-30', '899.00', 'eb531b19-aa19-495d-ae0a-90d32c4359bf.jpg'),
(39, 'Sintra', 'Sintra, located in Portugal, is a picturesque town known for its enchanting landscapes and stunning architecture. It is a popular vacation destination due to its fairytale-like castles, lush gardens, and rich history. ', '2023-05-11', '2023-05-21', '2049.00', '3c5b40e6-f7c9-4ed6-92ca-c445b0fb7ef0.jpg'),
(40, 'Acapulco', 'Acapulco, located on Mexico\'s Pacific coast, is a vibrant beach destination known for its stunning sandy beaches, warm climate, and lively nightlife. It offers a range of water activities such as swimming, surfing, and jet skiing, while also boasting historical sites and cultural attractions. ', '2023-05-18', '2023-05-30', '3499.00', '7ab023e9-e4dd-4ae1-9d5f-c327720e39f2.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`userId`,`vacationId`),
  ADD KEY `vacationId` (`vacationId`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`roleId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`),
  ADD KEY `roleId` (`roleId`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `roleId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_ibfk_3` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`),
  ADD CONSTRAINT `likes_ibfk_4` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`vacationId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`roleId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
