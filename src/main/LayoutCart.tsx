import { useState } from 'react'
import type { Local } from '../../../types/Local'
import { useToast } from '../../../hooks/useToast'
import { Outlet } from 'react-router-dom'
import { Toast } from '../../../components/common/toast'
import '../../../toast.css'
import { getMensajeError, type ErrorResponse } from '../../../utils/errorHandling'
import { localService } from '../../../services/LocalService'
import { useOnInit } from '../../../hooks/useOnInit'
import type { User } from '../../../types/User'
import { authService } from '../../../services/AuthService'
import { userService } from '../../../services/UserService'
import type { FormEvent } from 'react'
import { Header } from '../components/Header'
import Footer from '../components/Footer'
import { useCart } from '../hooks/useCart'
import { CardTravel } from '@mui/icons-material'


export const LayoutCart = () => {
        useCart();        
        return(<>
            <Outlet cart={cart,setCart} />
        </>
        )

}


