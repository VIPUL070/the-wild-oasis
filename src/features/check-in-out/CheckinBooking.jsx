import { useBooking } from "../bookings/useBooking";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckin";
import { useSettings } from "../settings/useSettings";
import BookingDataBox from "../../features/bookings/BookingDataBox";
import Spinner from "../../ui/Spinner";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Checkbox from "../../ui/Checkbox";
import styled from "styled-components";

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
  const [addBreakfast, setAddBreakfast] = useState(false);
  const moveBack = useMoveBack();
  const bookingId = booking?.id;
  const guestName = booking?.fullName;
  const isPaid = booking?.isPaid;
  const totalPrice = booking?.totalPrice;
  const numNights = booking?.numNights;
  const numGuests = booking?.numGuests;
  const hasBreakfast = booking?.hasBreakfast;

  const { settings, isLoading: isLoadingSettings } = useSettings();
  const optionalBreakfastPrice =
    settings?.breakfastPrice * numNights * numGuests;

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

  if (isLoading || isLoadingSettings) return <Spinner />;

  function handleCheckin() {
    if (!confirmed) return;
    if (addBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extraPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      });
    } else {
      checkin({ bookingId, breakfast: {} });
    }
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
            checked={addBreakfast}
            id="breakfast"
            onChange={() => {
              setAddBreakfast((addBreakfast) => !addBreakfast);
              setConfirmed(false);
            }}
            disabled={addBreakfast}
          >
            Want to add Breakfast for {formatCurrency(optionalBreakfastPrice)}
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmed}
          onChange={() => {
            setConfirmed((confirmed) => !confirmed);
          }}
          id="confirmed"
          disabled={confirmed || isCheckingIn}
        >
          I confirm that {guestName} has paid the{" "}
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(totalPrice + optionalBreakfastPrice)}
              (${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalBreakfastPrice
              )})
            `}
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
