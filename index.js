require('dotenv').config();
// -----------------------------------------------------------------------------
// モジュールのインポート
const envset = require('./envset');
const service = require('./service');

const server = require("express")();
const date = require('date-utils');
const lineSDK = require("@line/bot-sdk");

var dt = new Date();
var formatted = dt.toFormat("YYYY/MM/DD HH24:MI:SS");
console.log(formatted + " ..... connected......");

// -----------------------------------------------------------------------------
// Webサーバー設定
server.listen(process.env.PORT || 3000);
// ルーター設定
server.get('/', function (req, res) {
	res.send('hello world')
});

// =========================================
// ========== Main処理 =====================
// =========================================
server.post('/', lineSDK.middleware(envset.line_config), (req, res, next) => {
	// 先行してステータスコード200でレスポンスする。
	res.sendStatus(200);

	// すべてのイベント処理のプロミスを格納する配列。
	let events_processed = [];

	// イベントオブジェクトを順次処理。
	req.body.events.forEach((event) => {
		// この処理の対象をイベントタイプがメッセージで、かつ、テキストタイプだった場合に限定。
		if (event.type == "message" && event.message.type == "text") {

      let msgTxt = event.message.text.trim();
      events_processed.push(service.execMain(event, msgTxt));

		}
	});

});
