import type { Metadata } from 'next'
import './globals.css'
import { Sidebar } from '@/components/Sidebar'

import { MensagemContextProvider } from '@/context/ContextMensagemProvider'

export const metadata: Metadata = {
  title: 'Mini Jira'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br" className='antialiased'>
      <MensagemContextProvider>
        <body>
          {children}
        </body>
      </MensagemContextProvider>
    </html>
  )
}
