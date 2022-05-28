function init_points(nb_point){
  //-----------------------

  [XY, RGB, Nxy] = create_points(nb_point);

  //Store data
  points.xy = XY;
  points.rgb = RGB;
  points.nxy = Nxy;
  points.nb_point = nb_point;
  points.size = 1;
  points.draw = gl.POINTS;

  //-----------------------
}
function create_points(nb_point){
  //-----------------------

  let lim_x = info.limit[0];
  let lim_y = info.limit[1];
  let rgb = info.param.primitiv_rgb;

  //Location
  let XY = [];
  for(let i=0; i<nb_point; i++){
    let X = getRandomArbitrary(-lim_x, lim_x);
    let Y = getRandomArbitrary(-lim_y, lim_y);
    XY.push([X, Y]);
  }

  //Color
  let RGB = [];
  for(let i=0; i<nb_point; i++){
    RGB.push([rgb, rgb, rgb, 1]);
  }

  //Normal
  let Nxy = [];
  for(let i=0; i<nb_point; i++){
    let Nx = getRandomArbitrary(-1, 1);
    let Ny = getRandomArbitrary(-1, 1);
    Nxy.push([Nx, Ny]);
  }

  //-----------------------
  return [XY, RGB, Nxy];
}
function add_points(nb_point){
  //-----------------------

  [XY, RGB, Nxy] = create_points(nb_point);

  //Store data
  points.xy = points.xy.concat(XY);
  points.rgb = points.rgb.concat(RGB);
  points.nxy = points.nxy.concat(Nxy);
  points.nb_point = points.xy.length;
  points.draw = gl.POINTS;

  //-----------------------
}
function add_points_xy(xy){
  //-----------------------
say("hello");
  [XY, RGB, Nxy] = create_points(1);
  XY[0][0] += xy[0] + Nxy[0][0] * 0.001;
  XY[0][1] += xy[1] + Nxy[0][1] * 0.001;
  RGB[0] = [0,0,1,1];

  //Store data
  points.xy = points.xy.concat(XY);
  points.rgb = points.rgb.concat(RGB);
  points.nxy = points.nxy.concat(Nxy);
  points.nb_point = points.xy.length;
  points.draw = gl.POINTS;

  //-----------------------
}
function remove_points(nb_point){
  //-----------------------

  //Location
  for(let i=0; i<nb_point; i++){
    points.xy.pop();
    points.nxy.pop();
    points.rgb.pop();
  }

  points.nb_point = points.xy.length;

  //-----------------------
}
function move_points(){
  //-----------------------

  for(let i=0; i<points.xy.length; i++){
    dist = fct_distance(points.xy[i], info.mouse)

    //If inside mouse circle
    if(dist < 0.2){
      points.xy[i][0] += (0.2 - dist) * (points.xy[i][0] - info.mouse[0]) * 0.2 + points.nxy[i][0] * 0.001;
      points.xy[i][1] += (0.2 - dist) * (points.xy[i][1] - info.mouse[1]) * 0.2 + points.nxy[i][1] * 0.001;
    }
    //Default displacment
    else{
      points.xy[i][0] += points.nxy[i][0] * info.param.speed;
      points.xy[i][1] += points.nxy[i][1] * info.param.speed;
    }

    check_areas_limit(i);
  }

  //-----------------------
}
function slider_points(){
  //-----------------------

  let nb_slider = info.param.nb_point;
  let diff = points.nb_point - nb_slider;

  if(diff > 0){
    remove_points(diff);
  }else if(diff < 0){
    add_points(-diff);
  }

  //-----------------------
}
function check_areas_limit(i){
  //-----------------------

  //Area borders
  if(points.xy[i][0] < -info.limit[0]){
    points.xy[i][0] = -info.limit[0];
    points.nxy[i][0] = -points.nxy[i][0];
  }
  if(points.xy[i][0] > info.limit[0]){
    points.xy[i][0] = info.limit[0];
    points.nxy[i][0] = -points.nxy[i][0];
  }
  if(points.xy[i][1] < -info.limit[1]){
    points.xy[i][1] = -info.limit[1];
    points.nxy[i][1] = -points.nxy[i][1];
  }
  if(points.xy[i][1] > info.limit[1]){
    points.xy[i][1] = info.limit[1];
    points.nxy[i][1] = -points.nxy[i][1];
  }

  //-----------------------
}
