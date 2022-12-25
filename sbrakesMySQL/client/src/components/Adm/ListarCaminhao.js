import React from "react";
import axios from "axios";
import SListarCaminhao from "../../css/ListarCaminhao.module.css";
import {useToast } from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";
import Caminhao from "./Caminhao";
import Empty from "../Empty";

const ListarCaminhao = () => {
  const toast = useToast();
  const [caminhoes, setCaminhoes] = React.useState(null);
  const [search, setSearch] = React.useState("");

  React.useEffect(() => {
    axios
      .post("http://localhost:3001/gerenciar-caminhoes")
      .then((response) => {
        if (response.data.length > 0) {
          setCaminhoes(response.data);
        }
      })
      .catch(() => {
        toast({
          title: "Erro",
          description: "Falha na comunicação com o servidor",
          status: "error",
          duration: 1500,
          isClosable: true,
          position: "top-right",
        });
      });
  }, [toast]);

  function handleChange({ target }) {
    setSearch(target.value);
  }

  if (caminhoes === null)
    return (
      <Empty
        text="Nenhum caminhão cadastrado"
        link={"/dashboard/cadastrar-caminhao"}
      />
    );
  else
    return (
      <>
        <div className={`row ${SListarCaminhao.container} `}>
          <div>
            <div className={SListarCaminhao.pesquisarContainer}>
              <h1>Caminhões</h1>
              <div style={{ display: "flex", position: "relative" }}>
                <BsSearch
                  style={{ position: "absolute", left: "10px", top: "11px" }}
                  color="gray"
                />
                <input
                  type="text"
                  className={SListarCaminhao.pesquisar}
                  placeholder="Pesquisar placa ou modelo"
                  value={search}
                  onChange={handleChange}
                />
              </div>
            </div>

            {caminhoes
              .filter(
                (caminhao) =>
                  caminhao.modelo.toLowerCase().includes(search) ||
                  caminhao.placa.toLowerCase().includes(search)
              )
              .map(({ placa, marca, modelo, piloto, ativo }, index) => (
                <Caminhao
                  key={index}
                  placa={placa}
                  modelo={modelo}
                  marca={marca}
                  piloto={piloto}
                  ativo={ativo}
                />
              ))}
          </div>
        </div>
      </>
    );
};
export default ListarCaminhao;
