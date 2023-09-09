/**
 * Sorts given array by ascending (modifies given array).
 */
const mergeSort = (ar) => {
  sort(ar, 0, ar.length - 1);
};

const sort = (ar, start, end) => {
  if (end <= start) {
    return;
  }
  const mid = Math.floor((start + end) / 2);
  sort(ar, start, mid);
  sort(ar, mid + 1, end);
  merge(ar, start, mid, end);
};

const merge = (ar, start, mid, end) => {
  const leftAr = ar.slice(start, mid + 1);
  const rightAr = ar.slice(mid + 1, end + 1);
  for (let k = start, i = 0, j = 0; k <= end; k++) {
    if (i === leftAr.length) {
      // left half of array is finished - take element from the right side
      ar[k] = rightAr[j++];
    } else if (j === rightAr.length) {
      // right half of the array is finished - take element from the left side
      ar[k] = leftAr[i++];
    } else if (leftAr[i] <= rightAr[j]) {
      // having '<=' is important here, this way we can make merge sort stable
      ar[k] = leftAr[i++];
    } else {
      ar[k] = rightAr[j++];
    }
  }
};
