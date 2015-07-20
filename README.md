# Mates

After a school photo is uploaded by a user, it will be shared through social channels to allow others to tag themselves. In addition to having users tag themselves, the application can leverage facial recognition matching to automatically match and suggest high probability matches. The tagged data will allow users to see each other’s school career timeline, share with their friends and connect with previously forgotten classmates.

## Inspiration

When my friend show me our junior high school graduation photo, I'm curious of where my classmates later gone, and what're they doing now, maybe some of them in the same company with me. And some people that I can remember, but I forgot their name. A lot of memories in my mind, but I really have no idea to get more information, so "Mates" was born.

## How it works [in social layer]

open the [shared] link:
* claim yourself
* tag anybody you know with a name or other profiles
* upload more graduation photo
* share the link
* browse what you want

## Getting Started

Install dependencies and run your app locally.

### Install Dependencies

We have two kinds of dependencies in this project: tools and angular framework code.  The tools help
us manage and test the application.

* We get the tools we depend upon via `npm`, the [node package manager][npm].
* We get the angular code via `bower`, a [client-side code package manager][bower].

We have preconfigured `npm` to automatically run `bower` so we can simply do:

```
npm install
```

Behind the scenes this will also call `bower install`.  You should find that you have two new
folders in your project.

* `node_modules` - contains the npm packages for the tools we need
* `app/bower_components` - contains the angular framework files

*Note that the `bower_components` folder would normally be installed in the root folder but
angular-seed changes this location through the `.bowerrc` file.  Putting it in the app folder makes
it easier to serve the files by a webserver.*

### Run the Application

We have preconfigured the project with a simple development web server.  The simplest way to start
this server is:

```
npm start
```

Now browse to the app at `http://localhost:8000/app/index.html`.


## Site map
* `/app/photo` - Photo and photo information
* `/app/photo/review` - Browse photo and highlight one's face
* `/app/search` - Search photo
* `/app/account` - Account information

## API

### POST
* 上传照片：
```
  /photo/add
  - 照片类型（默认“毕业照”）
  - 学校
  - 学校等级（幼儿园，小学，初中，高中，本科，研究生）
  - 毕业年份
  - 班级
  - 班级描述
  - 照片
```
* 添加个人资料：
```
  /people/add
  - 名字
  - 当前城市
  - 工作单位
  - 最高学历
  - 最高学府
  - 业务领域
  - 近照
  - 是我本人？（认领，绑定账号）
```
* 关注：
```
/people/follow
```
* 点赞：
```
/people/star
```

### GET
* 获取照片信息：
```
  /photo/get?photoId=xxx
  - 照片url
  - 学校
  - 学校所在地区
  - 毕业年份
  - 班级
  - 班级描述
```
* 获取照片中所有人的信息：
```
  /photo/getPeople?photoId=xxx
  - 头像
  - 名字
  - 当前城市
  - 工作单位
  - 最高学历
  - 最高学府
  - 业务领域
  - 是否认领
```
* 获取个人信息：
```
  /people/get?peopleId=yyy
  - 头像
  - 名字
  - 当前城市
  - 工作单位
  - 最高学历
  - 最高学府
  - 业务领域
  - 是否认领
```
* 查询照片：
```
  /photo/search
  - 学校
  - 毕业年份
  - 班级
```
* 查询个人：
```
  /people/search
  - 学校
  - 毕业年份
  - 班级
  - 名字
```
