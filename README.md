Tech-Radar
====

简介
---
该应用使用node.js实现，使用express框架开发。用于展示技术关键词随时间变化呈现出来的热度变化。

说明
---
需要安装mysql, node

本应用mysql数据库用户名和密码均为root, 数据库名为tech_radar，可以直接修改daos/google-trends-dao.js中更改这些信息。

启动该应用需要建立MySQL数据表。直接将tech-radar.sql文件导入mysql数据库中即可，导入方式如下:
在tech_radar.sql所处目录下，运行如下语句，
```shell
mysql -uroot -proot tech_radar < tech-radar.sql
```

导入数据库之后在当前目录输入node app.js即可启动。在浏览器输入localhost:3000开始使用应用。

应用截图:
---
![image](/demo/TechRadar.png)

License:
---
[GPLv3](http://opensource.org/licenses/GPL-3.0)
