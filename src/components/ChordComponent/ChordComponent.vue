
<script>
/* eslint-disable no-unused-vars */
import { defineComponent } from '@vue/composition-api'
import * as d3 from "d3-selection"
import "./ChordComponent.scss"
import { computeDimensions, computeLayout } from "./layout"
import { init } from "../canvas"
import {
  drawArcs,
  drawLabels,
  drawChords,
  clearDrawing,
  ARC_CLASS_NAME,
  SUB_ARC_CLASS_NAME,
  CHORD_CLASS_NAME,
  ARC_LABEL_CLASS_NAME,
  SUB_ARC_LABEL_CLASS_NAME
} from "./drawing"
import { getScheme, stylize } from "./style"
import { attachEvent, detachEvent } from "./events"

export default {
  name: "chord-component",
  props: ['hierarchy','graph','drawingGroup', 'w','h','data', 'canvasId','colorScheme','onMouseOver','onMouseOut','onClickSubArc','onMouseOverFinish','onMouseOutFinis'
  ,'onClickFinish','currentLevelEntity','selectedEntities','entityLabelKey']
  ,
  methods: {
    _update(drawingGroup, w, h, props) {
      let { innerRadius, outerRadius } = computeDimensions(w, h)
      let graph = props.graph
      let scheme = getScheme(props.colorScheme)
      let layout = computeLayout({
        data: props.data,
        hierarchy: props.hierarchy,
        currentLevelEntity: props.currentLevelEntity,
        selectedEntities: props.selectedEntities,
        graph: props.graph,
        entityLabelKey: props.entityLabelKey,
        outerRadius: outerRadius
      })
      if (!layout) return
      layout = stylize(layout, scheme)
      // console.log('layout', layout)
      drawChords({
        selection: drawingGroup,
        data: layout.chords,
        className: CHORD_CLASS_NAME,
        w,
        h
      })
      // draw arcs
      drawArcs({
        selection: drawingGroup,
        data: layout.arcs,
        className: ARC_CLASS_NAME,
        w,
        h
      })
      // draw subarcs
      drawArcs({
        selection: drawingGroup,
        data: layout.subArcs,
        className: SUB_ARC_CLASS_NAME,
        w,
        h
      })
      // draw labels
      drawLabels({
        selection: drawingGroup,
        data: layout.arcLabels,
        className: ARC_LABEL_CLASS_NAME
      })
      drawLabels({
        selection: drawingGroup,
        data: layout.subArcLabels,
        className: SUB_ARC_LABEL_CLASS_NAME
      })
      // attach events to sub-arcs
      attachEvent({
        selection: d3.selectAll(`.${SUB_ARC_CLASS_NAME}`),
        onMouseOver: props.onMouseOver,
        onMouseOut: props.onMouseOut,
        onClick: props.onClickSubArc,
        onMouseOverDirection: props.onMouseOverDirection,
        graph,
        data: props.data,
        onMouseOverFinish: props.onMouseOverFinish,
        onMouseOutFinish: props.onMouseOutFinish,
        onClickFinish: props.onClickFinish
      })
    }
  },
  created() {
    this.w;
    this.h;
    this.drawingGroup;
  },
  mounted() {
    let props = this.props;
    let scheme = getScheme(props.colorScheme);
    let chordVis = d3.select(`#${this.canvasId}`);
    let { drawingGroup, w, h } = init(chordVis, scheme.background, {
      height: this.height,
      width: this.width
    });
    w = this.props.w;
    h = this.props.h;
    drawingGroup = this.props.drawingGroup;

    this._update(drawingGroup, w, h, this);
  },
  unmounted() {
    clearDrawing(this.drawingGroup);
  },
  updated(nextProps) {
    if (this.props.currentLevelEntity !== nextProps.currentLevelEntity ||
      this.props.selectedEntities !== nextProps.selectedEntities
  ) {

    this._update(this.drawingGroup, this.w, this.h, nextProps);
  }
  },
  render() {
    let scheme = getScheme(this.colorScheme);
    let canvas;
    let canvasId=this.props.canvasId
    if (!this.canvasId) {
      canvas = (<svg id={`xocesChordComponentCanvas`} ref={(el) => { canvasId = el && el.id; }}></svg>);
    } else {
      canvasId = this.props.canvasId;
    }

    return <div>{canvas}</div>
  }

}
</script>