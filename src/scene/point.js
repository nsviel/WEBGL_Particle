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
    point_displacment(point, normal, i);
    point_manage_limit(point, normal);
    point_recolorization(i);
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
function add_point_mouse(){
  //-----------------------

  [XY, RGB, Nxy] = create_points(1);

  for(let i=0; i<XY.length; i++){
    XY[i][0] = info.value.mouse[0] + getRandomArbitrary(-0.01, 0.01);
    XY[i][1] = info.value.mouse[1] + getRandomArbitrary(-0.01, 0.01);
  }

  //Store data
  object.point.xy = object.point.xy.concat(XY);
  object.point.rgb = object.point.rgb.concat(RGB);
  object.point.nxy = object.point.nxy.concat(Nxy);
  object.point.nb_point = object.point.xy.length;
  object.point.draw = gl.POINTS;

  info.param.nb_point += 1;

  //-----------------------
  update_ui();
}
function create_points(nb_point){
  //-----------------------

  let lim_x = info.param.limit_inner_x;
  let lim_y = info.param.limit_inner_y;
  let rgb = info.color.rgb_obj;

  //Location
  let XY = [];
  for(let i=0; i<nb_point; i++){
    let X = getRandomArbitrary(lim_x[0], lim_x[1]);
    let Y = getRandomArbitrary(lim_y[0], lim_y[1]);
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
    Nxy.push([Nx, Ny]);
  }

  //-----------------------
  return [XY, RGB, Nxy];
}
function create_points_bordure(){
  //-----------------------

  //Location
  let X, Y;
  let rgb = get_value(info.color.rgb_obj);
  let topright = randomDigit(0, 1);
  if(topright == 0){
    X = getRandomArbitrary(info.param.limit_outer_x[0], info.param.limit_outer_x[1]);
    Y = randomDigit(info.param.limit_outer_y[0], info.param.limit_outer_y[1]);
  }else if(topright == 1){
    X = randomDigit(info.param.limit_outer_x[0], info.param.limit_outer_x[1]);
    Y = getRandomArbitrary(info.param.limit_outer_y[0], info.param.limit_outer_y[1]);
  }

  say([X, Y])
  object.point.xy.push([X, Y]);

  //Color
  object.point.rgb.push(rgb);

  //Normal
  let Nx = getRandomArbitrary(-1, 1);
  let Ny = getRandomArbitrary(-1, 1);
  object.point.nxy.push([Nx, Ny]);

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

  if(point[0] < info.param.limit_outer_x[0] || point[0] > info.param.limit_outer_x[1] ||
    point[1] < info.param.limit_outer_y[0] || point[1] > info.param.limit_outer_y[1]){
    //Supress point at the border
    let idx = object.point.xy.indexOf(point);
    object.point.xy.splice(idx, 1);
    object.point.nxy.splice(idx, 1);
    object.point.rgb.splice(idx, 1);
    object.point.nb_point = object.point.xy.length;

    //Create new point
    create_points_bordure();
  }

  //-----------------------
}

//Action functions
function point_recolorization(i){
  let rgb_obj = info.color.rgb_obj;
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
function point_collision(dist, i){
  let collid_thres = info.param.collision_area;
  let collid_rgb = get_value(info.color.rgb_collid);
  //-----------------------

  //point_collision action
  let Nx = getRandomArbitrary(-1, 1);
  let Ny = getRandomArbitrary(-1, 1);

  object.point.nxy[i] = [Nx, Ny];
  object.point.rgb[i] = collid_rgb;

  //-----------------------
}
function point_manage_quantity(){
  let nb_slider = info.param.nb_point;
  let diff = object.point.nb_point - nb_slider;
  //-----------------------

  if(diff > 0){
    remove_point(diff);
  }else if(diff < 0){
    add_points(-diff);
  }

  //-----------------------
}
function point_displacment(point, normal, i){
  let mouse_xy = info.value.mouse;
  let mouse_area = info.param.mouse_area;
  let rgb_mo = get_value(info.color.rgb_mouse);
  //-----------------------

  //Compute distance
  dist = fct_distance(point, mouse_xy)

  //If inside mouse circle
  if(dist < mouse_area){
    //Repulsif displacment
    point[0] += (0.2 - dist) * (point[0] - mouse_xy[0]) * 0.2 + normal[0] * 0.001;
    point[1] += (0.2 - dist) * (point[1] - mouse_xy[1]) * 0.2 + normal[1] * 0.001;

    //Color
    object.point.rgb[i] = rgb_mo;
  }
  //Default displacment
  else{
    point[0] += normal[0] * info.param.speed;
    point[1] += normal[1] * info.param.speed;
  }

  //-----------------------
}
function point_manage_limit(point, normal){
  //-----------------------

  //Area borders
  if(info.param.limitless){
    remove_point_bordure(point);
  }else{
    if(point[0] < info.param.limit_inner_x[0]){
      point[0] = info.param.limit_inner_x[0];
      normal[0] = -normal[0];
    }
    if(point[0] > info.param.limit_inner_x[1]){
      point[0] = info.param.limit_inner_x[1];
      normal[0] = -normal[0];
    }
    if(point[1] < info.param.limit_inner_y[0]){
      point[1] = info.param.limit_inner_y[0];
      normal[1] = -normal[1];
    }
    if(point[1] > info.param.limit_inner_y[1]){
      point[1] = info.param.limit_inner_y[1];
      normal[1] = -normal[1];
    }
  }

  //-----------------------
}
function point_anarchiste(point, normal){
  //-----------------------


  //-----------------------
}
