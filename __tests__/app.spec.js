import { mount } from '@vue/test-utils'
import {ChordComponent} from './../src/components/ChordComponent/ChordComponent.vue' 
module.exports = {
    preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
    testEnvironment: 'node'
  }
describe('ChordComponent', () => {
    // Inspect the raw component options
    test('first-spec', ()=>{console.log(ChordComponent)})
  })
  