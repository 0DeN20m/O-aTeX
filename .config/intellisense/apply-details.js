#!/usr/bin/env node
/**
 * apply-details.js
 * 
 * インテリセンスJSONファイルに、別ファイルから detail と doc の情報を反映させるスクリプト
 * 
 * 使い方:
 *   node apply-details.js <intellisense-file.json>
 *   または
 *   node apply-details.js  # カレントディレクトリの全.jsonファイルを処理
 * 
 * 例:
 *   node apply-details.js my-common.json
 *   node apply-details.js
 */

const fs = require('fs');
const path = require('path');

/**
 * detail/doc情報をインテリセンスファイルに適用する
 * @param {string} intellisenseFile - インテリセンスJSONファイルのパス
 */
function applyDetails(intellisenseFile) {
    const baseName = path.basename(intellisenseFile, '.json');
    const detailsFile = path.join(path.dirname(intellisenseFile), `${baseName}.details.json`);

    // detailsファイルが存在しない場合はスキップ
    if (!fs.existsSync(detailsFile)) {
        console.log(`⏭️  ${baseName}: detailsファイルが見つかりません (${detailsFile})`);
        return;
    }

    console.log(`📝 処理中: ${baseName}.json`);

    // ファイル読み込み
    const intellisense = JSON.parse(fs.readFileSync(intellisenseFile, 'utf8'));
    const details = JSON.parse(fs.readFileSync(detailsFile, 'utf8'));

    let macroCount = 0;
    let macroOverwritten = 0;
    let envCount = 0;
    let envOverwritten = 0;

    // マクロにdetail/docを適用
    if (details.macros && intellisense.macros) {
        for (const macro of intellisense.macros) {
            const detailInfo = details.macros[macro.name];
            if (detailInfo) {
                let wasOverwritten = false;

                // detailの適用（nullの場合は削除、それ以外は上書き）
                if (detailInfo.detail !== undefined) {
                    if (macro.detail !== undefined) {
                        wasOverwritten = true;
                    }
                    if (detailInfo.detail === null) {
                        delete macro.detail;
                    } else {
                        macro.detail = detailInfo.detail;
                    }
                }

                // docの適用（nullの場合は削除、それ以外は上書き）
                if (detailInfo.doc !== undefined) {
                    if (macro.doc !== undefined) {
                        wasOverwritten = true;
                    }
                    if (detailInfo.doc === null) {
                        delete macro.doc;
                    } else {
                        macro.doc = detailInfo.doc;
                    }
                }

                macroCount++;
                if (wasOverwritten) {
                    macroOverwritten++;
                }
            }
        }
    }

    // 環境にdetail/docを適用
    if (details.envs && intellisense.envs) {
        for (const env of intellisense.envs) {
            const detailInfo = details.envs[env.name];
            if (detailInfo) {
                let wasOverwritten = false;

                // detailの適用（nullの場合は削除、それ以外は上書き）
                if (detailInfo.detail !== undefined) {
                    if (env.detail !== undefined) {
                        wasOverwritten = true;
                    }
                    if (detailInfo.detail === null) {
                        delete env.detail;
                    } else {
                        env.detail = detailInfo.detail;
                    }
                }

                // docの適用（nullの場合は削除、それ以外は上書き）
                if (detailInfo.doc !== undefined) {
                    if (env.doc !== undefined) {
                        wasOverwritten = true;
                    }
                    if (detailInfo.doc === null) {
                        delete env.doc;
                    } else {
                        env.doc = detailInfo.doc;
                    }
                }

                envCount++;
                if (wasOverwritten) {
                    envOverwritten++;
                }
            }
        }
    }

    // ファイル書き込み
    fs.writeFileSync(intellisenseFile, JSON.stringify(intellisense, null, 2) + '\n', 'utf8');

    console.log(`✅ ${baseName}: マクロ ${macroCount}個（上書き${macroOverwritten}）、環境 ${envCount}個（上書き${envOverwritten}）に適用しました\n`);
}

/**
 * メイン処理
 */
function main() {
    const args = process.argv.slice(2);

    if (args.length === 0) {
        // 引数なし: カレントディレクトリの全.jsonファイルを処理（.details.jsonは除く）
        console.log('📁 カレントディレクトリの全インテリセンスファイルを処理します\n');

        const files = fs.readdirSync('.')
            .filter(file => file.endsWith('.json') && !file.endsWith('.details.json'));

        if (files.length === 0) {
            console.log('❌ 処理対象のJSONファイルが見つかりません');
            return;
        }

        for (const file of files) {
            applyDetails(file);
        }
    } else {
        // 引数あり: 指定されたファイルを処理
        for (const file of args) {
            if (!fs.existsSync(file)) {
                console.error(`❌ ファイルが見つかりません: ${file}`);
                continue;
            }
            applyDetails(file);
        }
    }

    console.log('🎉 完了しました');
}

// 実行
if (require.main === module) {
    try {
        main();
    } catch (error) {
        console.error('❌ エラーが発生しました:', error.message);
        process.exit(1);
    }
}

module.exports = { applyDetails };
