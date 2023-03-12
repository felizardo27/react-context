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

    const mudarQuantidade = (id, quantidade) => {
      return carrinho.map(
        itemDoCarrinho => { 
          if(itemDoCarrinho.id === id) itemDoCarrinho.quantidade += quantidade
          return itemDoCarrinho 
        }
      )
    }

    const adicionarProduto = (novoItem) => {
        const temNoCarrinho = carrinho.some(item => item.id === novoItem.id)
        if (!temNoCarrinho) {
          novoItem.quantidade = 1
          return setCarrinho( carrinhoAntigo =>  [...carrinhoAntigo, novoItem] )
        }
        setCarrinho(mudarQuantidade(novoItem.id, 1))
      }

      const removerProduto = (id) => {
        const produto = carrinho.find(item => item.id === id)
        const ultimoItem = produto ? produto.quantidade === 1 : true
        if(ultimoItem) {
          return setCarrinho( carrinhoAntigo => carrinhoAntigo.filter(item => item.id !== id) )
        }
        setCarrinho(mudarQuantidade(id, -1))
      }

    return {
        carrinho,
        setCarrinho,
        adicionarProduto,
        removerProduto
    }

}
