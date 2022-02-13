import { mount } from '@vue/test-utils'
import XocesWidget from './../src/widgets/XocesWidget/XocesWidget.vue' 
module.exports = {
    preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
    testEnvironment: 'node'
  }
describe('XocesWidget', () => {
    // Inspect the raw component options
    test('first-spec', ()=>{console.log(XocesWidget)})
  })
  