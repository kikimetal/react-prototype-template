<?php
// root となる url の設定
$http_protocol = empty($_SERVER["HTTPS"]) ? "http://" : "https://";
$root_url = $http_protocol . $_SERVER["HTTP_HOST"];
$root_uri = '/';

// 許可する URL
if ($_SERVER["HTTP_HOST"] === 'www.carvancl.co.jp' || $_SERVER["HTTP_HOST"] === 'carvancl.co.jp') {
  $root_url = $http_protocol . 'www.carvancl.co.jp';
  $root_uri = '/v2/';
}
if ($_SERVER["HTTP_HOST"] === 'www.kikimetal.com' || $_SERVER["HTTP_HOST"] === 'kikimetal.com') {
  $root_url = $http_protocol . 'www.kikimetal.com';
  $root_uri = '/v2/';
}
if ($_SERVER["HTTP_HOST"] === 'www.maylily.co.jp' || $_SERVER["HTTP_HOST"] === 'maylily.co.jp') {
  $root_url = $http_protocol . 'www.maylily.co.jp';
  $root_uri = '/v2/';
}

// assets ディレクトリの設定
$assets_url = $root_url . $root_uri . 'assets';

// ルーティング情報を引き出す
$routesJsonUrl = "./assets/routes.json";
$routes = file_get_contents($routesJsonUrl);
$routes = mb_convert_encoding($routes, 'UTF8', 'ASCII,JIS,UTF-8,EUC-JP,SJIS-WIN');
$routes_array = json_decode($routes, true); // 配列へ
// アクセスされたPathを取得

$request_uri = null;
if ($_SERVER["REQUEST_URI"] === $root_uri) {
  $request_uri = "/";
} else {
  $request_uri = $_SERVER["REQUEST_URI"];
  // REQUEST_URI には host 以降すべてが含まれるので ($root_uri (basename) の長さ - 1文字 ("/")) を削除
  $request_uri = substr($request_uri, (strlen($root_uri) - 1) );
}

// ルーティング。ステータスコードも返す。
$this_route = null;
foreach ($routes_array as $page_id => $page_data) {
  if (isset($page_data["uri"]) && $page_data["uri"] === $request_uri) {
    $this_route = $page_data;
    break;
  }
}

// ルート確立 or 失敗
if ($this_route !== null) {
  http_response_code(200);
} else {
  http_response_code(404);
  $this_route = $routes_array["page404"];
}

?>
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <link rel="shortcut icon" href="<?= $assets_url ?>/img/favicon.ico">
  <link rel="apple-touch-icon" sizes="180x180" href="<?= $assets_url ?>/img/apple-touch-icon-180x180.png">
  <!-- apple-web-app -->
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black">
  <!-- react-helmet context meta -->
  <title><?= $this_route["title"] ?></title>
  <meta name="description" content="<?= $this_route["description"] ?>" data-react-helmet="true" />
  <link rel="canonical" href="<?= $this_route["canonical"] ?>" data-react-helmet="true" />

  <!-- stylesheet -->
  <link rel="stylesheet" href="<?= $assets_url ?>/css/bundle.css">

</head>
<body>

  <div id="app"></div>
  <!-- <div id="loader">
    <div class="loader-bg-img"></div>
    <span class="loader-text">LOADING</span>
    <span class="loader-circle"></span>
  </div> -->

  <script>
    window.__BASENAME__ = "<?= $root_uri ?>";
    window.__ROUTES__ = <?= $routes ?>;
    window.__ASSETS__ = "<?= $assets_url ?>";
  </script>

  <!-- cvl hand painter -->
  <script acync defer src="<?= $assets_url ?>/vender/jquery-2.2.4.min.js"></script>
  <script acync defer src="<?= $assets_url ?>/vender/jquery.lazylinepainter-1.7.0.min.js"></script>

  <!-- app component -->
  <script acync defer src="<?= $assets_url ?>/js/bundle.js"></script>

  <!-- fontawesome -->
  <script acync defer src="https://use.fontawesome.com/releases/v5.0.13/js/all.js" integrity="sha384-xymdQtn1n3lH2wcu0qhcdaOpQwyoarkgLVxC/wZ5q7h9gHtxICrpcaSUfygqZGOe" crossorigin="anonymous"></script>
</body>
</html>
