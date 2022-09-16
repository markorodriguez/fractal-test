import React, {useEffect, useState} from 'react'
import {Modal} from 'react-bootstrap';

export default function NewOrderModal({showModal, title, children, closeModal}:any) {

    useEffect(()=>{
        setShow(showModal)
    }, [showModal])

    const [show, setShow] = useState(false);

    const handleClose = () => {setShow(false)
        closeModal(false)
    };
    
  return (
    <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        {children}
    </Modal.Body>
  </Modal>
  )
}
