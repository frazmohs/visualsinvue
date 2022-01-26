<script>
/* eslint-disable no-unused-vars */
import * as d3 from "d3-selection"
import "./TreeComponent.scss"
import { computeLayout } from "./layout"
import { getScheme, stylize } from "./style"
import { NODE_CLASS, drawNodes, drawEdges, clearDrawing } from "./drawing"
import { attachEvent, detachEvent } from "./events"
import { init } from "../canvas"

// export component
export default {
  name: "tree-component",
  props:['data', 'canvasId','onMouseOver','onMouseOut','onClickSubArc','onMouseOverFinish','onMouseOutFinis'
  ,'onClickFinish'],
  methods: {
    _update(drawingGroup, w, h, props) {
      let scheme = getScheme(props.colorScheme)
      let graph = props.graph
      let layout = computeLayout({
        nodes: props.nodes,
        nodeLabelKey: props.nodeLabelKey,
        entityLabelKey: props.entityLabelKey,
        data: props.data,
        graph: props.graph,
        width: w,
        height: h
      })
      // console.log('number of nodes in TreeComponent', layout.nodes, layout.nodes.length)
      layout = stylize(layout, scheme, props)
      drawEdges({
        selection: drawingGroup,
        data: layout.edges
      })
      drawNodes({
        selection: drawingGroup,
        data: layout.nodes
      })
      // attach events to sub-arcs
      attachEvent({
        selection: d3.selectAll(`.${NODE_CLASS}`),
        onMouseOver: props.onMouseOver,
        onMouseOut: props.onMouseOut,
        onClick: props.onClickSubArc,
        graph,
        data: props.data,
        onMouseOverFinish: props.onMouseOverFinish,
        onMouseOutFinish: props.onMouseOutFinish,
        onClickFinish: props.onClickFinish
      })
  },
  mounted() {
    // console.log('componentDidMount in TreeComponent', this.canvasId)
    let props = this.props
    let scheme = getScheme(props.colorScheme)
    // console.log('TreeComponent canvasId', this.canvasId)
    let visEl = d3.select(`#${this.canvasId}`)
    let { drawingGroup, w, h } = init(visEl, scheme.background, {
      height: this.height,
      width: this.width
    })
    this.w = w
    this.h = h
    this.drawingGroup = drawingGroup
    this.visEl = visEl
    this._update(visEl, w, h, this)
  },
  unmounted() {
    // console.log('unmounting tree', this.visEl);
    clearDrawing(this.visEl)
  },
  render() {
    let scheme = getScheme(this.props.colorScheme)
    let canvasId;

    let canvas;
    if (!this.props.canvasId) {
      canvas = (<svg id={`xocesChordComponentCanvas`} ref={(el) => { canvasId = el && el.id; }}></svg>)
    } else {
      canvasId = this.props.canvasId
    }

    return (
      <div>
        {canvas}
      </div>
    )
  }
}
}
</script>