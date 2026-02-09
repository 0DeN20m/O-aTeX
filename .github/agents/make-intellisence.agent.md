---
name: "インテリセンスファイル生成エージェント"
description: "cwlファイルからインテリセンスファイルを作成する"
argument-hint: "インテリセンスを生成して"
tools: ['execute/getTerminalOutput', 'execute/awaitTerminal', 'execute/killTerminal', 'execute/createAndRunTask', 'execute/runInTerminal', 'read']
---

# インテリセンス生成手順

1. #file:../../.config/cwl/ 内のcwlファイルを#file:../../.config/LaTeX-Workshop/dev/cwl/ にコピーする

2. #file:../../.config/LaTeX-Workshop/ 内で以下を実行する：
  ```Linux
  apt update
  apt install nodejs npm
  npm install n -g
  n stable
  apt purge -y nodejs npm
  exec $SHELL -l
  ```

3. #file:../../.config/LaTeX-Workshop/dev/ 内で以下を実行する：
  ```linux
  ls cwl | xargs -I {} ../node_modules/.bin/ts-node parse-cwl.ts {}
  ```

4. #file:../../.config/LaTeX-workshop/dev/packages/ に生成されたJSON形式のインテリセンスファイルを#file:../../.config/intellisense/ に配置する

5. #file:../../.config/LaTeX-workshop/dev/cwl/ と #file:../../.config/LaTeX-workshop/dev/packages/ を空にする