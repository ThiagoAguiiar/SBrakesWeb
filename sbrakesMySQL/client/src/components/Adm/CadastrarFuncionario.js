import React from "react";
import axios from "axios";
import SCadastrarFuncionario from "../../css/Cadastrar.module.css";
import MostrarSenha from "../MostrarSenha";
import { regexEmail } from "../../Regex";
import { Spinner, Switch, useToast } from "@chakra-ui/react";
import { Input } from "../Input";

const CadastrarFuncionario = () => {
  const toast = useToast();
  const [bool, setBool] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [cadastro, setCadastro] = React.useState({
    credencial: "",
    img: "",
    nome: "",
    email: "",
    senha: "",
    adm: false,
  });

  // Captura os dados do usuário
  function handleChange({ target }) {
    const { id, value } = target;
    setCadastro({ ...cadastro, [id]: value });
  }

  // Captura imagem do input File
  function handleFile({ target }) {
    if (target.files.length > 0) {
      setBool(true);
      let file = target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        return setCadastro({ ...cadastro, img: reader.result });
      };
    }
  }

  // Captura opção do Switch
  function handleAdm({ target }) {
    if (target.checked) {
      setCadastro({ ...cadastro, adm: true });
    } else {
      setCadastro({ ...cadastro, adm: false });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { credencial, img, nome, email, senha, adm } = cadastro;

    if (
      (credencial && img && nome && regexEmail(email) && senha).trim() !== ""
    ) {
      setLoading(true);
      axios
        .post("http://localhost:3001/cadastrar-funcionarios", {
          credencial: credencial,
          nome: nome,
          img: img,
          email: email.toLocaleLowerCase(),
          senha: senha,
          adm: adm,
        })
        .then((response) => {
          toast({
            title: response.status === 200 ? "Sucesso" : "Atenção",
            description: response.data,
            status: response.status === 200 ? "success" : "info",
            duration: 2500,
            isClosable: true,
            position: "top-right",
          });

          if (response.status === 200) {
            setCadastro({
              credencial: "",
              img: "",
              nome: "",
              email: "",
              senha: "",
              adm: false,
            });

            setBool(false);
            setLoading(false);
          }
        })
        .catch((error) => {
          // Mostra uma mensagem de erro na tela
          toast({
            title: "Erro",
            description: "Falha na comunicação com o servidor",
            status: "error",
            duration: 1500,
            isClosable: true,
            position: "top-right",
          });

          setLoading(false);
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

      setLoading(false);
    }
  }

  // Inputs do formulário de cadastro
  const inputField = [
    {
      id: "nome",
      label: "Nome",
      type: "text",
    },
    {
      id: "credencial",
      label: "Credencial",
      type: "text",
      size: 10,
      maxLength: 10,
    },
    {
      id: "email",
      label: "Email",
      type: "text",
    },
    {
      id: "senha",
      label: "Senha",
      type: "password",
      show: (
        <MostrarSenha
          password={cadastro["senha"]}
          eye={{ bottom: "10px" }}
          disabled={false}
        />
      ),
      size: 8,
      maxLength: 8,
    },
  ];

  return (
    <form
      className={`row ${SCadastrarFuncionario.Container}`}
      onSubmit={handleSubmit}
    >
      <div className={`col-12 ${SCadastrarFuncionario.Title}`}>
        <h1>Cadastrar Funcionário</h1>
      </div>

      <div className={`row ${SCadastrarFuncionario.Body}`}>
        {inputField.map((input, index) => (
          <div className={`col-md-6 col-12 ${SCadastrarFuncionario.Inputs}`} key={index}>
            <div  className={SCadastrarFuncionario.InputContainer}>
              <label htmlFor={input.id}>{input.label}</label>
              <Input
                type={input.type}
                id={input.id}
                value={cadastro[input.id]}
                onChange={handleChange}
                size={input.size}
                maxLength={input.maxLength}
              />
              {input.show}
            </div>
          </div>
        ))}

        <div className={SCadastrarFuncionario.Inputs}>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              alignItems: "center",
              marginTop: "1.2rem",
            }}
          >
            <label htmlFor="adm">Administrador</label>
            <Switch
              id="adm"
              colorScheme="green"
              isFocusable={false}
              onChange={handleAdm}
              isChecked={cadastro.adm}
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className={`col-12 ${SCadastrarFuncionario.Inputs}`}>
            <label
              htmlFor="img"
              className={`${SCadastrarFuncionario.File}`}
              style={{
                backgroundColor: bool ? "#38A169" : "",
                color: bool ? "white" : "inherit",
                border: bool ? "none" : "inherit",
              }}
            >
              {bool ? "Imagem adicionada" : "Inserir imagem"}
            </label>
            <Input
              type="file"
              id="img"
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleFile}
            />
          </div>

          <div className={`col-12 ${SCadastrarFuncionario.Inputs}`}>
            <div className={SCadastrarFuncionario.InputSubmit}>
              <input type="submit" />
              {loading && <Spinner />}
            </div>
          </div>
        </div>
        <div className={`col-md-6 col-12 ${SCadastrarFuncionario.Img}`}>
          <div className={SCadastrarFuncionario.Inputs}>
            <div className={SCadastrarFuncionario.InputContainer}>
              {cadastro.img !== "" ? (
                <img src={cadastro.img} alt="perfil" />
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CadastrarFuncionario;
