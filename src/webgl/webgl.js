//Main functions
function init_wgl_context(){
  //-----------------------

  init_context();
  init_canvas_listener();
  init_canvas_size()
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

  gl.enable(gl.DEPTH_TEST)

  info.webgl.context = gl;
  info.webgl.canvas = canvas;

  //-----------------------
}
function init_viewport(){
  gl = info.webgl.context;
  //-----------------------

  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  //-----------------------
}
function init_canvas_listener(){
  let canvas = info.webgl.canvas;
  //-----------------------

  canvas.addEventListener("mouseover", event => set_mouse_over(true));
  canvas.addEventListener("mouseout", event => set_mouse_over(false));
  canvas.addEventListener("mousemove", event => get_mouse_pos(event, canvas));
  canvas.addEventListener("click", event => add_point_mouse());

  //-----------------------
}
function init_canvas_size(){
  let canvas = info.webgl.canvas;
  //-----------------------

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

  //-----------------------
  return needResize;
}
function get_webgl_info(){
  //-----------------------

  say(gl.getParameter(gl.SHADING_LANGUAGE_VERSION));
  say(gl.getParameter(gl.VERSION));

  //-----------------------
}

//Object functions
function draw_object(data){
  gl = info.webgl.context;
  vbo_xy = data.vbo_xy;
  vbo_rgb = data.vbo_rgb;
  //-----------------------

  //Location
  gl.bindBuffer(gl.ARRAY_BUFFER, vbo_xy);
  gl.vertexAttribPointer(info.shader.attribut.location, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(info.shader.attribut.location);

  //Color
  gl.bindBuffer(gl.ARRAY_BUFFER, vbo_rgb);
  gl.vertexAttribPointer(info.shader.attribut.color, 4, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(info.shader.attribut.color);

  //Draw
  gl.drawArrays(data.draw, 0, data.xy.length);

  //-----------------------
}
function create_object(data){
  gl = info.webgl.context;
  vbo_xy = data.vbo_xy;
  vbo_rgb = data.vbo_rgb;
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
function update_object(data){
  gl = info.webgl.context;
  vbo_xy = data.vbo_xy;
  vbo_rgb = data.vbo_rgb;
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
function create_buffer(data){
  //-----------------------

  data.vbo_xy = gl.createBuffer();
  data.vbo_rgb = gl.createBuffer();

  //-----------------------
}
