
export function monkeyPatchFunction(holder, name, post, pre) {
  const originalFunction = holder[name];
  if (!(originalFunction instanceof Function)) {
    throw new Error(`Monkey-patching failed: ${holder}.${name} is not a function.`);
  }
  const patchedFunction = function (...args) {
    pre?.(this, args, patchedFunction);
    const result = originalFunction.apply(this, args);
    post?.(this, args, result, patchedFunction);
    return result;
  };
  holder[name] = patchedFunction;
}

export function monkeyPatchMethod(Clazz, methodName, post, pre) {
  return monkeyPatchFunction(Clazz.prototype, methodName, post, pre);
}


// function patchBind() {
//   // TODO: hook it up to arg<->param matching.
//   // NOTE: this works -
//   // var b = Function.prototype.bind;
//   // Function.prototype.bind = function _bind(...args) {
//   //   console.log('bound call', args);
//   //   return b.apply(this, args);
//   // };
// }

// // function f(x, y) { console.log(x, y); }

// // var g = f.bind(null, 1);
// // g(2)

// export default function monkeyPatching() {
//   patchBind();

//   // TODO: a lot more patching to be done
// }