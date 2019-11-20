Elixir, Phoenix, React – the December 2019 Edition
===

"Great", you might say, "yet another article on how to set up Elixir, Phoenix and React!"

I myself have done this too many times over the past year or two, each time stumbling upon or rediscovering dozens of other guides and sample repositories, some still referencing outdated versions of Elixir (1.8.x), Phoenix (1.3.x), and React (pre-hooks).

So I finally decided to take it upon myself to write a _definitive_ December 2019 (I would've wanted to call it "the 2020 Edition", but that'll have to wait for a month or two) guide to setting up Elixir, Phoenix, and React from scratch.

Let's jump right in.

### Prerequisites

This guide assumes you already have the following set up:

* **Elixir** (1.9.4 or better)
* **npm** (@6.11.3 as of this writing)
* **git** (optional, but there's no good reason not to)
* **Docker Compose** (for running PostgreSQL)

If you don't have Elixir (and Erlang) yet, I highly recommend [asdf](https://asdf-vm.com/) to manage Elixir/Erlang versions.

Install [asdf](https://asdf-vm.com/) according to your platform's instructions.

### Phoenix

(If you're already experienced with Elixir Phoenix applications, you may wish to skip [ahead to the Typescript and React parts](#typescript).)

If you haven't already done so, let's install Phoenix following the [Phoenix installation instructions](https://hexdocs.pm/phoenix/installation.html#content). First we'll want to get the Hex package manager:

```
$ mix local.hex
Are you sure you want to install "https://repo.hex.pm/installs/1.8.0/hex-0.20.1.ez"? [Yn] Y
* creating root/.mix/archives/hex-0.20.1
```

Then the Elixir Mix archive:

```
$ mix archive.install hex phx_new 1.4.11
Resolving Hex dependencies...
Dependency resolution completed:
New:
  phx_new 1.4.11
* Getting phx_new (Hex package)
All dependencies are up to date
Compiling 10 files (.ex)
Generated phx_new app
Generated archive "phx_new-1.4.11.ez" with MIX_ENV=prod
Are you sure you want to install "phx_new-1.4.11.ez"? [Yn] Y
* creating /root/.mix/archives/phx_new-1.4.11
```

You can check if Phoenix installation went well using `mix phx.new --version`

```
$ mix phx.new --version
Phoenix v1.4.11
```

#### Generate the Phoenix app

```
$ mix phx.new hello_react --umbrella
```

This will generate an Elixir + Phoenix [umbrella app](https://elixir-lang.org/getting-started/mix-otp/dependencies-and-umbrella-projects.html) named `hello_react_umbrella` in the current directory with the following directory structure:

```
.
├── apps
│   ├── hello_react
│   └── hello_react_web
├── config
└── deps
```

The two Elixir apps are `/apps/hello_react` and `apps/hello_react_web`.

Each app will its own dependency configuration, though the entire umbrella project will have a shared dependency library (in `/deps`) for all apps.

All child apps also share the same root configuration in the `/config` folder.

We start with an umbrella app because it makes it easier to organize code as the application gets bigger and more complex. Besides, we've found that it's easier to refactor an umbrella app project to a single app project than it is to go the other way around.

#### PostgreSQL, MySQL, or --no-ecto

Phoenix by default uses Postgres for its database.

If you want to use MySQL rather than Postgres, then you'll need to generate your Phoenix app using

```
mix phx.new hello_react --umbrella --database mysql
```

If you won't be needing a database or only wish to follow along without one, then create your Phoenix app using

```
mix phx.new hello_react --umbrella --no-ecto
```

The rest of this guide, however, assumes the default which is Postgres.

#### Git

At this point, we should start using Git to track our changes. If you don't need to use Git, feel free to skip to the next section.

```
$ cd hello_react_umbrella
~/hello_react_umbrella $
```

```
$ git init
Initialized empty Git repository in /Users/aisrael/hello_react_umbrella/.git/
$ git add -A
$ git commit -m "Initial commit"
```

#### Docker Compose

Since we'll be needing a PostgreSQL server to run our Phoenix app, for local development and testing purposes we've found that using Docker, specifically, Docker Compose makes dealing with service dependencies a breeze.

Create the following `docker-compose.yml` in the project root:

```
version: "3"
services:
  postgres:
    image: postgres:11.5
    ports:
      - 5432:5432
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: hello_react_dev
```

Note that we configure PostgreSQL (using the `POSTGRES_*` environment variables) to work with the generated Phoenix app defaults.

Then, to run Postgres in the background you only need to go:

```
$ docker-compose up -d
Creating network "hello_react_umbrella_default" with the default driver
Creating hello_react_umbrella_postgres_1 ... done
```

Since Docker Compose is beyond the scope of this article, for other Docker Compose commands please just visit:

* [https://docs.docker.com/compose/reference/overview/](https://docs.docker.com/compose/reference/overview/)

If you can't or don't want to use Docker & Docker Compose, you'll have to install PostgreSQL by hand on your local workstation. Make sure to configure it with the same defaults generated by `mix phx.new`, or, modify the respective `config/*.exs` files with the appropriate credentials.

#### Node

Before we can run our Phoenix application, we need to initialise the generated CSS and Javascript assets.

```
~/hello_react_umbrella$ cd apps/hello_react_web/assets
```

Then, we run `npm install`:

```
~/hello_react_umbrella/apps/hello_web/assets$ npm install

...

added 724 packages from 397 contributors and audited 7793 packages in 19.734s
found 0 vulnerabilities
```

#### Welcome to Phoenix!

At this point we should be able to run our Phoenix application. From the project root (you may wish to run this in a new terminal window or tab):

```
$ mix phx.server
```

Now if we visit [http://localhost:4000](http://localhost:4000) we should be able to see the familiar "Welcome to Phoenix!" page:

![Welcome to Phoenix](https://thepracticaldev.s3.amazonaws.com/i/ns95syjaygx4w31m7uy7.png)

### Typescript

We're ready to start adding Typescript to the frontend.

First, make sure we're back in `apps/hello_react_web/assets/`:

```
$ cd apps/hello_react_web/assets/
~/hello_react_umbrella/apps/hello_react_web/assets$
```

Add the Typescript libraries using:

```
$ npm install --save-dev typescript ts-loader source-map-loader @types/phoenix
```

#### `tsconfig.json`

Afterwards, let's ask Typescript to generate a default `tsconfig.json` for us:

```
$ ./node_modules/.bin/tsc --init
message TS6071: Successfully created a tsconfig.json file.
```

We need to change a few things from the Typescript defaults. Here's a minimal `tsconfig.json` with some of the necessary changes:

```
{
  "compilerOptions": {
    "target": "es5",                          /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019' or 'ESNEXT'. */
    "module": "ESNext",                       /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', or 'ESNext'. */
    "allowJs": true,                          /* Allow javascript files to be compiled. */
    "jsx": "react",                           /* Specify JSX code generation: 'preserve', 'react-native', or 'react'. */
    "outDir": "./dist/",                      /* Redirect output structure to the directory. */
    "strict": true,                           /* Enable all strict type-checking options. */
    "esModuleInterop": true,                  /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'. */
    "forceConsistentCasingInFileNames": true  /* Disallow inconsistently-cased references to the same file. */
  },
  "exclude": [
    "/node_modules/**/*",
  ]
}
```

#### `webpack.config.js`

Next, we'll need to tell Webpack to recognise `.ts` files along with `.js` files:

Open `apps/hello_react_web/assets/webpack.config.js` and change the first module rule to:

```
    rules: [
      {
        test: /\.(j|t)s$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader"
          },
          {
            loader: "ts-loader"
          }
        ]
      },
```

Additionally, add an outermost `"resolve"` key after `"module"` as follows:

```
  resolve: {
    extensions: [".ts", ".js"]
  },
```

#### `app.js`

When we generated our Phoenix app, it created `apps/hello_react_web/assets/js/app.js` with an `import css from "../css/app.css";` line.

This causes problems when that file is parsed by Typescript. You can see a lengthy discussion and several workarounds for this at [this Stackoverflow question](https://stackoverflow.com/questions/41336858/how-to-import-css-modules-with-typescript-react-and-webpack) and on this [page](https://medium.com/@sapegin/css-modules-with-typescript-and-webpack-6b221ebe5f10).

The simplest (though not the best) way to fix this before proceeding (so Webpack will continue to process our `app.css`) is to change that line to use `require`:

```
const _css = require("../css/app.css");
```

Since we don't actually use the variable (we only need it so Webpack can generate our `app.css` file properly), we prepend its name with an underscore to suppress the "unused variable" warning that Typescript would otherwise emit.

#### Welcome to Phoenix with Typescript!

To demonstrate Typescript in action, we'll create a new Typescript module `apps/hello_react_web/assets/js/hello.ts`:

```
function greet(name: string): string {
  return "Welcome to " + name + " with Typescript!";
}

export default greet;
```

Then, in `assets/js/app.js` add the following lines toward the end:

```
import greeting from "./hello";

document.querySelector("section.phx-hero h1").innerHTML = greet("Phoenix");
```

Refresh the page at `localhost:4000` and you should now see it say "Welcome to Phoenix with Typescript!".

![Welcome to Phoenix with Typescript!](https://thepracticaldev.s3.amazonaws.com/i/dkf9oy8jjc55d2j3tsr6.png)

### React

Let's go ahead and add React roughly following the guide at: [https://www.typescriptlang.org/docs/handbook/react-&-webpack.html](https://www.typescriptlang.org/docs/handbook/react-&-webpack.html)

First, add the necessary packages:

```
$ npm install --save react react-dom
$ npm install --save-dev @types/react @types/react-dom
```

Once again we need to reconfigure `webpack.config.js`.

First, let's recognize `*.jsx` and `*.tsx` files:

```
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
```

Also:

```
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },
```

#### Our First Component

First let's rename `apps/hello_react_web/assets/js/hello.ts` to `apps/hello_react_web/assets/js/hello.tsx`:

```
$ mv apps/hello_react_web/assets/js/hello.ts apps/hello_react_web/assets/js/hello.tsx
```

Then, replace the contents of `hello.tsx` with:

```
import React from "react";

interface GreeterProps {
  name: string;
}

const Greeter: React.FC<GreeterProps> = (props: GreeterProps) => {
  const name = props.name;
  return (
    <section className="phx-hero">
      <h1>Welcome to {name} with Typescript and React!</h1>
      <p>
        A productive web framework that
        <br />
        does not compromise speed or maintainability.
      </p>
    </section>
  );
};

export default Greeter;
```

#### Welcome to Phoenix with Typescript and React

Next, in `apps/hello_react_web/lib/hello_react_web/templates/page/index.html.eex`, remove the section:

```
<section class="phx-hero">
  <h1><%= gettext "Welcome to %{name}!", name: "Phoenix" %></h1>
  <p>A productive web framework that<br/>does not compromise speed or maintainability.</p>
</section>
```

And replace it with simply:

```
<div id="greeting"></div>
```

Then, in `apps/hello_react_web/assets/js/app.js`, replace the last few lines with:

```
import React from "react";
import ReactDOM from "react-dom";

import Greeter from "./hello";

const greeting = document.getElementById("greeting");
ReactDOM.render(<Greeter name="Phoenix" />, greeting);
```

Finally (you may neeed to restart Phoenix using `mix phx.server` and wait a while for Webpack to compile everything), when we reload `localhost:4000` we should see "Welcome to Phoenix with Typescript and React!`

!["Welcome to Phoenix with Typescript and React!](https://thepracticaldev.s3.amazonaws.com/i/2z7im19bmfwmtxevw15h.png)
