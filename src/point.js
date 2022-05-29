//Main functions
function init_points(nb_point){
  //-----------------------

  [XY, RGB, Nxy] = create_points(nb_point);

  //Store data
  object.point.xy = XY;
  object.point.rgb = RGB;
  object.point.nxy = Nxy;
  object.point.nb_point = nb_point;
  object.point.size = 1;
  object.point.draw = gl.POINTS;

  //-----------------------
}
function runtime_point(){
  //-----------------------

  for(let i=0; i<object.point.xy.length; i++){
    dist = fct_distance(object.point.xy[i], info.value.mouse)

    //If inside mouse circle
    if(dist < 0.2){
      object.point.xy[i][0] += (0.2 - dist) * (object.point.xy[i][0] - info.value.mouse[0]) * 0.2 + object.point.nxy[i][0] * 0.001;
      object.point.xy[i][1] += (0.2 - dist) * (object.point.xy[i][1] - info.value.mouse[1]) * 0.2 + object.point.nxy[i][1] * 0.001;
    }
    //Default displacment
    else{
      object.point.xy[i][0] += object.point.nxy[i][0] * info.param.speed;
      object.point.xy[i][1] += object.point.nxy[i][1] * info.param.speed;
    }

    check_areas_limit(i);
  }

  //-----------------------
}
function collision(dist, i){
  let collid_thres = 0.01;
  var cpt_collision = 0;
  //-----------------------

  //Collision action
  if(dist < collid_thres){
    let Nx = getRandomArbitrary(-1, 1);
    let Ny = getRandomArbitrary(-1, 1);
    object.point.nxy[i] = [Nx, Ny];
    object.point.rgb[i] = [1, 0, 0, 1];

    if(object.point.nb_point < 200){
      cpt_collision++;
    }
  }

  //Decreasing colorization
  if(object.point.rgb[i][0] != 0){
    object.point.rgb[i][0] -= 0.00025;
  }

  //-----------------------
}

//Creation / Deletion of object.point
function add_points(nb_point){
  //-----------------------

  [XY, RGB, Nxy] = create_points(nb_point);

  //Store data
  object.point.xy = object.point.xy.concat(XY);
  object.point.rgb = object.point.rgb.concat(RGB);
  object.point.nxy = object.point.nxy.concat(Nxy);
  object.point.nb_point = object.point.xy.length;
  object.point.draw = gl.POINTS;

  //-----------------------
}
function add_points_xy(xy){
  //-----------------------

  [XY, RGB, Nxy] = create_points(1);
  XY[0][0] += xy[0] + Nxy[0][0] * 0.001;
  XY[0][1] += xy[1] + Nxy[0][1] * 0.001;
  RGB[0] = [0,0,1,1];

  //Store data
  object.point.xy = object.point.xy.concat(XY);
  object.point.rgb = object.point.rgb.concat(RGB);
  object.point.nxy = object.point.nxy.concat(Nxy);
  object.point.nb_point = object.point.xy.length;
  object.point.draw = gl.POINTS;

  //-----------------------
}
function create_points(nb_point){
  //-----------------------

  let lim_x = info.param.limit[0];
  let lim_y = info.param.limit[1];
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
function remove_point(nb_point){
  //-----------------------

  //Location
  for(let i=0; i<nb_point; i++){
    object.point.xy.pop();
    object.point.nxy.pop();
    object.point.rgb.pop();
  }

  object.point.nb_point = object.point.xy.length;

  //-----------------------
}

//Check functions
function check_point_quantity(){
  //-----------------------

  let nb_slider = info.param.nb_point;
  let diff = object.point.nb_point - nb_slider;

  if(diff > 0){
    remove_point(diff);
  }else if(diff < 0){
    add_points(-diff);
  }

  //-----------------------
}
function check_areas_limit(i){
  //-----------------------

  //Area borders
  if(object.point.xy[i][0] < -info.param.limit[0]){
    object.point.xy[i][0] = -info.param.limit[0];
    object.point.nxy[i][0] = -object.point.nxy[i][0];
  }
  if(object.point.xy[i][0] > info.param.limit[0]){
    object.point.xy[i][0] = info.param.limit[0];
    object.point.nxy[i][0] = -object.point.nxy[i][0];
  }
  if(object.point.xy[i][1] < -info.param.limit[1]){
    object.point.xy[i][1] = -info.param.limit[1];
    object.point.nxy[i][1] = -object.point.nxy[i][1];
  }
  if(object.point.xy[i][1] > info.param.limit[1]){
    object.point.xy[i][1] = info.param.limit[1];
    object.point.nxy[i][1] = -object.point.nxy[i][1];
  }

  //-----------------------
}
