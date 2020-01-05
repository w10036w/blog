## [1202. Smallest String With Swaps](https://leetcode.com/problems/smallest-string-with-swaps/)
> bytedance

You are given a string s, and an array of pairs of indices in the string pairs where pairs[i] = [a, b] indicates 2 indices(0-indexed) of the string.

You can swap the characters at any pair of indices in the given pairs any number of times.

Return the lexicographically smallest string that s can be changed to after using the swaps.

Example 1:
```js
Input: s = "dcab", pairs = [[0,3],[1,2]]
Output: "bacd"
Explaination: 
Swap s[0] and s[3], s = "bcad"
Swap s[1] and s[2], s = "bacd"
```
Example 2:
```js
Input: s = "dcab", pairs = [[0,3],[1,2],[0,2]]
Output: "abcd"
Explaination: 
Swap s[0] and s[3], s = "bcad"
Swap s[0] and s[2], s = "acbd"
Swap s[1] and s[2], s = "abcd"
```
Example 3:
```js
Input: s = "cba", pairs = [[0,1],[1,2]]
Output: "abc"
Explaination:
Swap s[0] and s[1], s = "bca"
Swap s[1] and s[2], s = "bac"
Swap s[0] and s[1], s = "abc"
```

## 思路
1. DFS
2. [并查集](https://blog.csdn.net/qq_17550379/article/details/101281816)

根据 pairs 可以将 s 中的不同字符联系起来，实际上我们可以将联系在一起的字符串看成是一个集合，然后对这个集合从小到大排序，最后再按照原先的位置将各个字符放回去，那么此时所构成的字符串一定是可以通过 pairs 转换后字典序最小的那个。说到这，其实就不难想到并查集了。

## solution
```py
class Solution:
  def smallestStringWithSwaps(self, s: str, pairs: List[List[int]]) -> str:
    p = list(range(len(s)))
    def find(x):
      if x != p[x]:
        p[x] = find(p[x])
      return p[x]
    for i, j in pairs:
      px, py = find(i), find(j)
      if px != py:
        p[px] = py
    mem = collections.defaultdict(list)
    for i, v in enumerate(p):
      mem[find(v)].append(s[i])
    for k in mem:
      mem[k].sort(reverse=True)
    res = []
    for i in range(len(s)):
      res.append(mem[find(i)].pop())
    return "".join(res)
```
