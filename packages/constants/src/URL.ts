const APP_URL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://allwage.com'

const APP_HOME_URL = `${APP_URL}/home`

const APP_LOGIN_URL = `${APP_URL}/login`

const APP_SCHEDULE_URL = `${APP_URL}/schedule`

export const URL = {
  APP: APP_URL,
  HOME: APP_HOME_URL,
  LOGIN: APP_LOGIN_URL,
  SCHEDULE: APP_SCHEDULE_URL,
}
