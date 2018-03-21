const path = require('path');

module.exports = {
    entry: './src/ui/app',
    mode: 'development',
    output: {
        filename: 'just-output-gui.js',
        path: path.resolve(__dirname, './dist'),
        chunkFilename: '[name].bundle.js',
        publicPath: "/assets/"
    },
    resolve: {
        extensions: [".js", ".jsx"],
        alias: {
          'jo': path.resolve(__dirname, 'dist/just-output'),
        }
    },
    resolveLoader: {
        modules: [path.resolve(__dirname, "./node_modules")],
    },
    module: {
        rules: [{
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.css$/,  
          include: /node_modules/,  
          loaders: ['style-loader', 'css-loader'],
        }]
    }
};