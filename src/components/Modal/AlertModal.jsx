import { Button, Modal } from "react-bootstrap";
import style from "./AlertModal.module.scss";

const AlertModal = ({errorMsg, modalShow, setModalShow}) => {

  return (
    <Modal
      show={modalShow}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <div className={style.AlertModal__textbox}>{errorMsg}</div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={() => setModalShow(false)}>
          확인
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AlertModal;
