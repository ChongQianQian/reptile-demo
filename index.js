const https = require("https");
const cheerio = require("cheerio");
const fs = require("fs");

https.get("https://movie.douban.com/top250", (res) => {
  let html = ""; //分段返回的 返回的是数据流

  res.on("data", (chunk) => {
    // 监听有数据产生的时候 拼接
    html += chunk;
  });

  res.on("end", () => {
    console.log("html",html)
    const $ = cheerio.load(html);
    let allFilms = [];
    $("li .item").each(function () {
      // this 循环时 指向当前这个电影
      // 当前这个电影下面的title
      // 相当于this.querySelector
      const title = $(".title", this).text();
      const star = $(".rating_num", this).text();
      const pic = $(".pic img", this).attr("src");

      // 存 数据库
      // 没有数据库存成一个json文件 fs
      allFilms.push({
        title,
        star,
        pic,
      });
    });

    fs.writeFile("./films.json", JSON.stringify(allFilms), (err) => {
      if (!err) {
        console.log("文件写入完毕");
      }
    });

    downloadImage(allFilms); // 图片下载一下
  });
});

function downloadImage(allFilms) {
  for (let i = 0; i < allFilms.length; i++) {
    // 请求 -> 拿到内容
    // fs.writeFile('./xx.png','内容')

    const picUrl = allFilms[i].pic;
    https.get(picUrl, function (res) {
      res.setEncoding("binary"); //从可读流读取的数据设置字符编码

      let str = "";
      res.on("data", function (chunk) {
        str += chunk;
      });

      res.on("end", function () {
        fs.writeFile(`./images/${i}.png`, str, "binary", function (err) {
          if (!err) {
            console.log(`第${i}张图片下载成功`);
          } else {
            console.log(`第${i}张图片下载失败`, err);
          }
        });
      });
    });
  }
}
