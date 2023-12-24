import { Sidebar } from '@/components/Sidebar'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
        <section>
          <div className='min-h-screen grid grid-cols-app bg-white'>
            <Sidebar />
            <main className='px-8 pb-12 pt-8'> {children}</main>
          </div>
        </section>
  )
}
