//Main functions
function init_wgl_context(){
  //-----------------------

  init_context();
  init_resize_canvas(info.canvas)
  init_viewport();

  //-----------------------
}

//Sub-functions
function init_context(){
  //-----------------------

  //Init background context
  const canvas = document.querySelector('#glcanvas');
  const gl = canvas.getContext('webgl2');
  if (!gl) {
    alert('Unable to initialize WebGL. Your browser or machine may not support it.');
    return;
  }

  info.context = gl;
  info.canvas = canvas;

  canvas.addEventListener("mousemove", event => get_mouse_pos(event, canvas));

  //-----------------------
}
function init_viewport(){
  gl = info.context;
  //-----------------------

  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  //-----------------------
}
function init_resize_canvas(canvas){
  // Lookup the size the browser is displaying the canvas in CSS pixels.
  const displayWidth  = canvas.clientWidth;
  const displayHeight = canvas.clientHeight;

  // Check if the canvas is not the same size.
  const needResize = canvas.width  !== displayWidth ||
                     canvas.height !== displayHeight;

  if (needResize) {
    // Make the canvas the same size
    canvas.width  = displayWidth;
    canvas.height = displayHeight;
  }

  return needResize;
}
function get_webgl_info(){
  //-----------------------

  say(gl.getParameter(gl.SHADING_LANGUAGE_VERSION));
  say(gl.getParameter(gl.VERSION));

  //-----------------------
}

//Object functions
function draw_object(data, vbo_xy, vbo_rgb){
  gl = info.context;
  //-----------------------

  //Location
  gl.bindBuffer(gl.ARRAY_BUFFER, vbo_xy);
  gl.vertexAttribPointer(info.attribut.location, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(info.attribut.location);

  //Color
  gl.bindBuffer(gl.ARRAY_BUFFER, vbo_rgb);
  gl.vertexAttribPointer(info.attribut.color, 4, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(info.attribut.color);

  //Draw
  gl.drawArrays(data.draw, 0, data.nb_point);

  //-----------------------
}
function create_object(data, vbo_xy, vbo_rgb){
  gl = info.context;
  //-----------------------

  //Serialization
  let XY = [];
  let RGB = [];
  for(let i=0; i<data.xy.length; i++){
    XY.push(data.xy[i][0]);
    XY.push(data.xy[i][1]);

    RGB.push(data.rgb[i][0]);
    RGB.push(data.rgb[i][1]);
    RGB.push(data.rgb[i][2]);
    RGB.push(data.rgb[i][3]);
  }

  //Add to GPU
  gl.bindBuffer(gl.ARRAY_BUFFER, vbo_xy);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(XY), gl.STREAM_DRAW);

  gl.bindBuffer(gl.ARRAY_BUFFER, vbo_rgb);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(RGB), gl.STREAM_DRAW);

  //-----------------------
}
function update_object(data, vbo_xy, vbo_rgb){
  gl = info.context;
  //-----------------------

  //Serialization
  let XY = [];
  let RGB = [];
  for(let i=0; i<data.xy.length; i++){
    XY.push(data.xy[i][0]);
    XY.push(data.xy[i][1]);

    RGB.push(data.rgb[i][0]);
    RGB.push(data.rgb[i][1]);
    RGB.push(data.rgb[i][2]);
    RGB.push(data.rgb[i][3]);
  }

  //GPU update
  gl.bindBuffer(gl.ARRAY_BUFFER, vbo_xy);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(XY), gl.STREAM_DRAW);

  gl.bindBuffer(gl.ARRAY_BUFFER, vbo_rgb);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(RGB), gl.STREAM_DRAW);

  //-----------------------
}
function create_buffer(){
  //-----------------------

  vbo_xy = gl.createBuffer();
  vbo_rgb = gl.createBuffer();

  //-----------------------
  return [vbo_xy, vbo_rgb]
}
