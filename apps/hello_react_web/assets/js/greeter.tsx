import React from "react";
import { Container, Segment } from "semantic-ui-react";

interface GreeterProps {
  name: string;
}

const Greeter: React.FC<GreeterProps> = (props: GreeterProps) => {
  const name = props.name;
  return (
    <Segment placeholder>
      <Container textAlign="center">
        <h1>Welcome to {name} with Typescript, React, and Semantic UI!</h1>
        <p>
          A productive web framework that
          <br />
          does not compromise speed or maintainability.
        </p>
      </Container>
    </Segment>
  );
};

export default Greeter;
