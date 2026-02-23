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

import { existsSync, readFileSync, writeFileSync, readdirSync } from 'fs';
import { basename, join, dirname } from 'path';
import { pathToFileURL } from 'url';

/**
 * 1つのエントリにdetail/docを適用する
 * @param {object} target - intellisenseのエントリ（macro/env）
 * @param {object} detailInfo - details側の情報
 * @returns {boolean} 既存値を上書きしたか
 */
function applyDetailAndDoc(target, detailInfo) {
    let wasOverwritten = false;

    for (const field of ['detail', 'doc']) {
        if (detailInfo[field] !== undefined) {
            if (target[field] !== undefined) {
                wasOverwritten = true;
            }
            if (detailInfo[field] === null) {
                delete target[field];
            } else {
                target[field] = detailInfo[field];
            }
        }
    }

    return wasOverwritten;
}

/**
 * エントリに対応するdetails情報を取得する
 * 優先順位:
 * 1. "name|arg.format"（引数形式ごとの個別設定）
 * 2. "name"（従来互換の共通設定）
 * @param {object} entry - intellisenseのエントリ（macro/env）
 * @param {object} detailsMap - details側の名前→情報マップ
 * @returns {object|undefined}
 */
function getDetailInfo(entry, detailsMap) {
    const format = entry.arg?.format;
    if (typeof format === 'string') {
        const variantKey = `${entry.name}|${format}`;
        if (detailsMap[variantKey]) {
            return detailsMap[variantKey];
        }
    }

    return detailsMap[entry.name];
}

/**
 * 複数エントリにdetail/docを適用して件数を集計する
 * @param {Array<object>} entries - intellisenseのエントリ配列
 * @param {object} detailsMap - details側の名前→情報マップ
 * @returns {{count: number, overwritten: number}}
 */
function applyDetailsToEntries(entries, detailsMap) {
    let count = 0;
    let overwritten = 0;

    for (const entry of entries) {
        const detailInfo = getDetailInfo(entry, detailsMap);
        if (!detailInfo) {
            continue;
        }

        const wasOverwritten = applyDetailAndDoc(entry, detailInfo);
        count++;
        if (wasOverwritten) {
            overwritten++;
        }
    }

    return { count, overwritten };
}

/**
 * detail/doc情報をインテリセンスファイルに適用する
 * @param {string} intellisenseFile - インテリセンスJSONファイルのパス
 */
function applyDetails(intellisenseFile) {
    const baseName = basename(intellisenseFile, '.json');
    const detailsFile = join(dirname(intellisenseFile), `${baseName}.details.json`);

    // detailsファイルが存在しない場合はスキップ
    if (!existsSync(detailsFile)) {
        console.log(`⏭️  ${baseName}: detailsファイルが見つかりません (${detailsFile})`);
        return;
    }

    console.log(`📝 処理中: ${baseName}.json`);

    // ファイル読み込み（パースエラー時にファイル名付きで例外を投げ直す）
    let intellisense;
    try {
        intellisense = JSON.parse(readFileSync(intellisenseFile, 'utf8'));
    } catch (e) {
        throw new Error(`intellisense JSON のパースに失敗しました: ${intellisenseFile}\n${e.message}`);
    }

    let details;
    try {
        details = JSON.parse(readFileSync(detailsFile, 'utf8'));
    } catch (e) {
        throw new Error(`details JSON のパースに失敗しました: ${detailsFile}\n${e.message}`);
    }
    let macroCount = 0;
    let macroOverwritten = 0;
    let envCount = 0;
    let envOverwritten = 0;

    // マクロにdetail/docを適用
    if (details.macros && intellisense.macros) {
        const result = applyDetailsToEntries(intellisense.macros, details.macros);
        macroCount = result.count;
        macroOverwritten = result.overwritten;
    }

    // 環境にdetail/docを適用
    if (details.envs && intellisense.envs) {
        const result = applyDetailsToEntries(intellisense.envs, details.envs);
        envCount = result.count;
        envOverwritten = result.overwritten;
    }

    // ファイル書き込み
    writeFileSync(intellisenseFile, JSON.stringify(intellisense, null, 2) + '\n', 'utf8');

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

        const files = readdirSync('.')
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
            if (!existsSync(file)) {
                console.error(`❌ ファイルが見つかりません: ${file}`);
                continue;
            }
            applyDetails(file);
        }
    }

    console.log('🎉 完了しました');
}

// 実行
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    try {
        main();
    } catch (error) {
        console.error('❌ エラーが発生しました:', error.message);
        process.exit(1);
    }
}

export default { applyDetails };
