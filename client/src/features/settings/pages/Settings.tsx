import { Card, Container, Text, Title } from "@mantine/core";
import { ErrorMessage } from "../../../components/ui/ErrorMessage";
import { Spinner } from "../../../components/ui/Spinner";
import { useAuth } from "../../auth/context/AuthContext";
import { ProfileForm } from "../components/ProfileForm";
import { useUpdateUserProfile, useUserProfile } from "../hooks/useUserProfile";

const Settings = () => {
  const { user, isAuthenticated } = useAuth();

  const userId = user?.id;

  const {
    data: profile,
    isLoading,
    isError,
    error,
  } = useUserProfile(userId);

  const updateUserProfileMutation = useUpdateUserProfile(userId ?? 0);

  if (!isAuthenticated) {
    return (
      <Container size="md" py="xl">
        <Title order={1} mb="xl">
          Settings
        </Title>
        <Card shadow="sm" padding="xl" radius="md" withBorder>
          <Text>Please log in to view settings.</Text>
        </Card>
      </Container>
    );
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return (
      <Container size="md" py="xl">
        <ErrorMessage message={error.message} />
      </Container>
    );
  }

  if (!profile) {
    return null;
  }

  return (
    <Container size="md" py="xl">
      <Title order={1} mb="xl">
        Settings
      </Title>

      <Card shadow="sm" padding="xl" radius="md" withBorder>
        <ProfileForm
          user={profile}
          isSubmitting={updateUserProfileMutation.isPending}
          onSubmit={(values) => updateUserProfileMutation.mutate(values)}
        />
      </Card>
    </Container>
  );
};

export default Settings;
