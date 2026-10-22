type Character = string | symbol;

class SuffixNode {
  start: number;
  end: number;
  children = new Map<Character, SuffixNode>();

  constructor(start: number, end: number) {
    this.start = start;
    this.end = end;
  }
}

export class SuffixTree {
  private text: Character[];
  private root = new SuffixNode(0, 0);

  constructor(text: string | Character[]) {
    this.text = [...text, Symbol('end')];

    for (let start = 0; start < this.text.length; start++) {
      this.addSuffix(start);
    }
  }

  private addSuffix(start: number): void {
    let node = this.root;
    let position = start;

    while (position < this.text.length) {
      const character = this.text[position];
      const child = node.children.get(character);

      if (!child) {
        node.children.set(character, new SuffixNode(position, this.text.length));
        return;
      }

      let matched = 0;

      while (
        child.start + matched < child.end &&
        this.text[child.start + matched] === this.text[position + matched]
      ) {
        matched++;
      }

      if (child.start + matched === child.end) {
        position += matched;
        node = child;
        continue;
      }

      const split = new SuffixNode(child.start, child.start + matched);
      child.start += matched;
      node.children.set(character, split);
      split.children.set(this.text[child.start], child);
      split.children.set(
        this.text[position + matched],
        new SuffixNode(position + matched, this.text.length)
      );
      return;
    }
  }

  commonPrefix(first: number, second: number): number {
    const length = this.text.length - 1;

    if (
      !Number.isInteger(first) || !Number.isInteger(second) ||
      first < 0 || second < 0 || first >= length || second >= length
    ) {
      throw new Error('Индексы должны указывать на символы исходной строки.');
    }

    if (first === second) {
      return length - first;
    }

    let node = this.root;
    let matched = 0;

    while (true) {
      const left = node.children.get(this.text[first + matched]);
      const right = node.children.get(this.text[second + matched]);

      if (!left || left !== right) {
        return matched;
      }

      matched += left.end - left.start;
      node = left;
    }
  }
}
