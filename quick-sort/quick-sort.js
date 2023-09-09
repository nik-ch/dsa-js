/**
 * Sorts given array in place using given comparator function. For ASC sort comparator function should look like following:
 * 
 * const comparator = (a, b) => {
 *  if (a > b) {
 *    return 1;
 *  } else if (a < b) {
 *    return -1;
 *  } else {
 *    return 0;
 *  }
 * }
 * 
 * For DESC sort comparator function should look like following:
 * 
 * const comparator = (a, b) => {
 *  if (a < b) {
 *    return 1;
 *  } else if (a > b) {
 *    return -1;
 *  } else {
 *    return 0;
 *  }
 * }
 */
export const quickSort = (array, comparator) => {
  sort(array, 0, array.length - 1, comparator);
};

const sort = (array, start, end, comparator) => {
  if (start > end) {
    return;
  }
  const p = partition(array, start, end, comparator);
  sort(array, start, p - 1, comparator);
  sort(array, p + 1, end, comparator);
};

const partition = (array, start, end, comparator) => {
  const p = start;
  let i = start + 1, j = end;

  while (true) {
    while (i < end && comparator(array[i], array[p]) < 0) {
      i++;
    }
    while (j > start && comparator(array[j], array[p]) >= 0) {
      j--;
    }
    if (i < j) {
      swap(array, i, j);
    } else {
      break;
    }
  }

  swap(array, p, j);

  return j;
};

const swap = (array, i , j) => {
  const t = array[i];
  array[i] = array[j];
  array[j] = t;
};
