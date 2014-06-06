Tech-Radar
==========

简介
----------


该应用后端使用node.js实现，启动该应用需要建立MySQL数据表。建表语句如下:
>CREATE TABLE `circle` (
  `cid` int(10) DEFAULT NULL,
  `title` varchar(100) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;


CREATE TABLE `google_trends` (
  `title` varchar(50) DEFAULT NULL,
  `time_interval` varchar(100) DEFAULT NULL,
  `google_index` int(5) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;


