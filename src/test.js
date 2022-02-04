console.log('n');
var myWidget = visualsinvue.widgets.XocesWidget.new({
z
    // in this made-up example, we have a top level group. Within this top-level group, we have smaller groups.
    // ...within groups, we have teams. Within a team, we have people.
    hierarchy: ['top-level-group', 'group', 'team', 'person'],     
    data: {
      entities: [
  
        // let's start with two entities. 'id' and 'type' fields are mandatory.
        {
          id: 'entity1',
          type: 'top-level-group',
          nameForDisplay: 'i am the first entity'
        },
        {
          id: 'entity2',
          type: 'group',
          nameForDisplay: 'another entity'
        },
      ],
      relationships: [
  
        // this relationship points from entity2 ---> entity1, saying that entity2 'has_parent_of' entity1
        {               
          id: 'r1',
          type: 'has_parent_of',
          sourceId: 'entity2',
          parentId: 'entity1'
        }
      ]
    },
  
    // we choose the key 'nameForDisplay' for displaying the entity
    entityLabelKey: 'nameForDisplay',
  
    // we tell xoces that grouping relationships have type 'has_parent_of'
    // and that relationships have keys 'sourceId' and 'targetId' that point to the source and target respectively
    relationship: {
      parentType: 'has_parent_of',
      sourceRef: 'sourceId',
      targetRef: 'targetId',
    },
  });
  document.getElementById('w').append(myWidget)