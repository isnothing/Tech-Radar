Tech-Radar
==========

简介
----------
该应用使用node.js实现，使用express框架开发。用于展示技术关键词随时间变化呈现出来的热度变化。

说明
---------
需要安装mysql, node.js(ubuntu环境）

mysql安装方法：

    sudo apt-get install mysql-server
本应用mysql数据库用户名和密码均为root, 数据库名为hoolai_share，可以直接修改daos/google-trends-dao.js中更改这些信息。

node.js安装方法:

1,安装依赖:



    sudo apt-get install g++ curl libssl-dev apache2-utils
    sudo apt-get install python
    sudo apt-get install build-essential
    sudo apt-get install gcc
    sudo apt-get install g++

2，下载与安装node.js

    wget http://nodejs.org/dist/v0.10.14.tar.gz
    tar -zxf node-v0.10.14.tar.gz
    cd node-vo.10.14
    ./configure
    make
    sudo make install
    ./configure -prefix=/usr/local/node
    make
    sudo make install


    node --version
输出v0.10.14即成功

启动该应用需要建立MySQL数据表。直接将tech-radar.sql文件导入mysql数据库中即可，导入方式如下:
在tech_radar.sql所处目录下，运行如下语句，

    mysql -uroot -proot hoolai_share < tech-radar.sql

导入数据库之后在当前目录输入node app.js即可启动。在浏览器输入localhost:3000开始使用应用。

应用截图:
----
![image](/demo/TechRadar.png)

License:
----
[MIT](http://opensource.org/licenses/MIT)
