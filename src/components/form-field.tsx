import { ReactNode } from 'react';
import { toArray } from '../utils';

export default function FormField({ children }: { children: ReactNode | ReactNode[] }) {
  return (
    <div flex="~" items="center" justify="between" p="y-2">
      {toArray(children).map((child) => child)}
    </div>
  )
}
