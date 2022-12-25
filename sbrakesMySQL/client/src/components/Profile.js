import React from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useToast,
} from "@chakra-ui/react";
import { FiEdit, FiSettings } from "react-icons/fi";
import { BiExit } from "react-icons/bi";
import { LoginContext } from "../hooks/useLoginContext";
import { Input } from "../components/Input";
import axios from "axios";
import { regexEmail } from "../Regex";
import MostrarSenha from "./MostrarSenha";
import SDashboard from "../css/Dashboard.module.css";

// Componente que mostra os dados do usuário logado
const Profile = ({ img, adm, setAdm }) => {
  // Chakra Toast
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  // Controle das ações de Login do usuário
  const { AdmLogout } = React.useContext(LoginContext);
  // Aplicação de estilos nos componentes
  const [bool, setBool] = React.useState(false);
  // Habilitar e desabilitar edição de dados do Adm
  const [disabled, setDisabled] = React.useState(true);

  // Deslogar da conta
  function handleLogout() {
    AdmLogout();
  }

  // Coletar dados do Input
  function handleChange({ target }) {
    const { id, value } = target;
    setAdm({ ...adm, [id]: value });
  }

  // Habilitar Edição de Dados
  function handleEdit() {
    setDisabled(!disabled);
  }

  // Imagem em Base64
  function handleFile({ target }) {
    if (target.files.length > 0) {
      setBool(true);
      let file = target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        return setAdm({ ...adm, img: reader.result });
      };
    }
  }

  // Enviar dados para o Banco
  function handleSubmit() {
    const { nome, email, senha, credencial, admin, ativo, img } = adm;

    if (nome && regexEmail(email) && senha && credencial) {
      axios
        .post("http://localhost:3001/atualizar-dados-adm", {
          nome: nome,
          email: email,
          senha: senha,
          credencial: credencial,
          adm: admin,
          ativo: ativo,
          img: img,
        })
        .then((response) => {
          toast({
            title: "Sucesso",
            description: response.data,
            status: "success",
            duration: 1500,
            position: "top-right",
            isClosable: true,
          });

          setDisabled(true);
        })
        .catch((error) => {
          // Mostra uma mensagem de erro na tela
          console.log(error);
          toast({
            title: "Erro",
            description: "Falha na comunicação com o servidor",
            status: "error",
            duration: 1500,
            isClosable: true,
            position: "top-right",
          });
        });
    }
  }

  // Inputs da edição de dados do Adm
  const inputField = [
    {
      type: "text",
      id: "nome",
      label: "Nome",
      disabled: disabled,
    },
    {
      type: "text",
      id: "credencial",
      label: "Credencial",
      disabled: true,
    },
    {
      type: "email",
      id: "email",
      label: "Email",
      disabled: disabled,
    },
    {
      type: "password",
      id: "senha",
      label: "Senha",
      disabled: disabled,
      size: 8,
      maxLength: 8,
      show: (
        <MostrarSenha
          password={adm !== null ? adm.senha : ""}
          eye={{ bottom: "8px" }}
          disabled={disabled}
        />
      ),
    },
  ];

  return (
    <>
      <Menu>
        <MenuButton background="whiteAlpha.400" borderRadius="50%">
          <img src={img} alt="perfil" />
        </MenuButton>

        <MenuList fontSize="15px">
          <MenuItem
            display="flex"
            justifyContent="space-between"
            onClick={onOpen}
          >
            Configurações <FiSettings size={20} />
          </MenuItem>
          <MenuItem
            display="flex"
            justifyContent="space-between"
            color="red.500"
            onClick={handleLogout}
          >
            Encerrar Sessão <BiExit size={20} />
          </MenuItem>
        </MenuList>
      </Menu>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{adm.nome}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <h2
              style={{
                display: "flex",
                alignItems: "center",
                gap: "15px",
                cursor: "pointer",
              }}
            >
              Dados{" "}
              <span style={{display: 'flex', gap: '5px', alignItems: 'center'}}>
                <FiEdit size={18} onClick={handleEdit} />
                <p style={{fontSize: '13px'}}>clique no ícone para editar</p>
              </span>
            </h2>
            {inputField.map((input, index) => (
              <div
                key={index}
                style={{ margin: "5px 0px", position: "relative" }}
              >
                <label htmlFor={input.id} style={{ padding: "5px 0px" }}>
                  {input.label}
                </label>
                <Input
                  type={input.type}
                  id={input.id}
                  value={adm[input.id]}
                  onChange={handleChange}
                  disabled={input.disabled}
                  size={input.size}
                  maxLength={input.maxLength}
                />
                {input.show}
              </div>
            ))}

            <div style={{ margin: "15px 0px" }}>
              <label htmlFor="img" className={SDashboard.ImgUpdate}>
                {bool ? "Imagem adicionada" : "Atualizar imagem"}
              </label>
              <Input
                type="file"
                id="img"
                accept="image/png"
                disabled={disabled}
                onChange={handleFile}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={handleSubmit}>
              Salvar
            </Button>
            <Button colorScheme="blue" onClick={onClose}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Profile;
