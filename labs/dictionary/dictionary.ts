class TrieNode {
  children = new Map<string, TrieNode>();
  isWord = false;
}

export class Dictionary {
  private root = new TrieNode();

  add(word: string): void {
    if (word.length === 0) {
      return;
    }

    let node = this.root;

    for (const letter of word) {
      let child = node.children.get(letter);

      if (!child) {
        child = new TrieNode();
        node.children.set(letter, child);
      }

      node = child;
    }

    node.isWord = true;
  }

  addWords(words: string[]): void {
    for (const word of words) {
      this.add(word);
    }
  }

  has(word: string): boolean {
    let node = this.root;

    for (const letter of word) {
      const child = node.children.get(letter);

      if (!child) {
        return false;
      }

      node = child;
    }

    return node.isWord;
  }
}
