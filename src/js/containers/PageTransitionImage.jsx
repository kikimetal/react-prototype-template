import React from "react"
import { connect } from "react-redux"
import urljoin from "url-join"

const PageTransitionImage = props => (
  <div className={`PageTransitionImage ${props.isPageMoving ? "on" : "off"}`}>
    {/*<div className="bg" style={{
        backgroundImage: `url(${props.src})`,
      }}></div>*/}
    <div className="bg" style={{background: "thistle"}}></div>
  </div>
)

const mapStateToProps = state => ({
  isPageMoving: state.isPageMoving,
  assetsPath: state.assetsPath,
})

export default connect(mapStateToProps)(PageTransitionImage)
