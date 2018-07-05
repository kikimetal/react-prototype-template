import React from "react"
import { connect } from "react-redux"

// containers
import Footer from "./Footer"

const Page01 = props => {
  const page = props.routes.page01
  return (
    <div className="Page01 page">
      <h1 className="page-title">{page.heading}</h1>
      <h1 className="page-title">{page.heading}</h1>
      <h1 className="page-title">{page.heading}</h1>
      <Footer />
    </div>
  )
}

const mapStateToProps = state => ({
  routes: state.routes,
})

export default connect(mapStateToProps)(Page01)
