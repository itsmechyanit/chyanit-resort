/* eslint-disable no-unused-vars */
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import useEditSettings from "./useEditSettings";
import useSettings from "./useSettings";

function UpdateSettingsForm() {
  const { settings, isPending } = useSettings();
  const { editSettings, isPending: isUpdatingSettings } = useEditSettings();
  function handleBlur(event) {
    const obj = {
      [event.target.id]: event.target.value,
    };

    editSettings({
      [event.target.id]: event.target.value,
    });
  }
  if (isPending) return <Spinner />;
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="minBookingLength"
          defaultValue={settings?.minBookingLength ?? ""}
          onBlur={handleBlur}
          disabled={isUpdatingSettings}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="maxBookingLength"
          defaultValue={settings?.maxBookingLength ?? ""}
          onBlur={handleBlur}
          disabled={isUpdatingSettings}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="maxGuestsPerBooking"
          defaultValue={settings?.maxGuestsPerBooking ?? ""}
          onBlur={handleBlur}
          disabled={isUpdatingSettings}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfastPrice"
          defaultValue={settings?.breakfastPrice ?? ""}
          onBlur={handleBlur}
          disabled={isUpdatingSettings}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
