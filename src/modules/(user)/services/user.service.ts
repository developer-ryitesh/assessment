import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { IBuilder, IService } from "@/libs/redux/types";
import UserRepository from "../repositories/user.repository";
import type { ISessionModel } from "../models/session.model";
import HttpClient from "@/libs/interceptors";

const initialState = {
   accessToken: localStorage.getItem("accessToken") || null,
   getSession: {
      isLoading: true,
      data: null as ISessionModel | null,
   },
   getUsers: {
      isLoading: true,
      data: [] as ISessionModel[],
   },
   logout: {
      isLoading: false,
   },
};

class UserService implements IService {
   constructor(private _repo: UserRepository) {}

   getSession = {
      api: createAsyncThunk("!getSession", async (_, thunkAPI) => {
         try {
            const { data } = await this._repo.getSession();
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(error);
         }
      }),
      reducer(builder: IBuilder<typeof initialState>) {
         builder.addCase(this.api.pending, (state) => {
            state.getSession.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state, action) => {
            state.getSession.isLoading = false;
            state.getSession.data = action.payload?.data;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.getSession.isLoading = false;
         });
      },
   };

   getUsers = {
      api: createAsyncThunk("!getUsers", async (_, thunkAPI) => {
         try {
            const { data } = await this._repo.getUsers();
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(error);
         }
      }),
      reducer(builder: IBuilder<typeof initialState>) {
         builder.addCase(this.api.pending, (state) => {
            state.getUsers.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state, action) => {
            state.getUsers.isLoading = false;
            state.getUsers.data = action.payload.data || [];
         });
         builder.addCase(this.api.rejected, (state) => {
            state.getUsers.isLoading = false;
            state.getUsers.data = [];
         });
      },
   };

   logout = {
      api: createAsyncThunk("logout", async (_, thunkAPI) => {
         try {
            const { data } = await this._repo.userLogout();
            localStorage.clear();
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(error);
         }
      }),
      reducer(builder: IBuilder<typeof initialState>) {
         builder.addCase(this.api.pending, (state) => {
            state.logout.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state) => {
            state.logout.isLoading = false;
            state.accessToken = null;
            state.getSession.data = null;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.logout.isLoading = false;
         });
      },
   };

   private slice = createSlice({
      name: "UserService",
      initialState,
      reducers: {
         updateToken(state, action) {
            state.accessToken = action.payload;
         },
      },
      extraReducers: (builder) => {
         this.getSession.reducer(builder);
         this.logout.reducer(builder);
         this.getUsers.reducer(builder);
      },
   });
   reducer = this.slice.reducer;
   actions = this.slice.actions;
}

/*---------[ di container ]--------*/
const container = new UserService(new UserRepository(new HttpClient()));
export const userActions = container.actions;
export const userReducer = container.reducer;
export const userService = container as Omit<typeof container, "reducer" | "actions">;
