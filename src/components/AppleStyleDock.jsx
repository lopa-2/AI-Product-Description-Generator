import {
  HomeIcon,
  Package,
  LayoutDashboard,
  Sparkles,
  SunMoon,
} from 'lucide-react'
import { Dock, DockIcon, DockItem, DockLabel } from './core/dock'
import { useTheme } from '../context/ThemeContext'

export function AppleStyleDock() {
  const { isDark, toggleTheme } = useTheme()

  const data = [
    {
      title: 'Home',
      icon: <HomeIcon className="h-full w-full text-neutral-600 dark:text-neutral-300" />,
      href: '/',
    },
    {
      title: 'Products',
      icon: <Package className="h-full w-full text-neutral-600 dark:text-neutral-300" />,
      href: '#products',
    },
    {
      title: 'Generator',
      icon: <Sparkles className="h-full w-full text-neutral-600 dark:text-neutral-300" />,
      href: '/generator',
    },
    {
      title: 'Dashboard',
      icon: <LayoutDashboard className="h-full w-full text-neutral-600 dark:text-neutral-300" />,
      href: '/dashboard',
    },
  ]

  return (
    <div className="fixed bottom-2 left-1/2 z-50 max-w-full -translate-x-1/2">
      <Dock className="items-end pb-3">
        {data.map((item, idx) => (
          <a href={item.href} key={idx}>
            <DockItem className="aspect-square rounded-full bg-gray-200 dark:bg-neutral-800">
              <DockLabel>{item.title}</DockLabel>
              <DockIcon>{item.icon}</DockIcon>
            </DockItem>
          </a>
        ))}
        <button onClick={toggleTheme} type="button">
          <DockItem className="aspect-square rounded-full bg-gray-200 dark:bg-neutral-800">
            <DockLabel>Theme</DockLabel>
            <DockIcon>
              <SunMoon className="h-full w-full text-neutral-600 dark:text-neutral-300" />
            </DockIcon>
          </DockItem>
        </button>
      </Dock>
    </div>
  )
}