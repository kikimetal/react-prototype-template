<?php
http_response_code(200);
// header('Location: http://www.kikimetal.com/about');
// exit;
// var_dump($_POST);

mb_language("Japanese");
mb_internal_encoding("UTF-8");

function h($text){
    return htmlspecialchars($text);
}

$p = $_POST;

$sendDataList = array(
    "sendAddress" => h($p["address"]), // ここは暫定的に入力にしてるが後で固定化
    "userAddress" => h($p["userAddress"]),
    "title" => h($p["title"]),
    "name" => h($p["name"]),
    "age" => h($p["age"]) ? h($p["age"]) : "年齢不詳",
    "message" => h($p["message"])
);

$inputClearFlg = true;
foreach ($sendDataList as $key => $value) {
    if(!$value){
        $inputClearFlg = false;
    }
}

$outputMessage = "";
if(!$inputClearFlg){

    $outputMessage = "入力に不備がございます。入力必須欄は全て入力してください。申し訳ありませんがもう一度入力ページにてご確認いただきますようお願い申し上げます。";

}else{

    $sendAddress = $sendDataList["sendAddress"];
    $title = $sendDataList["title"];
    $message = "名前: " . $sendDataList["name"] . "\n年齢: " . $sendDataList["age"] . "\nmail: " . $sendDataList["userAddress"] . "\n以下本文:\n" . $sendDataList["message"];
    $userAddress = "From: " . $sendDataList["userAddress"];

    if (mb_send_mail($sendAddress, $title, $message, $userAddress)) {
        $outputMessage = "メールが送信されました。";
        // print_r($p); // $_POST 確認用
    } else {
        $outputMessage = "メールの送信に失敗しました。";
    }

}
?>

<!DOCTYPE html>
<html lang="ja">
    <head>
        <meta charset="utf-8">
        <title>送信結果</title>
        <meta name="viewport" content="width=device-width,initial-scale=1">
    </head>
    <body>
        <h2><?=$outputMessage?></h2>
    </body>
</html>
