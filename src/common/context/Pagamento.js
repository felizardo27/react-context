import { createContext, useContext, useState } from "react";

export const PagamentoContext = createContext()
PagamentoContext.displayName = "Pagamento"

export const PagamentoProvider = ({ children }) => {

    const tiposPagamento = [
        {
            nome: "Boleto",
            juros: 1,
            id: 1
        }, {
            nome: "Cartão de Crédito",
            juros: 1.3,
            id: 2
        }, {
            nome: "PIX",
            juros: 1,
            id: 3
        }, {
            nome: "Crediário",
            juros: 1.5,
            id: 4
        }]

    const [formaPagamento, setFormaPagamento] = useState(tiposPagamento[0])
    return (
        <PagamentoContext.Provider 
            value={{ 
                tiposPagamento,
                formaPagamento,
                setFormaPagamento
            }}
        >
            {children}
        </PagamentoContext.Provider>
    )
}

export const usePagamentoContext = () => {
    const {
        tiposPagamento,
        formaPagamento,
        setFormaPagamento
    } = useContext(PagamentoContext)

    const mudarPagamento = (id) => {
        const pagamentoAtual = tiposPagamento.find(pagamento => pagamento.id === id)
        setFormaPagamento(pagamentoAtual)
    }

    return {
        tiposPagamento,
        formaPagamento,
        mudarPagamento
    }
}
