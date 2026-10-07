import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";
import {
  heapSort,
  topLargest,
  topSmallest,
  PriorityQueue,
} from "./algorithms.ts";

const rl = createInterface({ input: stdin, output: stdout });

try {
  console.log("\nПирамидальная сортировка и Priority Queue");
  const input = (await rl.question("Введите числа через пробел: ")).trim();
  const array = input.split(/\s+/).map(Number);

  if (!input || !array.every(Number.isFinite)) {
    throw new Error("Введите числа через пробел");
  }

  console.log("Отсортированный массив:", heapSort(array).join(" "));

  const kInput = (await rl.question("Введите k чисел: ")).trim();
  const k = Number(kInput);

  if (!kInput) {
    throw new Error("Введите k.");
  }

  console.log("Наибольшие элементы:", topLargest(array, k).join(" "));
  console.log("Наименьшие элементы:", topSmallest(array, k).join(" "));

  const queue = new PriorityQueue();

  for (const value of array) {
    queue.enqueue(value);
  }

  console.log("Размер очереди:", queue.size);
  console.log("Приоритетный элемент:", queue.peek());
  console.log("Извлечённый элемент:", queue.dequeue());
  console.log("Размер после извлечения:", queue.size);
  console.log("Следующий элемент:", queue.peek());
} catch (error) {
  console.log(error instanceof Error ? error.message : error);
} finally {
  rl.close();
}
