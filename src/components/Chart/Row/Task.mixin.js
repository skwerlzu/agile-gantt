/**
 * @fileoverview Task mixin
 * @license MIT
 * @author Rafal Pospiech <neuronet.io@gmail.com>
 * @package AgileGantt
 */

export default {
  computed: {
	  zoom: {
        set(val) {
			this.root.state.options.times.timeZoom = val
		},
        get() {
          return this.root.state.options.times.timeZoom
        }
      },
    /**
     * Get view box
     *
     * @returns {string}
     */
    getViewBox() {
      const task = this.task;
      return `0 0 ${task.width} ${task.height}`;
    },

    /**
     * Get group transform
     *
     * @returns {string}
     */
    getGroupTransform() {
      return `translate(${this.task.x} ${this.task.y})`;
    },

    /**
     * Should we display expander?
     *
     * @returns {boolean}
     */
    displayExpander() {
      const expander = this.root.state.options.chart.expander;
      return expander.display || (expander.displayIfTaskListHidden && !this.root.state.options.taskList.display);
    }
  },
  methods: {
    /**
     * Emit event
     *
     * @param {string} eventName
     * @param {Event} event
     */
    emitEvent(eventName, event) {
      if (!this.root.state.options.scroll.scrolling) {
		   
        this.root.$emit(`chart-${this.task.type}-${eventName}`, { event, data: this.task });
		this.root.$emit(`action`, { event,task_type: this.task.type, action: eventName, data: this.task });
      }
    }
  }
};
