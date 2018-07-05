import urljoin from "url-join"

export const setWindowSize = () => {
  return (dispatch) => {

    const width = window.innerWidth
    const height = window.outerHeight
    ? window.innerHeight
    : window.orientation
    ? screen.width
    : screen.height
    // 肝心な部分。iOS:safari では outerHeight == 0

    dispatch({
      type: "SET_WINDOW_WIDTH",
      width,
    })

    dispatch({
      type: "SET_WINDOW_HEIGHT",
      height,
    })

    let size
    if (width < 768) {
      size = "sm"
    } else if (width < 1240) {
      size = "md"
    } else if (width < 1900) {
      size = "lg"
    } else {
      size = "xl"
    }

    dispatch({
      type: "SET_WINDOW_SIZE",
      size,
    })
  }
}

export const reverseWebsite = () => ({
  type: "REVERSE_WEBSITE",
})

export const setWebsitesDataCondition = condition => ({
  type: "SET_WEBSITES_DATA_CONDITION",
  condition,
})

export const setWebsitesData = data => ({
  type: "SET_DATA",
  data,
})

export const setWpData = data => ({
  type: "SET_WP_DATA",
  data,
})

const ROUTES = window.__ROUTES__
// 引数の path が 存在するか確認。route情報を返す。
const checkRoute = path => {
  const keyArr = Object.keys(ROUTES) // key の配列を生成 // ["page00", "page01", ...]
  const matchRoute = keyArr.find(key => ROUTES[key].uri === path) || false
  return matchRoute ? ROUTES[matchRoute] : ROUTES["page00"]
}

export const pageMoveToPathname = (nextPath) => {

  if (window.location.pathname === nextPath) return false

  return (dispatch) => {
    dispatch({
      type: "SET_MOVE_TO_PATHNAME",
      nextPath,
    })

    dispatch({
      type: "PAGE_MOVING",
    })

    // setTimeout(() => dispatch({ type: "PAGE_MOVED" }), 1800)
    setTimeout(() => dispatch({ type: "PAGE_MOVED" }), 2200)

    // const nextRoute = checkRoute(nextPath)
    // dispatch({
    //   type: "SET_NEXT_PAGE_SHORT_MESSAGE",
    //   shortMessage: nextRoute.shortMessage,
    // })
  }
}

// mobile menu show / hide
export const toggleMobileMenu = (context) => {
  return (dispatch, getState) => {
    dispatch({
      type: "SET_MOBILE_MENU_CONTEXT",
      context: !getState().mobileMenuContext,
    })
  }
}

// JSON を取得した後に 指定のアクションタイプで dispatch する
const fetchJsonAndDispatch = (fetchUrl, actionTypeString, dispatchFunction) => {
  fetch(fetchUrl)
    .then(res => {
      if(!res.ok) {
        throw Error(res.statusText)
      }
      return res
    })
    .then(res => res.json())
    .then(data => {
      dispatchFunction({
        type: actionTypeString,
        data,
        status: "fulfilled",
      })
    })
    .catch(error => {
      console.error("ERROR in redux action at " + actionTypeString, error)
      dispatchFunction({
        type: actionTypeString,
        data: null,
        status: "rejected",
      })
    })
}

// get news data
export const getNews = () => {
  return (dispatch, getState) => {
    const { news, assetsPath } = getState()
    // すでにセットされてたら終了
    if (news.status !== "pending") return

    const url = urljoin(assetsPath, "gss-api.php?sheetName=news&date&title&description&img-src&img-alt&link-flg&link-text&link-href")
    fetchJsonAndDispatch(url, "SET_NEWS", dispatch)
  }
}

// get story data
export const getStory = () => {
  return (dispatch, getState) => {
    const { story, assetsPath } = getState()
    // すでにセットされてたら終了
    if (story.status !== "pending") return

    const url = urljoin(assetsPath, "gss-api.php?sheetName=story&element&value")
    fetchJsonAndDispatch(url, "SET_STORY", dispatch)
  }
}

// get service data
export const getService = () => {
  return (dispatch, getState) => {
    const { service, assetsPath } = getState()
    // すでにセットされてたら終了
    if (service.status !== "pending") return

    const url = urljoin(assetsPath, "gss-api.php?sheetName=service&element&value")
    fetchJsonAndDispatch(url, "SET_SERVICE", dispatch)
  }
}
