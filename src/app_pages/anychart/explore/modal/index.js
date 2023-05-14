import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
// import anychart from 'anychart';


const ModalIndex = ({ chart, anychart }) => {
   const [show, setShow] = useState(true);

   const handleClose = () => {
      anychart.theme("darkGlamour");
      setShow(false)
   };
   const handleShow = () => setShow(true);

   console.log(anychart)

   return (
      <Modal show={show} onHide={handleClose}>
         <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
         </Modal.Header>
         <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
         <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
               Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
               Save Changes
            </Button>
         </Modal.Footer>
         </Modal> 
   )
}

export default ModalIndex;