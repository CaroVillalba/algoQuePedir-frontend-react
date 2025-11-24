import { TabView, TabPanel } from "primereact/tabview"
import { OrderCard } from "./OrderCard/OrderCard"
import { orderService } from "../../../services/OrderService"
import { useOnInit } from "../../../hooks/useOnInit"
import { useState } from "react"
import "./OrderView.css"

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

        console.log(ordenes)
    }
    useOnInit(updateOrders)

    return (
        <div className="OrderView">

            <TabView>
                <TabPanel header="Pendientes">
                    {
                        ordenesPendientes.map((orden) => (
                            <OrderCard local={orden.localName} costo={orden.total} fecha="12 de mayo" articulos={orden.quantity} imageURL={orden.dishes[0].imageUrl} href={"/orders/"+orden.id}/>
                        ))
                    }
                </TabPanel>

                <TabPanel header="Completados">
                    {
                        ordenesCompletadas.map((orden) => (
                            <OrderCard local={orden.localName} costo={orden.total} fecha="12 de mayo" articulos={orden.quantity} imageURL={orden.dishes[0].imageUrl} href={"/orders/"+orden.id}/>
                        ))
                    }
                </TabPanel>

                <TabPanel header="Cancelados">
                    {
                        ordenesCanceladas.map((orden) => (
                            <OrderCard local={orden.localName} costo={orden.total} fecha="12 de mayo" articulos={orden.quantity} imageURL={orden.dishes[0].imageUrl} href={"/orders/"+orden.id}/>
                        ))
                    }
                </TabPanel>
            </TabView>
        </div>
    )
}