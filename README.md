# 顔認識サーバーのサンプル

```sh
# モジュールの準備
$ npm install

# サーバーの起動
$ npm start
```

## 使用例

detect.log に認識した人の名前を追記する

```sh
$ echo 太郎 >> ./detect.log
```

人が認識でてきない場合は「なし」を追記する

```sh
$ echo なし >> ./detect.log
```

顔認識サーバーは最後に追記された1行を返す

```sh
$ curl -X POST http://localhost:3093/face
{"status":"OK","facename":"太郎"}
```

以下、ドラスクリプトのサンプル

```
/http.post/http://localhost:3093/face
こんにちは、{{payload.facename}}
今日は暑いですね
/end
```

顔認識「なし」の場合の条件分岐の例

```
// 顔認識APIを呼び出し
/http.post/http://localhost:3093/face
////////////// payload は上書きされるので一旦 facename へコピー
/.facename/{{payload.facename}}
////////////// payload が比較対象のため facename を payload へコピー
/.payload/{{facename}}
////////////// なしが含まれていれば Normal へ移動
/if/なし/:Normal
こんにちは、{{facename}}さん
/goto/:Next
:Normal
こんにちは
:Next
今日は暑いですね
/end
```
