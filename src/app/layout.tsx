import type { Metadata } from 'next'
import './globals.css'
import { MensagemContextProvider } from '@/context/ContextMensagemProvider'
import Provider from '@/providers/provider'
import PerfilContextProvider from '@/context/ContextPerfilProvider'



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
      <Provider>
        <PerfilContextProvider>
          <MensagemContextProvider>
            <body>
              {children}
            </body>
          </MensagemContextProvider>
        </PerfilContextProvider>
      </Provider>
    </html>
  )
}
