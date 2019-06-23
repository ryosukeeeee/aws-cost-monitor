const { CanvasRenderService } = require('chartjs-node-canvas');
const path = require("path");
const Canvas = require('canvas');
const reportParser = require('./reportParser');

// 環境変数の読み込み
const fontName = process.env['FONT_NAME'];
const fontFamily = process.env['FONT_FAMILY'];

// デフォルトだと日本語が文字化けするので日本語フォントを登録する
Canvas.registerFont(path.join(__dirname, `../fonts/${fontName}`), { family: fontFamily });

module.exports.sampleGraphPlot = (data) => {
  let graphData = reportParser.reportToDataForRender(data)
  let graphOption = {
    title: {
      display: true,
      text: 'Cost and Usage',
      padding: 3
    },
    scales: {
      xAxes: [
        {
          stacked: true,
          categoryPercentage: 0.4,
          scaleLabel: {
            display: true,
            labelString: 'Date',
            fontSize: 18
          }
        }
      ],
      yAxes: [
        {
          stacked: true,
          scaleLabel: {
            display: true,
            labelString: 'Cost[USD]',
            fontSize: 18
          }
        }
      ]
    },
    legend: {
      display: true,
      labels: {
        boxWidth: 30,
        padding: 20
      }
    }
  }
  const renderOption = {
    type: 'bar',
    data: graphData,
    options: graphOption
  }

  return new Promise(async (resolve, reject) => {
    try {
      const renderService = new CanvasRenderService(600,600, chartCallback);
      const buffer = await renderService.renderToBuffer(renderOption);
      resolve(buffer);
    }
    catch (error) {
      console.log("Error occured: ", error);
      reject(error);
    }
  })
}
