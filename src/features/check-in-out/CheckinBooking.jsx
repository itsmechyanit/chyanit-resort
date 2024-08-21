/* eslint-disable no-unused-vars */
import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import useCheckin from "./useCheckin";
import useSettings from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPayment, setConfirmPayment] = useState(false);
  const [addBreakFast, setAddBreakFast] = useState(false);
  const moveBack = useMoveBack();
  const { settings, isPending: fetchingSettings } = useSettings();

  const { isPending, booking } = useBooking();
  const { checkin, isCheckingIn } = useCheckin();
  useEffect(
    function () {
      setConfirmPayment(booking?.isPaid ?? false);
    },
    [booking]
  );

  if (isPending || fetchingSettings) return <Spinner />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const breakFastPrice = settings.breakfastPrice * numGuests * numNights;

  function handleCheckin() {
    if (addBreakFast) {
      checkin({
        bookingId,
        breakfast: {
          extrasPrice: breakFastPrice,
          totalPrice: totalPrice + breakFastPrice,
          hasBreakfast: true,
        },
      });
    } else {
      checkin({ bookingId, breakfast: {} });
    }
  }

  function onChangeBreakFast() {
    setAddBreakFast((state) => !state);
    setConfirmPayment(false);
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakFast}
            onChange={onChangeBreakFast}
            disabled={addBreakFast}
          >
            order breakfast at {formatCurrency(breakFastPrice)}
          </Checkbox>
        </Box>
      )}
      <Box>
        <Checkbox
          checked={confirmPayment}
          onChange={() => setConfirmPayment((state) => !state)}
          disabled={confirmPayment}
        >
          I confirm that {guests.fullName} has made the payment of{" "}
          {addBreakFast
            ? formatCurrency(totalPrice + breakFastPrice)
            : formatCurrency(totalPrice)}{" "}
          {`${
            addBreakFast
              ? ` (${formatCurrency(totalPrice)} + ${formatCurrency(
                  breakFastPrice
                )})`
              : ""
          }`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button
          onClick={handleCheckin}
          disabled={!confirmPayment || isCheckingIn}
        >
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
