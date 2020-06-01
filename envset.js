

/* ---------- LINE ---------- */
exports.MAX_LEN = 2000;
// Messaging APIのSDKをインポート
const line = require("@line/bot-sdk");
// 環境変数からアクセストークン/Channel Secretをセット
exports.line_config = {
    channelAccessToken: process.env.LINE_ACCESS_TOKEN,
    channelSecret: process.env.LINE_CHANNEL_SECRET
};
exports.bot = new line.Client(exports.line_config);
/**
 * ミドルウェア取得
 */
exports.getMiddleware = function(){
  return line.middleware(exports.line_config);
}

// -----------------------------------------------------------------------------

/* ---------- DataBase ---------- */
//DB
const { Client } = require('pg');

// exports.dataBase = new Client({
//   connectionString: process.env.DATABASE_URL,
//   ssl: true,
// });

exports.dataBase = new Client({

  user: 'mcdfprkboyqyxc',
  host: 'ec2-34-232-147-86.compute-1.amazonaws.com',
  database: 'd2roo7jk48ggff',
  password: 'e0059d0cadf3868dadf7f3da7195a4691ca665a8a75adc34c21e4011ff740eb3',
  ssl: true,

  port: 5432
})
exports.dataBase.connect();
