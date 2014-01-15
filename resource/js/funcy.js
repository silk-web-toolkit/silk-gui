function defined(x) { return (x != null); }

function truth(x) { return (x !== false) && defined(x) };

function when(cond, action) {
  if (truth(cond))
    return action();
  else
    return undefined;
}
