# 预览版记录

## 当前版本

主要添加了用户安全相关配置，改进ui，完善apikey支持

## 临时安装说明

```bash
git clone https://github.com/YuJianghao/winwin-hexo-editor.git
yarn # npm # 安装依赖
node install.js # 运行安装程序
```

在安装程序中需要指定hexo博客目录。详情请查看[文档](https://yujianghao.github.io/winwin-hexo-editor/guide#%E9%85%8D%E7%BD%AEhexo%E5%8D%9A%E5%AE%A2)

请根据安装程序指引完成安装。**注意，部分安装需要在浏览器进行！详情请查看安装程序输出。**

程序开启、关闭、重启方法目前和正式版相同，请查看[文档](https://yujianghao.github.io/winwin-hexo-editor/guide.html)

## 更新日志

### v0.6.0-5

- 新增：用户安全相关配置页
- 新增：日志系统
- 改进：更完善的apikey支持
- 改进：安装程序ui
- 改进：编辑器工具栏ui
- 改进：搜索框ui
- 改进：用户账户设置ui
- 改进：重构大部分关于数据的服务
- 改进：api返回的categories数据格式已改为二维字符串数组
- 改进：用户修改密码需要输入原始密码确认
- 修复：安装程序路由循环跳转bug
- 修复：一些在新建文章时候的bug
- 修复：安装程序不会自动更新子模块地址的bug
- 其他：日常清理无用文件和console.log

### v0.6.0-4

- 修复：文件不能保存的bug
- 修复：修复token.id导致的登录失败
- 新增：高级markdown支持
- 改进：改进登录过期后的UX

### v0.6.0-3

- 修复：边界情况下的保存失败问题
- 改进：日期选择器默认选择当前时间
- 新增：设置页，支持更改密码和hexo目录
- 新增：安装程序

### v0.6.0-2

- 修复：登录页死循环问题
- 修复：路径结尾的斜杠导致的路由问题
- 改进：清除一些无用代码
- 改进：优化路由
- 改进：优化状态管理
- 更新：更新version的api地址
- 更新：更新api文档

### v0.6.0-1

- 更新api地址
- 重组文件结构

### v0.6.0-0

- api-key
- page支持