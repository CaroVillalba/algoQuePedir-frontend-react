import { Button, TextareaAutosize } from "@mui/material"
import "./ReviewRestorantView.css"

export const ReviewRestorantView = () => {
    return (
        <div className="ReviewRestorantView">
            <h1>¿Como fue tu experiencia en El Sabor?</h1>
            <div className="starContainer">
                <Button><i className="pi pi-star"/> 1 </Button>
                <Button><i className="pi pi-star"/> 2 </Button>
                <Button><i className="pi pi-star"/> 3 </Button>
                <Button><i className="pi pi-star"/> 4 </Button>
                <Button><i className="pi pi-star"/> 5 </Button>
            </div>
            {/* NO usar br para saltos de página */}
            <br/>

            <TextareaAutosize minRows={5} placeholder="Contanos tu experiencia"/>

            <Button>Enviar</Button>
        </div>
    )
}