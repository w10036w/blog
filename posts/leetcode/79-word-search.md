## [79. Word Search](https://leetcode.com/problems/word-search/)

Given a 2D board and a word, find if the word exists in the grid.

The word can be constructed from letters of sequentially adjacent cell, where "adjacent" cells are those horizontally or vertically neighboring. The same letter cell may not be used more than once.

Example:
```js
board =
[
  ['A','B','C','E'],
  ['S','F','C','S'],
  ['A','D','E','E']
]

Given word = "ABCCED", return true.
Given word = "SEE", return true.
Given word = "ABCB", return false.
```
best
```js
/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function(board, word) {  
  let [res, height, width, wordLen] = [false, board.length, board[0].length, word.length]
  for (let i=0;i<height;i++) {
    for(let j=0;j<width;j++) {
      if (board[i][j]===word[0]) dfs(i, j, 0)
    }
  }
  return res
  function dfs(i, j, w) {
    if (w===wordLen) return res = true
    if (i<0||j<0 || i===height||j===width || res || board[i][j]!==word[w]) return
    let tmp = board[i][j]
    board[i][j] = ''
    dfs(i+1, j, w+1)
    dfs(i-1, j, w+1)
    dfs(i, j-1, w+1)
    dfs(i, j+1, w+1)
    board[i][j] = tmp
  }
};
```
My solution
```js
/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function(board, word) {
  const len = word.length
  const height = board.length
  const width = board[0].length
  if (height * width < len) return false
  
  for(let i=0;i<height;i++) {
    for(let j=0;j<width;j++) {
      if (board[i][j] ===word[0] && dfs(i, j, 0, [])) return true
    }
  }
  return false
  
  function dfs(x, y, i, usedP) {
    if (i===len) return true
    if (x<0 || y<0 || x===height || y===width ||
      usedP.includes(x+','+y) || board[x][y]!==word[i]) return false;
    usedP = usedP.concat(x+','+y)
    return dfs(x-1, y, i+1, usedP)
      || dfs(x, y-1, i+1, usedP)
      || dfs(x+1, y, i+1, usedP)
      || dfs(x, y+1, i+1, usedP)
  }
};
```
