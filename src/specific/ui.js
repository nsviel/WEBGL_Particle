//Main functions
function init_ui(){
  //-----------------------

  //HTML links
  document.getElementById("cpt_points").value = info.param.nb_point;
  document.getElementById("point_manage_quantity").value = info.param.nb_point;

  document.getElementById("cpt_size").value = info.param.point_size;
  document.getElementById("slider_size").value = info.param.point_size;

  document.getElementById("cpt_speed").value = info.param.speed;
  document.getElementById("slider_speed").value = info.param.speed;

  document.getElementById("cpt_line_dist_max").value = info.param.line_dist_max;
  document.getElementById("slider_line_dist_max").value = info.param.line_dist_max;

  //-----------------------
}
function runtime_ui(){
  //-----------------------

  runtime_slider();
  update_ui();

  //-----------------------
}
function runtime_slider(){
  //-----------------------

  let point_number = document.getElementById("point_manage_quantity").value;
  let point_size = document.getElementById("slider_size").value;
  let point_speed = document.getElementById("slider_speed").value;
  let line_dist_max = document.getElementById("slider_line_dist_max").value;
  let dark_mode = document.getElementById("checkbox_dm").checked;
  let limitless = document.getElementById("limitless").checked;

  //Internal parameter
  if(dark_mode != info.param.dark_mode){
    info.param.dark_mode = dark_mode;
    init_config(dark_mode);
  }
  if(limitless != info.param.limitless){
    info.param.limitless = limitless;
  }
  info.param.line_dist_max = line_dist_max;
  info.param.speed = point_speed;
  if(point_number != info.param.nb_point){
    info.param.nb_point = point_number;
    point_manage_quantity();
  }
  if(point_size != info.param.point_size){
    info.param.point_size = point_size;
    gl.uniform1f(info.shader.uniform.point_size, point_size);
  }

  //-----------------------
}
function update_ui(){
  //-----------------------

  document.getElementById("point_manage_quantity").value = info.param.nb_point;
  document.getElementById("cpt_points").value = info.param.nb_point;
  document.getElementById("cpt_size").value = info.param.point_size;
  document.getElementById("cpt_speed").value = info.param.speed;
  document.getElementById("cpt_line_dist_max").value = info.param.line_dist_max;

  //-----------------------
}
