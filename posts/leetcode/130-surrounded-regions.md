## [130. Surrounded Regions](https://leetcode.com/problems/surrounded-regions/)
> bytedance,

Given a 2D board containing 'X' and 'O' (the letter O), capture all regions surrounded by 'X'.

A region is captured by flipping all 'O's into 'X's in that surrounded region.

Example:
```sh
X X X X
X O O X
X X O X
X O X X
```
After running your function, the board should be:
```sh
X X X X
X X X X
X X X X
X O X X
```
Explanation:

Surrounded regions shouldn't be on the border, which means that any 'O' on the border of the board are not flipped to 'X'. Any 'O' that is not on the border and it is not connected to an 'O' on the border will be flipped to 'X'. Two cells are connected if they are adjacent cells connected horizontally or vertically.

## solution
from [kant-li](https://github.com/azl397985856/leetcode/blob/master/problems/130.surrounded-regions.md)

2d-dfs, 2 full loops

1st loop dfs mark all unaffected "O" as "M", 2nd loop does the replacement and revert.

```js
/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solve = function(board) {
  var rows=board.length
  if (rows===0) return;
  var cols=board[0].length
  for(var i=0;i<rows;i++) {
    for(var j=0;j<cols;j++) {
      if(i===0||i===rows-1||j===0||j===cols-1)
        dfs(i, j)
    }
  }
  for(var i=0;i<rows;i++) {
    for(var j=0;j<cols;j++) {
      if (board[i][j]==='O') board[i][j]='X'
      else if (board[i][j]==='M') board[i][j]='O'
    }
  }
  
  function dfs(i, j) {
    if(i<0||i>rows-1||j<0||j>cols-1||board[i][j]!=='O') return
    board[i][j]='M'
    dfs(i+1, j)
    dfs(i-1, j)
    dfs(i, j+1)
    dfs(i, j-1)
  }
};
```
