import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'node:process';
import { Dictionary } from './dictionary.ts';

const rl = createInterface({ input: stdin, output: stdout });
const dictionary = new Dictionary();

try {
  console.log('\nСловарь языка');
  const input = (await rl.question('Введите список слов через пробел: ')).trim();
  dictionary.addWords(input ? input.split(/\s+/) : []);
  console.log('Список добавлен.');

  const word = (await rl.question('Введите одно слово для добавления: ')).trim();
  dictionary.add(word);
  console.log(word ? 'Слово добавлено.' : 'Пустое слово пропущено.');

  const search = (await rl.question('Введите слово для поиска: ')).trim();
  console.log(dictionary.has(search) ? 'Слово есть в словаре.' : 'Слова нет в словаре.');
} finally {
  rl.close();
}
