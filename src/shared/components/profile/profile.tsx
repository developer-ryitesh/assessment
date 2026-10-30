import { type ComponentType, useRef } from "react";
import { Modal, type ModalRefType } from "../modal/modal";
import { Avatar } from "../avatar/avatar";

type Props = {
   isOnline?: boolean;
   profile: {
      email?: string;
      fullname?: string;
      avatar?: string;
      about?: string;
   };
   Trigger?: ComponentType<{ onOpen: () => void | undefined }>;
   Action?: React.ReactNode;
};

export function Profile({ profile, isOnline, Trigger, Action }: Props) {
   const modalRef = useRef<ModalRefType>(null);
   return (
      <div>
         {Trigger && <Trigger onOpen={() => modalRef.current?.setToggle(true)} />}
         <Modal ref={modalRef} size="xl" title="User Profile" className="p-4" closeable>
            <div className="space-y-2">
               <Avatar //
                  src={profile?.avatar}
                  isOnline={isOnline}
                  size={100}
                  fullname={profile?.fullname}
               />
               <div className="p-2">
                  <span className="block text-xs font-semibold uppercase">Fullname</span>
                  <span className="text-xs block mt-1">{profile?.fullname}</span>
               </div>
               <div className="p-2">
                  <span className="block text-xs font-semibold uppercase">Email</span>
                  <span className="text-xs block mt-1">{profile?.email}</span>
               </div>
               <div className="p-2">
                  <span className="block text-xs font-semibold uppercase">About me</span>
                  <span className="text-xs block mt-1">{profile?.about || "-"}</span>
               </div>
               {Action && <div className="p-2">{Action}</div>}
            </div>
         </Modal>
      </div>
   );
}
