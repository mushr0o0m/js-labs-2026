import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'node:process';
import { longestPalindrome } from './palindrome.ts';

const rl = createInterface({ input: stdin, output: stdout });

try {
  console.log('\nСуффиксное дерево и поиск палиндрома');
  const text = await rl.question('Введите строку: ');
  const palindrome = longestPalindrome(text);
  console.log('Самый длинный палиндром:', palindrome);
  console.log('Длина:', [...palindrome].length);
} finally {
  rl.close();
}
