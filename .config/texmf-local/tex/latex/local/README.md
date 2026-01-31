# スタイルファイル置き場

## common.sty

定理環境や汎用コマンドが置いてあります。

## old

修論作成まで使っていたスタイルファイルが置いてあります。

## スタイルファイル更新の注意

- スタイルファイルを更新したら`/usr/local/texlive/texmf-local`に反映させる
    - `mktexlsr /workspaces/LaTeX/.config/texmf-local`でls-Rを最新化した後、`cp -r /workspaces/LaTeX/.config/texmf-local /usr/local/texlive/texmf-local`してもいいが、Dockerイメージのコミットが必要？
    - Dockerコンテナのリビルド時は自動で入る
