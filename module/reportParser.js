const palette = require('google-palette');

module.exports.reportToDataForRender = (response) => {
  let graphData = {
    labels: [],
    datasets: []
  }

  let serviceList = {};

  // CostExplorerのresponseに含まれるservice名をプロパティ名
  // 一旦走査する
  for (const item of response.ResultsByTime) {
    // Groupsの要素数が0ではない
    if (item.Groups.length !== 0) {
      for (const group of item.Groups) {
        // まだ追加されていないサービスにヒットしたら登録する
        if (!serviceList.hasOwnProperty(group.Keys[0])) {
          let serviceData = {
            label: group.Keys[0],
            borderWidth: 1,
            data: []
          };
          serviceList[group.Keys[0]] = serviceData;
        }
      }
    }
  }

  // // CostExplorerの結果に含まれるサービスの数
  let numOfService = Object.keys(serviceList).length;

  // カラーパレットを用意
  const colors = palette('tol-rainbow', numOfService).map((hex) => {
    return '#' + hex;
  });

  // responseに含まれる日数分繰り返される
  for (const item of response.ResultsByTime) {
    // labelに日付を追加
    graphData.labels.push(item.TimePeriod.Start);
    
    // この日のGroupsに含まれるサービス名をプロパティに
    // Amountを保存する
    let servicesIncludeThisGroup = {};
    for (const group of item.Groups) {
      servicesIncludeThisGroup[group.Keys[0]] = group.Metrics.UnblendedCost.Amount;
    }
      // console.log(servicesIncludeThisGroup);

    // response全体に含まれるサービス名でforループ
    for (const service in serviceList) {
      // このGroupsにサービスが含まれていればAmountをdataにpush
      if (servicesIncludeThisGroup.hasOwnProperty(service)) {
        serviceList[service].data.push(servicesIncludeThisGroup[service]);
      } else {
        // このGroupsにサービスが含まれていなければ0をpush
        serviceList[service].data.push(0);
      }
    }
  }
  
  for (let [index, [key, value]] of Object.entries(Object.entries(serviceList))) {
    serviceList[key].backgroundColor = colors[index] + '11'
    serviceList[key].borderColor = colors[index]
    graphData.datasets.push(serviceList[key]);
  }

  return graphData;
};
