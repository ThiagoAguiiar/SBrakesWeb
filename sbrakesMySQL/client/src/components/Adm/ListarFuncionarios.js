import React from "react";
import SListar from "../../css/ListarFuncionario.module.css";
import axios from "axios";
import Funcionario from "./Funcionario";
import { BsSearch } from "react-icons/bs";
import { useToast } from "@chakra-ui/react";
import { LoginContext } from "../../hooks/useLoginContext";

import Empty from "../Empty";

const Listar = () => {
  // Controla das ações de login do usuário
  const { getLocalStorage } = React.useContext(LoginContext);
  // Mostrar alertas ao usuário
  const toast = useToast();
  // Armazena os funcionários que estão no banco
  const [funcionarios, setFuncionarios] = React.useState(null);
  // Armazena o valor que o usuário pesquisou
  const [search, setSearch] = React.useState("");

  //  Listar todos os funcionários que estão no banco
  React.useEffect(() => {
    const usuarioLogado = getLocalStorage();

    axios
      .post("http://localhost:3001/listar-dados-funcionario", {
        credencial: usuarioLogado.credencial,
      })
      .then((response) => {
        if (response.data.length > 0) {
          setFuncionarios(response.data);
        }
      })
      .catch(() => {
        // Mostra uma mensagem de erro na tela
        toast({
          title: "Erro",
          description: "Falha na comunicação com o servidor",
          status: "error",
          duration: 1500,
          isClosable: true,
          position: "top-right",
        });
      });
  }, [toast, getLocalStorage]);

  // Armazena credencial ou nome pesquisados
  function handleChange({ target }) {
    setSearch(target.value);
  }

  if (funcionarios === null)
    return (
      <Empty
        text="Nenhum funcionário cadastrado"
        link={"/dashboard/cadastrar-funcionario"}
      />
    );
  else
    return (
      <div className={`row ${SListar.container}`}>
        <div>
          <div className={SListar.pesquisarContainer}>
            <h1>Funcionários </h1>
            <div style={{ display: "flex", position: "relative" }}>
              <BsSearch
                style={{ position: "absolute", left: "10px", top: "11px" }}
                color="gray"
              />
              <input
                type="text"
                className={SListar.pesquisar}
                placeholder="Pesquisar credencial ou nome"
                value={search}
                onChange={handleChange}
              />
            </div>
          </div>

          {funcionarios
            .filter(
              (funcionario) =>
                funcionario.num_funcionario.includes(search.toLowerCase()) ||
                funcionario.nome.includes(search.toLowerCase())
            )
            .map(
              ({ nome, num_funcionario, ativo, adm, foto_perfil }, index) => (
                <Funcionario
                  nome={nome}
                  credencial={num_funcionario}
                  status={ativo}
                  adm={adm}
                  key={index}
                  img={foto_perfil}
                />
              )
            )}
        </div>
      </div>
    );
};

export default Listar;
