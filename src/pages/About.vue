<script setup lang="ts">
const posts = [
  { href: 'https://www.instagram.com/reel/DfW1eKqSjqO/', embed: 'https://www.instagram.com/reel/DfW1eKqSjqO/embed', label: 'd.archivol reel' },
  { href: 'https://www.instagram.com/p/DZj-pK9CNsP/', embed: 'https://www.instagram.com/p/DZj-pK9CNsP/embed', label: 'd.archivol post' },
  { href: 'https://www.instagram.com/p/C5eJkWShx-a/', embed: 'https://www.instagram.com/p/C5eJkWShx-a/embed', label: 'd.archivol post' },
]
</script>
<template>
  <main id="main" tabindex="-1" class="page about-page">
    <h1>About me</h1>
    <div class="about-copy">
      <p>I’m a multidisciplinary creative designer interested in the stories, rituals and behaviours about food and culture.</p>
      <p>My practice ranging from immersive worlds and dining experiences to cultural branding and communication design. They're often brought to life through experience, visual identity, storytelling and graphic design. I’m particularly interested in how design can make something unfamiliar feel approachable, and how an idea can become something people can see, touch, taste or take part in.</p>
      <p>Food is often my starting point because it is more than flavour. It carries memory, identity, tradition and connection. I use research and creative experimentation to uncover these layers, then translate them into experiences and visual languages that people can engage with intuitively.</p>
      <p>My work ranges from self-initiated design research to real-world creative projects, including immersive experience, branding, art direction and visual communication.</p>
      <p>Currently based in London, and open to collaborations, freelance projects and opportunities across experience, culture, food and creative industries.</p>
    </div>
    <section class="ig-feed" aria-labelledby="ig-heading">
      <h2 id="ig-heading">From Instagram</h2>
      <p class="ig-lead"><a href="https://www.instagram.com/d.archivol/" target="_blank" rel="noreferrer noopener">@d.archivol</a></p>
      <div class="ig-grid">
        <article v-for="post in posts" :key="post.embed" class="ig-card">
          <iframe :src="post.embed" :title="post.label" loading="lazy" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture" allowtransparency="true"></iframe>
          <a class="ig-open" :href="post.href" target="_blank" rel="noreferrer noopener">Open on Instagram ↗</a>
        </article>
      </div>
    </section>
  </main>
</template>
