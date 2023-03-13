import { createContext, useContext, useEffect, useState } from "react";

export const CarrinhoContext = createContext()
CarrinhoContext.displayName = 'Carrinho'

export const CarrinhoProvider = ({ children }) => {

    const [carrinho, setCarrinho] = useState([])
    const [quantidadeProdutos, setQuantidadeProdutos] = useState(0)

    return (
        <CarrinhoContext.Provider 
          value={{ 
            carrinho, 
            setCarrinho, 
            quantidadeProdutos, 
            setQuantidadeProdutos 
          }}
        >
            { children }
        </CarrinhoContext.Provider>
    )
}

export const useCarrinhoContext = () => {

    const {
      carrinho, 
      setCarrinho, 
      quantidadeProdutos, 
      setQuantidadeProdutos
    } = useContext(CarrinhoContext)

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

      useEffect(() => {
        const novaQuantidade = carrinho.reduce((contador, produto) => contador + produto.quantidade, 0)
        setQuantidadeProdutos(novaQuantidade)
      }, [carrinho, setQuantidadeProdutos])

    return {
        carrinho,
        setCarrinho,
        adicionarProduto,
        removerProduto,
        quantidadeProdutos,
        setQuantidadeProdutos
    }

}
