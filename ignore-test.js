/**
 * Created by Sandon on 2017/1/22.
 */
const ignore = require('ignore')
const ig = ignore().add(['.abc/*', '!.abc/d/'])
console.log(ig.ignores('/.abc/a.js'))
// console.log(ig.ignores('.abc/d/e.js'))
console.log(ig.ignores('.abc/'))
