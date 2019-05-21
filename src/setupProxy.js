const proxy = require('http-proxy-middleware')

module.exports = function(app) {
    app.use(proxy('/search', {
        target: 'http://search.sep.gob.mx/solr/cedulasCore/select?',
        changeOrigin: true,
    }));
};