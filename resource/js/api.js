var Api = {
	create : function(core, module_selector) {

    return {
      find : function(selector) {
        return core.dom.find(selector);
      },

      addEvent : function(element, type, fn) {
        core.dom.bind(element, type, fn);           
      },

      removeEvent : function(element, type, fn) {
        core.dom.unbind(element, type, fn);              
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
          core.registerEvents(evts, module_selector);
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

      dataRender : function(el, data) {
        core.dataRender(el, data);
      },

      ignore : function(evts) {
        if (core.is_arr) {
          core.removeEvents(evts, module_selector);
        }   
      }
    };
  }
}
