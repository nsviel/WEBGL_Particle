function draw_scene(){
  //-----------------------

  //WebGL
  runtime_camera();
  runtime_shader();

  //Runtime functions
  runtime_point();
  runtime_line();

  //Draw objects
  draw_point();
  draw_line();

  //-----------------------
}

//Init functions
function init_object(){
  let point_number = param.nb_point;
  //-----------------------

  //Init objects
  init_points(point_number);
  init_line();

  //Create object buffers
  create_buffer(object.point);
  create_buffer(object.line);

  //Create scene object
  create_object(object.point);
  create_object(object.line);

  //-----------------------
}
function init_scene(){
  //-----------------------

  compute_mvp();
  start_sharder();

  //-----------------------
}

//Draw functions
function draw_point(){
  //-----------------------

  gl.uniform1i(info.shader.uniform.is_point, 1);
  update_object(object.point);
  draw_object(object.point);

  //-----------------------
}
function draw_line(){
  //-----------------------

  //Draw object.line
  gl.uniform1i(info.shader.uniform.is_point, 0);
  update_object(object.line);
  draw_object(object.line);

  //-----------------------
}
