<script lang="ts">
  import CodeMirror from 'svelte-codemirror-editor';
  import { javascript } from '@codemirror/lang-javascript';
  import Hydra from '$lib/Hydra.svelte';
  import { tomorrow } from 'thememirror';
  import type { ComponentProps, Snippet } from 'svelte';
  import Slide from '$lib/Slide.svelte';

  type Props = {
    initialText: string;
    fontSize?: string;
    children?: Snippet<[]>;
  } & Omit<ComponentProps<typeof Slide>, 'children'>;

  let {
    currentSlide,
    title,
    initialText = $bindable(),
    fontSize = 'inherit',
    attribution,
    children
  }: Props = $props();
</script>

{#snippet slideContent(isCurrentSlide: boolean)}
  <div class="container">
    <div class="left-column">
      {#if children !== undefined}
        <div class="slide-content">
          {@render children()}
        </div>
      {/if}
      <div class="code-mirror-outer-container" style:font-size={fontSize}>
        <div class="code-mirror-container">
          <CodeMirror
            bind:value={initialText}
            lineWrapping={true}
            lang={javascript()}
            theme={tomorrow}
            foldGutter={false}
            syntaxHighlighting={true}
            crosshairCursor={{}}
          />
        </div>
      </div>
    </div>
    <div class="hydra-container">
      <Hydra {isCurrentSlide} hydraCode={initialText} />
    </div>
  </div>
{/snippet}

<Slide {currentSlide} {title} children={slideContent} {attribution} />

<style>
  .left-column {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }

  .slide-content {
    padding: 1rem 0;
  }

  .container {
    height: calc(100cqh - 7rem);
    width: 100cqw;
    position: absolute;
    top: 0;
    margin: 6rem 0 1rem;
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    overflow: visible;
  }

  .code-mirror-outer-container {
    overflow: scroll;
    width: calc(100cqw - 100cqh + 5rem);
    display: flex;
    max-height: 100%;
    height: 100%;
    align-items: end;
  }

  .code-mirror-container {
    overflow: visible;
    max-height: 100%;
    width: 100%;
  }

  .hydra-container {
    aspect-ratio: 1;
  }

  :global {
    .cm-activeLine,
    .cm-activeLineGutter {
      background-color: transparent !important;
    }
  }
</style>
