# aws-cost-monitor


[node-canvas](https://github.com/Automattic/node-canvas)でcharts.jsで生成したグラフをレンダリングする

公式のREADMEによると
> node-canvas is a Cairo-backed Canvas implementation for Node.js.

とのことだが，lambda上で実行するためには
[Cairoをamazon-linux用にビルド](https://github.com/Automattic/node-canvas/issues/1231)する必要がある
```
$ yarn run build
```


serverless frameworkでデプロイ
```
$ sls deploy
```


- - -

試しに実行する
```
$ sls invoke -f hello
```

- - -
## 参考
[AWS Lambda上でnode-canvasを使ってグラフを描画する](https://tech.studyplus.co.jp/entry/2019/02/25/095548)

[Class AWS.CostExplorer - AWS SDK for javascript](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CostExplorer.html#getCostAndUsage-property)

[Serverless - AWS Documentation](https://serverless.com/framework/docs/providers/aws/)
