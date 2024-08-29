import { Button } from "../ui";
import { DeleteIcon } from "../../assets/icons";
import { useModal } from "../../context/ModalContext";

const Modal = ({ callback, title }) => {
  const { closeModal } = useModal();
  return (
    <div
      className="w-full h-full flex items-center justify-center absolute top-0 left-0 right-0 bottom-0 z-50"
      role="dialog"
      aria-labelledby="modal-title"
      aria-modal="true"
    >
      <div
        className="w-full h-full bg-black opacity-20"
        onClick={closeModal}
        aria-label="Close modal"
      ></div>
      <div className="bg-white dark:bg-black border rounded-md absolute z-10 p-12">
        <div
          className="absolute top-3 right-3 cursor-pointer"
          onClick={closeModal}
        >
          <DeleteIcon />
        </div>
        <div className="flex flex-col items-center">
          <p id="modal-title" className="font-semibold">
            {title}
          </p>
          <div className="flex gap-2 mt-4">
            <Button size="s" design="primary" onClick={callback}>
              Xoá
            </Button>
            <Button size="s" design="basic" onClick={closeModal}>
              Hủy bỏ
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
