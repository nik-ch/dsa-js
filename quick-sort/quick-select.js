/**
 * Finds k-th largest in array.
 */
const selectKthLargest = (a, k) => {
  return select(a, a.length - k);
};

/**
 * Finds k-th smallest in array.
 */
const selectKthSmallest = (a, k) => {
  return select(a, k);
}

const select = (a, k) => {
  let lo = 0;
  let hi = a.length - 1;
  while (lo < hi) {
    let p = partition(a, lo, hi);
    if (p < k) {
      lo = p + 1;
    } else if (p > k) {
      hi = p - 1;
    } else {
      return a[p];
    }
  }
  return a[lo];
};

const partition = (a, lo, hi) => {
  let i = lo;
  let j = hi;
  let p = a[lo];

  while (true) {
    while(a[i] <= p && i < hi) {
      i++;
    }
    while(a[j] >= p && j > lo) {
      j--;
    }
    if (i >= j) {
      break;
    }
    swap(a, i, j);
  }

  swap(a, lo, j);
  return j;
};

const swap = (a, i, j) => {
  const temp = a[i];
  a[i] = a[j];
  a[j] = temp;
};

