'use strict';

const graph = require('./module/graph');
const postGraph = require('./module/postGraph');
const fs = require('fs');

const AWS = require('aws-sdk');
AWS.config.update({
  region: 'us-east-1'
})

const costexplorer = new AWS.CostExplorer();

module.exports.main = async (event) => {
  try {
    // CostExplorerに渡すパラメータ
    const params = {
      TimePeriod: { 
        End: getFormattedDateBeforeParam(1), 
        Start: getFormattedDateBeforeParam(7) 
      },
      Granularity: 'DAILY',
      Metrics: [
        'UnblendedCost',
      ],
      GroupBy: [{
        Type: 'DIMENSION',
        Key: 'SERVICE',
      }]
    };

    console.log(params);
    // コストは下の関数を実行すれば取得できる
    const data = await costexplorer.getCostAndUsage(params).promise();

    // ダミーデータを渡す
    // const data = require('./ce.json');

    const buffer = await graph.sampleGraphPlot(data)
    fs.writeFileSync('/tmp/example.png', buffer);
    const readStreamObj = fs.createReadStream('/tmp/example.png');
    const { body, } = await postGraph.promiseRequest(readStreamObj);

    return data;
  }
  catch(error) {
    console.log("Error occured: ", error);
    return error;
  }
};
