import { Nav } from './styles';
import { ReactComponent as Logo } from 'assets/logo.svg';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import { useCarrinhoContext } from 'common/context/Carrinho';
import { useHistory } from 'react-router-dom';

export default function NavBar() {

  const { quantidadeProdutos } = useCarrinhoContext()
  const history = useHistory().push

  return (
    <Nav>
      <Logo />
      <IconButton
        disabled={quantidadeProdutos === 0}
        onClick={() => history('/carrinho')}
      >
        <Badge
          color="primary"
          badgeContent={quantidadeProdutos}
        >
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
    </Nav>
  )
}