import { useNavigate, useLocation } from 'react-router-dom'
<<<<<<< HEAD
=======

import { useAxiosPrivate } from '@/hooks'
>>>>>>> develop

const NAV_LIST = [
  {
    name: '홈',
    path: '/home',
  },
  {
    name: '근무 관리',
    path: '/schedule',
  },
]

function Navigation() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
<<<<<<< HEAD
=======
  const axiosPrivate = useAxiosPrivate()
>>>>>>> develop

  const onClickNavItem = (path: string) => {
    navigate(path)
  }
<<<<<<< HEAD
=======

  const onClick = async () => {
    try {
      const response = await axiosPrivate.get('/company/info')
      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }
>>>>>>> develop

  return (
    <aside>
      <ul>
<<<<<<< HEAD
        {NAV_LIST.map(item => {
=======
        {NAV_LIST.map((item) => {
>>>>>>> develop
          const { name, path } = item
          return (
            // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
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
      <button type="button" onClick={onClick}>
        api request(/w Auth)
      </button>
    </aside>
  )
}

export default Navigation
