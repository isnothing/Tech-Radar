Tech-Radar
==========

简介
----------


该应用后端使用node.js实现，启动该应用需要建立MySQL数据表。建表语句如下:
  >CREATE TABLE `circle` (`cid` int(10) DEFAULT NULL,`title` varchar(100) DEFAULT NULL)
  ENGINE=MyISAM DEFAULT CHARSET=utf8;

  >CREATE TABLE `google_trends` (`title` varchar(50) DEFAULT NULL,`time_interval` varchar(100) DEFAULT NULL,
  `google_index` int(5) DEFAULT NULL
  ) ENGINE=MyISAM DEFAULT CHARSET=utf8;
  注:google trends表用于存放技术关键词及其热度值（1~100），circle表用于存放技术圈子编号及其圈内技术。
  

安装好node.js后直接在命令行运行app.js即可启动。
在浏览器输入localhost:3000开始使用应用。


