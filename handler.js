'use strict';
const AWS = require('aws-sdk');
AWS.config.update({
  region: 'us-east-1'
})
const costexplorer = new AWS.CostExplorer();

const params = {
  TimePeriod: { 
    End: '2019-06-12', 
    Start: '2019-06-10' 
  },
  Granularity: 'DAILY',
  Metrics: [
    'UnblendedCost',
  ],
};

module.exports.hello = async (event) => {
  try {
    const data = costexplorer.getCostAndUsage(params).promise();
    return data;
  }
  catch(error) {
    console.log("Error occured: ", error);
    return error;
  }
};
