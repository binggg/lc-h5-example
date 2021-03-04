export { TCBError } from './utils'
import { setConfig } from './utils'
export { createDataVar, buildDataVarFetchFn } from './datavar'
export { createDataset, updateDatasetParams, createStateDatasrouceVar } from './dataset'
export { dataSources, createDataSource } from './datasources'
import { init } from './tcb'

setConfig({
  envID: 'binggg-4gadofw5ce71d940' || undefined
})
init()
