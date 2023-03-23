function create_shader_vertex(){
  //-----------------------

  // Vertex shader program
  const shader_vertex =
  `#version 300 es

  in vec4 in_position;
  in vec4 in_color;

  out vec4 frag_color;

  uniform float point_size;
  uniform mat4 in_mvp;

  void main(){
    //-----------------------
    
    gl_Position = in_position;
    gl_PointSize = point_size;

    frag_color = in_color;

    //-----------------------
  }
  `;

  //-----------------------
  return shader_vertex;
}
