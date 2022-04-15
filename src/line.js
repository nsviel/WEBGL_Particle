function create_line(){
  //-----------------------

  lines.draw = gl.LINES;

  //-----------------------
}
function move_line(){
  //-----------------------

  let lim = 0.001;
  let rgb_alpha = info.param.primitiv_alpha;
  let rgb = info.param.primitiv_rgb;
  let nb_link = 4;
  let collid_thres = 0.01;

  let XY = new Array();
  let RGB = new Array();

  for(let i=0; i<points.xy.length; i=i + 2){
    let dist_min = 1000;
    let id = -1;
    let id_2 = -1;
    let dist_ = new Array();

    //Serach kNN
    for(let j=0; j<points.xy.length; j=j + 2){
      let dist = Math.sqrt(Math.pow(points.xy[i] - points.xy[j], 2) + Math.pow(points.xy[i+1] - points.xy[j+1], 2));

      //Line link
      if(dist != 0){
        dist_.push([dist, j]);
      }

      //Collision
      if(dist != 0 && dist < collid_thres){
        points.nxy[i] = -points.nxy[i];
        points.nxy[i+1] = -points.nxy[i+1];

        points.nxy[j] = -points.nxy[j];
        points.nxy[j+1] = -points.nxy[j+1];
      }
    }
    dist_.sort();

    //Create line
    for(let j=0; j<nb_link; j++){
      XY.push(points.xy[i])
      XY.push(points.xy[i+1])

      XY.push(points.xy[dist_[j][1]])
      XY.push(points.xy[dist_[j][1]+1])

      RGB.push(rgb)
      RGB.push(rgb)
      RGB.push(rgb)
      RGB.push(rgb_alpha)

      RGB.push(rgb)
      RGB.push(rgb)
      RGB.push(rgb)
      RGB.push(rgb_alpha)
    }

  }

  lines.xy = XY;
  lines.rgb = RGB;
  lines.size = XY.length / 2;

  //-----------------------
}
