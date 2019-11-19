import React from "react";
import { Grid } from "semantic-ui-react";
import Greeter from "./greeter";

const AppRoot: React.FC<{}> = (props: {}) => {
  return (
    <div>
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <Greeter name="Phoenix"></Greeter>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column>
            <h2>Resources</h2>
            <ul>
              <li>
                <a href="https://hexdocs.pm/phoenix/overview.html">
                  Guides &amp; Docs
                </a>
              </li>
              <li>
                <a href="https://github.com/phoenixframework/phoenix">Source</a>
              </li>
              <li>
                <a href="https://github.com/phoenixframework/phoenix/blob/v1.4/CHANGELOG.md">
                  v1.4 Changelog
                </a>
              </li>
            </ul>
          </Grid.Column>
          <Grid.Column>
            <h2>Help</h2>
            <ul>
              <li>
                <a href="https://elixirforum.com/c/phoenix-forum">Forum</a>
              </li>
              <li>
                <a href="https://webchat.freenode.net/?channels=elixir-lang">
                  #elixir-lang on Freenode IRC
                </a>
              </li>
              <li>
                <a href="https://twitter.com/elixirphoenix">
                  Twitter @elixirphoenix
                </a>
              </li>
            </ul>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default AppRoot;
