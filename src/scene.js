//Main functions
function loop(){
  gl = info.webgl.context;
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

  //Draw objects
  draw_point();
  draw_line();

  //-----------------------
}

//Init functions
function init_parameter(){
  //-----------------------

  info.param.nb_point = 50;
  info.param.nb_point = 50;
  info.param.nb_link = 3;

  info.param.bkg = 1;
  info.param.primitiv_rgb = 0;
  info.param.primitiv_alpha = 0.5;

  info.param.limit = [0.8, 0.8];
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
  create_buffer(object.point);
  create_buffer(object.line);

  //Create scene object
  create_object(object.point);
  create_object(object.line);

  //-----------------------
}
function init_scene(){
  gl = info.webgl.context;
  //-----------------------

  //Compute MVP
  compute_mvp();

  //Shader
  gl.useProgram(info.shader.program);
  gl.uniformMatrix4fv(info.shader.uniform.in_mvp, false, info.webgl.mvp.mvp);
  gl.uniform1f(info.shader.uniform.point_size, info.param.point_size);

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
