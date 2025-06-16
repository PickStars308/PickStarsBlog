<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconClassName" fill="currentColor"/>
  </svg>
</template>
<script setup lang="ts">
import {computed} from 'vue';

const props = defineProps({
  iconName: {
    type: String,
    required: true
  },
  className: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: '#409eff'
  }
});

const iconClassName = computed(() => {
  return `#${props.iconName}`;
});

const svgClass = computed(() => {
  if (props.className) {
    return `svg-icon ${props.className}`;
  }
  return 'svg-icon';
});
</script>

<style scoped>
.svg-icon {
  width: 1.5em;
  height: 1.5em;
  position: relative;
  color: v-bind(color);
  vertical-align: -2px;
}
</style>