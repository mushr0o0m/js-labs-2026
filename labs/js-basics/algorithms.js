export function insertionSort(array) {
  const result = [...array];

  for (let i = 1; i < result.length; i++) {
    const value = result[i];
    let j = i - 1;

    while (j >= 0 && result[j] > value) {
      result[j + 1] = result[j];
      j--;
    }

    result[j + 1] = value;
  }

  return result;
}

export function binarySearch(array, target) {
  let left = 0;
  let right = array.length - 1;

  while (left <= right) {
    const middle = Math.floor((left + right) / 2);

    if (array[middle] === target) {
      return middle;
    }

    if (array[middle] < target) {
      left = middle + 1;
    } else {
      right = middle - 1;
    }
  }

  return -1;
}

export function isBalanced(text) {
  const stack = [];
  const pairs = { ')': '(', ']': '[', '}': '{', '>': '<' };

  for (const bracket of text) {
    if ('([{<'.includes(bracket)) {
      stack.push(bracket);
    } else if (Object.hasOwn(pairs, bracket)) {
      if (stack.pop() !== pairs[bracket]) {
        return false;
      }
    } else if (bracket.trim() !== '') {
      return false;
    }
  }

  return stack.length === 0;
}
