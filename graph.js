const { CanvasRenderService } = require('chartjs-node-canvas');
// サンプルデータの読み込み
const sampleOptions = require('./sample-data.json');
const path = require("path");
const Canvas = require('canvas');
const fontName = process.env['FONT_NAME'];
const fontFamily = process.env['FONT_FAMILY'];
// デフォルトだと日本語が文字化けするので日本語フォントを登録する
Canvas.registerFont(path.join(__dirname, `fonts/${fontName}`), { family: fontFamily });

module.exports.sampleGraphPlot = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const renderService = new CanvasRenderService(600,600);
      const buffer = await renderService.renderToBuffer(sampleOptions);
      resolve(buffer);
    }
    catch (error) {
      console.log("Error occured: ", error);
      reject(error);
    }
  })
}
