import type { ReactNode } from 'react'

export const NavItem = ({ children }: { children: ReactNode }) => (
  <li flex="~" items="center" p="x-1">{children}</li>
)

