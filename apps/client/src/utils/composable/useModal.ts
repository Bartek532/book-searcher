import { reactive } from "vue";

type ModalTypes = "warning" | "success" | "question" | "info";

const modal = reactive({
  type: "warning" as ModalTypes,
  message: "",
  show: false,
});

export const useModal = () => {
  const setModal = (type: ModalTypes, message: string, show = true) => {
    modal.show = show;
    modal.type = type;
    modal.message = message;
  };

  const hideModal = () => {
    modal.show = false;
  };

  return { modal, setModal, hideModal };
};
