export interface UserProfile {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image?: string;
}

export interface UpdateUserProfileInput {
  firstName: string;
  lastName: string;
  email: string;
}
