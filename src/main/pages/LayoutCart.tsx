import { Outlet, useOutletContext } from 'react-router-dom'
import { useCart } from '../../hooks/useCart'
import type { MainContextType } from '../../types/MainContextType'

export const LayoutCart = () => {
    
    const cart = useCart()
    const parent = useOutletContext<MainContextType>()
    return <Outlet context={{ cart, ...parent }} />
}
