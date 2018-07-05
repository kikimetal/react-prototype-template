import React from 'react'

const Btn = ({ children, label, className, ...props }) => (
  <span className={`Btn ${className ? className : ""}`} {...props}>
    {children || label}
  </span>
)
Btn.defaultProps = {
  label: "button",
}

export default Btn
