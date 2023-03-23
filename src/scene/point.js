//Main functions
function init_points(nb_point){
  //-----------------------

  //Point parameters
  object.point.nb_point = nb_point;
  object.point.size = 1;
  object.point.draw_type = gl.POINTS;

  //Create points
  [XY, RGB, Nxy, Sp] = create_points(nb_point);

  //Point data
  object.point.xy = XY;
  object.point.rgb = RGB;
  object.point.nxy = Nxy;
  object.point.speed = Sp;

  //-----------------------
}
function runtime_point(){
  //-----------------------

  point_manage_quantity();

  for(let i=0; i<object.point.xy.length; i++){
    point_anarchiste(i);
    point_displacment(i);
    point_manage_limit(i);
    point_recolorization(i);
  }

  //-----------------------
}

//Creation / Deletion of object.point
function add_points(nb_point){
  //-----------------------

  [XY, RGB, Nxy, Sp] = create_points(nb_point);

  //Store data
  object.point.xy = object.point.xy.concat(XY);
  object.point.rgb = object.point.rgb.concat(RGB);
  object.point.nxy = object.point.nxy.concat(Nxy);
  object.point.speed = object.point.speed.concat(Sp);

  //Main info
  object.point.nb_point = object.point.xy.length;

  //-----------------------
}
function add_points_xy(xy){
  //-----------------------

  [XY, RGB, Nxy, Sp] = create_points(1);
  XY[0][0] += xy[0] + Nxy[0][0] * 0.001;
  XY[0][1] += xy[1] + Nxy[0][1] * 0.001;
  RGB[0] = [0,0,1,1];

  //Store data
  object.point.xy = object.point.xy.concat(XY);
  object.point.rgb = object.point.rgb.concat(RGB);
  object.point.nxy = object.point.nxy.concat(Nxy);
  object.point.speed = object.point.nxy.concat(Sp);

  //Main info
  object.point.nb_point = object.point.xy.length;

  //-----------------------
}
function add_point_mouse(){
  //-----------------------

  if(info.mouse.add_point && object.point.nb_point < param.nb_point_max){
    let nb_point = info.mouse.add_point_number;
    [XY, RGB, Nxy, Sp] = create_points(nb_point);

    for(let i=0; i<XY.length; i++){
      XY[i][0] = info.mouse.xy[0] + getRandomArbitrary(-0.01, 0.01);
      XY[i][1] = info.mouse.xy[1] + getRandomArbitrary(-0.01, 0.01);
    }

    //Store data
    object.point.xy = object.point.xy.concat(XY);
    object.point.rgb = object.point.rgb.concat(RGB);
    object.point.nxy = object.point.nxy.concat(Nxy);
    object.point.speed = object.point.speed.concat(Sp);

    //Main info
    object.point.nb_point = object.point.xy.length;
    param.nb_point += XY.length;
  }

  //-----------------------
}
function create_points(nb_point){
  let lim_x = param.limit_x;
  let lim_y = param.limit_y;
  let rgb = convert_255_to_1(color.point);
  //-----------------------

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
    RGB.push(rgb);
  }

  //Normal
  let Nxy = [];
  for(let i=0; i<nb_point; i++){
    let Nx = getRandomArbitrary(-1, 1);
    let Ny = getRandomArbitrary(-1, 1);
    let norm = Math.sqrt(Math.pow(Nx, 2) + Math.pow(Ny, 2));
    Nxy.push([Nx / norm, Ny / norm]);
  }

  //Speed
  let Sp = [];
  for(let i=0; i<nb_point; i++){
    let S = getRandomArbitrary(0.1, 1);
    Sp.push(S);
  }

  //-----------------------
  return [XY, RGB, Nxy, Sp];
}
function create_points_bordure(){
  //-----------------------

  //Location
  let X, Y;
  let rgb = get_value(color.point);
  let topright = randomDigit(0, 1);
  if(topright == 0){
    X = getRandomArbitrary(-1.5, 1.5);
    Y = randomDigit(-1.5, 1.5);
  }else if(topright == 1){
    X = randomDigit(-1.5, 1.5);
    Y = getRandomArbitrary(-1.5, 1.5);
  }
  object.point.xy.push([X, Y]);

  //Color
  object.point.rgb.push(rgb);

  //Normal
  let Nx = getRandomArbitrary(-1, 1);
  let Ny = getRandomArbitrary(-1, 1);
  let norm = Math.sqrt(Math.pow(Nx, 2) + Math.pow(Ny, 2));
  object.point.nxy.push([Nx / norm, Ny / norm]);

  //Speed
  let S = getRandomArbitrary(0.1, 1);
  object.point.speed.push(S);

  //-----------------------
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
function remove_point_bordure(point){
  //-----------------------

  if(point[0] < -1.5 || point[0] > 1.5 || point[1] < -1.5 || point[1] > 1.5){
    //Supress point at the border
    let idx = object.point.xy.indexOf(point);
    object.point.xy.splice(idx, 1);
    object.point.nxy.splice(idx, 1);
    object.point.rgb.splice(idx, 1);
    object.point.nb_point = object.point.xy.length;

    //Create new point
    //create_points_bordure();
  }

  //-----------------------
}

//Action functions
function point_recolorization(i){
  let rgb_obj = convert_255_to_1(color.point);
  let rgb_pt = object.point.rgb[i];
  let rgb_rate = 0.025;
  //-----------------------

  for(let j=0; j<3; j++){
    let diff = rgb_obj[j] - rgb_pt[j];

    if(Math.abs(diff) < rgb_rate){
      rgb_pt[j] = rgb_obj[j];
    }else if(diff < 0){
      rgb_pt[j] -= rgb_rate;
    }else if(diff > 0){
      rgb_pt[j] += rgb_rate;
    }
  }

  //-----------------------
}
function point_collision(i){
  let collid_thres = param.collision_area;
  let collid_rgb = convert_255_to_1(color.collision);
  //-----------------------

  //point_collision action
  let Nx = getRandomArbitrary(-1, 1);
  let Ny = getRandomArbitrary(-1, 1);
  let norm = Math.sqrt(Math.pow(Nx, 2) + Math.pow(Ny, 2));

  object.point.nxy[i] = [Nx / norm, Ny / norm];
  object.point.rgb[i] = collid_rgb;

  //-----------------------
}
function point_manage_quantity(){
  let query_number = param.nb_point;
  let diff = query_number - object.point.nb_point;
  //-----------------------

  if(diff < 0){
    remove_point(Math.abs(diff));
  }else if(diff > 0){
    add_points(Math.abs(diff));
  }

  //-----------------------
}
function point_displacment(i){
  let mouse_xy = info.mouse.xy;
  let mouse_area = info.mouse.rayon;
  let point = object.point.xy[i];
  let normal = object.point.nxy[i];
  let speed = object.point.speed[i];
  //-----------------------

  //Compute distance
  dist = fct_distance_cartesian(point, mouse_xy)

  //If inside mouse circle
  if(dist < mouse_area && info.mouse.over){
    if(info.mouse.mode == 'Repulsif'){
      point_mouse_repulsif(i, dist)
    }
    else if(info.mouse.mode == 'Black_hole'){
      point_mouse_blackhole(i, dist)
    }
    else if(info.mouse.mode == 'selection'){
      point_mouse_selection(i, dist)
    }
  }
  //Default displacment
  else{
    let mouse_rgb = convert_255_to_1(color.mouse);
    point[0] += normal[0] * speed * param.speed;
    point[1] += normal[1] * speed * param.speed;
  }

  //-----------------------
}
function point_manage_limit(i){
  let point = object.point.xy[i];
  let normal = object.point.nxy[i];
  //-----------------------

  //Area borders
  if(point[0] < -param.limit_x){
    point[0] = -param.limit_x;
    normal[0] = -normal[0];
  }
  if(point[0] > param.limit_x){
    point[0] = param.limit_x;
    normal[0] = -normal[0];
  }
  if(point[1] < -param.limit_y){
    point[1] = -param.limit_y;
    normal[1] = -normal[1];
  }
  if(point[1] > param.limit_y){
    point[1] = param.limit_y;
    normal[1] = -normal[1];
  }

  //-----------------------
}
function point_anarchiste(i){
  let point = object.point.xy[i];
  let normal = object.point.nxy[i];
  //-----------------------


  //-----------------------
}
