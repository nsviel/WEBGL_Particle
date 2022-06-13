//Main functions
function init_gui(){
  //-----------------------

  // Creating a GUI with options.
  info.webgl.gui = new dat.GUI();

  //Parameters
  var param = info.webgl.gui.addFolder('Parameter');
  param.add(info.param, 'nb_point', 0, 500, 1);
  param.add(info.param, 'point_size', 0, 20, 1);
  param.add(info.param, 'line_dist_max', 0, 1, 0.01);
  param.add(info.param, 'speed', 0, 0.1, 0.0001);
  param.add(info.param, 'limitless', false);

  //Colors
  var color = info.webgl.gui.addFolder('Color');
  color.addColor(info.color, 'collision');
  color.addColor(info.color, 'bkg');
  color.addColor(object.point, 'color');


  //-----------------------
}
