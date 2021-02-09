<!--
/**
 * @fileoverview Milestone component
 * @license MIT
 * @author Rafal Pospiech <neuronet.io@gmail.com>
 * @package AgileGantt
 */
-->
<template>
  <g
    class="agile-gantt__chart-row-bar-wrapper agile-gantt__chart-row-milestone-wrapper"
    :style="{
      ...root.style['chart-row-bar-wrapper'],
      ...root.style['chart-row-milestone-wrapper'],
      ...task.style['chart-row-bar-wrapper']
    }"
  >
    <foreignObject
      class="agile-gantt__chart-expander agile-gantt__chart-expander--milestone"
      :style="{
        ...root.style['chart-expander'],
        ...root.style['chart-expander--milestone'],
        ...task.style['chart-expander']
      }"
      :x="task.x - root.state.options.chart.expander.offset - root.state.options.chart.expander.size"
      :y="task.y + (root.state.options.row.height - root.state.options.chart.expander.size) / 2"
      :width="root.state.options.chart.expander.size"
      :height="root.state.options.chart.expander.size"
      v-if="displayExpander"
    >
      <expander :tasks="[task]" :options="root.state.options.chart.expander" type="chart"></expander>
    </foreignObject>
	  <foreignObject
      class=""
    	style="overflow: visible"
      :x="task.x + 15 "
      :y="task.y"
      :width="task.width > 300 ? task.width : 300"
      :height="(task.height - (task.height / 10))"
				 
    >
	<div class="gantt-test">  
			
		<span v-for="user in task.user"  :key="task.id+'chart-avatar'"><UserAvatar   style="display: inline"   :user_data="user" :show_menu="false" :params="{size: task.height, badge: false}" /></span>
			<span style="max-width: 150px"><v-chip
      class="text-truncate"
      dark
      color="#3333336e"
						  style="border-color: rgb(255 255 255);
    border: solid 1px;"
						  small
    >
      
      {{task.label}}
    </v-chip></span> 
		</div>
    </foreignObject>
    <svg
      class="agile-gantt__chart-row-bar agile-gantt__chart-row-milestone"
      :style="{ ...root.style['chart-row-bar'], ...root.style['chart-row-milestone'], ...task.style['chart-row-bar'] }"
      :x="task.x"
      :y="task.y"
      :width="task.width"
      :height="task.height"
      :viewBox="`0 0 ${task.width} ${task.height}`"
      @click="emitEvent('click', $event)"
      @mouseenter="emitEvent('mouseenter', $event)"
      @mouseover="emitEvent('mouseover', $event)"
      @mouseout="emitEvent('mouseout', $event)"
      @mousemove="emitEvent('mousemove', $event)"
      @mousedown="emitEvent('mousedown', $event)"
      @mouseup="emitEvent('mouseup', $event)"
      @mousewheel="emitEvent('mousewheel', $event)"
      @touchstart="emitEvent('touchstart', $event)"
      @touchmove="emitEvent('touchmove', $event)"
      @touchend="emitEvent('touchend', $event)"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath :id="clipPathId">
          <polygon :points="getPoints"></polygon>
        </clipPath>
      </defs>
      <polygon
        class="agile-gantt__chart-row-bar-polygon agile-gantt__chart-row-milestone-polygon"
        :style="{
          ...root.style['chart-row-bar-polygon'],
          ...root.style['chart-row-milestone-polygon'],
          ...task.style['base'],
          ...task.style['chart-row-bar-polygon']
        }"
        :points="getPoints"
      ></polygon>
      <progress-bar :task="task" :clip-path="'url(#' + clipPathId + ')'"></progress-bar>
    </svg>
    <!-- <chart-text :task="task" v-if="root.state.options.chart.text.display"></chart-text> -->
  </g>
</template>

<script>
import ChartText from '../Text.vue';
import ProgressBar from '../ProgressBar.vue';
import Expander from '../../Expander.vue';
import taskMixin from './Task.mixin.js';
export default {
  name: 'Milestone',
  components: {
    ChartText,
    ProgressBar,
    Expander
  },
  inject: ['root'],
  props: ['task'],
  mixins: [taskMixin],
  data() {
    return {};
  },
  computed: {
    /**
     * Get clip path id
     *
     * @returns {string}
     */
    clipPathId() {
      return 'agile-gantt__milestone-clip-path-' + this.task.id;
    },

    /**
     * Get points
     *
     * @returns {string}
     */
    getPoints() {
      const task = this.task;
		console.log('getPoints: milestones',task)
      const fifty = task.height / 2;
      let offset = fifty;
      if (task.width / 2 - offset < 0) {
        offset = task.width / 2;
      }
		let return_data = `0,${fifty}
        ${offset},0
        ${task.width - offset},0
        ${task.width},${fifty}
        ${task.width - offset},${task.height}
        ${offset},${task.height}`
		//console.log('return_data',return_data)
      return return_data;
    }
  }
};
</script>
