/******************************************************************************
our fixed API

remains unchanging so any and all modules can use it
******************************************************************************/

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

      inject : function(el, data, directives) {
        dom.inject(el, data, directives);
      },

      notify : function(evt) {
        if (pubsub.is_obj(evt) && evt.type) {
          pubsub.notify(core, evt);
        }         
      },

      listen : function(evts) {
        if (pubsub.is_obj(evts)) {
          debug("registering to listen to : " + evts);
          debug("module is : " + moduleSelector);
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
