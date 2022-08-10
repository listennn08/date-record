/// <reference types="vite/client" />
/// <reference types="vite-plugin-pages/client-react" />

import { AttributifyAttributes } from 'windicss/types/jsx'

declare module 'react' {
  interface HTMLAttributes<T> extends AttributifyAttributes { }
}
