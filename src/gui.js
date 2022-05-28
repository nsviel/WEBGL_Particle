function ui_update(){
  //-----------------------

  var nb_points = document.getElementById("slider_points").value;
  var point_size = document.getElementById("slider_size").value;
  var speed = document.getElementById("slider_speed").value;

  info.param.speed = speed;
  if(nb_points != info.param.nb_point){
    info.param.nb_point = nb_points;
    slider_points();
  }
  if(point_size != info.param.point_size){
    info.param.point_size = point_size;
    gl.uniform1f(info.uniform.point_size, point_size);
  }

  //HTML stuff
  document.getElementById("cpt_points").value = info.param.nb_point;
  document.getElementById("cpt_size").value = info.param.point_size;
  document.getElementById("cpt_speed").value = info.param.speed;

  //-----------------------
}
