function init_configuration(){
  //-----------------------

  init_parameter();
  init_config();

  //-----------------------
}
function init_parameter(){
  //-----------------------

  //Parameters
  info.param.nb_point = 50;
  info.param.nb_point = 50;
  info.param.nb_link = 3;

  info.param.limit = [0.8, 0.8];
  info.param.speed = 0.001;
  info.param.point_size = 5;
  info.param.line_dist_max = 0.5;
  info.param.mouse_area = 0.2;
  info.param.collision_area = 0.01;

  //Colors
  info.color.dark_mode = true;
  info.color.bkg = [1, 1, 1];
  info.color.primitiv_rgb = 0;
  info.color.primitiv_alpha = 0.5;
  info.color.mouse_rgb = [0, 0.7, 0.8];
  info.color.collision_rgb = [1, 0, 0];

  //-----------------------
}
function init_config(){
  //-----------------------

  if(info.color.dark_mode){
    info.color.bkg = [0.36, 0.38, 0.44];
    info.color.primitiv_rgb = 1;
  }

  //-----------------------
}
