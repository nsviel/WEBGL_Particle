function drawScene(){
  //-----------------------

  //Parameter
  gl = info.context;

  //Init
  compute_mvp();
  init_points(info.param.nb_point);
  init_line();

  // Create buffers
  [points_vbo_xy, points_vbo_rgb] = create_buffer();
  [lines_vbo_xy, lines_vbo_rgb] = create_buffer();

  create_object(points, points_vbo_xy, points_vbo_rgb);
  create_object(lines, lines_vbo_xy, lines_vbo_rgb);

  //Shader
  gl.useProgram(info.program);
  gl.uniformMatrix4fv(info.uniform.in_mvp, false, mvp.mvp);
  gl.uniform1f(info.uniform.point_size, info.param.point_size);

  //main loop
  function render() {
    gl.clearColor(info.param.bkg, info.param.bkg, info.param.bkg, 1.0);
    gl.clearDepth(1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    loop();

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);

  //-----------------------
}
function loop(){
  //-----------------------

  ui_update();
  move_points();
  move_line_all();

  gl.uniform1i(info.uniform.is_point, 1);
  update_object(points, points_vbo_xy, points_vbo_rgb);
  draw_object(points, points_vbo_xy, points_vbo_rgb);


  gl.uniform1i(info.uniform.is_point, 0);
  update_object(lines, lines_vbo_xy, lines_vbo_rgb);
  draw_object(lines, lines_vbo_xy, lines_vbo_rgb);


  compute_stats()

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
  //lMatrix.mat4.perspective(proj_mat, fieldOfView, aspect, zNear, zFar);
  glMatrix.mat4.ortho(proj_mat, -1.0, 1.0, -1.0, 1.0, zNear, zFar);

  // Model view matrix
  const modelview_mat = glMatrix.mat4.create();

  //Stock info into a dedicated structure
  mvp.projection = proj_mat;
  mvp.modelview = modelview_mat;
  mvp.mvp = modelview_mat;

  //-----------------------
}
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
function compute_stats(){
  //PV = NkbT
  // T = PV / Nkb
  //kb = 1,38 × 10-23
  //N = nombre de particules
  //P = pression
  // V = volume en mètre cube

  let P = 1;
  let V = 1*Math.pow(10,-20)
  let N = points.nb_point
  let kb = 1.38*Math.pow(10,-23)
  let T = (P * V) / (N * kb)
}
