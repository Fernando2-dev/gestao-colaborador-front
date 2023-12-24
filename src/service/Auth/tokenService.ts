const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN_KEY';
export const tokenService = {
  save(accessToken: any) {
    globalThis?.localStorage?.setItem(ACCESS_TOKEN_KEY, accessToken);
  },
  get() {
    return globalThis?.localStorage?.getItem(ACCESS_TOKEN_KEY);
    
  },
  delete() {
    globalThis?.localStorage?.removeItem(ACCESS_TOKEN_KEY);
  }
}