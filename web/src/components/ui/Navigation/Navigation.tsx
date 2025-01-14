import { useNavigate, useLocation } from 'react-router-dom'

import { URLS } from '@allwagelab/constants'
import { useAuth } from '@allwagelab/message-bus'

import { useAxiosPrivate } from '@/hooks'

const NAV_LIST = [
  {
    name: '홈',
    path: URLS.APP_HOME,
  },
  {
    name: '근무 관리',
    path: URLS.APP_SCHEDULE,
  },
  {
    name: '직원 관리',
    path: URLS.APP_EMPLOYEE,
  },
]

function Navigation() {
  const auth = useAuth()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const axiosPrivate = useAxiosPrivate()

  const onClickNavItem = (path: string) => {
    navigate(path)
  }

  const onClick = async () => {
    try {
      const response = await axiosPrivate.get('/company/info')
      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <aside>
      <ul>
        {NAV_LIST.map(item => {
          const { name, path } = item
          return (
            <li
              key={path}
              className={pathname === path ? 'active' : ''}
              onClick={() => onClickNavItem(path)}
            >
              {name}
            </li>
          )
        })}
      </ul>
      <br />
      <button type="button" onClick={onClick}>
        api request(/w Auth)
      </button>
      <br />
      <span>auth: {JSON.stringify(auth)}</span>
    </aside>
  )
}

export default Navigation
