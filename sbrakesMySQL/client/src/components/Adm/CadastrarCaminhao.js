import React from "react";
import axios from "axios";
import SCadastrarCaminhao from "../../css/Caminhao.module.css";
import { MascaraPlaca } from "../../Mask";
import { useToast } from "@chakra-ui/react";
import { Input } from "../Input";

const CadastrarCaminhao = () => {
  const toast = useToast();
  // Armazena dados do caminhão
  const [cadastro, setCadastro] = React.useState({
    placa: "",
    modelo: "",
    marca: "",
    piloto: "",
    bluetooth: "",
  });

  // Captura o valor digitado pelo usuário
  function handleChange({ target }) {
    const { id, value } = target;
    setCadastro({ ...cadastro, [id]: value });
  }

  console.log(toast)

  // Máscara no input de placa
  MascaraPlaca("#placa");

  function handleSubmit(e) {
    e.preventDefault();
    console.log(e)
    const { modelo, placa, marca, bluetooth} = cadastro;
    // Verifica se os dados estão preenchidos corretamente
    if ((placa && marca && modelo).trim() !== "" && placa.length === 8) {
      // Envia os dados para o back-end
      axios
        .post("http://localhost:3001/cadastrar-caminhao", {
          modelo: modelo,
          placa: placa.toUpperCase(),
          marca: marca,
          bluetooth: bluetooth, 
        })
        .then((response) => {
          toast({
            title: response.status === 200 ? "Sucesso" : "Atenção",
            status: response.status === 200 ? "success" : "info",
            description: response.data,
            duration: 1500,
            isClosable: true,
            position: "top-right",
          });

          if (response.status === 200) {
            setCadastro({
              ...cadastro,
              placa: "",
              marca: "",
              piloto: "",
              modelo: "",
              bluetooth: "",
            });
          }
        })
        .catch(() => {
          // Envia uma mensagem de erro caso o envio de dados falhe
          toast({
            title: "Erro",
            description: "Falha na comunicação com o servidor",
            status: "error",
            duration: 1500,
            isClosable: true,
            position: "top-right",
          });
        });
    } else {
      // Envia uma mensagem informando que os campos não estão prenchidos corretamente
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

  // Input para Cadastrar Caminhão
  const inputField = [
    {
      type: "text",
      id: "placa",
      label: "Placa",
    },
    {
      type: "text",
      id: "marca",
      label: "Marca",
    },
    {
      type: "text",
      id: "modelo",
      label: "Modelo",
    },
    {
      type: 'text',
      id: 'bluetooth',
      label: 'Bluetooth'
    },
    {
      type: "submit",
      id: "enviar",
      label: "Enviar",
      styleLabel: {
        visibility: "hidden",
      },
      style: {
        backgroundColor: "black",
        color: "white",
        fontWeight: "bold",
      },
    },
  ];

  // Componente JSX
  return (
    <form
      className={`row ${SCadastrarCaminhao.Container}`}
      onSubmit={handleSubmit}
    >
      <div className={`col-12 ${SCadastrarCaminhao.Title}`}>
        <h1>Cadastrar Caminhão</h1>
      </div>

      {inputField.map((input, index) => (
        <div
          className={`col-md-6 col-12 ${SCadastrarCaminhao.Body}`}
          key={index}
        >
          <div
            className={SCadastrarCaminhao.Inputs}
            style={{ position: "relative" }}
          >
            <label htmlFor={input.id} style={input.styleLabel}>
              {input.label}
            </label>
            <Input
              type={input.type}
              id={input.id}
              value={cadastro[input.id]}
              onChange={handleChange}
              style={input.style}
            />
          </div>
        </div>
      ))}
    </form>
  );
};

export default CadastrarCaminhao;
