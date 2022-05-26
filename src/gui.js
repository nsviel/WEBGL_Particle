function ui_update(){
  //-----------------------

  var nb_points = document.getElementById("slider_points").value;
  var nb_links = document.getElementById("slider_links").value;
  var speed = document.getElementById("slider_speed").value;

  info.param.nb_link = nb_links;
  info.param.speed = speed;
  if(nb_points != info.param.nb_point){
    info.param.nb_point = nb_points;
    slider_points();
  }

  //HTML stuff
  document.getElementById("cpt_points").value = info.param.nb_point;
  document.getElementById("cpt_links").value = info.param.nb_link;
  document.getElementById("cpt_speed").value = info.param.speed;

  //-----------------------
}
