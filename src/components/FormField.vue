<template>
  <label class="form__label">
    <FieldInput
      v-show="formElement === 'input'"
      :type="type"
      :placeholder="placeholder"
      v-model="dataInput"
    />

    <FieldTextarea
      v-show="formElement === 'textaria'"
      :placeholder="placeholder"
      v-model="dataInput"
    />

    <span class="form__value">{{ label }}</span>

    <ErrorField v-if="errorText" :error="errorText"/>
  </label>
</template>

<script>
import FieldInput from '@/components/FieldInput.vue';
import ErrorField from '@/components/ErrorField.vue';
import FieldTextarea from '@/components/FieldTextarea.vue';

export default {
  name: 'FormField',

  props: ['formElement', 'label', 'placeholder', 'type', 'value', 'errorText'],

  computed: {
    dataInput: {
      get() {
        return this.value;
      },
      set(value) {
        return this.$emit('input', value);
      },
    },
  },

  components: {
    FieldInput,
    ErrorField,
    FieldTextarea,
  },
};
</script>
