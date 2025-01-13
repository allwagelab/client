export interface User {
  name: string
  hasBusinessInfo: boolean
  profile: string | null
  profileS3Url?: string
}
