import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "./useBooking";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router-dom";
import useCheckout from "../check-in-out/useCheckout";
import useDeleteBooking from "./useDeleteBooking";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const navigate = useNavigate();
  const { isPending, booking } = useBooking();
  const { remove, isDeleting } = useDeleteBooking();
  const status = "checked-in";

  const moveBack = useMoveBack();
  const { checkout, isCheckingOut } = useCheckout();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  if (isPending) return <Spinner />;

  if (!booking) return <Empty resource="Booking" />;

  return (
    <Modal>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{booking.id}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {booking.status === "unconfirmed" && (
          <Button onClick={() => navigate(`/checkin/${booking.id}`)}>
            Check In
          </Button>
        )}
        {booking.status === "checked-in" && (
          <Button onClick={() => checkout(booking.id)} disabled={isCheckingOut}>
            Check Out
          </Button>
        )}
        <Modal.Open itemName={booking.id}>
          <Button variation="danger">Delete</Button>
        </Modal.Open>
        <Modal.Window name={booking.id}>
          <ConfirmDelete
            resourceName={"booking"}
            onConfirm={() =>
              remove(booking.id, {
                onSuccess: () => navigate(-1),
              })
            }
            disabled={isDeleting}
          />
        </Modal.Window>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </Modal>
  );
}

export default BookingDetail;
