define(["dojo", "put-selector/put", "dojo/date", "dojo/date/locale"], 
function(dojo, put, DD, DF) {


  /* 
   Lifecycle refresher:
   
   new EventGrid:
    preamble
    constructor
    postscript
  */

   var genId = 1;
   function nextId() {
     return "event_grid_" + genId++;
   }

  function timeIncrements(startTime, endTime) {
    var t = dojo.isString(startTime) ? (new Date(startTime)) : startTime;
    var e = dojo.isString(endTime) ? (new Date(endTime)) : endTime;

    var incs = [];
    while(t <= e) {
      incs.push( DF.format(t, {selector: 'time'}) ); 
      t = dojo.date.add(t, 'minute', 15);
    }
    return incs;
  }
  
  
  return dojo.declare([], {
    showDay: null,
    
    constructor: function(opts, srcNodeRef) {
      console.debug("CTOR");
    },
    
    postscript: function(opts, srcNodeRef) {
      console.debug("POSTSCRIPT");
      if (srcNodeRef) {
				// normalize srcNodeRef and store on instance during create process.
				this.srcNodeRef = srcNodeRef = srcNodeRef.nodeType ? srcNodeRef : dojo.byId(srcNodeRef);
			} 
      this.create(opts, srcNodeRef)
      this.inherited(arguments);
    },
    
    preamble: function() {
      this.inherited(arguments);
      console.debug("PREAMBLE");
    },

    // =====
    
    create: function(opts, srcNodeRef) {

      this.showDay = opts.showDay;

      var domNode = srcNodeRef || put("div");
      this.domNode = domNode;
      
      // apply id to widget and domNode. From incoming node, widget params, or autogenerated.
    	this.id = domNode.id = domNode.id || this.id || nextId();
      
      put(domNode, '.event-grid');
      this.render();
    },
    
    render: function() {
      this.headerNode = put(this.domNode, 'div.egrid-header');
      this.bodyNode = put(this.domNode, 'div.egrid-body');
      
      var table = put(this.domNode, 'table tbody');
      this.headerNode = put(table, 'tr.egrid-header');
      this.bodyNode = put(table, 'tr.egrid-body');
      this.footerNode = put(table, 'tr.egrid-footer');

      this.renderHeader();
      
      this.renderBody();
    },
    
    renderHeader: function() {
      console.debug("renderHeader; this=%o", this);
      put(this.headerNode, 'th.time'); // no header content for times column

      dojo.forEach(this.showDay.stages, function(showsInfo) {
        //console.debug("showsInfo = %o", showsInfo);
        put(this.headerNode, 'th $', showsInfo.stage.name);
      }, this);

    },
    
    renderBody: function() {
      var ul = put(this.bodyNode, 'th.times ul.schedule-times');

      // dojo.forEach(['11:30', '11:45', '12:00', '12:15', '12:30'], function(time) {
      //   put(ul, 'li $', time);
      // });
      
      console.debug("renderBody; this = %o", this);
      dojo.forEach( timeIncrements(this.showDay.schedule_start, this.showDay.schedule_end), function(time) {
        put(ul, 'li $', time);
      });
      
      var venueLineupNodes = [];
      
      dojo.forEach(this.showDay.stages, function(stageLineup) {
        
        // create a single column for all the shows
        var venueLineupNode = put(this.bodyNode, 'td.venue div.artist-lineup');
        
        dojo.forEach(stageLineup.shows, function(setInfo ) {

          var showBox = put(venueLineupNode, 'div.show-box');
          // the show box is sized and placed based on the time information
          //console.debug("calculating info from setInfo=%o", setInfo)
          var PX_PER_MIN = 2;
          var START_OF_DAY = new Date('09/22/2011 07:00 PM');
          var startOffset = (DD.difference(START_OF_DAY, new Date(setInfo.start), 'minute') * PX_PER_MIN);
          var height = (parseInt(setInfo.length) * PX_PER_MIN) - 1; // shave a pixel off
          //console.debug("math... startOffset = %o; height = %o", startOffset, height);
          
          dojo.style(showBox, {
            height: height+'px', // calculate from show length or end time
            top: startOffset+'px'
          });

          put(showBox, 'div.show-container strong.show-title $ +span.show-time $', setInfo.name, setInfo.start)

        }, this);

        venueLineupNodes.push(venueLineupNode);
        
      }, this);
      
    }
    

    // =====
    
    
  });
  
});