<?php
// google spreadsheets id
// const GSSID = "17emL3haHaFgGzw8B8C_lXHTZIK_9K9zE0nILAPJn7-0";
const GSSID = "1QUfjuyezpUIzpLWoTyrq52OPdK8Gkfj_UNNqoui_964";

// GET リクエストがきちんとあるか
if (!empty($_GET) && !empty($_GET["sheetName"])) {
  // 引数を元に json object を取得。失敗で false が返る。
  $sheet_data_json_obj = getJSONfromGSS($_GET["sheetName"], $_GET, GSSID);
  // 与えられた json object を元に http response を返す。
  response_json($sheet_data_json_obj);
} else {
  response_json(null);
}


// Google Sheets API v3 を利用
// 指定したスプレッドシートIDのスプレッドシートの指定したシートのセル情報をJSONで引っこ抜く。WEBに公開が必要。共有設定は不要。
function getJSONfromGSS($sheetName, $request_data_arr, $gssid) {
  // 未入力処理
  if (empty($sheetName) || empty($gssid)) return false;

  $url = "https://spreadsheets.google.com/feeds/worksheets/" . $gssid . "/public/basic?alt=json";
  $json_str = file_get_contents($url);
  // エラー処理
  if (empty($json_str)) return false;

  // 文字エンコード処理後、JSON文字列をPHPオブジェクトへ変換
  $json_str = mb_convert_encoding($json_str, 'UTF8', 'ASCII,JIS,UTF-8,EUC-JP,SJIS-WIN');
  $json_obj = json_decode($json_str);

  // オブジェクト内の必要なデータ(entry)を取り出す
  $entry_sheets = $json_obj->feed->entry;

  // ターゲット($sheetName)になってる名前のシートのシートIDが入っているURIを調べる
  $targetSheetIdURI = null;
  foreach ($entry_sheets as $sheet) {
    if ($sheet->title->{'$t'} === $sheetName) {
      $targetSheetIdURI = $sheet->id->{'$t'};
      // echo "success<hr>";
      break;
    }
  }

  // エラー処理
  if (!$targetSheetIdURI) {
    // echo "not found<hr>";
    return false;
  }

  // URIから最後の '/' の後のstring (sheetID に当たる文字列) をとる
  $targetSheetId = substr(strrchr($targetSheetIdURI, '/'), 1);
  // echo $targetSheetId;

  // ターゲットのシートからセル情報を取得
  $url = 'https://spreadsheets.google.com/feeds/list/' . $gssid . '/' . $targetSheetId . '/public/values?alt=json';
  $json_str = file_get_contents($url);
  // エラー処理
  if (empty($json_str)) return false;

  // 文字エンコード処理後、JSON文字列をPHPオブジェクトへ変換
  $json_str = mb_convert_encoding($json_str, 'UTF8', 'ASCII,JIS,UTF-8,EUC-JP,SJIS-WIN');
  $json_obj = json_decode($json_str);

  // オブジェクト内の必要なデータ(entry)を取り出す
  $entry_rows = $json_obj->feed->entry;

  // 欲しい key を google sheets API で帰ってくる形式に整形 original-key => gsx-key の連想配列へ
  $request_data_gsx_arr = [];
  foreach ($request_data_arr as $key => $none_value) {
    $request_data_gsx_arr[$key] = 'gsx$' . $key;
  }

  // $request_data_arr (どのプロパティ(カラム)が欲しいかの配列) を元にレスポンスする情報群を生成
  $modified_rows = [];
  foreach ($entry_rows as $entry_row) {

    // 表示する項目 show/hide の処理
    if (!$entry_row->{'gsx$enable'}->{'$t'}) continue;

    $modified_row = [];
    foreach ($request_data_gsx_arr as $original_key => $gsx_key) {
      if (empty($entry_row->$gsx_key)) continue;
      $modified_row[$original_key] = $entry_row->$gsx_key->{'$t'};
    }

    if (empty($modified_row)) continue;

    array_push($modified_rows, $modified_row);
  }

  // 空の場合要求したものが一つも無かったということなので、エラー処理
  if (empty($modified_rows)) return false;

  // そうでなければ配列を返す
  return $modified_rows;

} // function getJSONfromGSS


// 与えられた object をもとに json string をレスポンスする
function response_json($obj) {
  if (!empty($obj)) {

    http_response_code(200);
    header("Content-Type: application/json; charset=utf-8");
    echo json_encode($obj);

  } else {
    http_response_code(404);
  }
}
