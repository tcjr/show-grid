define(['dojo', 'dijit', 'lineup/Cubes', 'dijit/form/Select', 'dojox/json/ref', 'dojox/highlight', 'dojox/highlight/languages/javascript', 'dojo/domReady!'], 
function(dojo, dijit, Cubes) {

  var SchedulePage = dojo.declare([], {
    currentCssClass: '',
    theGrid: null,
    sampleSelect: null,
    sampleData: null,
    
    constructor: function(gridId, selectorId, sampleData) {
      console.debug("CTOR... arguments=%o", arguments);
      this.sampleData = sampleData;
      // Build the grid
      console.debug("CTOR...");
      this.theGrid = new Cubes({}, gridId);

      // Build the selector
      console.debug("CTOR...");
      var options = dojo.map(this.sampleData, function(s, idx) { return { label: s.title, value: idx}; });
      console.debug("CTOR... options=%o", options);
      var ss = new dijit.form.Select({
        name: 'sample',
        options: options,
      }, selectorId);
      console.debug("CTOR...ss=%o", ss);
      this.sampleSelect = ss;
      console.debug("CTOR...");
      
      // Listen for selector changes
      console.debug("CTOR...");
      dojo.connect(this.sampleSelect, 'onChange', dojo.hitch(this, function(idx){
        console.debug("Changed!  args=%o", arguments);
        this.switchToSample( idx );
      }));
      
      console.debug("CTOR done; this = %o", this);
    },
    
    displaySampleData: function(sampleInfo, data) {
      console.debug("arguments = %o", arguments)
      dojo.removeClass(this.theGrid.domNode, this.currentCssClass);
      this.currentCssClass = sampleInfo.css_class;
      dojo.addClass(this.theGrid.domNode, this.currentCssClass);

      this.theGrid.setShowDayData( data );
      this.theGrid.render();
    },
    
    //switchToSample: function(sampleInfo) {
    switchToSample: function(sampleIndex) {
      var loadedShowData = dojo.xhrGet({
        url: this.sampleData[sampleIndex].url,
        handleAs: 'json'
      });

      //dojo.when(loadedShowData, dojo.partial(displaySampleData, sampleInfo));
      dojo.when(loadedShowData, dojo.partial(dojo.hitch(this, 'displaySampleData'), this.sampleData[sampleIndex]));
    }
    
    
  });
  
  return SchedulePage;

});
