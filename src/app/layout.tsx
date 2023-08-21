import type { Metadata } from 'next'
import './globals.css'


export const metadata: Metadata = {
  title: '📚 Midulibritos',
  description: 'Los libritos de Midu'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='es'>
      <body>
        <main className='px-4 m-auto max-w-screen-lg grid min-h-screen grid-rows-[60px,1fr,60px] gap-4'>
          <nav className='flex items-center text-2xl'>📚 Midulibritos</nav>
          <section>
          {children}
          </section>
          <footer className='flex items-center justify-center'>Con ❤️ por Carlos</footer>
        </main>
      </body>
    </html>
  )
}
