# FAQ

## 升级失败

大部分升级失败可以通过`git reset --hard && git pull && bash install.sh`解决。如果还是不行，可以选择重新安装。

## 部署失败

**为什么我不能部署博客？503错误？**

Hexo-editor仅仅帮你运行`hexo deploy`和`git pull/push`，以此来完成部署和同步工作，你需要自行配置这几个命令。以下是操作和命令的对照表

- 部署：`hexo g -d`
- 同步到git：`git add . && git commit && git push`

## 载入失败

**为什么遇到了404错误？**

刷新页面就可以。原因是本地数据过时了，和服务器的文章id无法对应。