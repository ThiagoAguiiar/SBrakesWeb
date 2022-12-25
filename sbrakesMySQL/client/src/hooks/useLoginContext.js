import React from "react";
import axios from "axios";
import { useLocalStorage } from "./useLocalStorage";

// Fazer Login do Adm
export const LoginContext = React.createContext();

export const LoginProvider = ({ children }) => {
  // Animação de loading enquanto não há resposta do servidor
  const [loading, setLoading] = React.useState(false);
  // Armazena resposta do servidor (sucesso, erro)
  const [response, setResponse] = React.useState("");
  // Armazena se o usuário está logado no localStorage
  const [user, setUser] = useLocalStorage("credencial", "");
  // Armazena nome e foto de perfil no localStorage
  const [data, setData] = useLocalStorage("data", null);

  // Função que monitora login do adm
  function AdmLogin(credencial, senha) {
    // Verificando se os valores recebidos estão preenchidos
    if (credencial && senha) {
      // Mandando os dados do usuário para o Back-end
      setLoading(true);
      axios
        .post("http://localhost:3001/login", {
          credencial: credencial,
          senha: senha,
        })
        .then((response) => {
          setLoading(false);
          setResponse(response.data);

          if (response.status === 200) {
            setUser(true);
            setResponse("");

            // Enviando os dados do administrador para o LocalStorage
            setData(
              JSON.stringify({
                nome: response.data.nome,
                img: response.data.img,
                credencial: response.data.credencial,
              })
            );
          }
        })
        .catch((error) => {
          setLoading(false);
          setResponse("Erro inesperado! Tente novamente mais tarde");
        });
    } else {
      setResponse("Preencha os campos corretamente");
    }
  }

  // Função que controla a saída do usuário da conta
  function AdmLogout() {
    setUser("");
    setData(null);
    window.location.reload();
  }

  // Busca os dados do usuário logado no LocalStorage
  function getLocalStorage() {
    const local = JSON.parse(localStorage.getItem("data"));
    return local;
  }

  // Login Context será o provedor de todos os hooks e funções necessárias
  return (
    <LoginContext.Provider
      value={{
        AdmLogin,
        AdmLogout,
        response,
        setResponse,
        loading,
        user,
        setUser,
        data,
        getLocalStorage,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
