// require(['app/SchedulePage'], function() {
//   // layer 
//   return { this_is_all: true};
// });
// 
// 

require({
    baseUrl: 'js/',
    isDebug: this.isDebug,

    deps: [ 'app.SchedulePage' ],

    packages: [
        { name: 'dojo', location: 'dojo', lib: '.' },
        { name: 'dijit', location: 'dijit', lib: '.' },
        { name: 'dojox', location: 'dojox', lib: '.' },
        { name: 'app', location: 'app', lib: '.' },
        { name: 'put-selector', location: 'put-selector', lib: '.' },
        { name: 'lineup', location: 'lineup', lib: '.' }
    ]
});