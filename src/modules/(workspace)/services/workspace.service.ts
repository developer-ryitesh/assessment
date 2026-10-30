import HttpClient from "@/libs/interceptors";
import WorkspaceRepository from "../repositories/workspace.repository";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { IBuilder, IService } from "@/libs/redux/types";
import type { IWorkspaceModel } from "../models";
import type { CreateWorkspaceDTO, RemoveMemberDTO, SendWorkspaceInviteDTO } from "../dtos";
import { updateFetch } from "@/shared/utils";

const initialState = {
   getWorkspaces: {
      isLoading: true,
      data: [] as IWorkspaceModel[],
   },
   createWorkspace: {
      isLoading: false,
      data: null as IWorkspaceModel | null,
   },
   getWorkspaceInfo: {
      isLoading: true,
      data: null as IWorkspaceModel | null,
   },
   sendWorkspaceInvite: {
      isLoading: false,
   },
   removeMembers: {
      isLoading: false,
   },
};

class WorkspaceService implements IService {
   constructor(private _workspaceRepository: WorkspaceRepository) {}

   getWorkspaces = {
      api: createAsyncThunk("!getWorkspaces", async (_, thunkAPI) => {
         try {
            const { data } = await this._workspaceRepository.getWorkspaces();
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(error);
         }
      }),
      reducer(builder: IBuilder<typeof initialState>) {
         builder.addCase(this.api.pending, (state) => {
            state.getWorkspaces.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state, action) => {
            state.getWorkspaces.isLoading = false;
            state.getWorkspaces.data = action.payload?.data || [];
         });
         builder.addCase(this.api.rejected, (state) => {
            state.getWorkspaces.isLoading = false;
         });
      },
   };

   createWorkspace = {
      api: createAsyncThunk("!createWorkspace", async (dto: CreateWorkspaceDTO, thunkAPI) => {
         try {
            const { data } = await this._workspaceRepository.createWorkspace(dto);
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(error);
         }
      }),

      reducer(builder: IBuilder<typeof initialState>) {
         builder.addCase(this.api.pending, (state) => {
            state.createWorkspace.isLoading = true;
         });

         builder.addCase(this.api.fulfilled, (state, action) => {
            state.createWorkspace.isLoading = false;
            const workspace = action.payload?.data;

            if (workspace) {
               state.getWorkspaces.data.unshift(workspace);
            }
         });

         builder.addCase(this.api.rejected, (state) => {
            state.createWorkspace.isLoading = false;
         });
      },
   };

   getWorkspaceInfo = {
      api: createAsyncThunk("!getWorkspaceInfo", async (workspace_id: string, thunkAPI) => {
         try {
            const { data } = await this._workspaceRepository.getWorkspaceInfo(workspace_id);
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(error);
         }
      }),

      reducer(builder: IBuilder<typeof initialState>) {
         builder.addCase(this.api.pending, (state) => {
            state.getWorkspaceInfo.isLoading = true;
         });

         builder.addCase(this.api.fulfilled, (state, action) => {
            state.getWorkspaceInfo.isLoading = false;
            state.getWorkspaceInfo.data = action.payload?.data;
         });

         builder.addCase(this.api.rejected, (state) => {
            state.getWorkspaceInfo.isLoading = false;
         });
      },
   };
   sendWorkspaceInvite = {
      api: createAsyncThunk("sendWorkspaceInvite", async (dto: SendWorkspaceInviteDTO, thunkAPI) => {
         try {
            const data = await updateFetch(
               () => this._workspaceRepository.sendWorkspaceInvite(dto),
               () => this._workspaceRepository.getWorkspaceInfo(dto.workspace_id), //
            );
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(error);
         }
      }),

      reducer(builder: IBuilder<typeof initialState>) {
         builder.addCase(this.api.pending, (state) => {
            state.sendWorkspaceInvite.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state, action) => {
            state.sendWorkspaceInvite.isLoading = false;
            if (state.getWorkspaceInfo.data) {
               state.getWorkspaceInfo.data.members = action.payload.data.members;
            }
         });
         builder.addCase(this.api.rejected, (state) => {
            state.sendWorkspaceInvite.isLoading = false;
         });
      },
   };

   removeMembers = {
      api: createAsyncThunk("removeMembers", async (dto: RemoveMemberDTO, thunkAPI) => {
         try {
            const { data } = await this._workspaceRepository.removeMembers(dto);
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(error);
         }
      }),

      reducer(builder: IBuilder<typeof initialState>) {
         builder.addCase(this.api.pending, (state) => {
            state.removeMembers.isLoading = true;
         });

         builder.addCase(this.api.fulfilled, (state, action) => {
            state.removeMembers.isLoading = false;
            const user_id = action.payload.data.user_id;
            state.getWorkspaceInfo.data!.members = state.getWorkspaceInfo.data!.members?.filter((m) => m._id !== user_id) || [];
         });

         builder.addCase(this.api.rejected, (state) => {
            state.removeMembers.isLoading = false;
         });
      },
   };

   private slice = createSlice({
      name: "WorkspaceService",
      initialState,
      reducers: {},
      extraReducers: (builder) => {
         this.getWorkspaces.reducer(builder);
         this.createWorkspace.reducer(builder);
         this.getWorkspaceInfo.reducer(builder);
         this.sendWorkspaceInvite.reducer(builder);
         this.removeMembers.reducer(builder);
      },
   });
   reducer = this.slice.reducer;
   actions = this.slice.actions;
}

/*---------[di container]--------*/
const container = new WorkspaceService(new WorkspaceRepository(new HttpClient()));
export const workspaceActions = container.actions;
export const workspaceReducer = container.reducer;
export const workspaceService = container as Omit<typeof container, "reducer" | "actions">;
