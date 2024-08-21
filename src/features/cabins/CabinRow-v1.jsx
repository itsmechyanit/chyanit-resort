/* eslint-disable react/prop-types */
import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";

import CreateCabinForm from "./CreateCabinForm";
import useDeleteCabin from "./useDeleteCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import useCreateCabin from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

export default function CabinRow({ cabin }) {
  const { mutate, isDeleting } = useDeleteCabin();
  const { createCabin, isCreating } = useCreateCabin();
  function handleDuplicate() {
    const dupData = { ...cabin, name: `copy of ${cabin.name}` };
    delete dupData.id;
    createCabin(dupData);
  }
  return (
    <Table.Row>
      <Img src={cabin.image} alt={cabin.name} />
      <Cabin>{cabin.name}</Cabin>
      <div>Fits up to {cabin.maxCapacity} guests</div>
      <Price>{formatCurrency(cabin.regularPrice)}</Price>
      <Discount>{formatCurrency(cabin.discount)}</Discount>
      <div>
        <button onClick={handleDuplicate} disabled={isCreating}>
          <HiSquare2Stack />
        </button>
        <Modal>
          <Modal.Open itemName="editCabin">
            <button>
              <HiPencil />
            </button>
          </Modal.Open>
          <Modal.Window name="editCabin">
            <CreateCabinForm cabinToEdit={cabin} />
          </Modal.Window>
          <Modal.Open itemName="deleteCabin">
            <button>
              <HiTrash />
            </button>
          </Modal.Open>
          <Modal.Window name="deleteCabin">
            <ConfirmDelete
              resourceName={"Cabin"}
              onConfirm={() => mutate(cabin.id)}
              disabled={isDeleting}
            />
          </Modal.Window>
        </Modal>
        <Menus.Menu>
          <Menus.Toggle id={cabin.id} />
          <Menus.List id={cabin.id}>
            <Menus.Button icon={<HiSquare2Stack />} onClick={handleDuplicate}>
              Duplicate
            </Menus.Button>
            <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
            <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
          </Menus.List>
        </Menus.Menu>
      </div>
    </Table.Row>
  );
}
