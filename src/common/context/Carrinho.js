import { createContext, useContext, useState } from "react";

export const CarrinhoContext = createContext()
CarrinhoContext.displayName = 'Carrinho'

export const CarrinhoProvider = ({ children }) => {

    const [carrinho, setCarrinho] = useState([])

    return (
        <CarrinhoContext.Provider value={{ carrinho, setCarrinho }}>
            { children }
        </CarrinhoContext.Provider>
    )
}

export const useCarrinhoContext = () => {

    const {carrinho, setCarrinho} = useContext(CarrinhoContext)

    const adicionarProduto = (novoItem) => {
        const temNoCarrinho = carrinho.some(item => item.id === novoItem.id)
        if (!temNoCarrinho) {
          novoItem.quantidade = 1
          return setCarrinho( carrinhoAntigo =>  [...carrinhoAntigo, novoItem] )
        }
        setCarrinho( carrinhoAntigo => 
          carrinhoAntigo.map(
            itemDoCarrinho => { 
              if(itemDoCarrinho.id === novoItem.id) itemDoCarrinho.quantidade += 1
              return itemDoCarrinho 
            }
          ) 
        )
      }

    return {
        carrinho,
        setCarrinho,
        adicionarProduto
    }

}
