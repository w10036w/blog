
# [36. Valid Sudoku](https://leetcode.com/problems/valid-sudoku/)
Determine if a 9x9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules:

Each row must contain the digits 1-9 without repetition.
Each column must contain the digits 1-9 without repetition.
Each of the 9 3x3 sub-boxes of the grid must contain the digits 1-9 without repetition.
The Sudoku board could be partially filled, where empty cells are filled with the character '.'.

Example 1:
```js
Input:
[
  ["5","3",".",".","7",".",".",".","."],
  ["6",".",".","1","9","5",".",".","."],
  [".","9","8",".",".",".",".","6","."],
  ["8",".",".",".","6",".",".",".","3"],
  ["4",".",".","8",".","3",".",".","1"],
  ["7",".",".",".","2",".",".",".","6"],
  [".","6",".",".",".",".","2","8","."],
  [".",".",".","4","1","9",".",".","5"],
  [".",".",".",".","8",".",".","7","9"]
]
Output: true
```
Example 2:
```js
Input:
[
  ["8","3",".",".","7",".",".",".","."],
  ["6",".",".","1","9","5",".",".","."],
  [".","9","8",".",".",".",".","6","."],
  ["8",".",".",".","6",".",".",".","3"],
  ["4",".",".","8",".","3",".",".","1"],
  ["7",".",".",".","2",".",".",".","6"],
  [".","6",".",".",".",".","2","8","."],
  [".",".",".","4","1","9",".",".","5"],
  [".",".",".",".","8",".",".","7","9"]
]
Output: false
Explanation: Same as Example 1, except with the 5 in the top left corner being 
    modified to 8. Since there are two 8's in the top left 3x3 sub-box, it is invalid.
```
Note:

- A Sudoku board (partially filled) could be valid but is not necessarily solvable.
- Only the filled cells need to be validated according to the mentioned rules.
- The given board contain only digits 1-9 and the character '.'.
- The given board size is always 9x9.

hash map
```js
/**
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function(board) {
  var m = new Map()
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      var cur = board[i][j]
      if (cur!=='.' && duplicate(m, cur, i, j)) return false
    }
  }
  return true
};

var duplicate = function(m, cur, i, j) {
  const [row, col, box] = [cur+'r'+i, cur+'c'+j, cur+'b'+Math.floor(i/3)+Math.floor(j/3)]
  if (m.has(row) || m.has(col) || m.has(box)) return true
  m.set(row, cur)
  m.set(col, cur)
  m.set(box, cur)
};
```
my own
```js
var isValidSudoku = function(board) {
  let set = new Set()
  let size = 9
  // boxes
  let x = 0
  let y = 0
  for (let i = 0; i < size; i++) {
    // check row
    for (let j = 0; j < size; j++) {
      const cur = board[i][j]
      if (cur !== '.') {
        if (set.has(cur)) return false
        set.add(cur)
      }
    }
    set.clear()
    // col
    for (let j = 0; j < size; j++) {
      const cur = board[j][i]
      if (cur !== '.') {
        if (set.has(cur)) return false
        set.add(cur)
      }
    }
    set.clear()
    // box
    x = i%3*3
    y = Math.floor(i/3)*3
    for (let j = x; j < x + 3; j++) {
      for (let k = y; k < y + 3; k++) {
        const cur = board[j][k]
        if (cur !== '.') {
          if (set.has(cur)) return false
          set.add(cur)
        }
      }
    }
    set.clear()
  }
  return true
};
```
python original
```py
class Solution:
  def isValidSudoku(board):
    """
    :type board: List[List[str]]
    :rtype: bool
    """
    seen = []
    for i, row in enumerate(board):
      for j, digit in enumerate(row):
        if digit != '.':
          seen.append((i, digit))
          seen.append((digit, j))
          seen.append((i // 3, j // 3, digit))
    return len(seen) == len(set(seen))
```
