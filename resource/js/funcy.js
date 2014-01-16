/******************************************************************************
functional abstractions

usable anywhere in the application, no initialisation required
******************************************************************************/

/************************
error handling
************************/

function error(msg) { throw new Error(msg); }

function warn(msg) { console.log(['WARN :', msg].join(' ')); }

function info(msg) { console.log(['INFO :', msg].join(' ')); }

function debug(msg) { console.log(['DEBUG : ', msg].join(' ')); }


/************************
existence and truthyness
************************/

function type(obj){ return Object.prototype.toString.call(obj).slice(8, -1); }

function debugObject(inputobject) {
  obj = inputobject;
  for (x in obj) {
    info(x + ": " + obj[x]);
  }
}

function defined(x) { return (x != null); }

function truth(x) { return (x !== false) && defined(x) };

function when(cond, action) {
  if (truth(cond))
    return action();
  else
    return undefined;
}


/************************
collection access
************************/

function isIndexed(data) {
  return _.isArray(data) || _.isString(data);
}

function nth(a, index) {
  if (!_.isNumber(index)) fail("Expected a number as the index");
  if (!isIndexed(a)) fail("Not supported on non-indexed type");
  if ((index < 0) || (index > a.length - 1)) fail("Index value is out of bounds");
  return a[index];
}
