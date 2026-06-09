export interface JwtPayloadModel {
  sub: string;
  username: string;
  displayName: string;
  role: string;
  tokenType: 'access' | 'refresh';
}
