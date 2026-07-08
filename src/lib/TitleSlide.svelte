<script lang="ts">
  type Props = {
    title: string;
    subTitle: string;
    author: string;
    date: Temporal.PlainDate;
  };

  const { title, subTitle, author, date }: Props = $props();
</script>

<section class="title-slide">
  <header>
    <h1>{title}</h1>
    {subTitle}
  </header>
  <p>
    <b>{author}</b>
    <br />
    {date.toLocaleString('en', { dateStyle: 'long' })}
  </p>
  <br />
</section>

<style>
  section {
    top: calc(1.5 * var(--slide-margin));
  }
</style>
