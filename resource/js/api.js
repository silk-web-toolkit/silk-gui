var Api = {
	create : function(core, dom, pubsub, moduleSelector) {

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

      inject : function(el, data) {
        dom.inject(el, data);
      },

      notify : function(evt) {
        if (pubsub.is_obj(evt) && evt.type) {
          pubsub.notify(core, evt);
        }         
      },

      listen : function(evts) {
        console.log("in listen");
        if (pubsub.is_obj(evts)) {
          console.log("is obj, off to register");
          pubsub.listen(core, evts, moduleSelector);
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

      ignore : function(evts) {
        if (core.is_arr) {
          core.removeEvents(evts, moduleSelector);
        }   
      }
    };
  }
}
