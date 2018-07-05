function getJSON(url) {
  var xhr = new XMLHttpRequest()

  // XMLHttpRequest オブジェクトの状態が変化した際に呼び出されるイベントハンドラ
  xhr.onreadystatechange = function() {
    if(xhr.readyState == 4 && xhr.status == 200){ // サーバーからのレスポンスが完了し、かつ、通信が正常に終了した場合
      // alert(xhr.responseText) // 取得した JSON ファイルの中身を表示
      // return xhr.responseText
    }
  }
  xhr.open("GET", url, false)
  xhr.send(null)
  return JSON.parse(xhr.responseText)
}

export function getObjectFromJSON(url){
  return getJSON(url)
}

export function getArrayFromJSON(url){
  return Object.values(getJSON(url))
}

export default {
  getArrayFromJSON,
  getObjectFromJSON,
}
