var start

// this example takes 2 seconds to run
function tic(){
  start = Date.now();
}
function toc(){
  const millis = Date.now() - start;
  say(millis)
}
function fct_distance(pt_1, pt_2){
  //-----------------------

  let dist = Math.sqrt(Math.pow(pt_1[0] - pt_2[0], 2) + Math.pow(pt_1[1] - pt_2[1], 2));

  //-----------------------
  return dist;
}
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
function randomDigit(min, max){
  return Math.floor(Math.random() * Math.floor(2)) * (max - min) + min;;
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
function get_value(value){
  return Object.assign({}, value);
}
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
  let value_1 = pos.x / info.webgl.canvas.width  *  2 - 1;
  let value_2 = pos.y / info.webgl.canvas.height * -2 + 1;
  info.value.mouse = ([value_1, value_2]);
}
function sort_by_indice(arr){
  var indices = new Array(arr.length);
  for (var k = 0; k < arr.length; ++k) indices[k] = k;
  indices.sort(function (a, b) { return arr[a] < arr[b] ? -1 : arr[a] > arr[b] ? 1 : 0; });
  return indices
}
