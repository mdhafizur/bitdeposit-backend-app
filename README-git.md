```
To pull changes from a remote repo to current local repository

$ git pull origin [branch-name] --no-rebase


$ git log --author="Hafiz" --pretty=tformat: --numstat | awk '{ add += $1; subs += $2; loc += $1 - $2 } END { printf "added lines: %s, removed lines: %s, total lines: %s\n", add, subs, loc }' - 

```