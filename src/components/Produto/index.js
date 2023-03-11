import { Container } from './styles';
import { memo } from 'react';
import { IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { CarrinhoContext } from 'common/context/Carrinho';
import { useContext } from 'react';


function Produto({
  nome,
  foto,
  id,
  valor,
  unidade
}) {

  const { carrinho, setCarrinho } = useContext(CarrinhoContext)

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

  return (
      <Container>
        <div>
          <img
            src={`/assets/${foto}.png`}
            alt={`foto de ${nome}`}
          />
          <p>
            {nome} - R$ {valor?.toFixed(2)} <span>Kg</span>
          </p>
        </div>
        <div>
          <IconButton
            color="secondary"
          >
            <RemoveIcon />
          </IconButton>
          <IconButton
            onClick={() => adicionarProduto({nome, foto, id, valor})}
          > 
            <AddIcon />
          </IconButton>
        </div>
      </Container>
  )
}

export default memo(Produto)