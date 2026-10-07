function higherPriority(a: number, b: number, min: boolean): boolean {
  return min ? a < b : a > b;
}

function siftDown(
  array: number[],
  index: number,
  size: number,
  min = false,
): void {
  while (index * 2 + 1 < size) {
    let child = index * 2 + 1;
    const right = child + 1;

    if (right < size && higherPriority(array[right], array[child], min)) {
      child = right;
    }

    if (!higherPriority(array[child], array[index], min)) {
      break;
    }

    [array[index], array[child]] = [array[child], array[index]];
    index = child;
  }
}

export function heapSort(array: number[]): number[] {
  const result = [...array];

  for (let i = Math.floor(result.length / 2) - 1; i >= 0; i--) {
    siftDown(result, i, result.length);
  }

  for (let end = result.length - 1; end > 0; end--) {
    [result[0], result[end]] = [result[end], result[0]];
    siftDown(result, 0, end);
  }

  return result;
}

export class PriorityQueue {
  private heap: number[] = [];
  private min: boolean;

  constructor(min = false) {
    this.min = min;
  }

  get size(): number {
    return this.heap.length;
  }

  peek(): number | undefined {
    return this.heap[0];
  }

  enqueue(value: number): void {
    this.heap.push(value);
    let index = this.heap.length - 1;

    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);

      if (!higherPriority(this.heap[index], this.heap[parent], this.min)) {
        break;
      }

      [this.heap[index], this.heap[parent]] = [
        this.heap[parent],
        this.heap[index],
      ];
      index = parent;
    }
  }

  dequeue(): number | undefined {
    if (this.heap.length === 0) {
      return undefined;
    }

    const result = this.heap[0];
    const last = this.heap.pop()!;

    if (this.heap.length > 0) {
      this.heap[0] = last;
      siftDown(this.heap, 0, this.heap.length, this.min);
    }

    return result;
  }
}

function topK(array: number[], k: number, largest: boolean): number[] {
  if (!Number.isInteger(k) || k < 0 || k > array.length) {
    throw new Error("k должно быть целым числом от 0 до длины массива.");
  }

  if (k === 0) {
    return [];
  }

  const queue = new PriorityQueue(largest);

  for (const value of array) {
    queue.enqueue(value);

    if (queue.size > k) {
      queue.dequeue();
    }
  }

  const result: number[] = [];

  while (queue.size > 0) {
    result.push(queue.dequeue()!);
  }

  return result.reverse();
}

export function topLargest(array: number[], k: number): number[] {
  return topK(array, k, true);
}

export function topSmallest(array: number[], k: number): number[] {
  return topK(array, k, false);
}
