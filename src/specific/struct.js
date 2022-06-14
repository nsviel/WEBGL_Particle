//All webgl program info
var info = {
  webgl:{
    canvas: 0,
    context: 0,
    gui: 0,
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
    nb_point: 0,
    speed: 0,
    line_dist_max: 0,
    limit: 0,
    collision_area: 0,
    limitless: false,
  },
  color:{
    dark_mode: false,
    collision: 0,
    bkg: 0,
  },
  mouse:{
    area: 0,
    event: 0,
    over: false,
    pos: 0,
    color: 0,
  },
};

//All scene objects info
var object = {
  point = {
    xy: 0,
    rgb: 0,
    nxy: 0,
    speed: 0,

    color: 0,
    size: 0,
    draw: 0,
    idx_anar: 0,
    nb_point: 0,

    vbo_xy: 0,
    vbo_rgb: 0,
  },
  line = {
    xy: 0,
    rgb: 0,

    color: 0,
    nb_line: 0,
    draw: 0,

    vbo_xy: 0,
    vbo_rgb: 0,
  },
}
