export const ipldsch = function() {
  return {
    case_insensitive: true,
    illegal: ':',
    contains: [
      {
        className: 'keyword',
        begin: /^[ \t]*(?:type|advanced)[ \t][A-Z](_?[A-Za-z0-9])*\b/m,
        contains: [
          {
            className: 'keyword',
            begin: /^[ \t]*(type|advanced)/m,
          },
          {
            className: 'class-name',
            begin: /[\w]+$/,
          },
        ],
      },
      {
        className: 'keyword',
        begin: /\b(bool|int|float|string|bytes|null|nullable|optional)\b/,
      },
      {
        className: 'builtin',
        begin: /\b(struct|union|enum)(?=[ \t]*\{)\b/,
      },
      {
        begin: /^}[ \t]representation\b/m,
        contains: [
          {
            className: 'builtin',
            begin: /representation/,
          },
        ],
      },
      {
        className: 'operator',
        begin: /=/,
      },
      {
        className: 'number',
        begin: /\b-?\d+\.?\d*(?:e[+-]?\d+)?\b/i,
      },
      {
        className: 'punctuation',
        begin: /[(){}:[\]|&]/,
      },
      {
        className: 'string',
        begin: /(")(?:\\[\s\S]|(?!\1)[^\\])*\1/,
        greedy: true,
      },
      {
        className: 'comment',
        begin: /(^|[^"])#.*/,
        lookbehind: true,
        greedy: true,
      },
    ],
  };
};
