dependencies = {
    action: 'clean,release',
    async: true,
    cssOptimize: 'comments',
    mini: true,
    optimize: 'shrinksafe',
    releaseName: 'js',
    stripConsole: 'none',

    layers: [
        { 
          name: '../app/all.js', 
          resourceName: 'app.all', 
          dependencies: [ 
            'app.all'
          ] 
        }
    ],

    prefixes: [
        [ 'dijit', '../dijit' ],
        [ 'dojox', '../dojox' ],
        [ 'put-selector', '../put-selector'],
        [ 'lineup', '../lineup'],
        [ 'app', '../app' ]
    ],

    staticHasFeatures: {
        'dojo-sync-loader':0
    }
}