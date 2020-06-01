require('dotenv').config();
// -----------------------------------------------------------------------------
// モジュールのインポート
const envset = require('./envset');

const server = require("express")();
const date = require('date-utils');

var dt = new Date();
var formatted = dt.toFormat("YYYY/MM/DD HH24:MI:SS");
console.log(formatted + " ..... connected......");

// -----------------------------------------------------------------------------
// Webサーバー設定
server.listen(process.env.PORT || 3000);
// ルーター設定
server.get('/', function (req, res) {
console.log(req + " ..... req......");
	res.send('hello world')
})


// =========================================
// ========== Main処理 =====================
// =========================================
server.post('/bot/webhook', envset.getMiddleware(), (req, res, next) => {
	// 先行してステータスコード200でレスポンスする。
	res.sendStatus(200);

	// すべてのイベント処理のプロミスを格納する配列。
	let events_processed = [];

	
	// イベントオブジェクトを順次処理。
	req.body.events.forEach((event) => {
		// この処理の対象をイベントタイプがメッセージで、かつ、テキストタイプだった場合に限定。
console.log(event.type + " ..... event.type......");
		if (event.type == "message" && event.message.type == "text") {

      let msgTxt = event.message.text.trim();
      events_processed.push(service.execMain(event, msgTxt));

		}
	});

});

exports.execMain = function(event, msgTxt) {

  // --------- あいさつ ---------
  if (msgTxt == "こんにちは") {
    return msgExec.replyMsg(event.replyToken, "こんちは");
	}
/*
  // --------- うりかけ一覧 表示 ---------
  if (msgTxt == "うりかけ") {
    DAO.showOtherTask(
      event.source.groupId,
      event.replyToken,
      46, // うりかけタスク
      "＜うりかけ一覧＞\n"
    );
  }
*/
}
