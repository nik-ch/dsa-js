/**
 * Sorts given array by ascending (modifies given array).
 */
const quickSort = (ar) => {
  sort(ar, 0, ar.length - 1);
};

const sort = (ar, start, end) => {
  if (end <= start) {
    return;
  }
  const p = partition(ar, start, end);
  sort(ar, start, p - 1);
  sort(ar, p + 1, end);
};

const partition = (ar, start, end) => {
  const p = ar[end];
  let s = start;
  for (let i = start; i < end; i++) {
    if (ar[i] <= p) {
      swap(ar, i, s);
      s++;
    }
  }
  swap(ar, s, end);
  return s;
};

const swap = (ar, i , j) => {
  const t = ar[i];
  ar[i] = ar[j];
  ar[j] = t;
};
