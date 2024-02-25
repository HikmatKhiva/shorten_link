import { Menu, Transition } from "@headlessui/react";
import { useAppDispatch, useAppSelector } from "../hooks/app";
import { Fragment } from "react";
import { CgProfile } from "react-icons/cg";
import { CiLogout } from "react-icons/ci";
import { logout } from "../store/slice/userSlice";
const HeaderDropDown = () => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  return (
    <Menu as="div" className="mt-2">
      <Menu.Button title={user?.name ? user?.name : ""}>
        <CgProfile size={20} />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duratioisOpenn-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute shadow-xl flex flex-col gap-2 shadow-white bg-primary-blue  min-w-28 right-0 top-10 rounded  p-2 px-4">
          <Menu.Item
            as="button"
            type="button"
            className="flex gap-x-2 items-center w-full truncate"
          >
            <CgProfile size={18} />
            {user?.name}
          </Menu.Item>
          <Menu.Item
            as="button"
            type="button"
            onClick={() => dispatch(logout())}
            className="flex justify-between items-center w-full"
          >
            sign Out
            <CiLogout />
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
export default HeaderDropDown;
