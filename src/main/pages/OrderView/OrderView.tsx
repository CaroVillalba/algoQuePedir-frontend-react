import { TabView, TabPanel } from "primereact/tabview"
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
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

    const handleCancel = async (orderId: number) => {
        confirmDialog({
        message: '¿Seguro que querés cancelar este pedido?',
        header: 'Confirmar cancelación',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Sí, cancelar',
        rejectLabel: 'No',
        accept: async () => {
            await orderService.cancelOrder(orderId)
            await updateOrders()
        }
    });
    }

    return (
        <div className="OrderView">
            <ConfirmDialog />

            <TabView>
                <TabPanel header="Pendientes">
                    { ordenesPendientes.length === 0 ? (
                        <div className="sin-pedidos">
                            Ahora mismo, no hay pedidos pendientes.
                        </div>
                    ):
                        ordenesPendientes.map((orden) => (
                            <OrderCard 
                            key={orden.id}
                            id={orden.id}
                            local={orden.localName} 
                            costo={orden.total} 
                            fecha="12 de mayo" 
                            articulos={orden.quantity} 
                            imageURL={orden.dishes[0].imageUrl} 
                            href={"/orders/"+orden.id}
                            showCancel={true}
                            onCancel={handleCancel}/>
                        ))
                    }
                </TabPanel>

                <TabPanel header="Completados">
                    {
                        ordenesCompletadas.map((orden) => (
                            <OrderCard 
                            key={orden.id}
                            id={orden.id}
                            local={orden.localName} 
                            costo={orden.total} 
                            fecha="12 de mayo" 
                            articulos={orden.quantity} 
                            imageURL={orden.dishes[0].imageUrl} 
                            href={"/orders/"+orden.id}
                            showCancel={false}/>
                        ))
                    }
                </TabPanel>

                <TabPanel header="Cancelados">
                    {
                        ordenesCanceladas.map((orden) => (
                            <OrderCard 
                            key={orden.id}
                            id={orden.id}
                            local={orden.localName} 
                            costo={orden.total} 
                            fecha="12 de mayo" 
                            articulos={orden.quantity} 
                            imageURL={orden.dishes[0].imageUrl} 
                            href={"/orders/"+orden.id}
                            showCancel={false}/>
                        ))
                    }
                </TabPanel>
            </TabView>
        </div>
    )
}