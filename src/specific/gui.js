//Main functions
function init_gui(){
  //-----------------------

  // Creating a GUI with options.
  info.webgl.gui = new dat.GUI();

  //Parameters
  var param = info.webgl.gui.addFolder('Parameter');
  param.add(info.param, 'line_dist_max', 0, 1, 0.01);
  param.add(info.param, 'limitless', false);

  //Points
  var point = info.webgl.gui.addFolder('Point');
  point.add(info.param, 'nb_point', 0, 500, 1);
  point.add(info.param, 'point_size', 0, 20, 1);
  point.add(info.param, 'speed', 0, 0.1, 0.0001);
  point.addColor(object.point, 'color');

  //Colors
  var color = info.webgl.gui.addFolder('Color');
  color.addColor(info.color, 'collision');
  color.addColor(info.color, 'bkg');

  //Mouse
  var mouse = info.webgl.gui.addFolder('Mouse');
  mouse.add(info.mouse, 'rayon', 0, 0.5, 0.01);
  mouse.add(info.mouse, 'add_point', false);
  mouse.addColor(info.mouse, 'color');

  //-----------------------
}
