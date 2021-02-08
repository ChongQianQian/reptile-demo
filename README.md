## node 写爬虫，原来这么简单
爬取豆瓣TOP250电影的信息
[电影地址](https://movie.douban.com/top250)

## start (运行)
```bash
node index.js
```

## 思路介绍
请求 url - > html（信息）  -> 解析html

## node进程管理工具
- supervisor
- nodemon
- forever
- pm2
### nodemon(选项)
启动node代码，在修改代码的时候，会自动监听重启
公司电脑可能会提示权限不够 使用：sudo npm install -g nodemon

运行代码：nodemon index.js
