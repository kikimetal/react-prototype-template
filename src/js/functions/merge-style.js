const mergeStyle = (defaultStyle, overrideStyle) => overrideStyle ? Object.assign(defaultStyle, overrideStyle) : defaultStyle
export default mergeStyle
