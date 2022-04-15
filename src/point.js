function create_points(nb_point){
  //-----------------------

  let lim_x = info.limit.x;
  let lim_y = info.limit.y;
  let rgb = info.param.primitiv_rgb;

  //Location
  let XY = new Array(nb_point * 2);
  for(let i=0; i<nb_point * 2; i=i+2){
    XY[i] = getRandomArbitrary(-lim_x, lim_x);
    XY[i+1] = getRandomArbitrary(-lim_y, lim_y);
  }

  //Color
  let RGB = new Array(nb_point * 4);
  for(let i=0; i<nb_point * 4; i=i+4){
    RGB[i] = rgb;
    RGB[i+1] = rgb;
    RGB[i+2] = rgb;
    RGB[i+3] = 1;
  }

  //Normal
  let Nxy = new Array(nb_point * 2);
  for(let i=0; i<nb_point * 2; i=i+2){
    Nxy[i] = getRandomArbitrary(-1, 1);
    Nxy[i+1] = getRandomArbitrary(-1, 1);
  }

  //Store data
  points.xy = XY;
  points.rgb = RGB;
  points.nxy = Nxy;
  points.size = nb_point;
  points.draw = gl.POINTS;

  //HTML stuff
  document.getElementById("cpt_points").value = points.size;
  document.getElementById("slider_points").value = points.size;

  //-----------------------
}
function add_points(nb_point){
  //-----------------------

  let lim_x = info.limit.x;
  let lim_y = info.limit.y;
  let rgb = info.param.primitiv_rgb;

  //Location
  let XY = new Array(nb_point * 2);
  for(let i=0; i<nb_point * 2; i=i+2){
    XY[i] = getRandomArbitrary(-lim_x, lim_x);
    XY[i+1] = getRandomArbitrary(-lim_y, lim_y);
  }

  //Color
  let RGB = new Array(nb_point * 4);
  for(let i=0; i<nb_point * 4; i=i+4){
    RGB[i] = rgb;
    RGB[i+1] = rgb;
    RGB[i+2] = rgb;
    RGB[i+3] = 1;
  }

  //Normal
  let Nxy = new Array(nb_point * 2);
  for(let i=0; i<nb_point * 2; i=i+2){
    Nxy[i] = getRandomArbitrary(-1, 1);
    Nxy[i+1] = getRandomArbitrary(-1, 1);
  }

  //Store data
  points.xy = points.xy.concat(XY);
  points.rgb = points.rgb.concat(RGB);
  points.nxy = points.nxy.concat(Nxy);
  points.size = points.xy.length / 2;
  points.draw = gl.POINTS;

  //HTML stuff
  document.getElementById("cpt_points").value = points.size;

  //-----------------------
}
function remove_points(nb_point){
  //-----------------------

  //Location
  for(let i=0; i<nb_point * 2; i=i+2){
    points.xy.pop();
    points.xy.pop();

    points.nxy.pop();
    points.nxy.pop();

    points.rgb.pop();
    points.rgb.pop();
    points.rgb.pop();
    points.rgb.pop();
  }

  points.size = points.xy.length / 2;

  //HTML stuff
  document.getElementById("cpt_points").value = points.size;

  //-----------------------
}
function move_points(){
  //-----------------------

  for(let i=0; i<points.xy.length; i=i+2){
    dist = Math.sqrt(Math.pow(points.xy[i] - info.mouse.x, 2) + Math.pow(points.xy[i+1] - info.mouse.y, 2));

    //If close to mouse position
    if(dist < 0.2){
      points.xy[i] = points.xy[i] + (0.2 - dist) * (points.xy[i] - info.mouse.x) * 0.2;
      points.xy[i+1] = points.xy[i+1] + (0.2 - dist) * (points.xy[i+1] - info.mouse.y) * 0.2;
    }
    //Default displacment
    else{
      points.xy[i] = points.xy[i] + points.nxy[i] * 0.001;
      points.xy[i+1] = points.xy[i+1] + points.nxy[i+1] * 0.001;
    }

    check_areas_limit(i);
  }

  //-----------------------
}
function slider_points(){
  //-----------------------

  let nb_slider = document.getElementById("slider_points").value;
  let diff = points.size - nb_slider;


  if(diff > 0){
    remove_points(diff);
  }else if(diff < 0){
    add_points(-diff);
  }

  //-----------------------
}

function check_areas_limit(i){
  //-----------------------

  //Area borders
  if(points.xy[i] < -info.limit.x){
    points.xy[i] = -info.limit.x;
    points.nxy[i] = -points.nxy[i];
  }
  if(points.xy[i] > info.limit.x){
    points.xy[i] = info.limit.x;
    points.nxy[i] = -points.nxy[i];
  }
  if(points.xy[i+1] < -info.limit.y){
    points.xy[i+1] = -info.limit.y;
    points.nxy[i+1] = -points.nxy[i+1];
  }
  if(points.xy[i+1] > info.limit.y){
    points.xy[i+1] = info.limit.y;
    points.nxy[i+1] = -points.nxy[i+1];
  }

  //-----------------------
}
