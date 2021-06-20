<template>
<div class="cart__error form__error-block">
  <h4>Заявка не отправлена!</h4>
  <p>
    {{ errorMessage }}
  </p>
</div>
</template>

<script>
export default {
  name: 'ErrorOrder',

  props: ['errorMessage'],
};
</script>
