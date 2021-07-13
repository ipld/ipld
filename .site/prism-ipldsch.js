/**
 * Syntax highlighting rules for the IPLD Schema DSL. Identified as `ipldsch`
 * when tagged on code blocks.
 */

module.exports = {
  typedef: {
    pattern: /^[ \t]*(?:type|advanced)[ \t][A-Z](_?[A-Za-z0-9])*\b/m,
    inside: {
      keyword: /^[ \t]*(type|advanced)/m,
      'class-name': /[\w]+$/
    }
  },
  keyword: /\b(?:bool|int|float|string|bytes|null|nullable|optional)\b/,
  builtin: /\b(struct|union|enum)(?=[ \t]*\{)\b/,
  representation: {
    pattern: /^}[ \t]representation\b/m,
    inside: {
      builtin: /representation/
    }
  },
  operator: /=/,
  number: /\b-?\d+\.?\d*(?:e[+-]?\d+)?\b/i,
  punctuation: /[(){}:[\]|&]/,
  string: {
    pattern: /(")(?:\\[\s\S]|(?!\1)[^\\])*\1/,
    greedy: true
  },
  comment: {
    pattern: /(^|[^"])#.*/,
    lookbehind: true,
    greedy: true
  }
}
