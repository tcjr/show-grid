define(["dojo", "put-selector/put"], 
function(dojo, put) {

  var SCHEDULE_DATA =
      [
        {
          stage: {
            name: "My house"
          },
          shows: [
            {
              name: "Good Band",
              start: "12:00pm",
              end: "1:00pm"
            },
            {
              name: "Great Band",
              start: "1:30pm",
              end: "3:15pm"
            },
            {
              name: "Awesome Band",
              start: "4:00pm",
              end: "7:00pm"
            }
      
          ]
        }
      ];

  

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
  
  return dojo.declare([], {
    
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
    },
    
    preamble: function() {
      console.debug("PREAMBLE");
    },

    // =====
    
    create: function(opts, srcNodeRef) {

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
      //put(this.headerNode, 'th, th $, th $, th $', 'Stage One', 'Stage Two', 'Stage Three');
      
      put(this.headerNode, 'th'); // no header content for times column
      dojo.forEach(['Stage One', 'Stage Two', 'Stage Three'], function(stageName) {
        put(this.headerNode, 'th $', stageName);
      }, this);

    },
    
    renderBody: function() {
      // var rb = put(this.bodyNode, 'th $, td.venue $, td.venue $, td.venue $', 'times down this column', 
      //   'stage 1 acts down this column', 'stage 2 acts down this column', 'stage 3 acts down this column');

      var tempLineupData = [
        [ {name:'Early 1', start:'0'}, 
          {name:'Afternoon 1', start:'120'}, 
          {name:'Evening 1', start:'300'} ],
        [ {name:'Early 2', start:'0'}, 
          {name:'Afternoon 2', start:'120'}, 
          {name:'Evening 2', start:'300'} ],
        [ {name:'Early 3', start:'0'}, 
          {name:'Afternoon 3', start:'120'}, 
          {name:'Evening 3', start:'300'} ],
      ];
      put(this.bodyNode, 'th.times'); // TODO: build hour list
      
      var venueLineupNodes = [];
      dojo.forEach(tempLineupData, function(stageLineup) {
        var venueLineupNode = put(this.bodyNode, 'td.venue div.artist-lineup');
        dojo.forEach(stageLineup, function(setInfo ) {
          
          var showBox = put(venueLineupNode, 'div.show-box');
          dojo.style(showBox, {
            height: '59px', // calculate from show length or end time
            //'line-height': '59px',
            top: setInfo.start+'px' // startTimeToOffset(setInfo.start)
          });
          //showBox.innerHTML = "<span><em>"+setInfo.name+"</em></span>"

          put(showBox, 'div.show-container strong.show-title $ +span.show-time $', setInfo.name, setInfo.start)

          //<div class="ds-event-container"><strong style="font-size:1.4em;" class="ds-event-title"><a href="/band/tab-the-band">TAB the Band</a></strong><span style="font-size:1.4em;" class="ds-time-range">12:15 - 1:00</span></div>
          
        }, this);

        venueLineupNodes.push(venueLineupNode);
        
      }, this);
      
      console.debug("venues lineups = %o", venueLineupNodes);
    },
    

    // =====
    
    /*
    var SCHEDULE_DATA =
        [
          {
            stage: {
              name: "My house"
            },
            shows: [
              {
                name: "Good Band",
                start: "12:00pm",
                end: "1:00pm"
              },
              {
                name: "Great Band",
                start: "1:30pm",
                end: "3:15pm"
              },
              {
                name: "Awesome Band",
                start: "4:00pm",
                end: "7:00pm"
              }

            ]
          }
        ];
      */
    
    setEventData: function(data) {
      this.showData = data;
    }
    
  });
  
});