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
    this._patterns = []
    this._ig = null
  }
  add (patterns) {
    if (Array.isArray(patterns)) {
      this._patterns = this._patterns.concat(patterns)
    } else if (typeof patterns === 'string' || patterns instanceof String) {
      this._patterns.push(patterns)
    } else {
      throw new Error('patterns must be String or Array')
    }
  }
  async filter (dir) {
    this._ig = ignore().add(this._patterns)
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

  getPatterns () {
    return this._patterns
  }

  async addIgnoreFile (path) {
    const exists = await fs.exists(path)
    if (!exists) {
      throw new Error(`${path} doesn't exist.`)
    }

    const patterns = await fs.readFile(path, 'utf8')
    this._patterns = this._patterns.concat(patterns.split(/\n/g))
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
