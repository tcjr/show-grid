/*
 * Page-level controller for displaying the different schedule samples.
 */
define(['dojo', 'dijit', 'lineup/Cubes', 'dijit/form/Select', 'dojox/json/ref', 'dojo/domReady!'], 
function(dojo, dijit, Cubes) {

  var SchedulePage = dojo.declare([], {
    currentCssClass: '',
    theGrid: null,
    sampleSelect: null,
    sampleData: null,
    
    constructor: function(gridId, selectorId, sampleData) {
      //console.debug("CTOR... arguments=%o", arguments);
      this.sampleData = sampleData;
      // Build the grid
      this.theGrid = new Cubes({}, gridId);

      // Build the selector
      var options = dojo.map(this.sampleData, function(s, idx) { return { label: s.title, value: idx}; });
      var ss = new dijit.form.Select({
        name: 'sample',
        options: options,
      }, selectorId);
      this.sampleSelect = ss;
      
      // Listen for selector changes
      dojo.connect(this.sampleSelect, 'onChange', dojo.hitch(this, function(idx){
        console.debug("Changed!  args=%o", arguments);
        this.switchToSample( idx );
      }));
      
      //console.debug("CTOR done; this = %o", this);
    },
    
    displaySampleData: function(sampleInfo, data) {
      //console.debug("arguments = %o", arguments)
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
