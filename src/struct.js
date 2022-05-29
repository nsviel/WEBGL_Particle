var info = {
  webgl:{
    canvas: 0,
    context: 0,
    mvp = {
      projection: 0,
      modelview: 0,
      mvp: 0,
    },
  },
  shader:{
    program: 0,
    attribut: {
      location: 0,
      color: 0,
    },
    uniform: {
      in_mvp: 0,
      point_size: 5,
      is_point: false,
    },
  },
  param:{
    bkg: 1,
    nb_point: 0,
    primitiv_rgb: 0,
    primitiv_alpha: 0,
    speed: 0,
    line_dist_max: 0,
    limit: 0,
  },
  value:{
    mouse: 0,
  },
};
var object = {
  point = {
    xy: 0,
    rgb: 0,
    nxy: 0,
    size: 0,
    draw: 0,
    nb_point: 0,
  },
  line = {
    xy: 0,
    rgb: 0,
    nb_point:0,
    draw: 0,
  },
}

var vbo = {
  pt_xy: 0,
  pt_rgb: 0,
  li_xy: 0,
  li_rgb: 0,
};
var points_vbo_xy, points_vbo_rgb
var lines_vbo_xy, lines_vbo_rgb
