// Imports
import React from "react";
import axios from "axios";
import SListarFuncionario from "../../css/ListarFuncionario.module.css";
import {IoMdClose } from "react-icons/io";
import { FiMoreHorizontal } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Tooltip, useDisclosure, useToast } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import { Action } from "../Buttons";

const Funcionario = ({
  nome,
  credencial,
  status,
  adm,
  img
}) => {
  const toast = useToast();
  const { isOpen, onClose, onOpen } = useDisclosure();

  // Excluir o funcionário do banco
  function handleExcluir() {
    axios.post("http://localhost:3001/excluir-funcionario", {
      credencial: credencial,
    })
      .then((response) => {
        toast({
          title: "Atenção",
          description: response.data,
          duration: 1700,
          isClosable: true,
          status: "warning",
        });

        if (response.status === 200) {
          window.location.reload();
        }
      })
      .catch(() => {
        console.log("erro");
      });
  }

  // Componente JSX
  return (
    <>
      <div
        className={`row ${SListarFuncionario.Funcionario} animate__animated animate__fadeInUp`}
      >
        <div className={`col-md-1 ${SListarFuncionario.imgContainer}`}>
          <div className={SListarFuncionario.img}>
            <img src={img} alt="img" />
          </div>
        </div>

        <div className={`col-md-3 ${SListarFuncionario.nome}`}>
          <p>{nome}</p>
        </div>

        <div className={`col-md-2 ${SListarFuncionario.credencial}`}>
          <p className={SListarFuncionario.legendas}>Credencial</p>
          <p style={{ width: "100%" }}>{credencial}</p>
        </div>

        <div className={`col-md-1 ${SListarFuncionario.status}`}>
          <p className={SListarFuncionario.legendas}>Status</p>
          <p className={SListarFuncionario.statusColor} style={{background: status === 1 ? "lime" : "#ff0a54"}}></p>
        </div>

        <div className={`col-md-2 ${SListarFuncionario.adm}`}>
          <p className={SListarFuncionario.legendas}>Usuário</p>
          <Tooltip label={adm === 1 ? "adm" : "comum"}>
            <p>{adm === 1 ? "Adm" : "Comum"}</p>
          </Tooltip>
        </div>

        <div className={`col-md-3 ${SListarFuncionario.buttons}`}>
          <Tooltip label="Editar">
            <Link to={credencial}>
              <Action>
                <FiMoreHorizontal size={20} />
              </Action>
            </Link>
          </Tooltip>

          <Tooltip label="Excluir">
            <Action onClick={onOpen}>
              <IoMdClose size={20} />
            </Action>
          </Tooltip>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Excluir funcionário</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>Deseja excluir esse funcionário?</p>
            <p>
              {nome} <span>({credencial})</span>
            </p>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button variant="ghost" onClick={handleExcluir}>
              Excluir
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Funcionario;
