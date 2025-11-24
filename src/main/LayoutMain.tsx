import { Outlet, useLocation } from 'react-router-dom'
import { Header } from '../components/Header'
import Footer from '../components/Footer'
import { useToast } from '../hooks/useToast'
import { Toast } from '../components/common/toast'
import { routeConfig } from './routeConfig'

export const LayoutMain = () => {
    const location = useLocation()
    const path = location.pathname

    const match = Object.entries(routeConfig)
        .sort((a, b) => b[0].length - a[0].length)
        .find(([route]) => 
            path === route || path.startsWith(route)
        )
    const title = match?.[1].title ?? ''
    const showBackButton = match?.[1].back ?? false
    const { toast, showToast } = useToast()

    return (
        <>
            <Header title={title} showBackButton={showBackButton} />
            <main className='main-content'>
                <Outlet context= { {showToast} }/>
            </main>
            <Footer />

            <div id= "toast-container">
                <Toast toast = { toast } />
            </div>
        </>
    )
}
