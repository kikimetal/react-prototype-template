const generateStyle = (defaultStyle, hoverStyle) => {
    const style = {};
    style.default = defaultStyle;
    style.hover = Object.assign({}, defaultStyle, hoverStyle);
    return style;
}
export default generateStyle
