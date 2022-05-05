function init_points(nb_point){
  //-----------------------

  [XY, RGB, Nxy] = create_points(nb_point);

  //Store data
  points.xy = XY;
  points.rgb = RGB;
  points.nxy = Nxy;
  points.size = nb_point;
  points.draw = gl.POINTS;

  //-----------------------
}
function create_points(nb_point){
  //-----------------------

  let lim_x = info.limit[0];
  let lim_y = info.limit[1];
  let rgb = info.param.primitiv_rgb;

  /*//Location
  let XY = [];
  for(let i=0; i<nb_point * 2; i=i+2){
    XY[i] = getRandomArbitrary(-lim_x, lim_x);
    XY[i+1] = getRandomArbitrary(-lim_y, lim_y);
  }

  //Color
  let RGB = new Array(nb_point * 4);
  for(let i=0; i<nb_point * 4; i=i+4){
    RGB[i] = rgb;
    RGB[i+1] = rgb;
    RGB[i+2] = rgb;
    RGB[i+3] = 1;
  }

  //Normal
  let Nxy = new Array(nb_point * 2);
  for(let i=0; i<nb_point * 2; i=i+2){
    Nxy[i] = getRandomArbitrary(-1, 1);
    Nxy[i+1] = getRandomArbitrary(-1, 1);
  }*/

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
  points.size = points.xy.length;
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

  points.size = points.xy.length;

  //-----------------------
}
function move_points(){
  //-----------------------

  for(let i=0; i<points.xy.length; i++){
    dist = Math.sqrt(Math.pow(points.xy[i][0] - info.mouse[0], 2) + Math.pow(points.xy[i][1] - info.mouse[1], 2));

    //If close to mouse position
    if(dist < 0.2){
      points.xy[i][0] += (0.2 - dist) * (points.xy[i][0] - info.mouse[0]) * 0.2 + points.nxy[i][0] * 0.001;
      points.xy[i][1] += (0.2 - dist) * (points.xy[i][1] - info.mouse[1]) * 0.2 + points.nxy[i][1] * 0.001;
    }
    //Default displacment
    else{
      points.xy[i][0] += points.nxy[i][0] * 0.001;
      points.xy[i][1] += points.nxy[i][1] * 0.001;
    }

    check_areas_limit(i);
  }

  //-----------------------
}
function slider_points(){
  //-----------------------

  let nb_slider = info.param.nb_point;
  let diff = points.size - nb_slider;

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
