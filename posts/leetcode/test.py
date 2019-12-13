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

data = [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]
print(isValidSudoku(data))