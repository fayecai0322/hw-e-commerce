import {
  Alert,
  Button,
  Card,
  Container,
  PasswordInput,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";

const Signup = () => {
  return (
    <Container size="xs" py="xl">
      <Card shadow="md" padding="xl" radius="md" withBorder>
        <Title order={2} mb="md" ta="center">
          Signup
        </Title>

        <Stack>
          <Alert color="blue" icon={<IconInfoCircle size={18} />}>
            Signup is not available yet. Please use the demo login account for
            now.
          </Alert>

          <TextInput label="Username" placeholder="Choose a username" disabled />
          <TextInput label="Email" placeholder="you@example.com" disabled />
          <PasswordInput
            label="Password"
            placeholder="Create a password"
            disabled
          />

          <Button disabled fullWidth>
            Create Account
          </Button>
        </Stack>
      </Card>
    </Container>
  );
};

export default Signup;
