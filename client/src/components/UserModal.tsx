import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { IoClose } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "../hooks/app";
import { handleClose } from "../store/slice/settingSlice";
import UpdateProfile from "./forms/UpdateProfile";
const UserModal = () => {
  const { isOpen } = useAppSelector((state) => state.setting);
  const dispatch = useAppDispatch();
  return (
    <Transition as={Fragment} appear show={isOpen}>
      <Dialog
        className="relative z-10"
        as="div"
        onClose={() => dispatch(handleClose())}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full relative max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-xl font-medium leading-6 text-center text-gray-900"
                >
                  Change Profile
                </Dialog.Title>
                <UpdateProfile />
                <button
                  type="button"
                  className="absolute top-2 right-3 border p-1 border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white transition-all duration-300"
                  onClick={() => dispatch(handleClose())}
                >
                  <IoClose size={18} />
                </button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
export default UserModal;
