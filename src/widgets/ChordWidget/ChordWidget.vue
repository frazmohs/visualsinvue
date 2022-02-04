<script>
import * as d3 from "d3-selection"
import _ from "lodash"
import BreadcrumbsNav from "../../components/BreadcrumbsNav"
import HierarchicalListSearch from "../../components/HierarchicalListSearch"
import ChordComponent from "../../components/ChordComponent"
import graphProvider from "../../components/graph/"

// export component
export default {
  name: "chord-widget",
   props: ['hierarchy','relationship','graph','drawingGroup','data', 'canvasId','colorScheme','onMouseOver','onMouseOut','onClickSubArc','onMouseOverFinish','onMouseOutFinis'
  ,'onClickFinish','currentLevelEntity','selectedEntities','entityLabelKey'],
  created() {
    this.w
    this.h
  },
  components: { BreadcrumbsNav, ChordComponent, HierarchicalListSearch },
  render() {
    let graph = graphProvider(this.props.relationship)
   return (
      <div class="xoces-widget">
        <breadcrumbs-nav
          breadcrumbs={this.props.breadcrumbs}
          schemeName={this.props.colorScheme}
          entityLabelKey={this.props.entityLabelKey}
          hierarchy={this.props.hierarchy}
          view={this.props.view}
          onClickBreadcrumb={this.props.onClickBreadcrumb}
          onChangeView={this.props.onChangeView}
        />

        <div class="">
          <div class="medium-9 columns no-left-padding no-right-padding">
            {component}
          </div>
          <div class="medium-3 columns no-left-padding no-right-padding">
            <hierarchical-list-search
              schemeName={this.props.colorScheme}
              height={this.props.height}
              hierarchy={this.props.hierarchy}
              currentLevelEntity={this.props.currentLevelEntity}
              data={this.props.data}
              entityLabelKey={this.props.entityLabelKey}
              graph={graph}
              selectedEntities={this.props.selectedEntities}
              onToggleEntity={this.props.onToggleEntity}
            />
          </div>
        </div>
      </div>
    )
  }
}
