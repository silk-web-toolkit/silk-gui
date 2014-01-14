var Api = {
	create : function(core, dom, pubsub, module_selector) {
    //var CONTAINER = core.dom.find('#' + module_selector);

    return {
      find : function(selector) {
        return dom.find(selector);
      },

      addEvent : function(element, type, fn) {
        dom.addEvent(element, type, fn);           
      },

      removeEvent : function(element, type, fn) {
        dom.removeEvent(element, type, fn);              
      },

      notify : function(core, evt) {
        if (pubsub.is_obj(evt) && evt.type) {
          pubsub.notify(core, evt);
        }         
      },

      listen : function(core, evts) {
        console.log("in listen");
        if (pubsub.is_obj(evts)) {
          console.log("is obj, off to register");
          pubsub.listen(core, evts, module_selector);
        }
      },

      loadTpl : function(parent, tpl) {
        var p = document.getElementById(parent);
        var tpl = document.getElementById(tpl);
        this.removeChildElements(p);
        p.appendChild(tpl.content.cloneNode(true));
      },

      removeChildElements : function(parent) {
        while (parent.hasChildNodes()) {
          parent.removeChild(parent.lastChild);
        }
      },

      inject : function(el, data) {
        dom.inject(el, data);
      },

      ignore : function(evts) {
        if (core.is_arr) {
          core.removeEvents(evts, module_selector);
        }   
      }
    };
  }
}
