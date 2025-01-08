import { useNavigate, useLocation } from 'react-router-dom'

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

  const onClickNavItem = (path: string) => {
    navigate(path)
  }

  return (
    <aside>
      <ul>
        {NAV_LIST.map(item => {
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
    </aside>
  )
}

export default Navigation
