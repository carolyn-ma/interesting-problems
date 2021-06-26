/* 
Problem: Input string with capital letters (ex. 'A') indicating a unique container and a '_' as the single empty tray. Need to sort the letters to 
their target indices (ex. 'A' should go to index 0). Sorting happens by swapping the container with the empty tray at each step. Return the steps 
required for the shortest possible number of steps.

ex. input:
    'BC_A'
ex. output:
    1,2
    0,1
    3,0

Assumptions:
    1. there is only 1 empty holder ('_')
    2. there can be a max of 27 digits for the input string, since each container ('A') corresponds to a unique index (0) for its target location, 
and there are 26 unique capital letters + the empty holder

Complexity:
    1. Runtime: O(n) amortized, n is length of input
        a. O(n) - scans the string once and stores <target index, actual index> to a map
        b. O(n) - scans the map once and find number of items out of order
        c. O(n) - for each out of order item, swap the empty tray with the target container
            1). O(n) for near O(1) items - if empty tray is at the end, need to scan the map again and return the first out of order item found
    2. Space:   O(n) - using the additional map to keep a mapping for all items
*/

const CapLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const EmptyTray = '_';

const minRobotMoves = (seqStr) => {
    const startCharCode = CapLetters[0].charCodeAt(0);
    const emptyTrayNum = EmptyTray.charCodeAt(0) - startCharCode;
    const numIdxMap = new Map();
    let steps = '';

    // Storing the containers (ex.'A') as their target indices (ex. 0) as the key, and their actual indices as the value.
    for (let i = 0; i < seqStr.length; i++) {
        const currNum = seqStr.charCodeAt(i) - startCharCode;
        numIdxMap.set(currNum, i);
    }

    let numsOutOfOrder = findOutOfOrder(numIdxMap, emptyTrayNum);
    while (numsOutOfOrder > 0) {
        const emptyTrayIdx = numIdxMap.get(emptyTrayNum);
        let containerIdx = numIdxMap.get(emptyTrayIdx);
        // console.log('1:', numsOutOfOrder, 'items out of order ----- container index:', containerIdx, '----- tray index:', emptyTrayIdx);
        if (typeof containerIdx === 'undefined') {
            // extra step if the '_' empty tray is at the end, then swap it with the first item out of order
            const firstUnorderedContainerNum = findOutOfOrder(numIdxMap, emptyTrayNum, true);
            containerIdx = numIdxMap.get(firstUnorderedContainerNum);
            numIdxMap.set(firstUnorderedContainerNum, emptyTrayIdx);
            numsOutOfOrder++;
            // console.log('Empty tray at the end!', firstUnorderedContainerNum, 'is the first out of order item ----- container index', containerIdx, '----- tray index:', emptyTrayIdx);
        } else {
            numIdxMap.set(emptyTrayIdx, emptyTrayIdx);
        }
        numIdxMap.set(emptyTrayNum, containerIdx);
        steps += `${containerIdx},${emptyTrayIdx}\n`;
        numsOutOfOrder--;

        // can print out the move in progress string for insight, ex. BC_A => B_CA => _BCA => ABC_
        const sortedKeyValues = [...numIdxMap.entries()]?.sort((pair1, pair2) => {
            return pair1[1] - pair2[1];
        });
        const sortedStr = sortedKeyValues.map(pair => {
            return String.fromCharCode(pair[0] + startCharCode);
        })?.join('');

        if (numsOutOfOrder === 0) {
            console.log('--- After all movements:', sortedStr, '---');
        }
    }
    return steps;
};

// The containers are in order if all the keys (target index) equal the values (actual index), other than the empty tray
// Reusing the function to either find the number of items out of order, or return the first item out of order
const findOutOfOrder = (map, emptyTrayNum, returnUnorderedItem) => {
    const nums = [...map?.keys()];
    let numOutOfOrder = 0;

    for (num of nums) {
        if (num !== map.get(num) && num !== emptyTrayNum) {
            if (returnUnorderedItem) {
                return num;
            }
            numOutOfOrder++;
        };
    };
    return numOutOfOrder;
};

// Helper function to generate randomly ordered inputs
const randomTestGenerator = (len) => {
    const arr = CapLetters.slice(0, len);
    arr.push(EmptyTray);
    arr.sort(() => {
        return Math.random() - 0.5
    });
    return arr.join('');
};

const tests = ['BC_A', 'BDAEG_FC', 10, 10, 15, 15, 20, 20, 26, 26];

tests.forEach(test => {
    const testStr = Number.isInteger(test) ? randomTestGenerator(test) : test;
    console.log(`${testStr}:\n${minRobotMoves(testStr)}`);
});


/*
Some local run results:

  --- After all movements: ABCDEFG_ ---
  BDAEG_FC:
  6,5
  4,6
  3,4
  1,3
  0,1
  2,0
  7,2

  --- After all movements: ABCDEFGHIJ_ ---
  HAGDBICFJ_E:
  8,9
  5,8
  7,5
  0,7
  1,0
  4,1
  10,4
  2,10
  6,2
  10,6

  --- After all movements: ABCDEFGHIJ_ ---
  JB_FCDAIEHG:
  4,2
  8,4
  7,8
  9,7
  0,9
  6,0
  10,6
  3,10
  5,3
  10,5

  --- After all movements: ABCDEFGHIJKLMNO_ ---
  FCKMLANBHEDJOI_G:
  12,14
  3,12
  10,3
  2,10
  1,2
  7,1
  8,7
  13,8
  6,13
  15,6
  0,15
  5,0
  15,5
  4,15
  9,4
  11,9
  15,11

  --- After all movements: ABCDEFGHIJKLMNO_ ---
  NGCKBMOFHJAIDEL_:
  0,15
  10,0
  3,10
  12,3
  5,12
  7,5
  8,7
  11,8
  14,11
  6,14
  1,6
  4,1
  13,4
  15,13

  --- After all movements: ABCDEFGHIJKLMNOPQRST_ ---
  CPDSLQEB_JFAIRTKGNHMO:
  12,8
  19,12
  14,19
  20,14
  0,20
  11,0
  4,11
  6,4
  16,6
  5,16
  10,5
  15,10
  1,15
  7,1
  18,7
  3,18
  2,3
  20,2
  13,20
  17,13
  20,17

  --- After all movements: ABCDEFGHIJKLMNOPQRST_ ---
  PG_QHMJLODSFECAIRTBNK:
  13,2
  19,13
  17,19
  16,17
  3,16
  9,3
  6,9
  1,6
  18,1
  10,18
  20,10
  0,20
  14,0
  8,14
  15,8
  20,15
  4,20
  12,4
  5,12
  11,5
  7,11
  20,7

  --- After all movements: ABCDEFGHIJKLMNOPQRSTUVWXYZ_ ---        
  VMBFEZAHNDW_LUCKGQIYXTOJPRS:
  12,11
  1,12
  2,1
  14,2
  22,14
  10,22
  15,10
  24,15
  19,24
  21,19
  0,21
  6,0
  16,6
  17,16
  25,17
  5,25
  3,5
  9,3
  23,9
  20,23
  13,20
  8,13
  18,8
  26,18
*/
