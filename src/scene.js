//Main functions
function loop(){
  gl = info.context;
  //-----------------------

  //Init
  init_object();
  init_scene();

  //main loop
  function render() {
    gl.clearColor(info.param.bkg, info.param.bkg, info.param.bkg, 1.0);
    gl.clearDepth(1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    //tic();
    draw_scene();
    //toc();

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);

  //-----------------------
}
function draw_scene(){
  //-----------------------

  //Runtime functions
  runtime_ui();
  runtime_point();
  runtime_line_all();

  //Draw points
  gl.uniform1i(info.uniform.is_point, 1);
  update_object(points, points_vbo_xy, points_vbo_rgb);
  draw_object(points, points_vbo_xy, points_vbo_rgb);

  //Draw lines
  gl.uniform1i(info.uniform.is_point, 0);
  update_object(lines, lines_vbo_xy, lines_vbo_rgb);
  draw_object(lines, lines_vbo_xy, lines_vbo_rgb);

  //-----------------------
}

//Init functions
function init_parameter(){
  //-----------------------

  info.limit = [0.8, 0.8];
  info.param.nb_point = 50;
  info.param.bkg = 1;
  info.param.nb_point = 50;
  info.param.nb_link = 3;
  info.param.primitiv_rgb = 0;
  info.param.primitiv_alpha = 0.5;
  info.param.speed = 0.001;
  info.param.point_size = 5;
  info.param.line_dist_max = 0.5;

  //-----------------------
}
function init_object(){
  let point_number = info.param.nb_point;
  //-----------------------

  //Init objects
  init_points(point_number);
  init_line();

  //Create object buffers
  [points_vbo_xy, points_vbo_rgb] = create_buffer();
  [lines_vbo_xy, lines_vbo_rgb] = create_buffer();

  create_object(points, points_vbo_xy, points_vbo_rgb);
  create_object(lines, lines_vbo_xy, lines_vbo_rgb);

  //-----------------------
}
function init_scene(){
  gl = info.context;
  //-----------------------

  //Compute MVP
  compute_mvp();

  //Shader
  gl.useProgram(info.program);
  gl.uniformMatrix4fv(info.uniform.in_mvp, false, mvp.mvp);
  gl.uniform1f(info.uniform.point_size, info.param.point_size);

  //-----------------------
}
