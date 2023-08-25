import { readFileSync } from 'fs'
import { parseCase } from './testcase.js'
import { parse, index } from 'testmark.js'

const file = '../../transport/trustless-pathing/fixtures/unixfs_20m_variety.'

function pathToFixture (typ) {
  return new URL(file + typ, import.meta.url)
}

export function unixfs20mVarietyCar () {
  return pathToFixture('car')
}

export function unixfs20mVarietyCases () {
  const file = pathToFixture('md')
  const contents = readFileSync(file, 'utf-8')
  const dirEnt = index(parse(contents))
  const testCases = []
  for (const test of dirEnt.children.get('test').childrenList) {
    for (const scope of test.childrenList) {
      testCases.push(parseCase(`${test.name}/${scope.name}`, dstr(scope, 'query'), dstr(scope, 'execution')))
    }
  }
  return testCases
}

function dstr (dir, ch) {
  return dir.children.get(ch).hunk.body
}
