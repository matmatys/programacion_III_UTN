export interface AuthTokens {
  // Short-lived token used in Authorization header.
  accessToken: string;
  // Long-lived token used to get a new access token.
  refreshToken: string;
  // Access token duration in seconds (for UI/reference).
  expiresIn: number;
}
