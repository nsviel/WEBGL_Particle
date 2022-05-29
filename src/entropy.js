function compute_stats(){
  //PV = NkbT
  // T = PV / Nkb
  //kb = 1,38 × 10-23
  //N = nombre de particules
  //P = pression
  // V = volume en mètre cube

  let P = 1;
  let V = 1*Math.pow(10,-20)
  let N = points.nb_point
  let kb = 1.38*Math.pow(10,-23)
  let T = (P * V) / (N * kb)
}
