var DOM = (function() {

  return {
    find : function(selector, context) {
      var ret = {}, that = this, jqEls, i = 0;

      if (context && context.find) {
        jqEls = context.find(selector);
      } else {
        jqEls = jQuery(selector);
      }
                
      ret = jqEls.get();
      ret.length = jqEls.length;
      ret.query = function (sel) {
        return that.query(sel, jqEls);
      }
      return ret;
    },

    addEvent : function(element, evt, fn) {
      console.log('binding');
      console.log('element is : ' + element);
      console.log('evt is : ' + evt);
      if (element && evt) {
        if (typeof evt === 'function') {
          fn = evt;
          evt = 'click';
        }
        jQuery(element).bind(evt, fn);
      } else {
        // log wrong arguments
      }
    },

    removeEvent : function(element, evt, fn) {
      if (element && evt) {
        if (typeof evt === 'function') {
          fn = evt;
          evt = 'click';
        }
        jQuery(element).unbind(evt, fn);
      } else {
        // log wrong arguments 
      }
    },

    inject : function(el, data) {
      $('#' + el).render(data);
    }
  };
}());
