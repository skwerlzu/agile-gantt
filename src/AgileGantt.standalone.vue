<!--
/**
 * @fileoverview AgileGantt standalone version component
 * @license MIT
 * @author Rafal Pospiech <neuronet.io@gmail.com>
 * @package
 */
-->
<template>
  <agile-gantt :tasks="tasks" :options="options" :dynamicStyle="dynamicStyle">
    <component v-if="components.header" :is="components.header" slot="header"></component>
    <component v-if="components.footer" :is="components.footer" slot="footer"></component>
  </agile-gantt>
</template>
<script>
import Vue from 'vue';
import AgileGantt from './AgileGantt.vue';
export default {
  name: 'AgileGanttStandalone',
  components: {
    'agile-gantt': AgileGantt
  },
  props: ['header', 'footer'],
  data: {
    components: {},
    tasks: [],
    options: {},
    dynamicStyle: {}
  }
};
</script>
