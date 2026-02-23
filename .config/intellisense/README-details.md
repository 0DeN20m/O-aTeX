# detail/doc 自動適用システム

## 概要

LaTeX-Workshopのインテリセンスファイルに、`detail`（簡潔な表示）と`doc`（詳細説明）を別ファイルで管理し、自動的に適用するシステムです。

## ファイル構成

```
.config/intellisense/
├── my-common.json              # インテリセンスファイル
├── my-common.details.json      # detail/doc定義ファイル
├── mystyle.json
├── mystyle.details.json
└── apply-details.js            # 適用スクリプト
```

## detailsファイルの書き方

### ファイル名
インテリセンスファイル名から`.json`を除いた部分に`.details.json`を付ける。
- `my-common.json` → `my-common.details.json`
- `mystyle.json` → `mystyle.details.json`

### フォーマット

```json
{
  "macros": {
    "マクロ名": {
      "detail": "簡潔な表示（記号など）",
      "doc": "詳細な説明"
    },
    "マクロ名|引数形式": {
      "detail": "この引数形式だけに適用",
      "doc": "詳細な説明"
    }
  },
  "envs": {
    "環境名": {
      "detail": "簡潔な表示",
      "doc": "詳細な説明"
    },
    "環境名|引数形式": {
      "detail": "この引数形式だけに適用",
      "doc": "詳細な説明"
    }
  }
}
```

`|` 区切りのキーを使うと、同名コマンド・環境を引数形式ごとに区別できます。

- 例: `norm|{}`
- 例: `norm|[]{}`
- 例: `term*|{}`

引数形式はインテリセンスJSON側の `arg.format` の値をそのまま使います。

適用時の優先順位は次の通りです。

1. `name|arg.format`（個別設定）
2. `name`（共通設定・従来互換）

### 例

```json
{
  "macros": {
    "naturalnumbers": {
      "detail": "ℕ",
      "doc": "自然数全体の集合"
    },
    "integers": {
      "detail": "ℤ",
      "doc": "整数全体の集合"
    },
    "tuple|{}": {
      "doc": "1引数版のタプル表記を生成"
    },
    "tuple": {
      "doc": "タプル表記を生成"
    }
  },
  "envs": {
    "theorem": {
      "doc": "定理環境"
    }
  }
}
```

**注意**: 
- `detail`または`doc`のどちらか一方のみ指定することも可能です
- **既存のdetail/docがある場合も上書きされます**
- `null`を指定すると、そのプロパティを削除できます

### nullを使った削除の例

```json
{
  "macros": {
    "somecommand": {
      "detail": null,  // 既存のdetailを削除
      "doc": "新しい説明"  // docは上書き
    }
  }
}
```

## 使い方

### 基本的な使い方

```bash
cd .config/intellisense

# 全てのインテリセンスファイルに適用
node apply-details.js

# 特定のファイルのみ
node apply-details.js my-common.json
node apply-details.js my-common.json mystyle.json
```

### 推奨ワークフロー

1. **parse-cwl.tsでJSONを生成**
   ```bash
   cd .config/LaTeX-Workshop/dev
   ls cwl | xargs -I {} ../node_modules/.bin/ts-node parse-cwl.ts {}
   ```

2. **生成されたJSONを配置**
   ```bash
   cp packages/*.json ../../intellisense/
   ```

3. **detail/docを適用**
   ```bash
   cd ../../intellisense
   node apply-details.js
   ```

このワークフローにより、parse-cwl実行後も手動で追加したdetail/doc情報を失わずに済みます。

## 出力例

実行すると以下のようなメッセージが表示されます：

```
📁 カレントディレクトリの全インテリセンスファイルを処理します

📝 処理中: my-common.json
✅ my-common: マクロ 22個（上書き22）、環境 18個（上書き18）に適用しました

📝 処理中: mystyle.json
✅ mystyle: マクロ 19個（上書き0）、環境 0個（上書き0）に適用しました

🎉 完了しました
```

**上書きカウント**: 既存のdetailまたはdocがあったものを上書きした数を表示します。

## トラブルシューティング

### detailsファイルが見つからない

```
⏭️  filename: detailsファイルが見つかりません
```

→ `<filename>.details.json`ファイルを作成してください。

### ファイルが処理されない

→ ファイル名が`.json`で終わり、`.details.json`ではないことを確認してください。

## 技術仕様

### detail
- 補完候補リストの右側に表示される
- 主にUnicode記号などの視覚的情報
- 例: `"ℕ"`, `"∑"`, `"Hom"`

### doc
- 補完候補選択時のポップアップに表示される
- コマンドの詳細な説明
- Markdown形式も使用可能

## 参考

- [LaTeX-Workshop公式リポジトリ](https://github.com/James-Yu/LaTeX-Workshop)
- [dev/README.md](https://github.com/James-Yu/LaTeX-Workshop/blob/master/dev/README.md) - ファイルフォーマット仕様
