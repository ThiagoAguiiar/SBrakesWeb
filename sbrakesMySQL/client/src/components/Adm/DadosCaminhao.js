import React from "react";
import axios from "axios";
import SDadosCaminhao from "../../css/DadosCaminhao.module.css";
import { useParams } from "react-router-dom";
import { Select, Spinner, Tooltip, useToast } from "@chakra-ui/react";
import { FiEdit } from "react-icons/fi";
import { Input } from "../Input";
import { IoMdArrowDropdown } from "react-icons/io";

const DadosCaminhao = () => {
  // Pegar credencial pelo pathname
  const { id } = useParams();
  // Componentes Chakra UI
  const toast = useToast();
  // Pegar Credencial do localStorage
  const [local, setLocal] = React.useState(null);
  // Pegar dados do veículo
  const [data, setData] = React.useState(null);
  // Aplica enable ou disabled para os inputs
  const [disabled, setDisabled] = React.useState(true);
  // Armazena dados dos veículos cadastrados no banco
  const [motoristas, setMotoristas] = React.useState(null);

  React.useEffect(() => {
    setLocal(JSON.parse(localStorage.getItem("data")));
  }, []);

  React.useEffect(() => {
    if (local !== null) {
      // Busca todos os funcionários
      axios
        .post("http://localhost:3001/listar-dados-motorista", {
          credencial: local.credencial,
        })
        .then((response) => setMotoristas(response.data))
        .catch((e) => {
          console.log("erro");
        });
    }
  }, [local]);

  React.useEffect(() => {
    // Busca as informações da tabela veículos
    axios
      .post("http://localhost:3001/buscar-dados-veiculos", {
        placa: id,
      })
      .then((response) => {
        setData({
          placa: response.data[0].placa,
          modelo: response.data[0].modelo,
          marca: response.data[0].marca,
          ativo: response.data[0].ativo,
          piloto: response.data[0].piloto,
        });
      })
      .catch(() => {
        console.log("ERRO");
      });
  }, [id]);

  function handleEdit() {
    setDisabled(!disabled);

    if (disabled === true) {
      toast({
        title: "Editar Dados",
        description: `Você pode editar os dados do veículo ${data.modelo}`,
        position: "top-right",
        status: "success",
        duration: 2100,
        isClosable: true,
      });
    }
  }

  function handleChange({ target }) {
    const { id, value } = target;
    setData({ ...data, [id]: value });
  }

  function handleMotorista({ target }) {
    setData({ ...data, piloto: target.value });
  }

  // Enviar alterações para o banco
  function handleSubmit(e) {
    e.preventDefault();
    const { placa, modelo, marca, ativo, piloto } = data;

    if ((modelo && marca).trim() !== "") {
      axios
        .post("http://localhost:3001/atualizar-dados-caminhao", {
          placa: placa,
          modelo: modelo,
          marca: marca,
          ativo: Number(ativo),
          piloto: Number(ativo) === 1 ? piloto : "",
        })
        .then((response) => {
          toast({
            title: response.status === 200 ? "Sucesso" : "Atenção",
            description: response.data,
            status: response.status === 200 ? "success" : "info",
            duration: 2100,
            position: "top-right",
            isClosable: true,
          });

          if (response.status === 200) {
            setDisabled(true);
          }
        })
        .catch((error) => {
          toast({
            title: "Erro",
            description: "Falha na comunicação com o servidor",
            status: "error",
            duration: 1500,
            isClosable: true,
            position: "top-right",
          });

          console.log(error);
        });
    } else {
      toast({
        title: "Atenção",
        description: "Preencha os campos corretamente",
        status: "info",
        duration: 1500,
        isClosable: true,
        position: "top-right",
      });
    }
  }

  const inputFields = [
    {
      id: "placa",
      label: "Placa",
      type: "text",
      disabled: true,
    },
    {
      id: "modelo",
      label: "Modelo",
      type: "text",
      disabled: disabled,
    },
    {
      id: "marca",
      label: "Marca",
      type: "text",
      disabled: disabled,
    },
  ];

  if (data === null) return;
  else
    return (
      <form
        className={`row ${SDadosCaminhao.container}`}
        onSubmit={handleSubmit}
      >
        <div className={`col-12 ${SDadosCaminhao.title}`}>
          <h1>{data.modelo}</h1>
        </div>

        <div className={`col-md-6 col-12 ${SDadosCaminhao.info}`}>
          <div>
            <h2 style={{ display: "flex", alignItems: "center" }}>
              Dados do veículo
              <Tooltip label="Editar">
                <span className={SDadosCaminhao.edit} onClick={handleEdit}>
                  <FiEdit size={15} />
                </span>
              </Tooltip>
              <p style={{ fontSize: "13px" }}>clique no ícone para editar</p>
            </h2>
          </div>
          {inputFields.map(({ id, label, type, disabled }, index) => (
            <div className={SDadosCaminhao.inputContainer} key={index}>
              <label htmlFor={id}>{label}</label>
              <Input
                type={type}
                id={id}
                disabled={disabled}
                value={data[id]}
                onChange={handleChange}
              />
            </div>
          ))}
          {motoristas !== null ? (
            <div className={SDadosCaminhao.inputContainer}>
              <label
                htmlFor="motorista"
                style={{ display: "flex", gap: "1rem" }}
              >
                Selecionar Motorista{" "}
                <Tooltip
                  background="black"
                  label="Apenas veículos ativos podem ser alocados para funcionários que estão em atividade na empresa."
                >
                  <span
                    style={{
                      background: "black",
                      color: "white",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "25px",
                      height: "25px",
                      borderRadius: "50%",
                    }}
                  >
                    ?
                  </span>
                </Tooltip>
              </label>
              <Select
                variant="outline"
                icon={<IoMdArrowDropdown />}
                placeholder={
                  data.piloto !== null
                    ? `${data.piloto} | Selecionado`
                    : "Selecionar"
                }
                id="motorista"
                disabled={Number(data.ativo) === 1 ? disabled : true}
                onChange={handleMotorista}
              >
                {motoristas.map(({ nome, num_funcionario }, index) => (
                  <option value={num_funcionario} key={index}>
                    {num_funcionario} | {nome}
                  </option>
                ))}
                <option value={""}>Remover motorista</option>
              </Select>
            </div>
          ) : (
            <Spinner />
          )}
        </div>

        <div className={`col-md-6 col-12 ${SDadosCaminhao.info}`}>
          <div style={{ visibility: "hidden" }}>
            <h2 style={{ display: "flex", alignItems: "center" }}>
              <Tooltip label="Editar">
                <span className={SDadosCaminhao.edit}></span>
              </Tooltip>
            </h2>
          </div>

          <div className={SDadosCaminhao.inputContainer}>
            <label htmlFor="ativo">Status do caminhão</label>
            <Select
              placeholder={data.ativo === 1 ? "Ativo" : "Inativo"}
              id="ativo"
              onChange={handleChange}
              disabled={disabled}
              background="white"
            >
              <option value={1}>Ativo</option>
              <option value={0}>Inativo</option>
            </Select>
          </div>

          <div className={SDadosCaminhao.inputContainer}>
            <label style={{ visibility: "hidden" }}>Enviar Dados</label>
            <Input type="submit" />
          </div>
        </div>
      </form>
    );
};

export default DadosCaminhao;
