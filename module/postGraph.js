const request = require('request');

const slackFileUploadUrl = 'https://slack.com/api/files.upload';
const formData = {
  token: process.env['SLACK_TOKEN'],
  title: 'example.png',
  filetype: 'png',
  channels: process.env['SLACK_CHANNEL_ID']
};

const promiseRequest = module.exports.promiseRequest =  (readStreamObj) => {
  formData.file = readStreamObj;

  return new Promise((resolve, reject) => {
    request.post({
      url: slackFileUploadUrl,
      formData: formData
    }, 
    (error, response, body) => {
      if (error) {
        reject(error);
      } else {
        resolve(response, body);
      }
    })
  })
}

