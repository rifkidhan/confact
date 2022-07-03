namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    MONGODB_URI: string
    GOOGLE_CLIENT_ID: string
    GOOGLE_CLIENT_SECRET: string
    AUTH0_CLIENT_ID: string
    AUTH0_CLIENT_SECRET: string
    AUTH0_DOMAIN: string
    NEXTAUTH_SECRET: string
    NEXTAUTH_URL: string
  }
}
