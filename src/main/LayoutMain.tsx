import { Outlet } from 'react-router-dom'
import { Header } from '../components/Header'
import Footer from '../components/Footer'
import { useToast } from '../hooks/useToast'
import { Toast } from '../components/common/toast'


export const LayoutMain = () => {

        const { toast, showToast } = useToast()

        return(<>

        <Header title='placeholder'/>
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