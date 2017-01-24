/**
 * Created by Sandon on 2017/1/23.
 */
// require('babel-polyfill')
import path from 'path'

// import filterDir from '../src/index'
import filterDir from '../dist/index'
console.log(filterDir)
const dirFilter = filterDir()
dirFilter.add(['remove.js', 'remove-dir', 'remove-dir/**', 'remain-dir/**', '!remain-dir/remain.js'])
dirFilter.filter(path.join(__dirname, 'filtered-dir'))
