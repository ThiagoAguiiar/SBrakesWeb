import React from 'react'
import axios from 'axios'
import SListarCaminhao from '../../css/ListarCaminhao.module.css'
import { Tooltip, useDisclosure } from '@chakra-ui/react'
import { FiMoreHorizontal } from 'react-icons/fi'
import { IoMdClose } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { Action } from '../Buttons'
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button
} from '@chakra-ui/react'

const Caminhao = ({ placa, modelo, marca, piloto, ativo }) => {
  const { isOpen, onClose, onOpen } = useDisclosure()

  function handleExcluir() {
    axios.post('http://localhost:3001/excluir-caminhao', {
      placa: placa
    }).then(response => {
      console.log(response.data)
      window.location.reload()
    }).catch(() => {
      console.log('erro')
    })
  }

  return <>
    <div className={`row ${SListarCaminhao.Caminhao} animate__animated animate__fadeInUp`}>
      <div className={`col-md-2 ${SListarCaminhao.modelo}`}>
        <p className={SListarCaminhao.legendas}>Modelo</p>
        <p style={{ width: '100%' }}>{modelo}</p>
      </div>

      <div className={`col-md-2 ${SListarCaminhao.placa}`}>
        <p className={SListarCaminhao.legendas}>Placa</p>
        <p>{placa}</p>
      </div>

      <div className={`col-md-2 ${SListarCaminhao.marca}`}>
        <p className={SListarCaminhao.legendas}>Marca</p>
        <p>{marca}</p>
      </div>

      <div className={`col-md-2 ${SListarCaminhao.piloto}`}>
        <p className={SListarCaminhao.legendas}>Motorista</p>
        <p style={{color: piloto !== null ? 'black' : 'gray'}}>{piloto !== null ? piloto : 'sem motorista'}</p>
      </div>

      <div className={`col-md-1 ${SListarCaminhao.ativo}`}>
        <p className={SListarCaminhao.legendas}>Status</p>
        <p>{ativo === 1 ? 'Ativo' : 'Inativo'}</p>
      </div>

      <div className={`col-md-3 ${SListarCaminhao.buttons}`}>
        <Tooltip label='Editar'>
          <Link to={placa} >
            <Action>
              <FiMoreHorizontal size={20} />
            </Action>
          </Link>
        </Tooltip>

        <Tooltip label='Excluir'>
          <Action onClick={onOpen}  >
            <IoMdClose size={20} />
          </Action>
        </Tooltip>
      </div>
    </div>

    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Excluir veículo</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          DESEJA EXCLUIR ESTE VEÍCULO? <br /> {modelo} ({placa})
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            Cancelar
          </Button>
          <Button variant='ghost' onClick={handleExcluir}>Excluir</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </>
}

export default Caminhao