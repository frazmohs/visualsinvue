<script>
import BreadcrumbsNav from "../../components/BreadcrumbsNav"
import HierarchicalListSearch from "../../components/HierarchicalListSearch"
import ChordComponent from "../../components/ChordComponent"
import TreeComponent from "../../components/TreeComponent"
import { CHORD_VIEW, TREE_VIEW } from "../../reducers"
import graphProvider from "../../components/graph"

export default {
  name: "XocesWidget",
  props: ['hierarchy','relationship','graph','drawingGroup','data', 'canvasId','colorScheme','onMouseOver','onMouseOut','onClickSubArc','onMouseOverFinish','onMouseOutFinis'
  ,'onClickFinish','currentLevelEntity','selectedEntities','entityLabelKey'],
  components: {
    ChordComponent,
    TreeComponent,
    BreadcrumbsNav,
    HierarchicalListSearch
  },
  render() {
    let graph = graphProvider(this.props.relationship)
    // console.log('props in XocesWidget', this.props)
    let component

    if (this.view === CHORD_VIEW) {
      component = <chord-component {...this} />
    } else {
      // we want the tree component to show ALL prerequsities
      let prereqsOfSelectedEntities = _.flatMap(this.selectedEntities, e =>
        graph.getOutgoingEntitiesAll(
          e.id,
          this.props.data.entities,
          this.props.data.relationships
        )
      )

      let nodes = _.uniq(
        _.concat(this.props.selectedEntities, prereqsOfSelectedEntities)
      )

      // console.log(nodes)
      component = <tree-component {...this} nodes={nodes} />
    }

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
</script>