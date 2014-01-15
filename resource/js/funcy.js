/************************
error handling
************************/

function error(msg) { throw new Error(msg); }

function warn(msg) { console.log(['WARN :', msg].join(' ')); }

function info(msg) { console.log(['INFO :', msg].join(' ')); }


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
