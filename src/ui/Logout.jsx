import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import useLogout from "../features/authentication/useLogout";

function Logout() {
  const { logout, isPending } = useLogout();
  return (
    <ButtonIcon onClick={logout} disabled={isPending}>
      <HiArrowRightOnRectangle />
    </ButtonIcon>
  );
}

export default Logout;
