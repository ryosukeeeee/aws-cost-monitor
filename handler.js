'use strict';
const AWS = require('aws-sdk');
AWS.config.update({
  region: 'us-east-1'
})
const costexplorer = new AWS.CostExplorer();
const graph = require('./module/graph');
const postGraph = require('./module/postGraph');
const fs = require('fs');

// CostExplorerに渡すパラメータ
const params = {
  // 期間は6/10 ~ 6/12
  TimePeriod: { 
    End: '2019-06-17', 
    Start: '2019-06-10' 
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

module.exports.main = async (event) => {
  // const date = new Date();
  // const unixtime = date.getTime();
  try {
    // コストは下の関数を実行すれば取得できる
    // const data = await costexplorer.getCostAndUsage(params).promise();

    const buffer = await graph.sampleGraphPlot()
    fs.writeFileSync('/tmp/example.png', buffer);
    const readStreamObj = fs.createReadStream('/tmp/example.png');
    const {response, body} = await postGraph.promiseRequest(readStreamObj);

    return body;
  }
  catch(error) {
    console.log("Error occured: ", error);
    return error;
  }
};
