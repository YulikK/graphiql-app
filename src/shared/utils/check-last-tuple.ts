export default function checkLastTuple(array: string[][]) {
  const temp = [...array];
  const lastItem = temp.at(-1);
  if (!lastItem || (lastItem[0] && lastItem[1])) {
    temp.push(['', '']);
  }
  return temp;
}
