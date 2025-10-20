### nodeの概要

php→html→phpを省くための作業環境。  
パスを納品物と同じphpの状態で作業できる。

### 納品に必要なファイル
  
lp_minecraft  
 └css  
   └swiper-bundle.min.css  
 └images  
 └js  
 index.php  
 style.css  

cssファイルの中のsassは納品不要。  
sassでcssを生成した場合はmapを削除するのを忘れないで。  

### node
node v22.11.0

### 実行方法
```
npm install
```
```
npm run include.js  

or  

node include.js
```

include.js を叩くとindex.phpのパスが相対になった状態のが表示される。  
デフォルト→http://localhost:3000  
また、index_check.htmlが生成されるので、それをテスト環境にアップできる。  
  
### 各ファイルの解説  
include.js - nodeの本体。  
include.html - phpをインクルードしてくるファイル  
index_check.html - テスト環境にあげる為のhtml  
  
vscodeを使用してsassをコンパイルしたcssのファイルを上に持っていための設定  
.vscode  
 └setting.json  

```
 {
  "liveSassCompile.settings.formats": [
      {
          "format": "expanded",
          "extensionName": ".css",
          "savePath": "/"
      }
  ],
  "liveSassCompile.settings.generateMap": true, // ソースマップを生成する場合
  "liveSassCompile.settings.autoprefix": [
      "> 1%",
      "last 2 versions"
  ]
}
```