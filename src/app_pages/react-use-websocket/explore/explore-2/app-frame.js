var appFrameVars = {
   frameActive: true,
   pageClasses: {},
   pageInstances: {}, // associated by instanceName
   modalStack: [], // stack of modal frames
   $: {
     instanceCounter: {}, // indexed by className
     instancesByClass: {}, // indexed by className
   },
   activeInstance: null,
   useInstanceTree: false, 
   instanceTree: null,
   instanceTreeIndexes: {}, 

   // events:
   onShow: (instance) => {},
   onClose: (instace) => {},
   onHide: (instance) => {},
};

var appFrameActions = {
   addPageClass: () => console.log()
}