import { useState } from 'react';
import { createContext } from 'react'

export const UsuarioContext = createContext()
UsuarioContext.displayName = 'Usuario';

export const UsuarioProvider = ({ children }) => {

    const [nome, setNome] = useState('');
    const [saldo, setSaldo] = useState(0);

    return (
        <UsuarioContext.Provider value={ { nome, setNome, saldo, setSaldo } }>
            {children}
        </UsuarioContext.Provider>
    )

}

