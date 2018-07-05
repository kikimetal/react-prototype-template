import React from "react"
import Helmet from "react-helmet"
import { connect } from "react-redux"
// components
import ScrollToTopOnMount from "../components/ScrollToTopOnMount"
// functions
import { getObjectFromJSON } from "../functions/getJSON"

// グローバルオブジェクトにセットされてるルーティング情報を取得
const ROUTES = window.__ROUTES__
// 引数の path が 存在するか確認。成功でルートのmeta情報を返す。
const getCurrentRouteData = path => {
  const keyArr = Object.keys(ROUTES) // key の配列を生成 // ["page00", "page01", ...]
  const matchRoute = keyArr.find(key => ROUTES[key].uri === path) || false
  return matchRoute ? ROUTES[matchRoute] : ROUTES["page00"]
}

const MyHelmet = (props) => {

  const currentRoute = getCurrentRouteData(props.currentPath)

  return (
    <div className="MyHelmet">
      <ScrollToTopOnMount />
      <Helmet>
        <title>{currentRoute.title}</title>
        <meta name="description" content={currentRoute.description} />
        <link rel="canonical" href={currentRoute.canonical} />
      </Helmet>
    </div>
  )
}

const mapStateToProps = state => ({
  currentPath: state.router.location.pathname,
})

export default connect(mapStateToProps)(MyHelmet)
