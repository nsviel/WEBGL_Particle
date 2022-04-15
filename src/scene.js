function drawScene(){
  //-----------------------

  //Parameter
  let nb_point = info.param.nb_point;
  gl = info.context;

  //Init
  compute_mvp();
  create_line();
  create_points(nb_point);
  create_object(points);
  create_object(lines);

  //Shader
  gl.useProgram(info.program);
  gl.uniformMatrix4fv(info.uniform.in_mvp, false, mvp.mvp);

  //main loop
  function render() {
    gl.clearColor(info.param.bkg, info.param.bkg, info.param.bkg, 1.0);
    gl.clearDepth(1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var startTime = performance.now()
    loop();
    var endTime = performance.now()
    //console.log(`Loop duration: ${endTime - startTime} milliseconds`)

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);

  //-----------------------
}
function loop(){
  //-----------------------

  

  move_points();
  move_line();

  gl.uniform1i(info.uniform.is_point, 1);
  update_object(points);
  draw_object(points);

  gl.uniform1i(info.uniform.is_point, 0);
  update_object(lines);
  draw_object(lines);

  //-----------------------
}

function compute_mvp(){
  gl = info.context;
  //-----------------------

  // Create a perspective matrix, a special matrix that is
  const fieldOfView = 90 * Math.PI / 180;   // in radians
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const zNear = 0.1;
  const zFar = 100.0;
  const proj_mat = glMatrix.mat4.create();
  glMatrix.mat4.perspective(proj_mat, fieldOfView, aspect, zNear, zFar);
  glMatrix.mat4.ortho(proj_mat, -1.0, 1.0, -1.0, 1.0, zNear, zFar);

  // Model view matrix
  const modelview_mat = glMatrix.mat4.create();

  //Stock info into a dedicated structure
  mvp.projection = proj_mat;
  mvp.modelview = modelview_mat;
  mvp.mvp = modelview_mat;

  //-----------------------
}
function draw_object(data){
  gl = info.context;
  //-----------------------

  //Location
  gl.bindBuffer(gl.ARRAY_BUFFER, data.vbo_xy);
  gl.vertexAttribPointer(info.attribut.location, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(info.attribut.location);

  //Color
  gl.bindBuffer(gl.ARRAY_BUFFER, data.vbo_rgb);
  gl.vertexAttribPointer(info.attribut.color, 4, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(info.attribut.color);

  //Draw
  gl.drawArrays(data.draw, 0, data.size);

  //-----------------------
}
function create_object(data){
  gl = info.context;
  //-----------------------

  // Create a buffer for the square's positions.
  data.vbo_xy = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, data.vbo_xy);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data.xy), gl.STREAM_DRAW);

  data.vbo_rgb = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, data.vbo_rgb);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data.rgb), gl.STREAM_DRAW);

  //-----------------------
}
function update_object(data){
  gl = info.context;
  //-----------------------

  gl.bindBuffer(gl.ARRAY_BUFFER, data.vbo_xy);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data.xy), gl.STREAM_DRAW);

  gl.bindBuffer(gl.ARRAY_BUFFER, data.vbo_rgb);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data.rgb), gl.STREAM_DRAW);

  //-----------------------
}
