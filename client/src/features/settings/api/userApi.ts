import type { UpdateUserProfileInput, UserProfile } from "../types";

const USERS_API_URL = "https://dummyjson.com/users";

export const getUserProfile = async (userId: number): Promise<UserProfile> => {
  const response = await fetch(`${USERS_API_URL}/${userId}`);

  if (!response.ok) {
    throw new Error("Failed to load user profile");
  }

  return response.json();
};

export const updateUserProfile = async (
  userId: number,
  input: UpdateUserProfileInput,
): Promise<UserProfile> => {
  const response = await fetch(`${USERS_API_URL}/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error("Failed to update user profile");
  }

  return response.json();
};
