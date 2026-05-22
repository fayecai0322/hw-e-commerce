import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserProfile, updateUserProfile } from "../api/userApi";
import type { UpdateUserProfileInput } from "../types";

export const userKeys = {
  all: ["user"] as const,
  profile: (userId: number) => [...userKeys.all, "profile", userId] as const,
};

export const useUserProfile = (userId?: number) => {
  return useQuery({
    queryKey: userKeys.profile(userId ?? 0),
    queryFn: () => getUserProfile(userId!),
    enabled: Boolean(userId),
  });
};

export const useUpdateUserProfile = (userId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: UpdateUserProfileInput) =>
      updateUserProfile(userId, input),
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(userKeys.profile(userId), updatedUser);
    },
  });
};
