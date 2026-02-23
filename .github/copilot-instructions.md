# アーキテクチャ

## プロジェクト構成

- #file:../.config/cwl/ cwlファイルを配置する。
- #file:../.config/intellisense/ LaTeX-Workshopで使用するintellisenseの設定ファイルを配置する。公式GitHubリポジトリの一部をクローンしたもの。
- #file:../.config/LaTeX-workshop/ cwlファイルからintellisenseの設定ファイルを生成するスクリプトが配置されている。
- #file:../.config/texmf-local/ Dockerコンテナのビルド時にLaTeXの環境へ組み込まれるファイル群。
- #file:../.config/.latexmkrc latexmkの設定ファイル。
- #file:../.config/latexindent.yaml LaTeX-Workshopで使用するフォーマッターの設定ファイル。
- #file:../.devcontainer/ Dockerコンテナの設定ファイル。
- #file:../.github/ GitHub Copilot Chat関連のファイルを配置する。
- #file:../数学/ 作製したLaTeX文書が配置される。

# コーディングルール

## LaTeX

- ユーザーが使用するコマンドはすべて小文字で定義する。
- 開発用に使用するコマンドはパスカルケースで定義する。
- jlreqパッケージの利用方法は #file:./instructions/jlreq.instructions.md を参照する。

## Markdown

- #file:./instructions/md.instructions.md を参照。

# 諸注意

- 本環境では、cwlは普通TeXstudioにおける補完単語リストファイルを意味する。