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
  info.param.nb_link = 3;

  info.param.speed = 0.001;
  info.param.point_size = 5;
  info.param.line_dist_max = 0.5;
  info.param.mouse_area = 0.2;
  info.param.collision_area = 0.01;

  //limits
  info.param.limitless = false;
  info.param.limit_inner_x = [-1, 1];
  info.param.limit_inner_y = [-1, 1];
  info.param.limit_outer_x = [-1.5, 1.5];
  info.param.limit_outer_y = [-1.5, 1.5];

  //Colors
  info.color.rgb_bkg = [1, 1, 1, 1];
  info.color.rgb_obj = [0, 0, 0, 1];
  info.color.rgb_mouse = [0, 0.7, 0.8, 1];
  info.color.rgb_collid = [1, 0, 0, 1];

  //Color mode
  info.color.dark_mode = false;
  info.color.rgb_bkg_lm = [1, 1, 1, 1];
  info.color.rgb_obj_lm = [0, 0, 0, 1];
  info.color.rgb_bkg_dm = [0.11, 0.13, 0.17, 1];
  info.color.rgb_obj_dm = [1, 1, 1, 1];

  //-----------------------
}
function init_config(dark_mode){
  let rgb_bkg_dm = get_value(info.color.rgb_bkg_dm);
  let rgb_obj_dm = get_value(info.color.rgb_obj_dm);
  let rgb_bkg_lm = get_value(info.color.rgb_bkg_lm);
  let rgb_obj_lm = get_value(info.color.rgb_obj_lm);
  //-----------------------

  if(dark_mode){
    info.color.dark_mode = true;
    info.color.rgb_bkg = rgb_bkg_dm;
    info.color.rgb_obj = rgb_obj_dm;
  }else{
    info.color.dark_mode = false;
    info.color.rgb_bkg = rgb_bkg_lm;
    info.color.rgb_obj = rgb_obj_lm;
  }

  //-----------------------
}
