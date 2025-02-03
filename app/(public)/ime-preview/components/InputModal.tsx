import { Modal, Button } from "@nextui-org/react";

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  inputs: { date: string; time: string; name: string; description: string };
}

const InputModal = ({ visible, onClose, inputs }: ModalProps) => {
  return (
    <Modal open={visible} onClose={onClose}>
      <Modal.Header>
        <h4>Your Inputs</h4>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Date:</strong> {inputs.date}</p>
        <p><strong>Time:</strong> {inputs.time}</p>
        <p><strong>Name:</strong> {inputs.name}</p>
        <p><strong>Description:</strong> {inputs.description}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat color="error" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default InputModal;
