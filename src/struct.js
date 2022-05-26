var info = {
  canvas: 0,
  context: 0,
  program: 0,
  param: {
    bkg: 1,
    nb_point: 0,
    primitiv_rgb: 0,
    primitiv_alpha: 0,
    speed: 0,
  },
  mouse: 0,
  attribut: {
    location: 0,
    color: 0,
  },
  uniform: {
    in_mvp: 0,
    is_point: false,
  },
  limit: 0,
};

var mvp = {
  projection: 0,
  modelview: 0,
  mvp: 0,
};

var points_vbo_xy, points_vbo_rgb
var points = {
  xy: 0,
  rgb: 0,
  nxy: 0,
  size: 0,
  draw: 0,
  nb_point: 0,
};

var lines_vbo_xy, lines_vbo_rgb
var lines = {
  xy: 0,
  rgb: 0,
  nb_point:0,
  draw: 0,
};
