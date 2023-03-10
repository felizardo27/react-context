import { UsuarioContext } from "common/context/Usuario"
import Carrinho from "pages/Carrinho"
import Feira from "pages/Feira"
import Login from "pages/Login"
import { useState } from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"

const Router = () => {

  const [nome, setNome] = useState('');
  const [saldo, setSaldo] = useState(0);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <UsuarioContext.Provider value={{nome, setNome, saldo, setSaldo}}>
            <Login />
          </UsuarioContext.Provider>
        </Route>
        <Route exact path="/feira">
          <Feira
            nome={nome}
            saldo={saldo} 
          />
        </Route>
        <Route exact path="/carrinho">
          <Carrinho />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default Router
