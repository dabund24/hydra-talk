<script lang="ts">
  import type { Snippet } from 'svelte';

  type Props = {
    currentSlide?: HTMLElement | undefined;
    title?: string;
    children: Snippet<[boolean]>;
    attribution?: string
  };

  const { currentSlide, title = '', children, attribution }: Props = $props();

  let slideElement: HTMLElement | undefined = $state(undefined);

  const isCurrent = $derived(slideElement !== undefined && currentSlide === slideElement);
</script>

<section bind:this={slideElement} data-notes="Something important">
  <h2>{title}</h2>
  {@render children(isCurrent)}
  {#if attribution !== undefined}
    <small>Attribution: {attribution}</small>
  {/if}
</section>

<style>
  section {
    max-height: 100%;
    height: 100%;
  }
  small {
    position: fixed;
    top: 100%;
    color: gray;
  }
</style>
