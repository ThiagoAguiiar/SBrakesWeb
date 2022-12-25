import React from "react";
import axios from "axios";
import SDadosFuncionario from "../../css/DadosFuncionario.module.css";
import { Select, Tooltip, useToast } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { Input } from "../Input";
import { FiEdit } from "react-icons/fi";
import { regexEmail } from "../../Regex";
import MostrarSenha from "../MostrarSenha";

const Dados = () => {
  // Pegando o id da Rota = credencial do funcionário
  const { id } = useParams();
  // Utilizando Toast
  const toast = useToast();
  // Recebe os dados do usuário que estão no banco
  const [data, setData] = React.useState(null);
  // Alterar configuração de disabled dos meus inputs
  const [disabled, setDisabled] = React.useState(true);
  // Modificar estilos de componentes
  const [bool, setBool] = React.useState(false);

  // Efeito que puxa os dados do banco toda a vez que a credencial do usuário mudar
  React.useEffect(() => {
    // Dados do usuário são coletados do banco de acordo com sua credencial
    axios
      .post("http://localhost:3001/buscar-dados-funcionario", {
        credencial: id,
      })
      .then((response) => {
        setData({
          nome: response.data.nome,
          num_funcionario: response.data.num_funcionario,
          foto_perfil: response.data.foto_perfil,
          email: response.data.email,
          senha: response.data.senha,
          ativo: response.data.ativo,
          adm: response.data.adm,
        });
      })
      .catch((error) => {
        console.log("Erro incomum! Tente novamente mais tarde");
        console.log(error);
      });
  }, [id]);

  // Inputs do formulário de atualização de dados
  const inputField = [
    {
      id: "num_funcionario",
      label: "Credencial",
      type: "text",
      disabled: true,
    },
    {
      id: "nome",
      label: "Nome",
      type: "text",
      disabled: disabled,
    },
    {
      id: "email",
      label: "Email",
      type: "text",
      disabled: disabled,
    },
    {
      id: "senha",
      label: "Senha",
      type: "password",
      disabled: disabled,
      size: 8,
      maxLenght: 8,
      show: (
        <MostrarSenha
          password={data !== null ? data.senha : ""}
          eye={{ bottom: "8px" }}
          disabled={disabled}
        />
      ),
    },
  ];

  // Habilitar ou desabilitar os inputs ao clicar
  function handleEdit() {
    setDisabled(!disabled);

    if (disabled === true) {
      toast({
        title: "Editar Dados",
        description: `Você pode editar os dados de ${data.nome}`,
        position: "top-right",
        status: "success",
        duration: 2100,
        isClosable: true,
      });
    }
  }

  // Variável que vai receber a placa do caminhão alocado para ele
  function handleChange({ target }) {
    const { id, value } = target;
    setData({ ...data, [id]: value });
    console.log(target.value);
  }

  function handleFile({ target }) {
    const { files } = target;
    // Imagem em base64
    if (files.length > 0) {
      setBool(true);
      let file = target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        return setData({ ...data, foto_perfil: reader.result });
      };
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { num_funcionario, foto_perfil, nome, email, senha, adm, ativo } =
      data;

    // Verificação dos campos vazios
    if ((nome && regexEmail(email) && senha).trim() !== "") {
      // Enviando dados para o banco
      axios
        .post("http://localhost:3001/atualizar-dados-funcionario", {
          credencial: num_funcionario,
          img: foto_perfil,
          nome: nome,
          email: email,
          senha: senha,
          adm: adm,
          ativo: ativo,
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

  // Componente JSX de Dados do Funcionário
  if (data !== null)
    return (
      <form
        className={`row ${SDadosFuncionario.container}`}
        onSubmit={handleSubmit}
      >
        <div className={`col-12 ${SDadosFuncionario.title}`}>
          <h1>{data.nome}</h1>
        </div>

        <div className={`col-md-6 col-12 ${SDadosFuncionario.info}`}>
          <div>
            <h2 style={{ display: "flex", alignItems: "center" }}>
              Dados do usuário
              <Tooltip label="Editar">
                <span className={SDadosFuncionario.edit} onClick={handleEdit}>
                  <FiEdit size={15} />
                </span>
              </Tooltip>
              <p style={{ fontSize: "13px" }}>clique no ícone para editar</p>
            </h2>
          </div>

          {inputField.map(
            ({ label, type, id, disabled, size, maxLenght, show }, index) => (
              <div className={SDadosFuncionario.inputContainer} key={index}>
                <label htmlFor={id}>{label}</label>
                <Input
                  type={type}
                  id={id}
                  disabled={disabled}
                  value={data[id]}
                  onChange={handleChange}
                  size={size}
                  maxLength={maxLenght}
                />
                {show}
              </div>
            )
          )}
        </div>

        <div className={`col-md-6 col-12 ${SDadosFuncionario.info}`}>
          <div>
            <h2 style={{ display: "flex", alignItems: "center" }}>
              <span className={SDadosFuncionario.edit}></span>
            </h2>

            <div className={SDadosFuncionario.inputContainer}>
              <label htmlFor="adm">Administrador</label>
              <Select
                id="adm"
                onChange={handleChange}
                disabled={disabled}
                background="white"
                placeholder={data.adm == 1 ? "Administrador" : "Comum"}
              >
                <option value={1}>Administrador</option>
                <option value={0}>Comum</option>
              </Select>
            </div>

            <div className={SDadosFuncionario.inputContainer}>
              <label htmlFor="ativo">Status na empresa</label>
              <Select
                id="ativo"
                onChange={handleChange}
                disabled={disabled}
                background="white"
                placeholder={data.ativo == 1 ? "Ativo" : "Inativo"}
              >
                <option value={1}>Ativo</option>
                <option value={0}>Inativo</option>
              </Select>
            </div>

            <div className={SDadosFuncionario.viewIMG}>
              <img
                src={data.foto_perfil}
                alt="Imagem de perfil"
                width="100px"
              />
            </div>

            <div className={SDadosFuncionario.inputContainer}>
              <label
                htmlFor="img"
                className={SDadosFuncionario.alterarImagem}
                style={{
                  backgroundColor: bool ? "#38A169" : "initial",
                  color: bool ? "white" : "black",
                  border: bool ? "none" : "1px solid gray",
                }}
              >
                {bool ? "Foto de perfil alterada" : "Alterar foto de perfil"}{" "}
              </label>
              <input
                type="file"
                id="img"
                accept="image/*"
                disabled={disabled}
                onChange={handleFile}
              />
            </div>
          </div>
        </div>

        <div className={`col-md-6 col-12 ${SDadosFuncionario.info}`}>
          <div className={SDadosFuncionario.inputContainer}>
            <Input type="submit" />
          </div>
        </div>
      </form>
    );
};

export default Dados;
