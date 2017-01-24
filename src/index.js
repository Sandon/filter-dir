/**
 * Created by Sandon on 2017/1/22.
 */
import ignore from 'ignore'
import path from 'path'
import fs from 'mz/fs'
import fse from 'fs-extra'

export default () => new FilterDir()

class FilterDir {
  constructor () {
    this._rules = []
    this._ig = null
  }
  add (rules) {
    if (Array.isArray(rules)) {
      this._rules = this._rules.concat(rules) // should copy one
    } else if (typeof rules === 'string' || rules instanceof String) {
      this._rules.push(rules) // should copy one
    } else {
      throw new Error('rules must be String or Array')
    }
  }
  async filter (dir) {
    this._ig = ignore().add(this._rules)
    return await this._filterDir(dir, '')
  }
  async _filterDir (dirPath, unprefixedPath) {
    const self = this

    const stat = await fs.stat(dirPath)
    if (!stat.isDirectory()) {
      return true
    }

    let files = await fs.readdir(dirPath)

    const len = files.length
    for (let i = 0; i !== len; i++) {
      let item = files[i]
      let itemDirPath = path.join(dirPath, item)
      let itemUnprefixedPath = path.join(unprefixedPath, item)
      console.log(itemUnprefixedPath)
      console.log(this._ig.ignores(itemUnprefixedPath))
      if (this._ig.ignores(itemUnprefixedPath)) {
        await remove(itemDirPath)
      } else {
        if (!await self._filterDir(itemDirPath, itemUnprefixedPath)) {
          return false
        }
      }
    }

    return true
  }
}

function remove (path) {
  return new Promise((resolve, reject) => {
    fse.remove(path, (err) => {
      if (err) {
        reject(err)
        return
      }
      resolve()
    })
  })
}
