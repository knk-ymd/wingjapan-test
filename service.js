
const envset = require('./envset');




exports.execMain = function(event, msgTxt) {

  // --------- あいさつ ---------
  if (msgTxt == "こんにちは") {
    return exports.replyMsg(event.replyToken, "こんちは");
	}
  // --------- テキスト 表示 ---------
  if (msgTxt == "リスト") {
    exports.getList(event);
    // await exports.getList().then(retVal => {
    //
    //   console.log("retVal LENGTH : " + retVal.length);
    //   console.log(retVal);
    //   console.log(JSON.stringify(retVal));
    //   return exports.replyMsg(event.replyToken, "リスト");
    // });
  }
  if (msgTxt == "LIFF" || msgTxt == "liff") {
    return exports.replyMsg(event.replyToken, "https://liff.line.me/1654295885-XJ8M6OaJ");

}
//------------------------------------------------------
//---------------  DAO  -----------------------------
//------------------------------------------------------

/* 8888888888888888888888888888888888888888888888888888888
 * 8888888   ユーザID取得 （ユーザ名から）    88888888888888
  8888888888888888888888888888888888888888888888888888888*/
exports.getList = async function (event){

  await envset.dataBase.query(exports.q_sel_list).then(res => {
    console.log(res.rowCount + " 件　発見");
    var arr = [];
    for (let row of res.rows) {
      let str = row.id + " : " + row.name + " : " + row.remark;
      arr.push(str);

    }
    return exports.replyMsg(event.replyToken, arr.join("\n"));
    // return arr;
  }).catch(e => console.error('[ERROR]getList\n ' + e.stack));

}
// ####### SELECT #########
//------ Query：LineID→ユーザIDコマンド
exports.q_sel_list = {
  text: 'SELECT * FROM test.home_master order by id;',
  values: [],
};
//------------------------------------------------------
//---------------  MESSAGE  -----------------------------
//------------------------------------------------------

// LINE replyMessage 呼び出し（現状は単数msg、テキストmsg限定）
exports.replyMsg = function(token, msg) {

    return envset.bot.replyMessage(token, {
      type: "text",
      text: msg
    }).catch(function(error) {
      console.error("[REPLY_ERROR] *** " + error);
    });
}
/*
// LINE replyMessage 呼び出し（複数msg、テキストmsg限定）
exports.replyMsgs = function(token, msg) {

  let msgs = [];
  for (let i = 0; i < msg.length / envset.MAX_LEN; i++) {
    msgs.push(msg.substr(i * envset.MAX_LEN, envset.MAX_LEN));
  }

  let msgList = [];
  msgs.forEach(function(m) {
    msgList.push({
      type: "text",
      text: m
    })
  });
  return envset.bot.replyMessage(token, msgList).catch(function(error) {
    console.error("[REPLY_ERROR] *** " + error);
  });

}
*/
// LINE pushMessage 呼び出し（テキストmsg限定）
exports.pushMsg = function(to, msg) {

  return envset.bot.pushMessage(to, {
    type: "text",
    text: msg
  }).catch(function(error) {
    console.error("[PUSH_ERROR] *** " + error);
  });
}
// LINE グループ退出
exports.leaveGroup = function(event) {
  exports.replyMsg(event.replyToken, 'さようならー').then(res => {
    envset.bot.leaveGroup(event.source.groupId);
    console.error("退出成功：" + res);
  }).catch(res => {
    console.error("退出失敗：" + res);
  });
}
