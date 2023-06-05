/**
 * Sorts array by ascending (modifies given array).
 */
const insertionSort = (ar) => {
  for (let i = 1; i < ar.length; i++) {
    let j = i;
    while (j > 0 && ar[j] < ar[j - 1]) {
      swap(ar, j, j - 1);
      j--;
    }
  }
}

const swap = (ar, i, j) => {
  const t = ar[i];
  ar[i] = ar[j];
  ar[j] = t;
}
