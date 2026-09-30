import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";
import { insertionSort, binarySearch, isBalanced } from "./algorithms.js";

const rl = createInterface({ input: stdin, output: stdout });

try {
  const input = (await rl.question("Введите числа через пробел: ")).trim();
  const array = input.split(/\s+/).map(Number);

  if (!input || !array.every(Number.isFinite)) {
    throw new Error("Введите числа через пробел");
  }

  const sorted = insertionSort(array);
  console.log("Отсортированный массив:", sorted.join(" "));

  const searchInput = (await rl.question("Какое число найти: ")).trim();
  const target = Number(searchInput);

  if (!searchInput || !Number.isFinite(target)) {
    throw new Error("Введите число");
  }

  const index = binarySearch(sorted, target);
  console.log(
    index === -1
      ? "Число не найдено."
      : `Индекс в отсортированном массиве: ${index}`,
  );

  const text = await rl.question("Введите скобки ()[]<>{}: ");
  console.log(isBalanced(text) ? "Корректный ввод" : "Некорректный ввод");
} catch (error) {
  console.log(error.message);
} finally {
  rl.close();
}
