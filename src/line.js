function init_line(){
  //-----------------------

  lines.draw = gl.LINES;

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
    points.nxy[i] = [Nx, Ny];
    points.rgb[i] = [1, 0, 0, 1];

    if(points.nb_point < 200){
      cpt_collision++;
    }
  }

  //Decreasing colorization
  if(points.rgb[i][0] != 0){
    points.rgb[i][0] -= 0.00025;
  }

  //-----------------------
}

function move_line_all(){
  //-----------------------

  //kNN point lines
  let XY = [];
  let RGB = [];
  for(let i=0; i<points.xy.length; i++){
    //Compute all distances
    let dist_vec = new Array();
    for(let j=i+1; j<points.xy.length; j++){
      let dist = fct_distance(points.xy[i], points.xy[j])
      collision(dist, i);
      collision(dist, j);
      dist_vec.push([dist, j]);
    }

    //Create according lines
    create_line_all(XY, RGB, dist_vec, i);
  }

  //Mouse centered lines
  for(let i=0; i<points.xy.length; i++){
    dist = fct_distance(points.xy[i], info.mouse)
    let alpha = - Math.log( dist / (0.2));

    //If inside mouse circle
    if(dist < 0.2 && alpha > 0.1){
      XY.push(info.mouse)
      XY.push(points.xy[i])

      RGB.push([0,0,1,alpha])
      RGB.push([0,0,1,alpha])
    }
  }

  lines.xy = XY;
  lines.rgb = RGB;
  lines.nb_point = lines.xy.length;

  //-----------------------
}
function create_line_all(XY, RGB, dist_vec, i){
  let rgb_alpha = info.param.primitiv_alpha;
  let rgb = info.param.primitiv_rgb;
  let dist_max = info.param.line_dist_max;
  //-----------------------

  for(let j=0; j<dist_vec.length; j++){
    let dist = dist_vec[j][0];
    //let alpha = 0.8 - dist / (dist_max);
    let alpha = - Math.log( dist / (dist_max)) - 0.5;

    if(alpha > 0 && dist < dist_max){
      XY.push(points.xy[i]);
      XY.push(points.xy[dist_vec[j][1]]);

      RGB.push([rgb, rgb, rgb, alpha])
      RGB.push([rgb, rgb, rgb, alpha])
    }
  }

  //-----------------------
}

function move_line_knn(){
  //-----------------------

  let XY = [];
  let RGB = [];
  for(let i=0; i<points.xy.length; i++){
    let dist_vec = knn(i);
    create_line_knn(XY, RGB, dist_vec, i);
  }

  lines.xy = XY;
  lines.rgb = RGB;
  lines.nb_point = lines.xy.length;

  //-----------------------
}
function create_line_knn(XY, RGB, dist_vec, i){
  let rgb_alpha = info.param.primitiv_alpha;
  let rgb = info.param.primitiv_rgb;
  let nb_link = info.param.nb_link;
  let dist_max = 0.5;
  //-----------------------

  if(dist_vec.length  >= nb_link){
    for(let j=0; j<nb_link; j++){
      let dist = dist_vec[j][0];
      //let alpha = 0.8 - dist / (dist_max);
      let alpha = - Math.log( dist / (dist_max)) - 0.5;

      if(alpha > 0){
        XY.push(points.xy[i]);
        XY.push(points.xy[dist_vec[j][1]]);

        RGB.push([rgb, rgb, rgb, alpha])
        RGB.push([rgb, rgb, rgb, alpha])
      }
    }
  }

  //-----------------------
}
function knn(i){
  //-----------------------

  let dist_vec = new Array();
  for(let j=0; j<points.xy.length; j++){
    if(i != j){
      let dist = fct_distance(points.xy[i], points.xy[j])

      //Line link
      dist_vec.push([dist, j]);

      //Collision
      collision(dist, i);
    }
  }

  //add_points_xy(points.xy[i]);
  dist_vec.sort();

  //-----------------------
  return dist_vec
}
