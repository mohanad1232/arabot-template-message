<template>
  <div class="container mx-auto">
    <TemplateMessage />
  </div>
</template>

<script>
import TemplateMessage from './components/TemplateMessage.vue';

export default {
  name: 'App',
  components: {
    TemplateMessage
  }
};
</script>

<style>
body {
  background-color: #F8F9FA;
}
</style>