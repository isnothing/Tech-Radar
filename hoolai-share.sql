/*
SQLyog 企业版 - MySQL GUI v7.14 
MySQL - 5.5.11 : Database - hoolai_share
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

CREATE DATABASE /*!32312 IF NOT EXISTS*/`hoolai_share` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `hoolai_share`;

/*Table structure for table `activity` */

DROP TABLE IF EXISTS `activity`;

CREATE TABLE `activity` (
  `aid` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `title` varchar(1024) DEFAULT NULL,
  `tid` int(10) DEFAULT NULL,
  `uid` int(10) DEFAULT NULL COMMENT '该技术专家的uid',
  `starttime` varchar(12) DEFAULT NULL,
  `address` varchar(1024) DEFAULT NULL,
  `overview` varchar(10240) DEFAULT NULL,
  `remark` varchar(1024) DEFAULT NULL,
  PRIMARY KEY (`aid`)
) ENGINE=MyISAM AUTO_INCREMENT=58 DEFAULT CHARSET=utf8;

/*Data for the table `activity` */

/*Table structure for table `authorities` */

DROP TABLE IF EXISTS `authorities`;

CREATE TABLE `authorities` (
  `uid` int(10) DEFAULT NULL,
  `system` int(1) DEFAULT NULL COMMENT '系统权限'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

/*Data for the table `authorities` */

/*Table structure for table `circle` */

DROP TABLE IF EXISTS `circle`;

CREATE TABLE `circle` (
  `cid` int(10) DEFAULT NULL,
  `title` varchar(100) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

/*Data for the table `circle` */

/*Table structure for table `expert` */

DROP TABLE IF EXISTS `expert`;

CREATE TABLE `expert` (
  `uid` int(10) DEFAULT NULL,
  `tid` int(10) DEFAULT NULL,
  `remark` varchar(1024) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

/*Data for the table `expert` */

/*Table structure for table `feedback` */

DROP TABLE IF EXISTS `feedback`;

CREATE TABLE `feedback` (
  `fid` int(10) NOT NULL AUTO_INCREMENT,
  `aid` int(10) DEFAULT NULL,
  `uid` int(10) DEFAULT NULL,
  `nickname` varchar(20) DEFAULT NULL,
  `content` varchar(1000) DEFAULT NULL,
  `time` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`fid`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

/*Data for the table `feedback` */

/*Table structure for table `follower` */

DROP TABLE IF EXISTS `follower`;

CREATE TABLE `follower` (
  `uid` int(10) DEFAULT NULL,
  `tid` int(10) DEFAULT NULL,
  `remark` varchar(1024) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

/*Data for the table `follower` */

/*Table structure for table `function` */

DROP TABLE IF EXISTS `function`;

CREATE TABLE `function` (
  `fid` int(10) NOT NULL AUTO_INCREMENT,
  `title` varchar(20) DEFAULT NULL,
  `url` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`fid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

/*Data for the table `function` */

/*Table structure for table `google_trends` */

DROP TABLE IF EXISTS `google_trends`;

CREATE TABLE `google_trends` (
  `title` varchar(50) DEFAULT NULL,
  `time_interval` varchar(100) DEFAULT NULL,
  `google_index` int(5) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

/*Data for the table `google_trends` */

/*Table structure for table `r_activity_participant` */

DROP TABLE IF EXISTS `r_activity_participant`;

CREATE TABLE `r_activity_participant` (
  `aid` int(10) DEFAULT NULL,
  `uid` int(10) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

/*Data for the table `r_activity_participant` */

/*Table structure for table `r_technology_contributer` */

DROP TABLE IF EXISTS `r_technology_contributer`;

CREATE TABLE `r_technology_contributer` (
  `tid` int(10) DEFAULT NULL,
  `uid` int(10) DEFAULT NULL,
  `time` varchar(50) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

/*Data for the table `r_technology_contributer` */

/*Table structure for table `r_technology_participant` */

DROP TABLE IF EXISTS `r_technology_participant`;

CREATE TABLE `r_technology_participant` (
  `uid` int(10) DEFAULT NULL,
  `tid` int(10) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

/*Data for the table `r_technology_participant` */

/*Table structure for table `r_technology_type` */

DROP TABLE IF EXISTS `r_technology_type`;

CREATE TABLE `r_technology_type` (
  `tid` int(10) DEFAULT NULL,
  `type_id` int(5) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

/*Data for the table `r_technology_type` */

/*Table structure for table `technology` */

DROP TABLE IF EXISTS `technology`;

CREATE TABLE `technology` (
  `tid` int(10) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) DEFAULT NULL,
  `priority` int(2) DEFAULT NULL,
  `image_path` varchar(100) DEFAULT NULL,
  `content` mediumtext,
  `remark` varchar(10240) DEFAULT NULL,
  PRIMARY KEY (`tid`)
) ENGINE=MyISAM AUTO_INCREMENT=193 DEFAULT CHARSET=utf8;

/*Data for the table `technology` */

/*Table structure for table `technology_type` */

DROP TABLE IF EXISTS `technology_type`;

CREATE TABLE `technology_type` (
  `type_id` int(5) NOT NULL AUTO_INCREMENT,
  `type` varchar(1024) DEFAULT NULL,
  PRIMARY KEY (`type_id`)
) ENGINE=MyISAM AUTO_INCREMENT=91 DEFAULT CHARSET=utf8;

/*Data for the table `technology_type` */

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `uid` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL,
  `password` varchar(40) DEFAULT NULL,
  `remark` varchar(1024) DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=MyISAM AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;

/*Data for the table `user` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
