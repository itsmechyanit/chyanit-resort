import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

// function AddCabin() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   function onClick() {
//     setIsModalOpen((isVisible) => !isVisible);
//   }
//   return (
//     <div>
//       <Button onClick={onClick}>Show Cabin Form</Button>
//       {isModalOpen && (
//         <Modal onClose={() => setIsModalOpen(false)}>
//           <CreateCabinForm onCloseModal={() => setIsModalOpen(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// }

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open itemName="cabin-form">
          <Button>Add A Cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddCabin;
