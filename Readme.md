# filter-dir

This module filters(ignores/removes) matched files and directories in a root directory according to the .gitignore [spec](https://git-scm.com/docs/gitignore) 

You can treat this module as an extend of [node-ignore](https://github.com/kaelzhang/node-ignore)

## Usage
```
import path from 'path'
import filterDir from 'filter-dir'
const dirFilter = filterDir()
dirFilter.add(['remove.js', 'remove-dir', 'remove-dir/!**', 'remain-dir/!**', '!remain-dir/remain.js'])
dirFilter.filter(path.join(__dirname, 'filtered-dir'))
```
or
```
import path from 'path'
import filterDir from 'filter-dir'
async function useAddIgnoreFile () {
  const dirFilter = filterDir()
  await dirFilter.addIgnoreFile(path.join(__dirname, './.config'))
  await dirFilter.filter(path.join(__dirname, 'filtered-dir'))
}

useAddIgnoreFile()
```

## Methods
### add (patterns)
`patterns`: `String | Array<String>`, a string pattern or a array of string patterns.

### async filter (dirPath)
`dirPath`: `String`, path of the directory that will be filtered.

It is a `async` function, should be used with `await`:
```
try {
  await filter (dirPath)
} catch (e) {
  // catch exception
}
```

### async addIgnoreFile (ignoreFilePath)
`ignoreFilePath`: `String`, path of the config file that contains the ignore patterns.

The ignore patterns config file specified by `ignoreFilePath` and it's content should be `.gitignore` style.

It is a `async` function, should be used with `await`:
```
try {
  await addIgnoreFile (ignoreFilePath)
} catch (e) {
  // catch exception
}
```

### getPatterns ()
return a array of patterns used.
