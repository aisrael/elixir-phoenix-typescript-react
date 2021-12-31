TypeScript & React with Phoenix 1.6
===

**Elixir, Phoenix, TypeScript, and React – the 2022 Edition**

> This is the 2022 update to my earlier [article](https://medium.com/@alistairisrael/elixir-phoenix-typescript-and-react-2020-edition-32ceb753705). The source code to that still lives in this repository under the (detached) [`2020`](https://github.com/aisrael/elixir-phoenix-typescript-react/tree/2020) branch.
>
> This is the accompanying source code to my article [TypeScript & React with Phoenix 1.6]() on Medium.com.

---

The release of [Phoenix 1.6](https://www.phoenixframework.org/blog/phoenix-1.6-released) brings with it a couple of notable improvements, such as HEEx templating. To me, though, the most remarkable thing that improves developer experience was dropping webpack and node in favor of [esbuild](https://github.com/evanw/esbuild).

Not only does esbuild promise faster build times, _it supports TypeScript and .jsx/.tsx out of the box!_

The entire process has become so streamlined that in this article we can skip entire sections from its predecessors!

With that out of way, let's go ahead and setup Elixir and Phoenix 1.6 with TypeScript and React.

### Prerequisites

This guide assumes you already have the following set up:

- **Erlang** (24.2+)
- **Elixir** (1.13+)
- **npm** (7.6.0 as of this writing)
- **git**
- **Docker** with **Docker Compose** (for running PostgreSQL)

On macOS, the easiest way to get started is to install [Homebrew](https://brew.sh/), then use Homebrew to install Node, Git, Docker, and [asdf](https://asdf-vm.com/).

We can then use `asdf` to install both Erlang and Elixir:

```
$ asdf plugin add erlang
$ asdf install erlang 24.2
$ asdf global erlang 24.2

$ asdf plugin add elixir
$ asdf install elixir 1.13.1
$ asdf global elixir 1.13.1
```

## Phoenix

> For those already familiar with Elixir and Phoenix, you may wish to skip ahead straight to integrating TypeScript and React with Phoenix 1.6

If you haven't already done so, let's install Phoenix following the [Phoenix installation instructions](https://hexdocs.pm/phoenix/installation.html#content).

First we'll want to get the Hex package manager:

```
$ mix local.hex
Are you sure you want to install "https://repo.hex.pm/installs/1.13.1/hex-1.0.1.ez"? [Yn]
```

Then install the Phoenix application generator:

```
$ mix archive.install hex phx_new
Resolving Hex dependencies...
Dependency resolution completed:
New:
  phx_new 1.6.5
* Getting phx_new (Hex package)
All dependencies are up to date
Compiling 11 files (.ex)
Generated phx_new app
Generated archive "phx_new-1.6.5.ez" with MIX_ENV=prod
Are you sure you want to install "phx_new-1.6.5.ez"? [Yn]
```

You can check if Phoenix installation went well using `mix phx.new --version`

```
$ mix phx.new --version
Phoenix installer v1.6.5
```

### Generate the Phoenix app

```
$ mix phx.new hello --umbrella
```

This will generate an Elixir + Phoenix [umbrella app](https://elixir-lang.org/getting-started/mix-otp/dependencies-and-umbrella-projects.html) named `hello_umbrella` in the current directory with the following directory structure:

```
.
├── apps
│   ├── hello
│   └── hello_web
└── config
```


The two Elixir apps are `/apps/hello` and `apps/hello_web`.

Each app will its own dependency configuration, though the entire umbrella project will have a shared dependency library (in `/deps`) for all apps.

All child apps also share the same root configuration in the `/config` folder.

We start with an umbrella project because it helps organise code as the application grows in size and complexity. I've also found that it's easier to refactor an umbrella project down to a single app project that it is to go the other way around.


### PostgreSQL, MySQL, or --no-ecto

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


### Git

At this point, we should start using Git to track our changes. If you don't need to use Git, feel free to skip to the next section.

```
$ cd hello_umbrella
~/hello_umbrella $
```

```
$ git init
Initialized empty Git repository in /Users/aisrael/hello_react_umbrella/.git/
$ git add -A
$ git commit -m "mix phx.new hello --umbrella"
```

### Docker Compose

Since we'll be needing a PostgreSQL server to run our Phoenix app, for local development and testing purposes we've found that using Docker, specifically, Docker Compose makes dealing with service dependencies a breeze.

Create the following `docker-compose.yml` in the project root:

```
version: "3"
services:
  postgres:
    image: postgres:14.1
    ports:
      - 5432:5432
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: hello_dev
```

Note that we configure PostgreSQL (using the `POSTGRES_*` environment variables) to work with the generated Phoenix app defaults.

Then, to run Postgres in the background you only need to go:

```
docker-compose up -d
[+] Running 2/2
 ⠿ Network elixir-phoenix-typescript-react_default       Created
 ⠿ Container elixir-phoenix-typescript-react_postgres_1  Started
```

For other Docker Compose commands please just visit [https://docs.docker.com/compose/reference/](https://docs.docker.com/compose/reference/)

If you can't or don't want to use Docker & Docker Compose, you'll have to install PostgreSQL by hand on your local workstation. Make sure to configure it with the same defaults generated by `mix phx.new`, or, modify the respective `config/*.exs` files with the appropriate credentials.


### Welcome to Phoenix!

At this point we should be able to run our Phoenix application. From the project root (you may wish to run this in a new terminal window or tab), just go:

```
~/hello_umbrella$ mix phx.server
```

(If you get a prompt asking if you want to install `rebar3`, just go ahead and say yes.)

Now if we visit [http://localhost:4000](http://localhost:4000) we should be able to see the familiar "Welcome to Phoenix!" page.

## Typescript in Phoenix 1.6

The best thing about Phoenix 1.6 is that it ditched `webpack` in favor of [`esbuild`](https://github.com/evanw/esbuild) .

Not only does this promise shorter build times, `esbuild` _supports Typescript out of the box!_—no further tooling or configuration needed!

### Welcome to Phoenix with Typescript!

To demonstrate Typescript in action, let's create a new Typescript module `apps/hello_web/assets/js/greeter.ts`:

```
function greet(name: string): string {
  return "Welcome to " + name + " with TypeScript!";
}

export default greet;
```

Then, in `assets/js/app.js` add the following lines toward the end:

```
import greet from "./greeter";

document.querySelector("section.phx-hero h1").innerHTML = greet("Phoenix");
```

Refresh the page at [localhost:4000](http://localhost:4000) and you should now see it say "Welcome to Phoenix with Typescript!".

That's it! No need for `npm` or fiddling with `tsconfig.json` and `webpack.config.js`!

---

## React

Now we can add React into the mix. For this, we'll now need `npm` to fetch and install the necessary packages.

First, make sure we're in the `apps/hello_web/assets` directory:

```
~/hello_umbrella$ cd apps/hello_web/assets
```

From there, we'll issue:

```
npm install --save react react-dom
npm install --save-dev @types/react @types/react-dom
```

### Our First Component

Let's rename `greeter.ts` to `greeter.tsx` (similar to how you would rename a regular `.js` file to `.jsx`).

Then, replace the contents of `greeter.tsx` with a `Greeter` React component:

```
import React from "react";

interface GreeterProps {
    name: string;
}
const Greeter: React.FC<GreeterProps> = (props: GreeterProps) => {
    const name = props.name;
    return (
        <section className="phx-hero">
          <h1>Welcome to {name} with TypeScript and React!</h1>
          <p>Peace-of-mind from prototype to production</p>
        </section>
    );
};

export default Greeter;
```

### Welcome to Phoenix with TypeScript and React

Next, edit the file apps/hello_web/lib/hello_wieb/templates/page/index.html.heex and replace the entire section that goes:

```
<section class="phx-hero">
  <h1><%= gettext "Welcome to %{name}!", name: "Phoenix" %></h1>
  <p>Peace of mind from prototype to production</p>
</section>
```

With just

```
<div id="greeting"/>
```

Now, we'll need to rename `apps/hello_web/assets/js/app.js` to `app.jsx`, and replace the last two lines we added earlier with:

```
import React from "react";
import ReactDOM from "react-dom";

import Greeter from "./greeter";

const greeting = document.getElementById("greeting");
ReactDOM.render(<Greeter name="Phoenix" />, greeting);
```

(We need to rename it from `.js` to `.jsx` to avoid a syntax error in the last line.)

Finally, we'll need to edit `config/config.exs` to tell esbuild to look for `app.jsx` instead of `app.js`. Look for the section starting with `# Configure esbuild` and replace the line that goes

```
~w(js/app.js --bundle --target=es2017 --outdir=../priv/static/assets --external:/fonts/* --external:/images/*),
```

with

```
~w(js/app.jsx --bundle --target=es2017 --outdir=../priv/static/assets --external:/fonts/* --external:/images/*)
```

At this point, we might have to restart our Phoenix server (press `Ctrl+C` then `(a)bort)` and restart it again with `mix phx.server`.

When we reload [http://localhost:4000](http://localhost:4000), we should then be greeted with "Welcome to Phoenix with TypeScript and React!".
