import express from 'express';
import fs from 'fs';
import { JSDOM } from 'jsdom';
import iconv from 'iconv-lite';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const app = express();
const port = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = 'include.html';
const componentPath = './index.php';

// 静的ファイルの提供設定
app.use('/public', express.static('public'));
app.use(express.static(__dirname));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));

app.get('/', function (req, res) {
  fs.readFile(path.join(__dirname, filePath), 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }
    fs.readFile(path.join(__dirname, componentPath), function (err, componentBuffer) {
      if (err) {
        return console.log(err);
      }
      const component = iconv.decode(componentBuffer, 'UTF-8');
      // JSDOMを使ってDOMを作成
      const dom = new JSDOM(component);
      const document = dom.window.document;

      // PHPコードパターン
      const phpCodePattern = /<\?php echo get_template_directory_uri\(\); \?>/g;

      // 置換したい文字列
      const replacement = '.';

      // documentのHTMLを取得
      let htmlContent = document.documentElement.outerHTML;

      // PHPコードパターンを置換
      htmlContent = htmlContent.replace(phpCodePattern, replacement);

      // 新しいDOMを作成
      const newDom = new JSDOM(htmlContent);

      // 置換後のHTMLをシリアライズ
      const newHtml = newDom.serialize();

      // レスポンスとして送信
      res.send(newHtml);


      // const dom = new JSDOM(component);
      // const document = dom.window.document;
      // const phpCodePattern = /<\?php echo get_template_directory_uri\(\); \?>/g;
      // const imgs = document.getElementsByTagName('img');
      // for (let i = 0; i < imgs.length; i++) {
      //   let oldPath = imgs[i].getAttribute('src');
      //   let newPath = oldPath.replace(phpCodePattern, '.');
      //   imgs[i].src = newPath;
      //   imgs[i].setAttribute('data-src', newPath);
      //   console.log(newPath);
      // }

      // const newHtml = dom.serialize();
      // res.send(newHtml);
      const testHtmlPath = path.join(__dirname, 'index_check.html');
      fs.writeFile(testHtmlPath, newHtml, function (err) {
        if (err) {
          return console.log(err);
        }
        console.log("The file was saved as index_check.html!");
      });
    });
  });
});

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});
// app.listen(port, () => {
//   console.log(`App is running on http://localhost:${port}`);
//   browserSync({
//     files: ['!./node_modules/**/*', './**/*.{js,css,inc,html,jpg,png}'],
//     proxy: `localhost:${port}`,
//     open: 'local',
//   });
// });