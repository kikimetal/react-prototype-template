#良いモバイルサイトを作る

- version
  - node@8.11
  - npm@5.6
  - gulp@3.9

- node version 違うとエラー出ちゃう...

- browser-sync とか機能しなくなっちゃう
  - PHP で ```echo``` ```var_dump``` をかけてるとダメ
    - ```<html><body>...``` で綺麗に囲われてないといけない


- npm i で node-sass がエラー吐くとき
  - ```npm rebuild node-sass```
    - node 環境に合わせて再構築してくれるっぽい
