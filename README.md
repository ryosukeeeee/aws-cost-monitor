# aws-cost-monitor

## 実現したいこと
1. 毎日n時にlambdaが実行される
1. Cost Explorerでコスト・利用データを取得
1. chartsでグラフ化
1. s3にアップロード
1. slackにグラフのurlを投稿

## デプロイ手順
```
$ yarn run build
```

serverless frameworkでデプロイ
```
$ sls deploy
```


## yarn run buildする理由
[node-canvas](https://github.com/Automattic/node-canvas)でcharts.jsで生成したグラフをレンダリングする

lambda上で実行するためには、node-canvasが内部で使用している
[Cairoをamazon-linux用にビルド](https://github.com/Automattic/node-canvas/issues/1231)する必要がある


## ターミナルからテスト
```
$ sls invoke -f main
"https://bucketname.s3.region.amazonaws.com/filename.png"
```

## サンプルデータから生成されるグラフ
![](https://raw.githubusercontent.com/ryosukeeeee/aws-cost-monitor/images/1560781851220.png)


- - -
## 参考
[AWS Lambda上でnode-canvasを使ってグラフを描画する](https://tech.studyplus.co.jp/entry/2019/02/25/095548)

[Class AWS.CostExplorer - AWS SDK for javascript](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CostExplorer.html#getCostAndUsage-property)

[Serverless - AWS Documentation](https://serverless.com/framework/docs/providers/aws/)
