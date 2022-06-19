function init_configuration(){
  //-----------------------

  //Parameters
  info.param.nb_point = 50;
  info.param.nb_point_max = 200;
  info.param.speed = 0.001;
  info.param.point_size = 5;
  info.param.line_dist_max = 200;
  info.param.collision_area = 5;

  //limits
  info.param.limitless = false;
  info.param.limit_inner_x = [-1, 1];
  info.param.limit_inner_y = [-1, 1];
  info.param.limit_outer_x = [-1.5, 1.5];
  info.param.limit_outer_y = [-1.5, 1.5];

  //Colors
  info.color.bkg = [255, 255, 255, 1];
  info.color.collision = [255, 0, 0, 1];
  info.color.mouse = [0, 125, 125, 1];
  info.color.point = [0, 0, 0, 1];
  info.color.line = [0, 0, 0, 1];

  //Mouse
  info.mouse.mode = 'Repulsif';
  info.mouse.rayon = 100;
  info.mouse.add_point = false;
  info.mouse.add_point_number = 1;
  info.mouse.over = false;
  info.mouse.xy = 0;
  info.mouse.force = 0.02;

  //-----------------------
}
