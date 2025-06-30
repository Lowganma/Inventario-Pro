import styled from "styled-components";
import { v } from "../../index";
import { CardDatosEmpresa } from "../moleculas/CardDatosEmpresa";
export function BannerEmpresa() {
    return (<Container>
        <div className="content-wrapper-context">
            <span className="Titulo">
                {<v.iconoempresa/>}
                Nombre de empresa
            </span>
            <div className="content-text">
                StockPRO te mantiene siempre informado
            </div>
            <ContentCards>
                <CardDatosEmpresa/>
            </ContentCards>
        </div>
            </Container>);
}
const Container = styled.div``;
const ContentCards = styled.div``;
