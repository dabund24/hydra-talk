<script lang="ts">
  // @ts-expect-error no types :/
  import { hydraCanvas, resetHydraCanvas, hydra } from '$lib/assets/hydra.svelte.ts';

  type Props = {
    isCurrentSlide: boolean;
    hydraCode: string;
  };

  const { isCurrentSlide, hydraCode }: Props = $props();

  let elementBeforeCanvas: HTMLElement;
  let error = $state('');
  $effect(() => {
    if (isCurrentSlide) {
      elementBeforeCanvas.parentElement?.insertBefore(hydraCanvas, elementBeforeCanvas);
      hush();
      resetHydraCanvas();
      try {
        eval(hydraCode.replaceAll("render", "hydra.synth.render"));
        error = '';
      } catch (e) {
				console.log(e)
        error = e as string;
      }
    }
  });
</script>

<div class="error" bind:this={elementBeforeCanvas}>{error}</div>

<style>
  :global(canvas) {
    height: 100%;
    width: 100%;
  }

  .error {
    position: fixed;
    left: 0;
    color: gray;
  }
</style>
