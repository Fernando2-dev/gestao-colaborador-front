import { Sidebar } from '@/components/Sidebar'
import { getServerSession } from 'next-auth'
import { nextAuthOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(nextAuthOptions)

  if(!session){
    redirect('/')
  }
  return (
        <section>
          <div className='min-h-screen grid grid-cols-app bg-white'>
            <Sidebar />
            <main className='px-8 pb-12 pt-8'> {children}</main>
          </div>
        </section>
  )
}
