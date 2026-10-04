"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type CloudShaderProps = {
  className?: string;
  children?: ReactNode;
  speed?: number;
  count?: number;
  cloudColor?: string;
  skyTopColor?: string;
  skyBottomColor?: string;
};

const VERT = `
attribute vec2 a_pos;
varying vec2 v_uv;

void main() {
  v_uv = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

const FRAG = `
precision mediump float;

varying vec2 v_uv;

uniform vec2 u_res;
uniform float u_time;
uniform float u_count;

uniform vec3 u_cloud;
uniform vec3 u_skyTop;
uniform vec3 u_skyBottom;

const mat2 R = mat2(
  0.80, 0.60,
 -0.60, 0.80
);

float hash(vec2 p) {
  return fract(
    sin(dot(p, vec2(41.31, 289.17))) * 26737.367
  );
}

float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);

  f = f * f * (3.0 - 2.0 * f);

  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));

  return mix(
    mix(a, b, f.x),
    mix(c, d, f.x),
    f.y
  );
}

float fbm(vec2 p) {
  float sum = 0.0;
  float amp = 0.5;

  for (int i = 0; i < 3; i++) {
    sum += amp * vnoise(p);

    p = R * p * 2.03 + 19.19;
    amp *= 0.5;
  }

  return sum;
}

float billow(vec2 p) {
  float sum = 0.0;
  float amp = 0.5;

  for (int i = 0; i < 3; i++) {
    sum += amp * (
      1.0 - abs(2.0 * vnoise(p) - 1.0)
    );

    p = R * p * 2.11 + 13.37;
    amp *= 0.5;
  }

  return sum;
}

float cloudDensity(
  vec2 p,
  vec2 c,
  vec2 r,
  float seed,
  float t
) {
  vec2 q = p - c;

  float ry = q.y > 0.0
    ? r.y
    : r.y * 0.42;

  float edge = length(
    vec2(
      q.x / r.x,
      q.y / ry
    )
  );

  float env = 1.0 - edge;

  if (env < -0.30) {
    return 0.0;
  }

  vec2 dp = q * (2.4 / r.x) + seed;

  dp += 0.6 * vec2(
    fbm(dp * 1.4 + t * 0.04),
    fbm(dp * 1.4 + 7.7 - t * 0.03)
  );

  float detail = billow(dp * 1.6);

  float breakup =
    (detail - 0.62) * 0.72 +
    (vnoise(dp * 2.2) - 0.5) * 0.14;

  return env + breakup;
}

vec3 shadeCloud(
  vec3 color,
  vec3 sky,
  vec2 p,
  vec2 c,
  vec2 r,
  float seed,
  float t,
  float dist
) {
  float d = cloudDensity(p, c, r, seed, t);

  if (d < 0.02) {
    return color;
  }

  float heightFactor = clamp(
    (p.y - (c.y - r.y * 0.42)) /
    (r.y * 1.42),
    0.0,
    1.0
  );

  float occl = clamp(
    d * 0.72 +
    (1.0 - heightFactor) * 0.16,
    0.0,
    1.0
  );

  vec3 lit = u_cloud * 1.04;

  vec3 shadow = mix(
    u_cloud * 0.60,
    sky,
    0.38
  );

  vec3 cloudCol = mix(
    lit,
    shadow,
    occl * 0.85
  );

  float alpha = smoothstep(0.02, 0.38, d);

  float rim =
    smoothstep(0.02, 0.14, d) *
    (1.0 - smoothstep(0.14, 0.40, d));

  cloudCol += rim * 0.08;

  cloudCol = mix(
    cloudCol,
    sky,
    dist * 0.35
  );

  alpha *= mix(1.0, 0.8, dist);

  return mix(color, cloudCol, alpha);
}

vec3 cloudPass(
  vec3 color,
  vec3 sky,
  vec2 p,
  float aspect,
  float t,
  float spd,
  float phase,
  float y,
  vec2 r,
  float seed,
  float dist
) {
  float cx = mix(
    -r.x - 0.25,
    aspect + r.x + 0.25,
    fract(t * spd + phase)
  );

  float cy =
    y +
    sin(
      t * 0.05 +
      phase * 6.2831
    ) * 0.012;

  return shadeCloud(
    color,
    sky,
    p,
    vec2(cx, cy),
    r,
    seed,
    t,
    dist
  );
}

void main() {
  float aspect = u_res.x / u_res.y;

  vec2 p = vec2(
    v_uv.x * aspect,
    v_uv.y
  );

  float t = u_time;

  vec3 sky = mix(
    u_skyBottom,
    u_skyTop,
    v_uv.y
  );

  vec3 color = sky;

  color = mix(
    color,
    u_skyBottom * 1.06,
    smoothstep(0.35, 0.0, v_uv.y) * 0.5
  );

  float topLight = smoothstep(
    0.45,
    1.0,
    v_uv.y
  );

  color +=
    vec3(1.0, 0.97, 0.88) *
    topLight *
    0.035;

  float cirrusBand =
    smoothstep(0.55, 0.8, v_uv.y) *
    (1.0 - smoothstep(0.9, 1.0, v_uv.y));

  if (cirrusBand > 0.01) {
    float streak = vnoise(
      vec2(
        p.x * 3.2 - t * 0.008,
        p.y * 18.0
      )
    );

    float wisp =
      smoothstep(0.52, 0.78, streak) *
      cirrusBand;

    color = mix(
      color,
      u_cloud * 0.98,
      wisp * 0.20
    );
  }

  if (u_count > 3.5) {
    color = cloudPass(
      color,
      sky,
      p,
      aspect,
      t,
      0.008,
      0.62,
      0.67,
      vec2(0.18, 0.08),
      71.3,
      0.85
    );
  }

  if (u_count > 2.5) {
    color = cloudPass(
      color,
      sky,
      p,
      aspect,
      t,
      0.013,
      0.80,
      0.44,
      vec2(0.24, 0.11),
      29.9,
      0.45
    );
  }

  if (u_count > 1.5) {
    color = cloudPass(
      color,
      sky,
      p,
      aspect,
      t,
      0.016,
      0.05,
      0.30,
      vec2(0.30, 0.13),
      91.1,
      0.15
    );
  }

  color = cloudPass(
    color,
    sky,
    p,
    aspect,
    t,
    0.020,
    0.48,
    0.12,
    vec2(0.36, 0.15),
    57.2,
    0.0
  );

  gl_FragColor = vec4(
    color,
    1.0
  );
}
`;

function parseHex(color: string): [number, number, number] {
  const value = color.trim();

  if (value.startsWith("#")) {
    const hex = value.slice(1);

    if (hex.length === 3) {
      return [
        parseInt(hex[0] + hex[0], 16) / 255,
        parseInt(hex[1] + hex[1], 16) / 255,
        parseInt(hex[2] + hex[2], 16) / 255,
      ];
    }

    if (hex.length === 6) {
      return [
        parseInt(hex.slice(0, 2), 16) / 255,
        parseInt(hex.slice(2, 4), 16) / 255,
        parseInt(hex.slice(4, 6), 16) / 255,
      ];
    }
  }

  const rgb = value.match(/[\d.]+/g);

  if (rgb && rgb.length >= 3) {
    return [Number(rgb[0]) / 255, Number(rgb[1]) / 255, Number(rgb[2]) / 255];
  }

  return [0.95, 0.95, 0.95];
}

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);

  if (!shader) {
    return null;
  }

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

export const CloudShader = ({
  className,
  children,
  speed = 0.25,
  count = 3,
  cloudColor = "#fbf8f2",
  skyTopColor = "#0e5f63",
  skyBottomColor = "#b8dfdc",
}: CloudShaderProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const paramsRef = useRef({
    speed,
    count,
  });

  const colorsRef = useRef({
    cloud: parseHex(cloudColor),
    skyTop: parseHex(skyTopColor),
    skyBottom: parseHex(skyBottomColor),
  });

  useEffect(() => {
    paramsRef.current = { speed, count };
    colorsRef.current = {
      cloud: parseHex(cloudColor),
      skyTop: parseHex(skyTopColor),
      skyBottom: parseHex(skyBottomColor),
    };
  }, [speed, count, cloudColor, skyTopColor, skyBottomColor]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      premultipliedAlpha: false,
      preserveDrawingBuffer: false,
      powerPreference: "low-power",
    });

    if (!gl) return;

    const vert = compile(gl, gl.VERTEX_SHADER, VERT);
    const frag = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vert || !frag) return;

    const program = gl.createProgram();
    if (!program) {
      gl.deleteShader(vert);
      gl.deleteShader(frag);
      return;
    }

    gl.attachShader(program, vert);
    gl.attachShader(program, frag);
    gl.bindAttribLocation(program, 0, "a_pos");
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program);
      gl.deleteShader(vert);
      gl.deleteShader(frag);
      return;
    }

    gl.useProgram(program);

    const buffer = gl.createBuffer();
    if (!buffer) return;

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );

    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    const loc = {
      res: gl.getUniformLocation(program, "u_res"),
      time: gl.getUniformLocation(program, "u_time"),
      count: gl.getUniformLocation(program, "u_count"),
      cloud: gl.getUniformLocation(program, "u_cloud"),
      skyTop: gl.getUniformLocation(program, "u_skyTop"),
      skyBottom: gl.getUniformLocation(program, "u_skyBottom"),
    };

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let running = true;
    let visible = true;
    let frame = 0;
    let lastDraw = 0;
    const start = performance.now();

    const render = (now: number) => {
      if (!running) return;

      const params = paramsRef.current;
      const colors = colorsRef.current;
      const elapsed = reduceMotion ? 0 : ((now - start) / 1000) * params.speed;

      gl.uniform1f(loc.time, elapsed);
      gl.uniform1f(loc.count, Math.min(4, Math.max(1, params.count)));
      gl.uniform3f(
        loc.cloud,
        colors.cloud[0],
        colors.cloud[1],
        colors.cloud[2],
      );
      gl.uniform3f(
        loc.skyTop,
        colors.skyTop[0],
        colors.skyTop[1],
        colors.skyTop[2],
      );
      gl.uniform3f(
        loc.skyBottom,
        colors.skyBottom[0],
        colors.skyBottom[1],
        colors.skyBottom[2],
      );

      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const resize = () => {
      const width = Math.max(1, canvas.clientWidth);
      const height = Math.max(1, canvas.clientHeight);

      // تحديد الحد الأقصى لدقة الريندر لمنع الضغط على الأجهزة الضعيفة والموبايل
      const baseDpr = width < 768 ? 0.75 : 1.0;
      const maxPixels = 800_000;

      const rawWidth = width * baseDpr;
      const rawHeight = height * baseDpr;
      const rawPixels = rawWidth * rawHeight;
      const pixelScale =
        rawPixels > maxPixels ? Math.sqrt(maxPixels / rawPixels) : 1;

      const w = Math.max(1, Math.floor(rawWidth * pixelScale));
      const h = Math.max(1, Math.floor(rawHeight * pixelScale));

      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }

      gl.viewport(0, 0, w, h);
      gl.uniform2f(loc.res, w, h);

      if (reduceMotion) {
        render(performance.now());
      }
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize();

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? true;
        if (visible && !reduceMotion) {
          render(performance.now());
        }
      },
      { threshold: 0.01 },
    );
    intersectionObserver.observe(canvas);

    if (!reduceMotion) {
      // تحديد FPS بحد أقصى 24 إطارًا بدلاً من 60 لتقليل حجز المعالج بنسبة 60%
      const frameDuration = 1000 / 24;

      const draw = (now: number) => {
        if (!running) return;
        frame = requestAnimationFrame(draw);

        if (!visible) return;
        if (now - lastDraw < frameDuration) return;

        lastDraw = now;
        render(now);
      };

      frame = requestAnimationFrame(draw);
    }

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vert);
      gl.deleteShader(frag);
    };
  }, []);

  return (
    <div
      className={cn(
        "relative h-full min-h-80 w-full overflow-hidden bg-gradient-to-b from-[#0e5f63] to-[#b8dfdc]",
        className,
      )}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
      />
      {children ? (
        <div className="relative z-10 flex h-full w-full items-center justify-center">
          {children}
        </div>
      ) : null}
    </div>
  );
};

export const CloudBackground = CloudShader;
export default CloudShader;
