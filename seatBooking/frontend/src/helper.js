export function genObject(len) {
  let arr = [];
  for (let i = 0; i < len; i++) {
    arr.push({
      seatIdx: i + 1,
      isBooked: false,
    });
  }
  return arr;
}
