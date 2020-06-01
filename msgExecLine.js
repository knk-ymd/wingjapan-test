
const envset = require('./envset');

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
