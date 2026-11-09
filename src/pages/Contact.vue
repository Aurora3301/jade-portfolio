<script setup lang="ts">
import { reactive } from 'vue'
const form = reactive({ name: '', email: '', subject: '', message: '' })
const send = () => {
  const subject = form.subject.trim() || 'Message from d.archivol site'
  const body = [`Name: ${form.name.trim()}`, `Email: ${form.email.trim()}`, '', form.message.trim()].join('\n')
  const href = `mailto:lxmngch.studio@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  window.location.href = href
}
</script>
<template>
  <main id="main" tabindex="-1" class="page contact-page">
    <h1>Contact</h1>
    <div class="contact-grid">
      <section class="contact-identity">
        <p class="contact-name">Jade L. / d.archivol</p>
        <div class="social-row">
          <a class="social-link" href="https://www.instagram.com/d.archivol/" target="_blank" rel="noreferrer noopener" aria-label="Instagram @d.archivol">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm0 2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H7zm11.2 1.3a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1zM12 8.2A3.8 3.8 0 1 1 12 15.8 3.8 3.8 0 0 1 12 8.2zm0 2a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6z"/></svg>
          </a>
          <a class="social-link" href="https://www.linkedin.com/in/jxdelxm/" target="_blank" rel="noreferrer noopener" aria-label="LinkedIn Jade L.">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6.5 9.5H4V20h2.5V9.5zM5.25 4A1.5 1.5 0 1 0 5.25 7a1.5 1.5 0 0 0 0-3zM20 20h-2.5v-5.6c0-1.8-.6-3-2.2-3-1.2 0-1.9.8-2.2 1.6-.1.3-.1.6-.1.9V20H10.5s.03-9.2 0-10.5H13v1.5c.3-.5 1.6-1.8 3.9-1.8 2.8 0 5.1 1.9 5.1 5.9V20z"/></svg>
          </a>
          <a class="social-link" href="mailto:lxmngch.studio@gmail.com" aria-label="Email lxmngch.studio@gmail.com">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zm0 2v.2l8 5.3 8-5.3V7H4zm16 10V9.4l-7.4 4.9a1.2 1.2 0 0 1-1.2 0L4 9.4V17h16z"/></svg>
          </a>
        </div>
      </section>
      <form class="mail-form" @submit.prevent="send">
        <h2>Send a message</h2>
        <label>Name <input v-model="form.name" name="name" type="text" required autocomplete="name"></label>
        <label>Your email <input v-model="form.email" name="email" type="email" required autocomplete="email"></label>
        <label>Subject <input v-model="form.subject" name="subject" type="text"></label>
        <label>Message <textarea v-model="form.message" name="message" rows="7" required></textarea></label>
        <button type="submit">Open email to send</button>
        <p class="form-note">This opens your mail app addressed to lxmngch.studio@gmail.com.</p>
      </form>
    </div>
  </main>
</template>
