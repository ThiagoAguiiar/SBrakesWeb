import React from "react";
import SLogin from "../css/Login.module.css";
import axios from "axios";
import MostrarSenha from "../components/MostrarSenha";
import Saudacao from "../Saudacao";
import { Password } from "../API/Password";
import { Link, Navigate } from "react-router-dom";
import { LoginContext } from "../hooks/useLoginContext";
import { Spinner } from "@chakra-ui/react";
import { Input } from "../components/Input";
import { Email } from "../API/EmailJs";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

const Login = () => {
  // Hook useLogin Context (Responsável por administrar a entrada de usuários no sistema)
  const { AdmLogin, response, setResponse, loading, user } =
    React.useContext(LoginContext);
  // Chakra UI Hooks para Modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  // Recebe se o email foi enviado ou não
  const [responseEmail, setResponseEmail] = React.useState("");
  // Armazena dados do input email e senha na redefinição de senha
  const [email, setEmail] = React.useState({ email: "", credencial: "" });
  // Armazena dados do login no sistema
  const [login, setLogin] = React.useState({
    credencial: "",
    senha: "",
    enviar: "Entrar",
  });

  React.useEffect(() => {
    setResponse("");
    setResponseEmail("");
  }, [setResponse]);

  const inputField = [
    {
      id: "credencial",
      type: "text",
      label: "Credencial",
      size: 10,
      maxLength: 10,
    },
    {
      id: "senha",
      type: "password",
      label: "Senha",
      show: <MostrarSenha password={login.senha} eye={{ bottom: "8px" }} disabled={false} />,
      size: 8,
      maxLength: 8,
    },
  ];

  function handleChange({ target }) {
    const { id, value } = target;
    setLogin({ ...login, [id]: value.trim() });
  }

  function handleChangeEmail({ target }) {
    const { id, value } = target;
    setEmail({ ...email, [id]: value });
  }

  function handleEmail() {
    // Gerar senhas aleatórias
    const password = Password();

    // Buscar Email do usuário cadastrado no banco
    axios
      .post("http://localhost:3001/buscar-email", {
        credencial: email.credencial,
      })
      .then((response) => {
        setEmail({ ...email, email: response.data["email"] });
        // Atualização dos dados
        if (email.credencial.trim() !== "" && email.email.trim() !== "") {
          axios
            .post("http://localhost:3001/atualizar-senha", {
              credencial: email.credencial,
              senha: password,
            })
            .then((response) => {
              if (response.status === 200) {
                Email(email.email, password);
                setResponseEmail("Email enviado com sucesso");
              }
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          setResponseEmail("Preencha os dados corretamente");
        }
      })
      .catch((e) => console.log(e));
  }

  function handleSubmit(e) {
    const { credencial, senha } = login;
    e.preventDefault();
    AdmLogin(credencial, senha);
  }

  return (
    <div className={`row ${SLogin.container}`}>
      <div className="col-12">
        <Link
          to="/"
          style={{ position: "absolute", top: "1rem", left: "2rem" }}
          className={SLogin.Logo}
        >
          SBRAKES
        </Link>
      </div>
      {user && <Navigate to="/dashboard" />}
      <div className={`col-md-7 ${SLogin.loginForm}`}>
        <form onSubmit={handleSubmit} className={SLogin.form}>
          <div>
            <h2 style={{ fontSize: "2rem" }}>{Saudacao()}!</h2>
            <p style={{ color: "gray", marginTop: "5px" }}>
              Faça login para continuar
            </p>
          </div>

          {inputField.map(
            ({ id, type, label, maxLength, size, show }, index) => (
              <div className={SLogin.loginInputs} key={index}>
                <label
                  htmlFor={id}
                  style={{ color: "#333", fontWeight: "600" }}
                >
                  {label}
                </label>
                <Input
                  type={type}
                  id={id}
                  value={login[id]}
                  onChange={handleChange}
                  maxLength={maxLength}
                  size={size}
                />
                {show}
              </div>
            )
          )}

          <div className={SLogin.loginInputs} id="submit">
            <input type="submit" value="Entrar" id="login-enviar" />
            {loading && (
              <Spinner
                color="white"
                speed=".80s"
                position="absolute"
                bottom="11px"
                right="15px"
              />
            )}
          </div>

          <div>
            <span>
              Esqueceu sua senha?
              <span
                className={SLogin.forgot}
                style={{ cursor: "pointer", padding: "10px" }}
                onClick={onOpen}
                value={email}
              >
                Esqueci minha senha
              </span>
            </span>
          </div>
          <p style={{ position: "absolute", bottom: "-30px" }}>{response}</p>
        </form>
      </div>

      <div className={`col-md-4  ${SLogin.background}`}></div>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Alterar sua senha</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div>
              <label htmlFor="credencial" style={{ paddingBottom: "5px" }}>
                Credencial
              </label>
              <Input type="text" id="credencial" onChange={handleChangeEmail} />
            </div>
            <span style={{ marginTop: "10px", display: "block" }}>
              {responseEmail}
            </span>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button variant="ghost" onClick={handleEmail}>
              Enviar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Login;
