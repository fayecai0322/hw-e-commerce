import { useState } from "react";
import {
  Alert,
  Button,
  Card,
  Container,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { IconAlertCircle, IconCheck } from "@tabler/icons-react";
import { useForm } from "react-hook-form";

import { useAuth } from "../context/AuthContext";
import type { LoginCredentials } from "../types";

const Login = () => {
  const { login, user, isAuthenticated } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginCredentials>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (credentials: LoginCredentials) => {
    setErrorMessage("");

    try {
      await login(credentials);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Unable to login"
      );
    }
  };

  return (
    <Container size="xs" py="xl">
      <Card shadow="md" padding="xl" radius="md" withBorder>
        <Title order={2} mb="md" ta="center">
          Login
        </Title>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack>
            {isAuthenticated && (
              <Alert color="green" icon={<IconCheck size={18} />}>
                Logged in as {user?.username}
              </Alert>
            )}

            {errorMessage && (
              <Alert color="red" icon={<IconAlertCircle size={18} />}>
                {errorMessage}
              </Alert>
            )}

            <TextInput
              label="Username"
              placeholder="emilys"
              error={errors.username?.message}
              {...register("username", {
                required: "Username is required",
              })}
            />

            <PasswordInput
              label="Password"
              placeholder="emilyspass"
              error={errors.password?.message}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />

            <Button type="submit" loading={isSubmitting} fullWidth>
              Login
            </Button>

            <Text size="sm" c="dimmed" ta="center">
              Test account: emilys / emilyspass
            </Text>
          </Stack>
        </form>
      </Card>
    </Container>
  );
};

export default Login;
