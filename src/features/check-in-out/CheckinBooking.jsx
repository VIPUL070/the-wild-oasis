import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Checkbox from "../../ui/Checkbox";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import { useEffect, useState } from "react";
import Spinner from "../../ui/Spinner";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckin";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const { booking, isLoading } = useBooking();
  const [confirmed, setConfirmed] = useState(false);
  const moveBack = useMoveBack();
  const bookingId = booking?.id;
  const guestName = booking?.fullName;
  const isPaid = booking?.isPaid;
  const totalPrice = booking?.totalPrice;

  const { checkin, isCheckingIn } = useCheckin();

  useEffect(() => {
    setConfirmed(isPaid || false);
  }, [isPaid]);

  // const {
  //   // id: bookingId,
  //   // guests,
  //   totalPrice,
  //   // numGuests,
  //   // hasBreakfast,
  //   // numNights,
  // } = booking;

  if (isLoading) return <Spinner />;

  function handleCheckin() {
    if (!confirmed) return;
    checkin(bookingId);
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      <Box>
        <Checkbox
          checked={confirmed}
          onChange={() => setConfirmed((confirmed) => !confirmed)}
          id="confirmed"
          disabled={confirmed || isCheckingIn}
        >
          I confirm that {guestName} has paid the {formatCurrency(totalPrice)}
        </Checkbox>
      </Box>
      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmed || isCheckingIn}>
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
