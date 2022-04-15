var info = {
  canvas: 0,
  context: 0,
  program: 0,
  param: {
    bkg: 1,
    nb_point: 0,
    primitiv_rgb: 0,
    primitiv_alpha: 0,
  },
  mouse: {
    x: 0,
    y: 0,
  },
  attribut: {
    location: 0,
    color: 0,
  },
  uniform: {
    in_mvp: 0,
    is_point: false,
  },
  limit: {
    x: 0,
    y: 0,
  },
};

var mvp = {
  projection: 0,
  modelview: 0,
  mvp: 0,
};

var points = {
  vbo_xy: 0,
  vbo_rgb: 0,
  xy: 0,
  rgb: 0,
  nxy: 0,
  size: 0,
  draw: 0,
};

var lines = {
  vbo_xy: 0,
  vbo_rgb: 0,
  xy: 0,
  rgb: 0,
  size:0,
  draw: 0,
};
