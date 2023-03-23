// WebGL stuff
info.webgl.with_gui = false;

//Parameters
param.nb_point = 150;
param.nb_point_max = 500;
param.speed = 0.0005;
param.point_size = 3;
param.line_dist_max = 200;
param.collision_area = 5;
param.limit_x = 1.5;
param.limit_y = 1.5;

//Colors
color.bkg = [255, 255, 255, 1];
color.collision = [255, 0, 0, 1];
color.mouse = [0, 125, 125, 1];
color.point = [0, 0, 0, 1];
color.line = [0, 0, 0, 1];

//Mouse
info.mouse.mode = 'Repulsif';
info.mouse.rayon = 100;
info.mouse.add_point = false;
info.mouse.add_point_number = 1;
info.mouse.over = false;
info.mouse.xy = 0;
info.mouse.force = 0.01;

//Time
info.time.scene = 0;
