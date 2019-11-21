import React from "react";
import { Button, Container, Grid, Icon, List } from "semantic-ui-react";
import Greeter from "./greeter";

const AppRoot: React.FC<{}> = (props: {}) => {
  return (
    <Container>
      <Grid>
        <Grid.Row>
          <Grid.Column textAlign="center">
            <Greeter name="Phoenix"></Greeter>
            <Button primary>Primary</Button>
            <Button secondary>Secondary</Button>
            <Button>Button</Button>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column>
            <h2>Resources</h2>
            <List>
              <List.Item>
                <Icon name="circle outline" />
                <List.Content>
                  <a href="https://hexdocs.pm/phoenix/overview.html">
                    Guides &amp; Docs
                  </a>
                </List.Content>
              </List.Item>
              <List.Item>
                <Icon name="circle outline" />
                <List.Content>
                  <a href="https://github.com/phoenixframework/phoenix">
                    Source
                  </a>
                </List.Content>
              </List.Item>
              <List.Item>
                <Icon name="circle outline" />
                <List.Content>
                  <a href="https://github.com/phoenixframework/phoenix/blob/v1.4/CHANGELOG.md">
                    v1.4 Changelog
                  </a>
                </List.Content>
              </List.Item>
            </List>
          </Grid.Column>
          <Grid.Column>
            <h2>Help</h2>
            <List>
              <List.Item>
                <Icon name="circle outline" />
                <List.Content>
                  <a href="https://elixirforum.com/c/phoenix-forum">Forum</a>
                </List.Content>
              </List.Item>
              <List.Item>
                <Icon name="circle outline" />
                <List.Content>
                  <a href="https://webchat.freenode.net/?channels=elixir-lang">
                    #elixir-lang on Freenode IRC
                  </a>
                </List.Content>
              </List.Item>
              <List.Item>
                <Icon name="circle outline" />
                <List.Content>
                  <a href="https://twitter.com/elixirphoenix">
                    Twitter @elixirphoenix
                  </a>
                </List.Content>
              </List.Item>
            </List>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default AppRoot;
