//Main functions
function init_line(){
  //-----------------------

  object.line.draw = gl.LINES;

  //-----------------------
}
function runtime_line(){
  //-----------------------

  //create all line
  let XY = [];
  let RGB = [];
  runtime_line_all(XY, RGB);
  runtime_mouse(XY, RGB);

  object.line.xy = XY;
  object.line.rgb = RGB;
  object.line.nb_line = XY.length;

  //-----------------------
}

//Make lines with all object.point
function runtime_line_all(XY, RGB){
  //-----------------------

  for(let i=0; i<object.point.xy.length; i++){
    let dist_vec = runtime_compute_distance(i);
    create_line_all(XY, RGB, dist_vec, i);
  }

  //-----------------------
}
function runtime_compute_distance(i){
  let dist_max = info.param.line_dist_max;
  let dist_vec = new Array();
  //-----------------------

  for(let j=i+1; j<object.point.xy.length; j++){
    let dist = fct_distance(object.point.xy[i], object.point.xy[j]);

    if(dist < dist_max){
      let dist_n = dist / dist_max;
      point_collision(dist, i);
      point_collision(dist, j);
      dist_vec.push([dist_n, j]);
    }
  }

  //-----------------------
  return dist_vec;
}
function runtime_mouse(XY, RGB){
  let rgb_mou = info.color.rgb_mouse;
  let rgb_bkg = info.color.rgb_bkg;
  //-----------------------

  //Mouse centered lines
  for(let i=0; i<object.point.xy.length; i++){
    dist = fct_distance(object.point.xy[i], info.value.mouse)

    //If inside mouse circle
    if(dist < 0.2){
      let dist_n = dist / 0.2;
      let r = dist_n * rgb_bkg[0] + (1 - dist_n) * rgb_mou[0]
      let g = dist_n * rgb_bkg[1] + (1 - dist_n) * rgb_mou[1]
      let b = dist_n * rgb_bkg[2] + (1 - dist_n) * rgb_mou[2]
      let color = [r, g, b, 1];

      XY.push(info.value.mouse)
      XY.push(object.point.xy[i])

      RGB.push(color)
      RGB.push(color)
    }
  }

  //-----------------------
}
function create_line_all(XY, RGB, dist_vec, i){
  let rgb_obj = info.color.rgb_obj;
  let rgb_bkg = info.color.rgb_bkg;
  //-----------------------

  for(let j=0; j<dist_vec.length; j++){
    let dist_n = dist_vec[j][0];
    let r = dist_n * rgb_bkg[0] + (1 - dist_n) * rgb_obj[0]
    let g = dist_n * rgb_bkg[1] + (1 - dist_n) * rgb_obj[1]
    let b = dist_n * rgb_bkg[2] + (1 - dist_n) * rgb_obj[2]
    let color = [r, g, b, 1];

    XY.push(object.point.xy[i]);
    XY.push(object.point.xy[dist_vec[j][1]]);

    RGB.push(color);
    RGB.push(color);
  }

  //-----------------------
}

//Make line with kNN
function runtime_line_knn(){
  //-----------------------

  let XY = [];
  let RGB = [];
  for(let i=0; i<object.point.xy.length; i++){
    let dist_vec = knn(i);
    create_line_knn(XY, RGB, dist_vec, i);
  }

  object.line.xy = XY;
  object.line.rgb = RGB;
  object.line.nb_line = XY.length;

  //-----------------------
}
function create_line_knn(XY, RGB, dist_vec, i){
  let rgb = info.color.rgb_obj;
  let nb_link = info.param.nb_link;
  let dist_max = info.param.line_dist_max;
  //-----------------------

  if(dist_vec.length  >= nb_link){
    for(let j=0; j<nb_link; j++){
      let dist = dist_vec[j][0];
      if(info.color.dark_mode == false){
        var alpha = - Math.log( dist / (dist_max)) - 0.5;
      }else{
        var alpha = - Math.log( dist / (dist_max)) + 0.5;
      }

      if(alpha > 0){
        XY.push(object.point.xy[i]);
        XY.push(object.point.xy[dist_vec[j][1]]);

        RGB.push([rgb[0], rgb[1], rgb[2], alpha])
        RGB.push([rgb[0], rgb[1], rgb[2], alpha])
      }
    }
  }

  //-----------------------
}
function knn(i){
  //-----------------------

  let dist_vec = new Array();
  for(let j=0; j<object.point.xy.length; j++){
    if(i != j){
      let dist = fct_distance(object.point.xy[i], object.point.xy[j])

      //Line link
      dist_vec.push([dist, j]);

      //point_collision
      point_collision(dist, i);
    }
  }

  //add_points_xy(object.point.xy[i]);
  dist_vec.sort();

  //-----------------------
  return dist_vec
}
