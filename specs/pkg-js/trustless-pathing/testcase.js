import { CID } from 'multiformats/cid'

class TestCase {
  constructor (name, root, path, scope, duplicates, byteRange, expectedCids) {
    this.name = name
    this.root = root
    this.path = path
    this.scope = scope
    this.duplicates = duplicates
    this.byteRange = byteRange
    this.expectedCids = expectedCids
  }

  asQuery () {
    let pp = this.path.split('/').filter(Boolean).join('/')
    if (pp !== '') {
      pp = '/' + pp
    }
    const br = this.byteRange ? `&entity-bytes=${this.byteRange}` : ''
    const dup = this.duplicates ? '&dups=y' : ''
    return `/ipfs/${this.root}${pp}?dag-scope=${this.scope}${br}${dup}`
  }
}

export function parseCase (name, spec, exec) {
  let lines = exec.split('\n')
  while (lines.length > 0 && lines[0].trim() === '') {
    lines = lines.slice(1)
  }
  while (lines.length > 0 && lines[lines.length - 1].trim() === '') {
    lines = lines.slice(0, lines.length - 1)
  }
  const specParts = spec.trim().split('?')
  if (specParts.length !== 2) {
    throw new Error('invalid spec')
  }
  spec = specParts[0]
  const query = new URLSearchParams(specParts[1])
  if (spec[0] !== '/') {
    throw new Error('invalid spec')
  }
  const specParts2 = spec.split('/').filter(Boolean)
  if (specParts2[0] !== 'ipfs') {
    throw new Error('invalid spec')
  }
  const root = CID.parse(specParts2[1])
  const path = '/' + specParts2.slice(2).join('/')
  const scope = query.get('dag-scope')
  switch (scope) {
    case 'all':
    case 'entity':
    case 'block':
      break
    default:
      throw new Error(`invalid dag-scope in test case: ${scope}`)
  }
  const duplicates = query.get('dups') === 'y'
  const byteRange = query.get('entity-bytes')
  if (byteRange) {
    const parts = byteRange.split(':')
    if (parts.length !== 2) {
      throw new Error(`invalid entity-bytes: ${byteRange}`)
    }
    const start = parseInt(parts[0], 10)
    if (isNaN(start)) {
      throw new Error(`invalid entity-bytes: ${byteRange}`)
    }
    if (parts[1] !== '*') {
      const end = parseInt(parts[1], 10)
      if (isNaN(end)) {
        throw new Error(`invalid entity-bytes: ${byteRange}`)
      }
    }
  }
  const expectedCids = []
  for (const line of lines) {
    const la = line.split('|')
    const c = CID.parse(la[0].trim())
    expectedCids.push(c)
  }
  return new TestCase(name, root, path, scope, duplicates, byteRange, expectedCids)
}
