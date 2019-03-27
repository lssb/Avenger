# Avenger Torrent

> 一个用 nodejs 和 Vue 建立的找片找资源下载资源一体的网站 


## 项目来源

> 之前想看某系列的电影，本来的打算是去rarbg找资源，然后用transmission下载下来再看。可是rarbg不能用中文名去查，所以要先去某度找电影的英文名或其他名字，然后去rarbg找资源，最后再添加到transmission里面。。。。这么长的流程走完也就没有兴趣再看电影了。。所以打算做一个这样子的平台。。

> 该系列电影最终还是怒冲某酷会员然后在线看完了。。。

> 本项目仅适用于本人


## 功能介绍

> 根据中文名找电影的原名，然后用原名去rarbg搜索，然后将结果导入到transmission的下载列表里面

> 本人非计算机专业学生，也非相关从业人员，本项目因爱好而来。代码规范什么的其实我不太懂。

>暂时无法从页面上设置transmission的地址，端口，用户名和密码，需要从源码中编辑并重新build


## build

``` bash
# 在项目根目录中安装依赖（packages.json中有很多无用的尚未移除。）
npm install

# 安装之后需要对安装的module做一些一些改动
# 编辑
node_modules\transmission\lib\transmission.js
# 将435行附近的
'Time': new Date(),
# 注释掉，否则后续过程中会出错。
// 'Time': new Date(),
# build
npm run build

# 运行服务器
cd server
node index.js
```


## 关于transmission module中的错误

>node模块transmission在向transmission服务器通讯发送请求的过程中，在header中加入了time这个不需要的参数，可是这个参数如果不去掉，会出现如下错误
```$xslt
TypeError: The header content contains invalid characters
    at validateHeader (_http_outgoing.js:494:11)
    at ClientRequest.setHeader (_http_outgoing.js:498:3)
    at new ClientRequest (_http_client.js:173:14)
    at Object.request (http.js:38:10)
    at module.exports.Transmission.callServer (E:\file\code\Avenger\node_modules\_transmission@0.4.9@transmission\lib\transmission.js:488:41)
    at module.exports.Transmission.addTorrentDataSrc (E:\file\code\Avenger\node_modules\_transmission@0.4.9@transmission\lib\transmission.js:100:10)
    at module.exports.Transmission.addUrl (E:\file\code\Avenger\node_modules\_transmission@0.4.9@transmission\lib\transmission.js:84:10)
    at router.all (E:\file\code\Avenger\server\api.js:64:16)
    at Layer.handle [as handle_request] (E:\file\code\Avenger\node_modules\_express@4.16.3@express\lib\router\layer.js:95:5)
    at next (E:\file\code\Avenger\node_modules\_express@4.16.3@express\lib\router\route.js:137:13)
```
> 出现这个问题是因为transmission模块的作者在获取时间的时候利用
```new Date()``` 函数，然而在中文环境中使用这个参数取到的时间是北京时间，形如
```
Tue May 29 2018 16:36:18 GMT+0800 (中国标准时间)
```
括号里的中文导致了上面的那个错误。 我现在不会拦截请求，不过transmission rpc的官方文档中也没有说明这个参数是必须的，所以干脆去掉了。
>参考 https://www.cnblogs.com/rubylouvre/p/6127190.html?utm_source=tuicool&utm_medium=referral

## 后续计划

> 如果这个项目有幸可以可能帮到一些人，我就会继续完善这个项目

>>1. 在页面上添加设置选项，可以在页面中设置transmission的host,port,uesrname and password等
>>2. 添加其他的资源来源

## 其他

> demo： https://lssb.github.io/Avenger/

