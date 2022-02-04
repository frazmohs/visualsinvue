<script>
import * as d3 from "d3-selection"
import _ from "lodash"
import TreeComponent from "../../components/TreeComponent/"

// export component
export default {
  name: "tree-widget",
  components: { TreeComponent },
   props: ['hierarchy','relationship','graph','drawingGroup','data', 'canvasId','colorScheme','onMouseOver','onMouseOut','onClickSubArc','onMouseOverFinish','onMouseOutFinis'
  ,'onClickFinish','currentLevelEntity','selectedEntities','entityLabelKey'],
  render() {
    return (
      <div class="xoces-widget">
        <tree-component {...this} nodes={this.data.entities} />
      </div>
    )
  }
}
</script>