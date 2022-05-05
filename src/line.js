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

  //Check if there is enough point for the number of link
  if(nb_link >= points.size - 1){
    nb_link = points.size - 1;
  }

  let XY = [];
  let RGB = [];
  for(let i=0; i<points.xy.length; i++){
    let dist_vec = knn(i);

    //Create line
    for(let j=0; j<nb_link; j++){
      XY.push(points.xy[i]);
      XY.push(points.xy[dist_vec[j][1]]);

      RGB.push([rgb, rgb, rgb, rgb_alpha])
      RGB.push([rgb, rgb, rgb, rgb_alpha])
    }

  }

  lines.xy = XY;
  lines.rgb = RGB;
  lines.size = lines.xy.length;

  //-----------------------
}
function knn(i){
  //-----------------------

  let collid_thres = 0.01;
  let dist_vec = new Array();

  for(let j=0; j<points.xy.length; j++){
    if(i != j){
      let dist = fct_distance(points.xy[i], points.xy[j])

      //Line link
      dist_vec.push([dist, j]);

      //Collision
      if(dist < collid_thres){
        points.nxy[i][0] = -points.nxy[i][0];
        points.nxy[i][1] = -points.nxy[i][1];

        points.nxy[j][0] = -points.nxy[j][0];
        points.nxy[j][1] = -points.nxy[j][1];
      }
    }
  }

  dist_vec.sort();

  //-----------------------
  return dist_vec
}
