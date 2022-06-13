//Main functions
function init_line(){
  //-----------------------

  object.line.draw = gl.LINES;
  object.line.color = [0, 0, 0, 1];

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
  let dist_col = info.param.collision_area;
  let dist_max = info.param.line_dist_max;
  let dist_vec = new Array();
  //-----------------------

  for(let j=i+1; j<object.point.xy.length; j++){
    let dist = fct_distance(object.point.xy[i], object.point.xy[j]);

    //Take for line
    if(dist < dist_max){
      let dist_n = dist / dist_max;
      dist_vec.push([dist_n, j]);
    }

    //Take for collision
    if(dist < dist_col){
      point_collision(dist, i);
      point_collision(dist, j);
    }
  }

  //-----------------------
  return dist_vec;
}
function runtime_mouse(XY, RGB){
  let rgb_mou = convert_255_to_1(info.mouse.color);
  let rgb_bkg = convert_255_to_1(info.color.bkg);
  let rayon = info.mouse.rayon;
  //-----------------------

  //Mouse centered lines
  if(info.mouse.over){
    for(let i=0; i<object.point.xy.length; i++){
      dist = fct_distance(object.point.xy[i], info.mouse.xy)

      //If inside mouse circle
      if(dist < rayon){
        let dist_n = dist / 0.2;
        let r = dist_n * rgb_bkg[0] + (1 - dist_n) * rgb_mou[0]
        let g = dist_n * rgb_bkg[1] + (1 - dist_n) * rgb_mou[1]
        let b = dist_n * rgb_bkg[2] + (1 - dist_n) * rgb_mou[2]
        let color = [r, g, b, 1];

        XY.push(info.mouse.xy)
        XY.push(object.point.xy[i])

        RGB.push(color)
        RGB.push(color)
      }
    }
  }

  //-----------------------
}
function create_line_all(XY, RGB, dist_vec, i){
  let rgb_obj = convert_255_to_1(object.point.color);
  let rgb_bkg = convert_255_to_1(info.color.bkg);
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
