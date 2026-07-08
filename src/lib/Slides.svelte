<script lang="ts">
  import Reveal from 'reveal.js';
  import Markdown from 'reveal.js/plugin/markdown';
  import Highlight from 'reveal.js/plugin/highlight';
  import Katex from 'svelte-katex';
  import { onMount } from 'svelte';

  import 'reveal.js/reveal.css';
  import 'reveal.js/theme/white.css';
  import 'reveal.js/plugin/highlight/monokai.css';
  import HydraSlideWithCode from '$lib/HydraSlideWithCode.svelte';
  import type { RevealApi } from 'reveal.js';
  import Slide from '$lib/Slide.svelte';
  import TitleSlide from '$lib/TitleSlide.svelte';
  import Micromoog from '$lib/assets/Micromoog.jpg';
  import synthesizerGraph from '$lib/assets/synthesizer-graph.png';
  import { matTwoByTwo, vecFour, vecTwo } from '$lib/katexMacros';
  import { javascript } from '@codemirror/lang-javascript';
  import { tomorrow } from 'thememirror';
  import CodeMirror from 'svelte-codemirror-editor';
  import { glsl } from '@nuskey8/codemirror-lang-glsl';

  let deck: RevealApi | undefined = $state(undefined);
  let currentSlide: HTMLElement | undefined = $state(undefined);
  onMount(() => {
    deck = new Reveal({
      hash: true,
      slideNumber: true,
      controlsBackArrows: 'hidden',
      controls: 'speaker-only',
      center: false,
      autoAnimate: false,
      transition: 'none',
      disableLayout: true,
      progress: false
    });
    deck.initialize({
      plugins: [Markdown, Highlight]
    });
    // @ts-expect-error currentSlide not typed
    deck.on('slidechanged', (e) => (currentSlide = e.currentSlide));
  });
</script>

<div class="reveal">
  <div class="slides">
    <TitleSlide
      title="Hydra: Code that You Can Watch"
      subTitle="Seminar: Musical Languages"
      author="Daniel Bund"
      date={new Temporal.PlainDate(2026, 7, 9)}
    />

    <HydraSlideWithCode
      {currentSlide}
      title="Whoa"
      initialText={`osc(40,0.2,1)
  .modulateScale(osc(40,0,1).kaleid(8))
  .repeat(2,4)
  .modulate(o0,0.05)
  .modulateKaleid(shape(4,0.1,1))
  .out(o0)`}
      fontSize="2rem"
      attribution="Puertas III; por Celeste Betancur; https://github.com/essteban; CC BY-NC-SA 4.0"
    />

    <HydraSlideWithCode
      {currentSlide}
      title="Whoa"
      initialText={`noise(18)
  .colorama(1)
  .posterize(2)
  .kaleid(50)
  .mask(
    shape(25, 0.25).modulateScale(
      noise(400.5, 0.5)
    )
  )
  .mask(shape(400, 1, 2.125))
  .modulateScale(osc(6, 0.125, 0.05).kaleid(50))
  .mult(osc(20, 0.05, 2.4).kaleid(50), 0.25)
  .scale(1.75, 0.65, 0.5)
  .modulate(noise(0.5))
  .saturate(6)
  .posterize(4, 0.2)
  .scale(1.5)
  .out()`}
      fontSize="2rem"
      attribution="ee_1 @eerie_ear EYE IN THE SKY; https://github.com/essteban; CC BY-NC-SA 4.0"
    />

    <HydraSlideWithCode
      {currentSlide}
      title="Whoa"
      initialText={`noise(3,0.1,7)
  .rotate(1,-1,-2).mask(shape(20))
  .colorama(0.5)
  .modulateScale(o0)
  .modulateScale(o0,1,)
  .blend(o0)
  .blend(o0)
  .blend(o0)
  .blend(o0)
  .out(o0)`}
      fontSize="2rem"
      attribution="Asdrúbal Gomez; CC BY-NC-SA 4.0"
    />
    <HydraSlideWithCode
      {currentSlide}
      title="Whoa"
      initialText={`voronoi(5,-0.1,5)
  .add(osc(1,0,1)).kaleid(21)
  .scale(1,1,1).colorama().out(o1)

src(o1).mult(src(s0).modulateRotate(o1,100), -0.5)
  .out(o0)`}
      fontSize="2rem"
      attribution="Happy Mandala; Abhinay Khoparzi; @khoparzi; CC BY-NC-SA 4.0"
    />

    <Slide
      {currentSlide}
      title="Synthesizers"
      attribution="Wikimedia Commons/Fataltourist~commonswiki"
    >
      <div class="flex-row">
        <img src={Micromoog} />
        <img src={synthesizerGraph} />
      </div>
    </Slide>

    <Slide {currentSlide} title="Types of Functions">
      <ul>
        <li>Source</li>
        <li>Modifications</li>
        <li>Output</li>
      </ul>
    </Slide>

    <HydraSlideWithCode
      title="Output"
      {currentSlide}
      initialText={`solid(1, 0, 0).out(o0)
//solid(0, 1, 0).out(o1)
//solid(0, 0, 1).out(o2)`}
    >
      <ul>
        <li>One Function: <code>out(buf)</code></li>
      </ul>
    </HydraSlideWithCode>

    <HydraSlideWithCode title="Sources" {currentSlide} initialText="//gradient(0).out()">
      <ul>
        <li><Katex>📐 \to 🎨\;</Katex></li>
        <li class="fragment">
          Examples:
          <ul>
            <li>
              <code>solid(r, g, b)</code>: <Katex
                >{vecTwo('x', 'y')}\mapsto{vecFour('r', 'g', 'b', '1')}</Katex
              >
            </li>
            <li>
              <code>gradient(speed)</code>: <Katex
                >{vecTwo('x', 'y')}\mapsto{vecFour(
                  'x',
                  'y',
                  '\\sin(\\mathrm{t}\\cdot\\mathrm{speed})',
                  '1'
                )}
              </Katex>
            </li>
          </ul>
        </li>
      </ul>
    </HydraSlideWithCode>

    <HydraSlideWithCode
      title="External Sources"
      {currentSlide}
      initialText={`gradient(0).out(o1)
src(o1).out(o0)`}
    >
      <div><code>src(buf)</code> allows using:</div>
      <ul>
        <li class="blue">Output buffers</li>
        <li>Images</li>
        <li>Videos</li>
        <li>Your screen</li>
        <li>Your camera</li>
      </ul>
    </HydraSlideWithCode>
    <HydraSlideWithCode
      title="External Sources"
      {currentSlide}
      attribution="Wikimedia Commons/Fataltourist~commonswiki"
      initialText={`s0.initImage("Micromoog.jpg")
src(s0).out(o0)`}
    >
      <div><code>src(buf)</code> allows using:</div>
      <ul>
        <li>Output buffers</li>
        <li class="blue">Images</li>
        <li>Videos</li>
        <li>Your screen</li>
        <li>Your camera</li>
      </ul>
    </HydraSlideWithCode>
    <HydraSlideWithCode
      title="External Sources"
      {currentSlide}
      attribution="You know where this is from"
      initialText={`s0.initVideo("haha.mp4")
src(s0).out(o0)`}
    >
      <div><code>src(buf)</code> allows using:</div>
      <ul>
        <li>Output buffers</li>
        <li>Images</li>
        <li class="blue">Videos</li>
        <li>Your screen</li>
        <li>Your camera</li>
      </ul>
    </HydraSlideWithCode>
    <HydraSlideWithCode
      title="External Sources"
      {currentSlide}
      initialText={`//s0.initScreen()
src(s0).out(o0)`}
    >
      <div><code>src(buf)</code> allows using:</div>
      <ul>
        <li>Output buffers</li>
        <li>Images</li>
        <li>Videos</li>
        <li class="blue">Your screen</li>
        <li>Your camera</li>
      </ul>
    </HydraSlideWithCode>
    <HydraSlideWithCode
      title="External Sources"
      {currentSlide}
      initialText={`s0.initCam()
src(s0).out(o0)`}
    >
      <div><code>src(buf)</code> allows using:</div>
      <ul>
        <li>Output buffers</li>
        <li>Images</li>
        <li>Videos</li>
        <li>Your screen</li>
        <li class="blue">Your camera</li>
      </ul>
    </HydraSlideWithCode>

    <Slide {currentSlide} title="Types of Functions">
      <ul>
        <li>Source: <Katex>📐\to🎨\;</Katex></li>
        <li>
          Modifications
          <ul class="fragment">
            <li>Color Transform</li>
            <li>Geometry Transform</li>
            <li>Blending</li>
            <li>Modulation</li>
          </ul>
        </li>
        <li>Output</li>
      </ul>
    </Slide>

    <HydraSlideWithCode
      title="Color Transforms"
      {currentSlide}
      initialText={`osc(60, 0.1, Math.PI * 2 / 3)
  //.brightness(0.5)
  .out()`}
    >
      <ul>
        <li><Katex>🎨\to🎨\;</Katex></li>
        <li class="fragment">
          Example:
          <ul>
            <li>
              <code>brightness(amount)</code>:<br />
              <Katex
                >{vecFour('r', 'g', 'b', 'a')}\mapsto{vecFour(
                  'r + \\mathrm{amount}',
                  'g + \\mathrm{amount}',
                  'b + \\mathrm{amount}',
                  '1'
                )}</Katex
              >
            </li>
          </ul>
        </li>
      </ul>
    </HydraSlideWithCode>
    <HydraSlideWithCode
      title="Geometry Transforms"
      {currentSlide}
      initialText={`osc(60, 0.1, Math.PI * 2 / 3)
  //.rotate(Math.PI / 2)
  .out()`}
    >
      <ul>
        <li><Katex>📐\to📐\;</Katex></li>
        <li class="fragment">
          Example:
          <ul>
            <li>
              <code>rotate(ɑ)</code>:<br />
              <Katex
                >{vecTwo('x', 'y')}\mapsto{matTwoByTwo(
                  '\\cos(\\alpha)',
                  '\\sin(\\alpha)',
                  '-\\sin(\\alpha)',
                  '\\cos(\\alpha)'
                )}</Katex
              >
            </li>
          </ul>
        </li>
      </ul>
    </HydraSlideWithCode>
    <HydraSlideWithCode
      title="Blendings"
      {currentSlide}
      initialText={`osc(40, 0.1, 0).out(o0)
gradient(0).out(o1)
//src(o1).blend(src(o0)).out(o2)
//src(o1).mask(src(o0)).out(o3)
render()`}
    >
      <ul>
        <li><Katex>🎨\times🎨\to🎨\;</Katex></li>
        <li class="fragment">
          Example:
          <ul>
            <li>
              <code>blend(buf)</code>:<br />
              <Katex>
                {vecFour('r_0', 'g_0', 'b_0', 'a_0')},{vecFour('r_1', 'g_1', 'b_1', 'a_1')}\mapsto
                {'\\frac{1}{2}\\cdot' + vecFour('r_0 + r_1', 'g_0 + g_1', 'b_0 + b_1', 'a_0 + a_1')}
              </Katex>
            </li>
          </ul>
        </li>
      </ul>
    </HydraSlideWithCode>
    <HydraSlideWithCode
      title="Modulations"
      {currentSlide}
      fontSize="2rem"
      initialText={`osc(40, 0.1, 0).out(o0)
gradient(0).out(o1)
//src(o0).modulateRotate(src(o1), 2).out(o2)
//src(o2).modulate(src(o1), 3).out(o3)
render()`}
    >
      <ul>
        <li><Katex>📐\times🎨\to📐\;</Katex></li>
        <li class="fragment">
          Example:
          <ul>
            <li>
              <code>modulate(buf, amount)</code>:<br />
              <Katex>
                {vecTwo('x_0', 'y_0')},{vecFour('r_1', 'g_1', 'b_1', 'a_1')}\mapsto
                {vecTwo('x_0', 'y_0')} + \mathrm{'{amount}'} \cdot {vecTwo('r_1', 'g_1')}
              </Katex>
            </li>
          </ul>
        </li>
      </ul>
    </HydraSlideWithCode>

    <Slide {currentSlide} title="Types of Functions">
      <ul>
        <li>Source<Katex>:📐\to🎨</Katex></li>
        <li>
          Modifications
          <ul>
            <li>Color Transform<Katex>:🎨\to🎨</Katex></li>
            <li>Geometry Transform<Katex>:📐\to📐</Katex></li>
            <li>Blending<Katex>:🎨\times🎨\to🎨</Katex></li>
            <li>Modulation<Katex>:📐\times🎨\to📐</Katex></li>
          </ul>
        </li>
        <li>Output</li>
      </ul>
    </Slide>

    <HydraSlideWithCode
      title="Dynamic Inputs"
      {currentSlide}
      fontSize="1.9rem"
      initialText={`//a.setBins(4)
//solid(()=>a.fft[0],()=>a.fft[0],()=>a.fft[0])
//  .out(o0)
//solid(()=>a.fft[1],()=>a.fft[1],()=>a.fft[1])
//  .out(o1)
//solid(()=>a.fft[2],()=>a.fft[2],()=>a.fft[2])
//  .out(o2)
//solid(()=>a.fft[3],()=>a.fft[3],()=>a.fft[3])
//  .out(o3)
//render()`}
    >
      <ul>
        <li>Pass <i>functions</i> instead of numeric literals</li>
        <li>Can be used to process audio</li>
      </ul>
    </HydraSlideWithCode>

    <Slide title="Compilation">
      <div class="flex-row" style="justify-content: space-between">
        <div>
          <ul>
            <li>Hydra is compiled to GLSL</li>
            <li>Example:</li>
          </ul>
          <div style="font-size: 2.5rem">
            <CodeMirror
              value={`gradient(0.5)
  .brightness(() => 0.5)
  .out(o0)`}
              lineWrapping={true}
              lang={javascript()}
              theme={tomorrow}
              foldGutter={false}
              syntaxHighlighting={true}
              crosshairCursor={{}}
            />
          </div>
        </div>
        <div style="font-size: 1.5rem">
          <CodeMirror
            value={`precision mediump float;
uniform float speed0;
uniform float time;
uniform vec2 resolution;

// some unused functions and variables

vec4 gradient(vec2 _st, float speed) {
  return vec4(_st, sin(time*speed), 1.0);
}

vec4 brightness(vec4 _c0, float amount) {
  return vec4(_c0.rgb + vec3(amount), _c0.a);
}

void main() {
  vec2 st = gl_FragCoord.xy/resolution.xy;
  vec4 c = gradient(st, speed0);
  c = brightness(c, 0.5);
  gl_FragColor = c;
}`}
            lineWrapping={true}
            lang={glsl()}
            theme={tomorrow}
            foldGutter={false}
            syntaxHighlighting={true}
            crosshairCursor={{}}
          />
        </div>
      </div>
    </Slide>

    <HydraSlideWithCode
      title="Extending Hydra"
      {currentSlide}
      attribution="TODO"
      fontSize="1.5rem"
      initialText={`setFunction({
  name: 'iSpiral',
  type: 'src',
  inputs: [
    {type: 'float', name: 'freq', default: 1.0},
    {type: 'float', name: 'a', default: 3.0},
    {type: 'float', name: 'b', default: 1.0},
  ],
  glsl:\`
    _st = _st*2.0 - 1.0;
    float x = _st.x;
    float y = _st.y;
    float r = length(_st);
    float theta = atan(y/x);
    float u = r -a*exp(theta*(1.0/tan(b)));
    u = fract(u-freq*time);
    return vec4(u, u, u, 1.0);\`
})

iSpiral().out()`}
    ></HydraSlideWithCode>

    <Slide title="Thank You!">
      <div>Some nice tools:</div>
      <ul>
        <li>Hydra</li>
        <li>Svelte</li>
        <li>Reveal.js</li>
        <li>Codemirror</li>
        <li><Katex>\KaTeX{'{}'}</Katex></li>
      </ul>
    </Slide>
  </div>
</div>

<style>
</style>
