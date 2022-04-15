function create_matrix(m, n){
  //-----------------------

  let arr = new Array(m); // create an empty array of length n
  for (var i = 0; i < m; i++) {
    arr[i] = new Array(n); // make each element an array
  }

  //-----------------------
  return arr;
}
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
function sayVecAlert(arr){
  alert(arr.join('\n'))
}
function sayAlert(arr){
  alert(arr)
}
function say(truc){
  console.log(truc);
}
function getRelativeMousePosition(event, target) {
  target = target || event.target;
  var rect = target.getBoundingClientRect();

  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  }
}

// assumes target or event.target is canvas
function getNoPaddingNoBorderCanvasRelativeMousePosition(event, target) {
  target = target || event.target;
  var pos = getRelativeMousePosition(event, target);

  pos.x = pos.x * target.width  / target.clientWidth;
  pos.y = pos.y * target.height / target.clientHeight;

  return pos;
}
function get_mouse_pos(e, target){
  const pos = getNoPaddingNoBorderCanvasRelativeMousePosition(e, target);

  // pos is in pixel coordinates for the canvas.
  // so convert to WebGL clip space coordinates
  info.mouse.x = pos.x / info.canvas.width  *  2 - 1;
  info.mouse.y = pos.y / info.canvas.height * -2 + 1;
}
function sort_by_indice(arr){
  var indices = new Array(arr.length);
  for (var k = 0; k < arr.length; ++k) indices[k] = k;
  indices.sort(function (a, b) { return arr[a] < arr[b] ? -1 : arr[a] > arr[b] ? 1 : 0; });
  return indices
}
