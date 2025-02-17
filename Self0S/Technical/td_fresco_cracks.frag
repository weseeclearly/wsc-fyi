/* TouchDesigner GLSL Fragment Shader */
// Based on Voronoi crack pattern from Shadertoy
// Inputs: texture0 = source image

#define MARBLE 1
#define VARIANT 1

// Uniforms for real-time control
uniform float CELL;          // Base cell size
uniform float RATIO;         // Cell aspect ratio
uniform float BEVEL;         // Crack edge width 
uniform float fractal_depth; // Crack complexity
uniform float noise_amp;     // Pattern organicness

// Voronoi functions from original Shadertoy code
vec3 hash3(uvec3 x) {
    x = ( (x>>8U) ^ x.yzx ) * 1103515245U;
    x = ( (x>>8U) ^ x.yzx ) * 1103515245U; 
    x = ( (x>>8U) ^ x.yzx ) * 1103515245U;
    return vec3(x) / float(0xffffffffU) + 1e-30;
}

vec3 voronoiB(vec2 u) {
    vec2 iu = floor(u), C, P;
    float m = 1e9;
    
    // Find nearest cell
    for(int k=0; k<25; k++) {
        vec2 p = iu + vec2(k%5-2,k/5-2);
        vec2 o = fract(18.5453 * sin(p * mat2(127.1,311.7,269.5,183.3)));
        vec2 r = p - u + o;
        float d = dot(r,r);
        if(d < m) {
            m = d;
            C = p-iu;
            P = r;
        }
    }
    
    // Find nearest edge
    m = 1e9;
    for(int k=0; k<25; k++) {
        vec2 p = iu + C + vec2(k%5-2,k/5-2);
        vec2 o = fract(18.5453 * sin(p * mat2(127.1,311.7,269.5,183.3)));
        vec2 r = p - u + o;
        if(dot(P-r,P-r) > 1e-5) {
            m = min(m, 0.5*dot(P+r, normalize(r-P)));
        }
    }
    
    return vec3(m, P+u);
}

float noise2(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f*f*(3.0-2.0*f);
    float a = fract(sin(dot(i,vec2(127.1,311.7)))*43758.5453);
    float b = fract(sin(dot(i+vec2(1,0),vec2(127.1,311.7)))*43758.5453);
    float c = fract(sin(dot(i+vec2(0,1),vec2(127.1,311.7)))*43758.5453);
    float d = fract(sin(dot(i+vec2(1,1),vec2(127.1,311.7)))*43758.5453);
    return mix(mix(a,b,f.x), mix(c,d,f.x), f.y);
}

vec2 fbm22(vec2 p) {
    vec2 v = vec2(0);
    float a = 0.5;
    mat2 R = mat2(cos(0.37), -sin(0.37), sin(0.37), cos(0.37));
    
    for(int i=0; i<6; i++) {
        p *= R;
        v += a * vec2(
            noise2(p),
            noise2(p + vec2(17.7))
        );
        a *= 0.5;
        p *= 2.0;
    }
    return v;
}

#define rot(a) mat2(cos(a),-sin(a),sin(a),cos(a))

void main()
{
    vec2 uv = vUV.st; // TouchDesigner UV coordinates
    
    // Get source image color
    vec4 srcColor = texture(sTD2DInputs[0], uv);
    
    // Generate crack pattern
    vec4 crack = vec4(0.0);
    for(float i=0.; i<fractal_depth; i++) {
        vec2 V = uv / vec2(RATIO,1);
        vec2 D = noise_amp * fbm22(uv) * 0.67;
        vec3 H = voronoiB(V + D);
        float d = clamp(BEVEL * H.x, 0., 1.);
        crack += vec4(1.-d) / exp2(i);
        uv *= 1.5 * rot(.37);
    }
    
    // Final alpha mask 
    float mask = 1. - crack.r;
    mask = smoothstep(0.3, 0.8, mask); // Crisp edges
    
    // Output: reveal source through cracks
    fragColor = vec4(srcColor.rgb, mask * srcColor.a);
}
