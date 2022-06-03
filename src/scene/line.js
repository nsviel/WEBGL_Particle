//Main functions
function init_line(){
  //-----------------------

  object.line.draw = gl.LINES;

  //-----------------------
}

//Make lines with all object.point
function runtime_line_all(){
  //-----------------------

  //create all line
  let XY = [];
  let RGB = [];
  for(let i=0; i<object.point.xy.length; i++){
    //Compute all distances
    let dist_vec = new Array();
    for(let j=i+1; j<object.point.xy.length; j++){
      let dist = fct_distance(object.point.xy[i], object.point.xy[j])
      point_collision(dist, i);
      point_collision(dist, j);
      dist_vec.push([dist, j]);
    }

    //Create according lines
    create_line_all(XY, RGB, dist_vec, i);
  }

  //Mouse centered lines
  let rgb = info.color.rgb_mouse;
  for(let i=0; i<object.point.xy.length; i++){
    dist = fct_distance(object.point.xy[i], info.value.mouse)
    let alpha = - Math.log( dist / (0.2));

    //If inside mouse circle
    if(dist < 0.2 && alpha > 0.1){
      XY.push(info.value.mouse)
      XY.push(object.point.xy[i])

      RGB.push([rgb[0], rgb[1], rgb[2], alpha])
      RGB.push([rgb[0], rgb[1], rgb[2], alpha])
    }
  }

  object.line.xy = XY;
  object.line.rgb = RGB;
  object.line.nb_point = object.line.xy.length;

  //-----------------------
}
function create_line_all(XY, RGB, dist_vec, i){
  let rgb = info.color.rgb_object;
  let dist_max = info.param.line_dist_max;
  let dark_mode = info.color.dark_mode;
  //-----------------------

  for(let j=0; j<dist_vec.length; j++){
    let dist = dist_vec[j][0];
    var alpha = - Math.log( dist / dist_max) - 0.5;

    if(alpha > 0 && dist < dist_max){
      XY.push(object.point.xy[i]);
      XY.push(object.point.xy[dist_vec[j][1]]);

      RGB.push([rgb[0], rgb[1], rgb[2], alpha])
      RGB.push([rgb[0], rgb[1], rgb[2], alpha])
    }
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
  object.line.nb_point = object.line.xy.length;

  //-----------------------
}
function create_line_knn(XY, RGB, dist_vec, i){
  let rgb = info.color.rgb_object;
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
