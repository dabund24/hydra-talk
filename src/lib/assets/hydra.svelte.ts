import Hydra from 'hydra-synth';

export const hydraCanvas = document.createElement('canvas');

document.querySelector('body')!.append(hydraCanvas);
const hydra: unknown = new Hydra({
  canvas: hydraCanvas,
  makeGlobal: true,
  width: 1080,
  height: 1080
});

hydra.setResolution(1080, 1080);

export function resetHydraCanvas() {
  hydra._initCanvas(hydraCanvas);
}
