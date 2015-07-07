# Mates

After a graduation photo uploaded, claim everyone selves. So you can connect with your classmates, and others can see your school career timeline and your recently information.

## Inspiration

When my friend show me our junior high school graduation photo, I'm curious of where my classmates later gone, and what're they doing now, maybe some of them in the same company with me. And some people that I can remember, but I forgot their name. A lot of memories in my mind, but I really have no idea to get more information, so "Mates" was born.

## How it works

open the [shared] link:
* claim yourself
* tag anybody you know with a name or other profiles
* upload more graduation photo
* share the link
* browse what you want


## Site map
* /app/photo

  Photo and photo information
* /app/photo/map

  Browse photo and highlight one's face
* /app/search

  Search photo
* /app/account

  Account information

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
