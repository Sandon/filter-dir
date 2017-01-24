/**
 * Created by Sandon on 2017/1/23.
 */
// require('babel-polyfill')
import path from 'path'

import filterDir from '../dist/index'

/*
function testAdd () {
  const dirFilter = filterDir()
  dirFilter.add(['remove.js', 'remove-dir', 'remove-dir/!**', 'remain-dir/!**', '!remain-dir/remain.js'])
  dirFilter.filter(path.join(__dirname, 'filtered-dir'))
}

testAdd()
*/

async function testAddIgnoreFile () {
  const dirFilter1 = filterDir()
  await dirFilter1.addIgnoreFile(path.join(__dirname, './.config'))
  dirFilter1.filter(path.join(__dirname, 'filtered-dir'))
}

testAddIgnoreFile()
