function runtime_camera(){
  //-----------------------

  compute_canvas_size();
  compute_viewport();

  //-----------------------
}

function compute_canvas_size(){
  let canvas = info.webgl.canvas;
  //-----------------------

  // Lookup the size the browser is displaying the canvas in CSS pixels.
  const displayWidth  = canvas.clientWidth;
  const displayHeight = canvas.clientHeight;

  // Check if the canvas is not the same size.
  let needResize = canvas.width !== displayWidth || canvas.height !== displayHeight;
  if(needResize){
    // Make the canvas the same size
    canvas.width  = displayWidth;
    canvas.height = displayHeight;
  }

  //-----------------------
  return needResize;
}
function compute_viewport(){
  gl = info.webgl.context;
  //-----------------------

  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  //-----------------------
}
function compute_mvp(){
  gl = info.webgl.context;
  //-----------------------

  // Create a perspective matrix, a special matrix that is
  const fieldOfView = 90 * Math.PI / 180;   // in radians
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const zNear = 0.1;
  const zFar = 100.0;
  const proj_mat = glMatrix.mat4.create();
  glMatrix.mat4.perspective(proj_mat, fieldOfView, aspect, zNear, zFar);
  //glMatrix.mat4.ortho(proj_mat, -1.0, 1.0, -1.0, 1.0, zNear, zFar);

  // Model view matrix
  const modelview_mat = glMatrix.mat4.create();

  //Stock info into a dedicated structure
  info.webgl.mvp.projection = proj_mat;
  info.webgl.mvp.modelview = modelview_mat;
  info.webgl.mvp.mvp = modelview_mat;

  //-----------------------
}
