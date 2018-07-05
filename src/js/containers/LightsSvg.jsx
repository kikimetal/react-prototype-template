import React from "react"
import { connect } from "react-redux"
// functions
import getRandomInt from "../functions/getRandomInt"

const LightsPath = ({ color, scale, rotate, x, y, delay }) => {
  rotate = rotate + 45
  return (
    <g className="lights-effect" stroke="none" strokeWidth="1" fill={color} fillRule="evenodd" transform={`scale(${scale}) translate(${x}, ${y})`} style={{animationDelay: delay + "s"}}>
      <path d="M1.447,1.447 C6.447,6.447 6.447,6.447 11.447,1.447 C6.447,6.447 6.447,6.447 11.447,11.447 C6.447,6.447 6.447,6.447 1.447,11.447 C6.447,6.447 6.447,6.447 1.447,1.447 Z" id="Light-super-10px" transform={`translate(6.447, 6.447) rotate(${rotate}) translate(-6.447, -6.447)`}></path>
    </g>
  )
}
LightsPath.defaultProps = {
  color: "transparent",
  scale: 0,
  rotate: 0,
  x: 0,
  y: 0,
  delay: 0,
}

const LightsSvg = ({ width, height }) => {

  const num = Math.floor(width / 20)
  const arr = new Array(num).fill(null)

  return (
    <svg className="LightsSvg" width={`${width}px`} height={`${height}px`} viewBox={`0 0 ${width} ${height}`} version="1.1">
      {arr.map((value, index) => (
        <LightsPath
          key={`lights-svg-path-${index}`}
          rotate={getRandomInt(0, 90)}
          scale={getRandomInt(1, 5) < 5 ? getRandomInt(4, 16) / 10 : getRandomInt(40, 50) / 10}
          x={getRandomInt(0, width)}
          y={getRandomInt(0, height)}
          delay={getRandomInt(0, 300) / 100}
          />
      ))}
    </svg>
  )
}

const mapStateToProps = state => ({
  width: state.windowWidth,
  height: state.windowHeight,
})

export default connect(mapStateToProps)(LightsSvg)
