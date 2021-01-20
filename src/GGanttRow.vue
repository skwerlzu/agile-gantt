<template>
  <div
    class="g-gantt-row"
    ref="g-gantt-row"
	   id="g-gantt-row"
    :style="{ height: `${$parent.rowHeight}px` }"
    v-on="$listeners"
  >
    <div class="g-gantt-row-label" :style="rowLabelStyle">
      <slot name="label">
        <span class="font-weight-light">{{ label }}</span>
      </slot>
    </div>
    <div
      class="g-gantt-row-bars-container"
      ref="barContainer"
		 id="barContainer"
      :style="barsContainerStyle"
      @dragover="onDragover($event)"
      @drop="onDrop($event)"
      @mouseover="onMouseover()"
      @mouseleave="onMouseleave()"
    >
      <g-gantt-bar
        v-for="(bar, index) in barList"
				   v-if="inRange(bar)"
        :key="`ganttastic_bar_${index}`" 
		:chart-start="chartStart"
		:chart-end="chartEnd"
        :bar="bar"
        ref="ganttBar"
        :bar-start="barStart"
        :bar-end="barEnd"
        :bar-container="barContainer"
        :all-bars-in-row="bars"
        :min-per-drag-step="minPerDragStep"
				   :categories="categories"
      >
        <template #bar-label="{ bar }">
          <slot name="bar-label" :bar="bar" />
		
        </template>
      </g-gantt-bar>
    </div>
  </div>
</template>

<script>
import GGanttBar from "./GGanttBar.vue";
import moment from "moment";

export default {
  name: "GGanttRow",

  components: {
    GGanttBar,
  },

  props: {
	  
	  chartStart: null,
	  chartEnd: null,
    label: { type: String, default: "Row" },
    bars: { type: Array, default: () => {return []} },
    barStart: { type: String, required: true }, // property name of the bar objects that represents the start datetime
    barEnd: { type: String, required: true }, // property name of the bar objects that represents the end datetime,
    highlightOnHover: Boolean,
    minPerDragStep: { type: Number, default: 1 },
	  categories: {
      	 type: Array,
		  default: ()=>{ return []}
		}
  },

  inject: [
    "ganttChartProps",
    "getThemeColors",
    "getHourCount",
    "getChartStart",
    "getChartEnd",
  ],

  data() {
    return {
      barContainer: {},
    };
  },

  computed: {
	  barList(){
		 /* console.log('barlist',{
			  bars: this.bars ,
			  start: this.getChartStart(), 
			  end: this.getChartEnd()
		  }) */
		return this.bars  
	  },
    rowLabelStyle() {
      return {
        width: this.ganttChartProps.rowLabelWidth,
        height: this.ganttChartProps.rowHeight + 2,
        background: this.$parent.themeColors.ternary,
        color: this.$parent.themeColors.text,
		  "border-top": '1px solid #eaeaea',
		  "border-bottom": '1px solid #eaeaea'
      };
    },

    barsContainerStyle() {
      return {
        width: `${100 - this.ganttChartProps.rowLabelWidth.replace("%", "")}%`,
      };
    },
  },

  mounted() {
	 // console.log(this.$refs)
    this.barContainer = document.getElementById("barContainer").getBoundingClientRect();
    window.addEventListener("resize", this.onWindowResize);
  },

  methods: {
	  inRange(bar){
		  let chartStart = this.getChartStart()
		  let chartEnd = this.getChartEnd()
		  console.log({
			  bar: bar,
			  chartStart: this.getChartStart(),
			  chartEnd: this.getChartEnd(),
			  barStart: bar[this.barStart],
			  barEnd: bar[this.barEnd]
		  })
		  let good = (moment(bar[this.barStart]).isBetween(chartStart, chartEnd) || moment(bar[this.barEnd]).isBetween(chartStart, chartEnd))
		  console.log('good',good)
		return good
	  },
	  format(data){
		  if(!data){
			  data = new Date()
		  }
		  let date = moment(data).format('YYYY-MM-DD HH:mm:ss')
		 // console.log('format',data, date)
		return date
	  },
    onDragover(e) {
      e.preventDefault(); // enables dropping content on row
    },

    onDrop(e) {
      let barContainer = document.getElementById("barContainer").getBoundingClientRect();
      let xPos = e.clientX - barContainer.left;
      let hourDiffFromStart = (xPos / barContainer.width) * this.getHourCount();
      let time = moment(this.getChartStart()).add(hourDiffFromStart, "hours");
      let bar = this.bars.find((bar) =>
        time.isBetween(bar[this.barStart], bar[this.barEnd])
      );
      this.$emit("drop", {
        event: e,
        bar,
        time: time.format("YYYY-MM-DD HH:mm:ss"),
      });
    },

    onMouseover() {
      if (this.highlightOnHover) {
        document.getElementById("g-gantt-row").style.backgroundColor = this.getThemeColors().hoverHighlight;
      }
    },

    onMouseleave() {
      document.getElementById("g-gantt-row").style.backgroundColor = null;
    },

    onWindowResize() {
      // re-initialize the barContainer DOMRect variable, which will trigger re-rendering in the gantt bars
      this.barContainer = document.getElementById("barContainer").getBoundingClientRect();
    },
  },

  watch: {
	  
    "ganttChartProps.rowLabelWidth": function () {
      this.barContainer = document.getElementById("barContainer").getBoundingClientRect();
    },
  },
};
</script>

<style scoped>
.g-gantt-row {
  display: flex;
  width: 100%;
  height: auto !important;
  transition: background-color 0.2s;
}

.g-gantt-row > .g-gantt-row-label {
  display: flex;
  justify-content: left;
	padding: 10px;
  align-items: center;
  width: 20%;
  background: #e8e8e8;
  color: #424242;
  font-size: 0.9em;
  z-index: 3;
  overflow: hidden;
  font-weight: bold;
}

.g-gantt-row > .g-gantt-row-bars-container {
  position: relative;
  border-top: 1px solid #eaeaea;
  width: 70%;
  border-bottom: 1px solid #eaeaea;
}
</style>
