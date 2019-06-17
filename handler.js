'use strict';
const AWS = require('aws-sdk');
AWS.config.update({
  region: 'us-east-1'
})
const s3 = new AWS.S3();
const path = require("path");

const costexplorer = new AWS.CostExplorer();

const { CanvasRenderService } = require('chartjs-node-canvas');

// CostExplorerに渡すパラメータ
// const params = {
//  期間は6/10 ~ 6/12
//   TimePeriod: { 
//     End: '2019-06-12', 
//     Start: '2019-06-10' 
//   },
//   Granularity: 'DAILY',
//   Metrics: [
//     'UnblendedCost',
//   ],
// };

module.exports.main = async (event) => {
  const date = new Date();
  const unixtime = date.getTime();
  try {
    const renderService = new CanvasRenderService(600,600);
    // グラフにしたいデータとオプション
    const options = {
      type: 'bar',
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    };
    // console.log(path.join(__dirname, 'IPAexfont00401/ipaexg.ttf'));
    // renderService.registerFont(path.join(__dirname, 'ipaexg.ttf'), {family: 'ipaex'});
    const buffer = await renderService.renderToBuffer(options);
    const s3params = {
      Bucket: 'sls-cost-graph',
      Key: `${unixtime}.png`,
      Body: buffer,
      ContentType: 'image/png',
      ACL: 'public-read'
    };
    const s3_result = await s3.upload(s3params).promise();
    console.log(s3_result);
    return s3_result.Location;

    // コストは下の関数を実行すれば取得できる
    // const data = costexplorer.getCostAndUsage(params).promise();
    // return data;
  }
  catch(error) {
    console.log("Error occured: ", error);
    return error;
  }
};
