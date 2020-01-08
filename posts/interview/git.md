# interview - git
参考 TODO 整理
- [高频使用的 Git 命令](https://juejin.im/post/5de8d849e51d455808332166)

```sh
# remote
git remote add origin <remoteAddress> # 指定 remote origin
git remote
git remote show origin # 显示远程库 origin 里的资源

git push
git clone | checkout | pull | fetch

# branch check
git branch -a # 查看所有的分支, 包括远程
git branch -r # 查看远程所有分支
# branch modify
git checkout -b master dev # create a new branch
git checkout master # move to a branch
git rebase # 分支变基
git rebase–interactive # 交互式分支变基

# status & check
git status # 查看当前本地状态
git show <hash> # show changes in one commit, if nothing as hash, show last commit changes
git diff # 查看本地 unstaged changes
git diff --staged #or git diff --cached 查看本地 staged changes
git blame # 文件逐行追溯
git clean # 清除工作区未跟踪文件

## remove local changes
git checkout -- <file> # 丢弃工作区上某文件修改
git reset HEAD <file>
git reset --hard HEAD^^
git reset --hard <hash>

git log -p -2

# ! 提供类似 GUI 工具的 log 展示
git log --graph --date=relative --pretty=tformat:'%Cred%h%Creset -%C(auto)%d%Creset %s %Cgreen(%an %ad)%Creset'

git reflog  //check #hash history

# modify files
git rm <file>
git mv 重命名


git branch dev

# Rename / delete a branch
# 全过程
git branch new-branch origin/old-branch # fork 一个新 branch
git push origin --set-upstream new-branch-name # 推送新 branch
git push origin :old-branch-name # 删除远程 branch
git branch -D {branchName} # 删除 local branch

# Then, to see the old branch name, each client of the repository would have to do:
git fetch origin
git remote prune origin

# Accept all ours / theirs change
git checkout —theirs ./
git fetch —all

# 还原单个文件
git checkout origin/master [filename]
git reset <hash> <filename> # 重置改变分支 “游标” 指向
git revert # 反转提交

# submit changes
git push --set-upstream origin <branch> # Push to a new remote branch

# 清理远程 repo:（e.g. 清除前缀为 deploy 的 branch）
git branch -r | awk -F/ '/\/deploy/{print $2}' | xargs -I {} git push origin :{}

# 查看有哪些 matched pattern branch, 如 查询前缀为 deploy 的
git branch -r | awk -F/ '/\/deploy/{print $2}'

```
