<script>
/* eslint-disable no-unused-vars */
import * as d3 from "d3-selection"
import $ from "jquery"
import _ from "lodash"
import pluralize from "pluralize"
import ExpandHideListItem from "./ExpandHideListItem"
import "./HierarchicalListSearch.scss"

// export component
export default {
  name: "hierarchical-list-search",
  props:['schemeName', 'hierarchy', 'entityLabelKey', 'data', 'graph', 'currentLevelEntity', 'selectedEntities', 'height','onToggleEntity'],
  methods: {
    _renderLevel(level, currentLevelEntity, props) {
      let data = props.data
      let graph = props.graph
      let entityLabelKey = props.entityLabelKey
      let childIdx = props.hierarchy.indexOf(props.currentLevelEntity.type) + 1

      let children = _.filter(
        graph.getChildren(
          currentLevelEntity.id,
          data.entities,
          data.relationships
        ),
        {
          type: props.hierarchy[childIdx]
        }
      )

      return (
        <div key={`level-${level}`}>
          <p class="level__entity-title">
            {currentLevelEntity[entityLabelKey]} &nbsp;
            <span class="level__entity-title__type">
              ({currentLevelEntity.type})
            </span>
          </p>

          {_.map(children, e => {
            return (
              <div key={`entity-${e.id}`}>
                <ExpandHideListItem entity={e} {...props} />
              </div>
            )
          })}
        </div>
      )
    }
  },
  mounted() {
    this.el = this.$refs.vueref0
    // console.log('this.props.height', this.props.height);
    // $(this.el).height(this.props.height)
    $(`#${this.el.id}`).css("min-height", this.height)
  },
  updated() {
    this.el = this.$refs.vueref0
  },
  render() {
    let props = this
    return (
      <div
        class={`xoces-hierarchical-list-search ${props.schemeName}`}
        id="xoces-hierarchical-list-search"
        ref="vueref0"
      >
        {this._renderLevel(
          props.currentLevelEntity.type,
          props.currentLevelEntity,
          props
        )}
      </div>
    )
  }
}

</script>