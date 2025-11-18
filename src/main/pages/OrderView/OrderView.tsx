import { TabView, TabPanel } from "primereact/tabview"
import { OrderCard } from "./OrderCard/OrderCard"
import { orderService } from "../../../services/OrderService"
import { useOnInit } from "../../../hooks/useOnInit"
import { useState } from "react"

export const OrderView = () => {

    const [ordenesTodas, setOrdenesTodas] = useState<any[]>([])
    const [ordenesPendientes, setOrdenesPendientes] = useState<any[]>([])
    const [ordenesCompletadas, setOrdenesCompletadas] = useState<any[]>([])
    const [ordenesCanceladas, setOrdenesCanceladas] = useState<any[]>([])

    const updateOrders = async() => {
        const ordenes = await orderService.getAll()
        setOrdenesTodas(ordenes)
        setOrdenesPendientes(ordenes.filter((orden: any) => (orden.state == "PENDIENTE" || orden.state === "PREPARADO")))
        setOrdenesCompletadas(ordenes.filter((orden: any) => (orden.state == "ENTREGADO")))
        setOrdenesCanceladas(ordenes.filter((orden: any) => (orden.state == "CANCELADO")))

        console.log("Todas las ordenes:")
        console.log(ordenes)
        
        console.log("Ordenes pendientes/preparadas:")
        console.log(ordenesPendientes)

        console.log("Ordenes entregadas:")
        console.log(ordenesCompletadas)
        
        console.log("Ordenes canceladas:")
        console.log(ordenesCanceladas)
    }
    useOnInit(updateOrders)

    return (
        <div className="OrderView">
            <h3>Pedidos</h3>

            <TabView>
                <TabPanel header="Pendientes">
                    {
                        ordenesPendientes.map((orden) => (
                            <OrderCard local={orden.localName} costo={orden.total} fecha="12 de mayo" articulos={orden.quantity} imageURL={orden.dishes[0].imageUrl}/>
                        ))
                    }
                </TabPanel>

                <TabPanel header="Completados">
                    {
                        ordenesCompletadas.map((orden) => (
                            <OrderCard local={orden.localName} costo={orden.total} fecha="12 de mayo" articulos={orden.quantity} imageURL={orden.dishes[0].imageUrl}/>
                        ))
                    }
                </TabPanel>

                <TabPanel header="Cancelados">
                    {
                        ordenesCanceladas.map((orden) => (
                            <OrderCard local={orden.localName} costo={orden.total} fecha="12 de mayo" articulos={orden.quantity} imageURL={orden.dishes[0].imageUrl}/>
                        ))
                    }
                </TabPanel>
            </TabView>
        </div>
    )
}