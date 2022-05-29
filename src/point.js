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
    let point = object.point.xy[i];
    let normal = object.point.nxy[i];

    point_anarchiste(point, normal);
    point_displacment(point, normal);
    point_manage_limit(i);
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

//Action functions
function point_displacment(point, normal){
  let mouse = info.value.mouse;
  //-----------------------

  //Compute distance
  dist = fct_distance(point, mouse)

  //If inside mouse circle
  if(dist < 0.2){
    point[0] += (0.2 - dist) * (point[0] - mouse[0]) * 0.2 + normal[0] * 0.001;
    point[1] += (0.2 - dist) * (point[1] - mouse[1]) * 0.2 + normal[1] * 0.001;
  }
  //Default displacment
  else{
    point[0] += normal[0] * info.param.speed;
    point[1] += normal[1] * info.param.speed;
  }

  //-----------------------
}
function point_collision(dist, i){
  let collid_thres = 0.01;
  var cpt_point_collision = 0;
  //-----------------------

  //point_collision action
  if(dist < collid_thres){
    let Nx = getRandomArbitrary(-1, 1);
    let Ny = getRandomArbitrary(-1, 1);
    object.point.nxy[i] = [Nx, Ny];
    object.point.rgb[i] = [1, 0, 0, 1];

    if(object.point.nb_point < 200){
      cpt_point_collision++;
    }
  }

  //Decreasing colorization
  if(object.point.rgb[i][0] != 0){
    object.point.rgb[i][0] -= 0.00025;
  }

  //-----------------------
}
function point_manage_quantity(){
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
function point_manage_limit(i){
  let point = object.point.xy[i];
  let normal = object.point.nxy[i];
  //-----------------------

  //Area borders
  if(point[0] < -info.param.limit[0]){
    point[0] = -info.param.limit[0];
    normal[0] = -normal[0];
  }
  if(point[0] > info.param.limit[0]){
    point[0] = info.param.limit[0];
    normal[0] = -normal[0];
  }
  if(point[1] < -info.param.limit[1]){
    point[1] = -info.param.limit[1];
    normal[1] = -normal[1];
  }
  if(point[1] > info.param.limit[1]){
    point[1] = info.param.limit[1];
    normal[1] = -normal[1];
  }

  //-----------------------
}
function point_anarchiste(point, normal){
  //-----------------------


  //-----------------------
}
