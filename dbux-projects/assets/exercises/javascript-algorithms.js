// TODO: load automatically from BugsJs bug database
// NOTE: some bugs have multiple test files, or no test file at all
// see: https://github.com/BugsJS/express/releases?after=Bug-4-test
const configs = [
  {
    // https://github.com/trekhleb/javascript-algorithms/blob/master/src/algorithms/sorting/bubble-sort/__test__/BubbleSort.test.js
    id: 1,
    name: 'bubbleSort1',
    label: 'BubbleSort bug#1',
    testNamePattern: 'BubbleSort should sort array',
    patch: 'bubbleSort1',
    testFilePaths: ['src/algorithms/sorting/bubble-sort/__test__/BubbleSort.test.js']
  },
  {
    id: 2,
    name: 'bubble-ok',
    label: 'BubbleSort bug#2',
    testNamePattern: 'BubbleSort should sort array',
    testFilePaths: ['src/algorithms/sorting/bubble-sort/__test__/BubbleSort.test.js']
  },
  {
    id: 3,
    name: 'binarySearch1',
    label: 'BinarySearch bug#1',
    testNamePattern: 'binarySearch should search',
    testFilePaths: ['src/algorithms/search/binary-search/__test__/binarySearch.test.js']
  },
  {
    id: 4,
    name: 'binarySearch2',
    label: 'BinarySearch bug#2',
    testNamePattern: 'binarySearch should search',
    testFilePaths: ['src/algorithms/search/binary-search/__test__/binarySearch.test.js']
  },
  {
    id: 5,
    name: 'binarySearch-ok',
    label: 'BinarySearch (ok)',
    testNamePattern: '.*',
    testFilePaths: ['src/algorithms/search/binary-search/__test__/binarySearch.test.js']
  }
];

module.exports = configs;
