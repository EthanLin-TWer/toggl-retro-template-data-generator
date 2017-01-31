import { describe, beforeEach, it } from "mocha"
import { expect } from 'chai'
import TogglClient from 'toggl-api'
import Settings from '../settings'

describe('toggl api', () => {
   describe('toggl.summaryReport()', () => {
      let toggl
      beforeEach(() => {
         toggl = new TogglClient({ apiToken: Settings.token })
      })
      it('should return desired data structure', () => {
         
      })
   })
})