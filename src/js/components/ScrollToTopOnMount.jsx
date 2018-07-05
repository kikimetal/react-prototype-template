import React from "react"

export default class ScrollToTopOnMount extends React.Component {
  componentDidUpdate(prevProps) {
    window.scrollTo(0, 1)
  }
  render() {
    return null
  }
}

// import { animateScroll } from "react-scroll"
// animateScroll.scrollToTop({
//   smooth: true,
//   duration: 200,
// })
// window.pageYOffset
// document.querySelector(".animated-switch-wrapper").getBoundingClientRect().top
