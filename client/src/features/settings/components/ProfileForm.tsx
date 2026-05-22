import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Stack, TextInput } from "@mantine/core";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import type { UpdateUserProfileInput, UserProfile } from "../types";

const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface ProfileFormProps {
  user: UserProfile;
  isSubmitting: boolean;
  onSubmit: (values: UpdateUserProfileInput) => void;
}

export const ProfileForm = ({
  user,
  isSubmitting,
  onSubmit,
}: ProfileFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    },
  });

  useEffect(() => {
    reset({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  }, [user, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack>
        <TextInput
          label="First name"
          {...register("firstName")}
          error={errors.firstName?.message}
        />

        <TextInput
          label="Last name"
          {...register("lastName")}
          error={errors.lastName?.message}
        />

        <TextInput
          label="Email"
          {...register("email")}
          error={errors.email?.message}
        />

        <Button type="submit" loading={isSubmitting}>
          Save Changes
        </Button>
      </Stack>
    </form>
  );
};
