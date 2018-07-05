import merge from 'webpack-merge'

import common from './webpack.common.babel.js'

const config = merge(common, {
  devtool: 'inline-source-map',
})

export default config
