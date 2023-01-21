//Main functions
function init_gui(){
  let canvas = info.webgl.canvas;
  //-----------------------

  // Creating a GUI with options.
  info.webgl.gui = new dat.GUI({autoPlace: true, closed: true});
  info.webgl.gui.domElement.id = 'gui';
  info.webgl.gui.width = canvas.width;

  //Parameters
  let param = info.webgl.gui.addFolder('Parameter');
  param.add(info.param, 'line_dist_max', 0, 500, 1);
  param.add(info.param, 'limit_x', 0, 1.5, 0.1);
  param.add(info.param, 'limit_y', 0, 1.5, 0.1);

  //Points
  let point = info.webgl.gui.addFolder('Point');
  point.add(info.param, 'nb_point', 0, info.param.nb_point_max, 1).listen();
  point.add(info.param, 'point_size', 0, 20, 1);
  point.add(info.param, 'speed', 0, 0.1, 0.0001);

  //Colors
  let color = info.webgl.gui.addFolder('Color');
  color.addColor(info.color, 'collision');
  color.addColor(info.color, 'bkg');
  color.addColor(info.color, 'point');
  color.addColor(info.color, 'mouse');
  color.addColor(info.color, 'line');

  //Mouse
  let mouse = info.webgl.gui.addFolder('Mouse');
  mouse.add(info.mouse, 'mode', ['Repulsif', 'Black_hole']).setValue('Repulsif');
  mouse.add(info.mouse, 'rayon', 0, 0.5, 0.01);
  mouse.add(info.mouse, 'add_point', false);
  mouse.add(info.mouse, 'add_point_number', 1, 20, 1);
  mouse.add(info.mouse, 'force', 0, 1, 0.01);

  //Time
  let time = info.webgl.gui.addFolder('Time');
  time.add(info.time, 'scene').listen();

  //-----------------------
}
