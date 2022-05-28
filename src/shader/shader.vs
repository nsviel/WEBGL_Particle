#version 300 es

in vec4 in_position;
in vec4 in_color;
out vec4 frag_color;

void main(){
  gl_Position = in_position;
  gl_PointSize = 5.0;

  frag_color = in_color;
}
