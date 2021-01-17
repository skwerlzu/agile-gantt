/**
 * @fileoverview Bundle main entry file
 * @license MIT
 * @author Rafal Pospiech <neuronet.io@gmail.com>
 * @package AgileGanttStandalone
 */
import Vue from 'vue';
import { mergeDeep } from './AgileGantt.vue';
import AgileGanttStandalone from './AgileGantt.standalone.vue';

window.AgileGantt = {
  component: AgileGanttStandalone,
  mount(config) {
    const ready = typeof config.ready === 'function' ? config.ready : () => {};
    const cfg = mergeDeep({}, config);
    if (typeof cfg.dynamicStyle === 'undefined') {
      cfg.dynamicStyle = {};
    }
    const ganttElastic = { ...AgileGanttStandalone };
    for (let prop in cfg) {
      if (['el', 'ready'].includes(prop)) {
        continue;
      }
      if (typeof ganttElastic[prop] !== 'undefined') {
        ganttElastic[prop] = { ...ganttElastic[prop], ...cfg[prop] };
        continue;
      }
      ganttElastic[prop] = cfg[prop];
    }
    return new Vue(ganttElastic).$on('agile-gantt-ready', ready).$mount(cfg.el);
  }
};
export default AgileGanttStandalone;
