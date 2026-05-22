import { Button, Card, Container, Text, Title } from "@mantine/core";
import { useAuth } from "../context/AuthContext";

const Login = () => {
const { login, user, isAuthenticated } = useAuth();

  const handleLogin = async () => {
    await login({
      username: "emilys",
      password: "emilyspass",
    });
  };

  return (
    <Container size="xs" py="xl">
      <Card shadow="md" padding="xl" radius="md" withBorder>
        <Title order={2} mb="md" ta="center">
          <button onClick={handleLogin}>Login</button>
          {isAuthenticated && <Text mt="md">Logged in as {user?.username}</Text>}
        </Title>
      </Card>
    </Container>
  );
};

export default Login;

