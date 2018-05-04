const { mix } = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

// mix.webpackConfig({
//     devtool: '#eval-source-map'
// })

mix.js('resources/assets/js/app.js', 'public/js').sourceMaps();
// mix.js('resources/assets/js/app.js', 'public/js');
mix.sass('resources/assets/sass/app.scss', 'public/css');
mix.webpackConfig({
    module: {
    loaders: [{
            test: /\.styl$/,
            loader: 'css-loader!stylus-loader?paths=node_modules/bootstrap-stylus/stylus/'
     }]
    }
});

