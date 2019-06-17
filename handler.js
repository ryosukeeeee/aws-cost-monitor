'use strict';
const AWS = require('aws-sdk');
AWS.config.update({
  region: 'us-east-1'
})
const s3 = new AWS.S3();
const costexplorer = new AWS.CostExplorer();
const graph = require('./graph');

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
    const buffer = await graph.sampleGraphPlot()
    const s3params = {
      Bucket: process.env['BUCKET'],
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
