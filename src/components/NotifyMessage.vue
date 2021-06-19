<template>
  <div class="notify" :class="{ 'notify--active': showMessage }">
    <p>{{ text }}</p>
  </div>
</template>

<script>
export default {
  props: ['showMessage', 'text'],
};
</script>
