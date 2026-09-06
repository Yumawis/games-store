import type { Metadata } from 'next'
import './globals.css'
import { AppHeader } from '../components/common/app-header'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'Games Store',
  description:
    'Gestiona y explora el catálogo de juegos de tu tienda de manera eficiente y sencilla.',
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="es">
      <body>
        <Providers>
          <AppHeader />
          {children}
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
