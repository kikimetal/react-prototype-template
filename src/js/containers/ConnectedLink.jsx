import React from "react"
import { connect } from "react-redux"

import { withRouter } from 'react-router-dom'

const isModifiedEvent = event =>
  !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);

class ConnectedLink extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    const { history, replace, to, duration } = this.props

    // 現在のページかどうか NavLink みたく current-page に "active" class 付けてあげる
    let { className } = this.props
    className += history.location.pathname === to ? " active" : ""

    // 継承する this.props を設定する
    // warnig 原因の staticContext と、 redux の action を切り取り
    let {staticContext, pageMoveToPathname, ...inheritProps} = this.props
    // className 合成
    inheritProps = {
      ...inheritProps,
      className,
    }

    const handleClick = e => {

      if (this.props.onClick) this.props.onClick(e);

      // 現在のパスと同じなら終了
      if (this.props.location.pathname === to) {
        e.preventDefault()
        // e.stopPropagation()
        return false
      }

      if (
        !e.defaultPrevented && // onClick prevented default
        e.button === 0 && // ignore everything but left clicks
        !this.props.target && // let browser handle "target=_blank" etc.
        !isModifiedEvent(e) // ignore clicks with modifier keys
      ) {
        // ok
        e.preventDefault()

        setTimeout(() => {
          replace ? history.replace(to) : history.push(to)
        }, duration)

        // set redux
        this.props.pageMoveToPathname(to)

        // set CSS-class to current page
        const currentPage = document.querySelector(".page")
        currentPage.classList.add("leave")
      }

    }

    return (
      <a {...inheritProps} onClick={handleClick}>{this.props.children}</a>
    )
  }
}

ConnectedLink.defaultProps = {
  to: "/",
  duration: 260,
}

const mapStateToProps = state => ({})

import * as action from "../modules/action"
const mapStateToDispatch = dispatch => ({
  pageMoveToPathname: (nextPath) => dispatch(action.pageMoveToPathname(nextPath)),
})

export default withRouter(connect(mapStateToProps, mapStateToDispatch)(ConnectedLink))
