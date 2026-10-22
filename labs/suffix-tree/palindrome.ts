import { SuffixTree } from './suffix-tree.ts';

export function longestPalindrome(text: string): string {
  const characters = [...text];
  const n = characters.length;

  if (n === 0) {
    return '';
  }

  const reversed = [...characters].reverse();
  const tree = new SuffixTree([...characters, Symbol('separator'), ...reversed]);
  let bestStart = 0;
  let bestLength = 1;

  for (let center = 0; center < n; center++) {
    const oddRadius = tree.commonPrefix(center, n + 1 + n - 1 - center);
    const oddLength = 2 * oddRadius - 1;

    if (oddLength > bestLength) {
      bestStart = center - oddRadius + 1;
      bestLength = oddLength;
    }

    if (center > 0) {
      const evenRadius = tree.commonPrefix(center, n + 1 + n - center);
      const evenLength = 2 * evenRadius;

      if (evenLength > bestLength) {
        bestStart = center - evenRadius;
        bestLength = evenLength;
      }
    }
  }

  return characters.slice(bestStart, bestStart + bestLength).join('');
}
