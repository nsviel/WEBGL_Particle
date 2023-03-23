//Main functions
function init_gui(){
  if(info.webgl.with_gui == false) return;
  let canvas = info.webgl.canvas;
  //-----------------------

  // Creating a GUI with options.
  info.webgl.gui = new dat.GUI({autoPlace: true, closed: true});
  info.webgl.gui.domElement.id = 'gui';
  info.webgl.gui.width = canvas.width;

  //Parameters
  let gui_param = info.webgl.gui.addFolder('Parameter');
  gui_param.add(param, 'line_dist_max', 0, 500, 1);
  gui_param.add(param, 'limit_x', 0, 1.5, 0.1);
  gui_param.add(param, 'limit_y', 0, 1.5, 0.1);

  //Points
  let gui_point = info.webgl.gui.addFolder('Point');
  gui_point.add(param, 'nb_point', 0, param.nb_point_max, 1).listen();
  gui_point.add(param, 'point_size', 0, 20, 1);
  gui_point.add(param, 'speed', 0, 0.1, 0.0001);

  //Colors
  let gui_color = info.webgl.gui.addFolder('Color');
  gui_color.addColor(color, 'collision');
  gui_color.addColor(color, 'bkg');
  gui_color.addColor(color, 'point');
  gui_color.addColor(color, 'mouse');
  gui_color.addColor(color, 'line');

  //Mouse
  let gui_mouse = info.webgl.gui.addFolder('Mouse');
  gui_mouse.add(info.mouse, 'mode', ['Repulsif', 'Black_hole', 'selection']).setValue(info.mouse.mode);
  gui_mouse.add(info.mouse, 'rayon', 0, 0.5, 0.01);
  gui_mouse.add(info.mouse, 'add_point', false);
  gui_mouse.add(info.mouse, 'add_point_number', 1, 20, 1);
  gui_mouse.add(info.mouse, 'force', 0, 1, 0.01);

  //Time
  let gui_time = info.webgl.gui.addFolder('Time');
  gui_time.add(info.time, 'scene').listen();

  //-----------------------
}
