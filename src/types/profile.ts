export type ProfileType = {
  name: string;
  avatar?: File;
  link_fb?: string;
  link_tt?: string;
};

export interface UpdateProfileResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      id: number;
      name: string;
      email: string;
      email_verified_at: string;
      avatar: string;
      created_at: string;
      link_fb: string;
      link_tt: string;
      role: string;
      updated_at: string;
    };
    avatar_url: string;
  };
}

export interface ProfileResponseError {
  data: {
    errors: object;
    message: string;
  };
  status: number;
}
