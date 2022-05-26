function init_line(){
  //-----------------------

  lines.draw = gl.LINES;

  //-----------------------
}
function move_line(){
  //-----------------------

  let rgb_alpha = info.param.primitiv_alpha;
  let rgb = info.param.primitiv_rgb;
  let nb_link = info.param.nb_link;
  let dist_max = 0.8 - points.xy.length/100;

  //Check if there is enough point for the number of link
  if(nb_link >= points.nb_point - 1){
    nb_link = points.nb_point - 1;
  }
  if(dist_max <= 0.2){
    dist_max = 0.2
  }

  let XY = [];
  let RGB = [];
  for(let i=0; i<points.xy.length; i++){
    let dist_vec = knn(i);

    //Create line
    for(let j=0; j<nb_link; j++){
      let dist = dist_vec[j][0];
      let alpha = 1 - dist / (dist_max);


      if(dist < dist_max){
        XY.push(points.xy[i]);
        XY.push(points.xy[dist_vec[j][1]]);

        RGB.push([rgb, rgb, rgb, alpha])
        RGB.push([rgb, rgb, rgb, alpha])
      }
    }
  }

  lines.xy = XY;
  lines.rgb = RGB;
  lines.nb_point = lines.xy.length;

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

  dist_vec.sort();

  //-----------------------
  return dist_vec
}
function collision(dist, i){
  let collid_thres = 0.01;
  //-----------------------

  if(dist < collid_thres){
    let Nx = getRandomArbitrary(-1, 1);
    let Ny = getRandomArbitrary(-1, 1);
    points.nxy[i] = [Nx, Ny];
    points.rgb[i] = [0, 0, 1, 1];

    if(points.nb_point < 200){
    //  add_points_xy(points.xy[i]);
    }
  }

  if(points.rgb[i][2] != 0){
    points.rgb[i][2] -= 0.00025;
  }

  //-----------------------
}
