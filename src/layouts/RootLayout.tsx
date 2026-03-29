import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { Separator } from '@/components/ui/separator'
import {Outlet} from 'react-router'


const RootLayout = () => {
  return (
    <>
      <Navbar />
      <Separator />
      <main>
        <Outlet />
      </main>
      <Separator />
      <Footer />
    </>
  )
}

export default RootLayout
