function ui_update(){
  //-----------------------

  var nb_points = document.getElementById("slider_points").value;
  info.param.nb_link = document.getElementById("slider_links").value;

  if(nb_points != info.param.nb_point){
    info.param.nb_point = nb_points;
    slider_points();
  }

  //HTML stuff
  document.getElementById("cpt_points").value = info.param.nb_point;
  document.getElementById("cpt_links").value = info.param.nb_link;

  //-----------------------
}
