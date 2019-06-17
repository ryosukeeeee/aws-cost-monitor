const { CanvasRenderService } = require('chartjs-node-canvas');
// サンプルデータの読み込み
const sampleOptions = require('./sample-data.json');

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
