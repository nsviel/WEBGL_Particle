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

  if(info.mouse.add_point && object.point.nb_point < info.param.nb_point_max){
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
    info.param.nb_point += XY.length;
  }

  //-----------------------
}
function create_points(nb_point){
  let lim_x = info.param.limit_inner_x;
  let lim_y = info.param.limit_inner_y;
  let rgb = convert_255_to_1(info.color.point);
  //-----------------------

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
  let rgb = get_value(info.color.point);
  let topright = randomDigit(0, 1);
  if(topright == 0){
    X = getRandomArbitrary(info.param.limit_outer_x[0], info.param.limit_outer_x[1]);
    Y = randomDigit(info.param.limit_outer_y[0], info.param.limit_outer_y[1]);
  }else if(topright == 1){
    X = randomDigit(info.param.limit_outer_x[0], info.param.limit_outer_x[1]);
    Y = getRandomArbitrary(info.param.limit_outer_y[0], info.param.limit_outer_y[1]);
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
  let rgb_obj = convert_255_to_1(info.color.point);
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
  let collid_rgb = convert_255_to_1(info.color.collision);
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
  let query_number = info.param.nb_point;
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
  dist = fct_distance(point, mouse_xy)

  //If inside mouse circle
  if(dist < mouse_area && info.mouse.over){
    if(info.mouse.mode == 'Repulsif'){
      point_mouse_repulsif(i, dist)
    }
    else if(info.mouse.mode == 'Black_hole'){
      point_mouse_blackhole(i, dist)
    }
  }
  //Default displacment
  else{
    let mouse_rgb = convert_255_to_1(info.color.mouse);
    point[0] += normal[0] * speed * info.param.speed;
    point[1] += normal[1] * speed * info.param.speed;
  }

  //-----------------------
}
function point_mouse_repulsif(i, dist){
  let mouse_xy = info.mouse.xy;
  let mouse_area = info.mouse.rayon;
  let mouse_rgb = convert_255_to_1(info.color.mouse);
  let point = object.point.xy[i];
  let normal = object.point.nxy[i];
  let speed = object.point.speed[i];
  //-----------------------

  //Color
  object.point.rgb[i] = mouse_rgb;

  //Normal
  let vec_n = [];
  let vec_p = [];
  for(let i=0; i<2; i++){
    vec_n[i] = normal[i] - point[i];
    vec_p[i] = point[i] - mouse_xy[i];
  }
  let theta_d = Math.atan2(vec_n[1], vec_n[0]) - Math.atan2(vec_p[1], vec_p[0])

  let Nx = normal[0] * Math.cos(theta_d/100) - normal[1] * Math.sin(theta_d/100);
  let Ny = normal[0] * Math.sin(theta_d/100) + normal[1] * Math.cos(theta_d/100);

  let norm = Math.sqrt(Math.pow(Nx, 2) + Math.pow(Ny, 2));
  normal[0] = Nx / norm;
  normal[1] = Ny / norm;

  //Repulsif displacment
  for(let i=0; i<2; i++){
    let force_repusif = (mouse_area - dist) * info.mouse.repusif;
    let force_normal = normal[i] * speed * info.param.speed ;
    let vec_mouse_point = point[i] - mouse_xy[i];
    point[i] += force_repusif * vec_mouse_point + force_normal;
    point[i] += force_repusif * vec_mouse_point + force_normal;
  }

  //-----------------------
}
function point_mouse_blackhole(i, dist){
  let mouse_xy = info.mouse.xy;
  let mouse_area = info.mouse.rayon;
  let mouse_rgb = convert_255_to_1(info.color.mouse);
  let point = object.point.xy[i];
  let normal = object.point.nxy[i];
  let color = object.point.rgb[i];
  let speed = object.point.speed[i];
  //-----------------------

  //Color
  object.point.rgb[i] = mouse_rgb;

  //Normal
  let vec_n = [];
  let vec_p = [];
  for(let i=0; i<2; i++){
    vec_n[i] = normal[i] - point[i];
    vec_p[i] = mouse_xy[i] - point[i];
  }
  let theta_d = Math.atan2(vec_n[1], vec_n[0]) - Math.atan2(vec_p[1], vec_p[0])

  let Nx = normal[0] * Math.cos(theta_d/100) - normal[1] * Math.sin(theta_d/100);
  let Ny = normal[0] * Math.sin(theta_d/100) + normal[1] * Math.cos(theta_d/100);

  let norm = Math.sqrt(Math.pow(Nx, 2) + Math.pow(Ny, 2));
  normal[0] = Nx / norm;
  normal[1] = Ny / norm;

  //Repulsif displacment
  for(let i=0; i<2; i++){
    let force_attractif = (dist) * info.mouse.repusif;
    let force_normal = normal[i] * speed * info.param.speed ;
    let vec_mouse_point = mouse_xy[i] - point[i];
    point[i] += force_attractif * vec_mouse_point + force_normal;
    point[i] += force_attractif * vec_mouse_point + force_normal;
  }

  //-----------------------
}
function point_manage_limit(i){
  let point = object.point.xy[i];
  let normal = object.point.nxy[i];
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
function point_anarchiste(i){
  let point = object.point.xy[i];
  let normal = object.point.nxy[i];
  //-----------------------


  //-----------------------
}
