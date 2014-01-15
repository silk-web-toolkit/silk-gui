var Api = {
	create : function(core, dom, moduleSelector) {

    return {
      find : function(selector) {
        return dom.find(selector);
      },

      addEvent : function(element, type, fn) {
        dom.bind(element, type, fn);           
      },

      removeEvent : function(element, type, fn) {
        dom.unbind(element, type, fn);              
      },

      inject : function(el, data) {
        dom.dataRender(el, data);
      },

      notify : function(evt) {
        if (core.is_obj(evt) && evt.type) {
          core.triggerEvent(evt);
        }         
      },

      listen : function(evts) {
        console.log("in listen");
        if (core.is_obj(evts)) {
          console.log("is obj, off to register");
          core.registerEvents(evts, moduleSelector);
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
