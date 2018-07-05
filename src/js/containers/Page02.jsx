import React from "react"
import { connect } from "react-redux"

// containers
import Footer from "./Footer"

const Page02 = props => {
  const page = props.routes.page02
  return (
    <div className="Page02 page">
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

export default connect(mapStateToProps)(Page02)
