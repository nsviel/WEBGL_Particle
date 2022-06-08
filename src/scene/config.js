function init_configuration(){
  //-----------------------

  init_parameter();
  init_config(info.color.dark_mode);

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
  info.color.rgb_bkg = [1, 1, 1, 1];
  info.color.rgb_obj = [0, 0, 0, 1];
  info.color.rgb_mouse = [0, 0.7, 0.8];
  info.color.rgb_collision = [1, 0, 0];

  //Color mode
  info.color.dark_mode = false;
  info.color.rgb_bkg_lm = [1, 1, 1, 1];
  info.color.rgb_obj_lm = [0, 0, 0, 1];
  info.color.rgb_bkg_dm = [0.11, 0.13, 0.17, 1];
  info.color.rgb_obj_dm = [1, 1, 1, 1];

  //-----------------------
}
function init_config(dark_mode){
  //-----------------------

  if(dark_mode){
    info.color.dark_mode = true;
    info.color.rgb_bkg = info.color.rgb_bkg_dm;
    info.color.rgb_obj = info.color.rgb_obj_dm;
  }else{
    info.color.dark_mode = false;
    info.color.rgb_bkg = info.color.rgb_bkg_lm;
    info.color.rgb_obj = info.color.rgb_obj_lm;
  }

  //-----------------------
}
