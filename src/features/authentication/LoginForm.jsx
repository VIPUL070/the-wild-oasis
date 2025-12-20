import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import { useLogin } from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const StyledSpan = styled.span`
  color: blue;
  font-weight: 300;
`
function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isPending: isLoggingIn } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    login(
      { email, password },
      {
        onSettled: () => {
          // Clears fields whether success or error
          setEmail("");
          setPassword("");
        },
      }
    );
  }

  return (
    <>
      <Form type="regular" onSubmit={handleSubmit}>
        <FormRowVertical label="Email address">
          <Input
            type="email"
            id="email"
            // This makes this form better for password managers
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoggingIn}
          />
        </FormRowVertical>
        <FormRowVertical label="Password">
          <Input
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoggingIn}
          />
        </FormRowVertical>
        <FormRowVertical>
          <Button size="large" disabled={isLoggingIn}>
            {isLoggingIn ? <SpinnerMini /> : "Log In"}
          </Button>
        </FormRowVertical>
      </Form>

      <div>
        <h4>Don’t have an account?
          <NavLink to="/signup"><StyledSpan> Sign Up</StyledSpan></NavLink>
        </h4>
      </div>
    </>
  );
}

export default LoginForm;
