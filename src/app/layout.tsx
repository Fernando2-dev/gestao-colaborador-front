import type { Metadata } from 'next'
import './globals.css'
import { MensagemContextProvider } from '@/context/ContextMensagemProvider'
import Provider from '@/providers/provider'



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
        <MensagemContextProvider>
          <body>
            {children}
          </body>
        </MensagemContextProvider>
      </Provider>
    </html>
  )
}
