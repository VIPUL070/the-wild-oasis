import SignupForm from "../features/authentication/SignupForm";
import Heading from "../ui/Heading";
import Logo from "../ui/Logo";
import styled from "styled-components";

const StyledContainer = styled.div`
  height: 100dvh;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4rem;
  align-items: center;
  justify-content: center;
`;

function SignUp() {
  return (
    <StyledContainer>
      <Logo />
      <Heading as="h1">Create a new user</Heading>
      <SignupForm />
    </StyledContainer>
  );
}

export default SignUp;
