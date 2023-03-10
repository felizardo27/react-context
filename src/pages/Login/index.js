import { Button } from '@material-ui/core';
import {
  Container,
  Titulo,
  InputContainer
} from './styles';
import {
  Input,
  InputLabel,
  InputAdornment 
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { UsuarioContext } from 'common/context/Usuario';

function Login() {

  const history = useHistory()

  return (
    <Container>
      <UsuarioContext.Consumer>
        {({nome, setNome, saldo, setSaldo}) => (
          <>
            <Titulo>
              Insira o seu nome
            </Titulo>
            <InputContainer>
              <InputLabel>
                Nome
              </InputLabel>
              <Input
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                type="text"
              />
            </InputContainer>
            <InputContainer>
              <InputLabel>
                Saldo
              </InputLabel>
              <Input
              value={saldo}
              onChange={(e) => setSaldo(e.target.value)}
              type="number"
              startAdornment={
                <InputAdornment position="start">
                  R$
                </InputAdornment>
              }
              />
            </InputContainer>
            <Button
              variant="contained"
              color="primary"
              onClick={() => history.push('/feira')}
            >
              Avançar
            </Button>
          </>
        )}
      </UsuarioContext.Consumer>
    </Container>
  )
};

export default Login;