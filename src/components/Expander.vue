<!--
/**
 * @fileoverview Expander component
 * @license MIT
 * @author Rafal Pospiech <neuronet.io@gmail.com>
 * @package AgileGantt
 */
-->
<template>
  <div :class="getClassPrefix() + '-wrapper'" :style="{ ...root.style[getClassPrefix(false) + '-wrapper'], ...style }">
    <svg
      :class="getClassPrefix() + '-content'"
      :style="{ ...root.style[getClassPrefix(false) + '-content'] }"
      :width="options.size"
      :height="options.size"
      v-if="allChildren.length"
      @click="toggle"
    >
      <rect
        :class="getClassPrefix() + '-border'"
        :style="{ ...root.style[getClassPrefix(false) + '-border'], ...borderStyle }"
        :x="border ? border : 10"
        :y="border ? border : 10"
        :width="options.size ? options.size - border * 2 : 4"
        :height="options.size ? options.size - border * 2 : 4"
        rx="2"
        ry="2"
      ></rect>
      <line
        :class="getClassPrefix() + '-line'"
        :style="{ ...root.style[getClassPrefix(false) + '-line'] }"
        v-if="allChildren.length"
        :x1="lineOffset"
        :y1="options.size / 2"
        :x2="options.size - lineOffset"
        :y2="options.size / 2"
      ></line>
      <line
        :class="getClassPrefix() + '-line'"
        :style="{ ...root.style[getClassPrefix(false) + '-line'] }"
        v-if="collapsed"
        :x1="options.size / 2"
        :y1="lineOffset"
        :x2="options.size / 2"
        :y2="options.size - lineOffset"
      ></line>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'Expander',
  inject: ['root'],
  props: ['tasks', 'options', 'type'],
  data() {
    const border = 0.5;
    return {
      border,
      borderStyle: {
        'stroke-width': border
      },
      lineOffset: 5
    };
  },
  computed: {
    style() {
      if (this.type !== 'taskList') {
        return {};
      }
      const margin = this.root.state.options.taskList.expander.margin;
      const padding = this.tasks[0].parents.length * this.root.state.options.taskList.expander.padding;
      return {
        'padding-left': padding + margin + 'px',
        margin: 'auto 0'
      };
    },
    /**
     * Get all tasks
     *
     * @returns {array}
     */
    allChildren() {
      const children = [];
      this.tasks.forEach(task => {
        task.allChildren.forEach(childId => {
          children.push(childId);
        });
      });
      return children;
    },
    /**
     * Is current expander collapsed?
     *
     * @returns {boolean}
     */
    collapsed() {
      if (this.tasks.length === 0) {
        return false;
      }
      let collapsed = 0;
      for (let i = 0, len = this.tasks.length; i < len; i++) {
        if (this.tasks[i].collapsed) {
          collapsed++;
        }
      }
      return collapsed === this.tasks.length;
    }
  },
  methods: {
	   emitEvent(eventName, event) {
		//   console.log('time.zoom',this.root.state.options.times.timeZoom)
      if (!this.root.state.options.scroll.scrolling) {
		this.root.$emit(`action`, { event,task_type: 'expander', action: eventName, data: this.task });
      }
    },
    /**
     * Get specific class prefix
     *
     * @returns {string}
     */
    getClassPrefix(full = true) {
      return `${full ? 'agile-gantt__' : ''}${this.options.type}-expander`;
    },
    /**
     * Toggle expander
     */
    toggle() {
      if (this.tasks.length === 0) {
        return;
      }
      const collapsed = !this.collapsed;
		this.root.$emit(`action`, { event: 'click',task_type: 'expander', action: 'collapse', data: collapsed });
      this.tasks.forEach(task => {
        task.collapsed = collapsed;
		  
      });
    }
  }
};
</script>
