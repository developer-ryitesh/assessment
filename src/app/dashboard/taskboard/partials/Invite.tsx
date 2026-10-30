import { useEffect, useRef, type ComponentType } from "react";
import { Modal, TabGroup, type ModalRefType } from "@/shared/components";
import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks";
import { userService } from "@/modules/(user)/services";
import { Button } from "@/shared/ui";
import { workspaceService } from "@/modules/(workspace)/services";
import type { ISessionModel } from "@/modules/(user)/models";

type Props = {
   Trigger: ComponentType<{ onToggle: () => void }>;
};
export default function Invite({ Trigger }: Props) {
   const { getUsers } = useAppSelector((state) => state.user);

   const { getWorkspaceInfo } = useAppSelector((state) => state.workspace);
   const workspace = getWorkspaceInfo.data;
   const members = workspace?.members || [];
   const dispatch = useAppDispatch();
   const modalRef = useRef<ModalRefType>(null);

   useEffect(() => {
      dispatch(userService.getUsers.api());
      return () => {};
   }, []);

   if (getUsers.isLoading) {
      return "Loading....";
   }
   const users = getUsers.data;
   const memberUsers = users.filter((user) => members.some((member) => member._id === user._id));
   const nonMemberUsers = users.filter((user) => !members.some((member) => member._id === user._id));
   return (
      <>
         <Trigger onToggle={() => modalRef.current?.setToggle(true)} />

         <Modal ref={modalRef} title={`User Invitation`} size="lg" className="rounded-xl p-5" closeable>
            <TabGroup
               tabs={[
                  {
                     label: "+ Add",
                     content: <UserList users={nonMemberUsers} workspace_id={workspace?._id as string} />,
                  },
                  {
                     label: "Members",
                     content: <UserList users={memberUsers} workspace_id={workspace?._id as string} isMember />,
                  },
               ]}
            />
         </Modal>
      </>
   );
}

function UserList({ workspace_id, users, isMember }: { users: ISessionModel[]; isMember?: boolean; workspace_id: string }) {
   const dispatch = useAppDispatch();
   const { data: session } = useAppSelector((state) => state.user.getSession);

   const sendWorkspaceInvite = async (user: ISessionModel) => {
      try {
         await dispatch(
            workspaceService.sendWorkspaceInvite.api({
               workspace_id,
               user_id: user._id,
            }),
         ).unwrap();
      } catch {
         return;
      }
   };

   const onRemoveMember = async (user: ISessionModel) => {
      try {
         await dispatch(
            workspaceService.removeMembers.api({
               workspace_id,
               user_id: user._id,
            }),
         ).unwrap();
      } catch {
         return;
      }
   };

   return (
      <div className="h-[50vh] overflow-y-auto">
         {users.map((user) => {
            const isMe = session?._id === user._id;
            return (
               <div key={user._id} className="flex items-center justify-between gap-3 py-2 px-4">
                  <div className="flex items-center gap-3 min-w-0">
                     <img src={user.avatar} alt={user.avatar} className="size-10 rounded-full object-cover shrink-0" />
                     <div className="min-w-0">
                        <p className="text-sm font-medium truncate">
                           {user.email} {isMe ? "(you)" : ""}
                        </p>
                     </div>
                  </div>
                  {!isMember ? (
                     <Button type="button" accent="done" size="xs" onClick={() => sendWorkspaceInvite(user)}>
                        Invite
                     </Button>
                  ) : (
                     <Button type="button" variant="outline" accent="error" size="xs" onClick={() => onRemoveMember(user)}>
                        Remove
                     </Button>
                  )}
               </div>
            );
         })}
      </div>
   );
}
