/************************
error handling
************************/

function error(msg) { throw new Error(msg); }

function warn(msg) { console.log(['WARN :', msg].join(' ')); }

function info(msg) { console.log(['INFO :', msg].join(' ')); }


/************************
existence and truthyness
************************/

function defined(x) { return (x != null); }

function truth(x) { return (x !== false) && defined(x) };

function when(cond, action) {
  if (truth(cond))
    return action();
  else
    return undefined;
}
