
# [401. Binary Watch](https://leetcode.com/problems/binary-watch/)
A binary watch has 4 LEDs on the top which represent the hours (0-11), and the 6 LEDs on the bottom represent the minutes (0-59).

Each LED represents a zero or one, with the least significant bit on the right.

For example, the above binary watch reads "3:25".

Given a non-negative integer n which represents the number of LEDs that are currently on, return all possible times the watch could represent.

Example:
```js
Input: n = 1
Return: ["1:00", "2:00", "4:00", "8:00", "0:01", "0:02", "0:04", "0:08", "0:16", "0:32"]
```
Note:
- The order of output does not matter.
- The hour must not contain a leading zero, for example "01:00" is not valid, it - should be "1:00".
- The minute must be consist of two digits and may contain a leading zero, for example "10:2" is not valid, it should be "10:02".

```js
/**
 * @param {number} num
 * @return {string[]}
 */
var readBinaryWatch = function(num) {
  const res = []
  function dfs(n, hrs, mins, p) {
    if (hrs>=12 || mins>59) return
    if (n===0) return res.push(`${hrs}:${mins>9?mins:'0'+mins}`)
    for (let i=p;i<10;i++) {
      if (i<4) dfs(n-1, hrs|(1<<i), mins, i+1)
      else dfs(n-1, hrs, mins|(1<<(i-4)), i+1)
    }
  }
  dfs(num, 0, 0, 0)
  return res
}
```
Python
```python
def readBinaryWatch(self, num):
  return ['%d:%02d' % (h, m)
    for h in range(12) for m in range(60)
    if (bin(h) + bin(m)).count('1') == num]
```
