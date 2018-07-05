import React from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

// container
import ConnectedLink from "./ConnectedLink"

class MenuTrigger extends React.Component{
  constructor(props){
    super(props)
  }
  render(){

    const { page00, page01, page02 } = this.props.routes

    return (
      <div className={`MenuTrigger ${this.props.mobileMenuContext || this.props.isPageMoving ? "collapse" : ""}`}>
        <div className="left-item" onClick={this.props.toggleMobileMenu}>
          <i className="fas fa-bars"></i>
          <span>MENU</span>
        </div>
        {
          this.props.location.pathname === page00.uri
            ? <ConnectedLink className="right-item" to={page01.uri}><i className="fas fa-chevron-right"></i>{page01.inbound}</ConnectedLink>
            : this.props.location.pathname === page01.uri
              ? <ConnectedLink className="right-item" to={page02.uri}><i className="fas fa-chevron-right"></i>{page02.inbound}</ConnectedLink>
              : <ConnectedLink className="right-item" to={page00.uri}><i className="fas fa-chevron-right"></i>{page00.inbound}</ConnectedLink>
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isPageMoving: state.isPageMoving,
  mobileMenuContext: state.mobileMenuContext,
  routes: state.routes,
})

import * as action from "../modules/action"
const mapStateToDispatch = dispatch => ({
  toggleMobileMenu: () => dispatch(action.toggleMobileMenu()),
})

export default withRouter(connect(mapStateToProps, mapStateToDispatch)(MenuTrigger))
