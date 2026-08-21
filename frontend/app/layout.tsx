import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Games Store',
  description:
    'Gestiona y explora el catálogo de juegos de tu tienda de manera eficiente y sencilla.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
