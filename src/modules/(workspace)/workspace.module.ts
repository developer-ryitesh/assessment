import { Router } from "express";
import WorkspaceController from "./controllers/workspace.controller";
import WorkspaceService from "./services/workspace.service";
import WorkspaceRepository from "./repositories/workspace.repository";
import auth from "../../middlewares/auth.middleware";
import MemberService from "./services/member.service";
import MemberRepository from "./repositories/member.repository";

export default function WorkspaceModule() {
   const routes = Router();
   const container = new WorkspaceController(
      new WorkspaceService(
         new WorkspaceRepository(), //
      ),
      new MemberService(
         new MemberRepository(), //
      ),
   );
   routes.post("/new-workspace", [auth], container.createWorkspace);
   routes.get("/workspaces", [auth], container.getWorkspaces);
   routes.get("/workspaces/:id", [auth], container.getWorkspaceInfo);
   routes.patch("/update-workspace/:id", [auth], container.updateWorkspace);
   routes.delete("/delete-workspace/:id", [auth], container.deleteWorkspace);

   //member
   routes.post("/invite", [auth], container.sendMemberInvite);
   routes.delete("/remove-member", [auth], container.removeMember);

   return routes;
}
