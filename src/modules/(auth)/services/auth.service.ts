import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { IBuilder, IService } from "@/libs/redux/types";
import AuthRepository from "../repositories/auth.repository";
import type { LoginDTO, RegisterDTO } from "../dtos/auth.dto";
import HttpClient from "@/libs/interceptors";

const initialState = {
   login: {
      isLoading: false,
   },
   register: {
      isLoading: false,
   },
};

class AuthService implements IService {
   constructor(private _repo: AuthRepository) {}

   login = {
      api: createAsyncThunk("login", async (credentials: LoginDTO, thunkAPI) => {
         try {
            const { data } = await this._repo.login(credentials);
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(error);
         }
      }),
      reducer(builder: IBuilder<typeof initialState>) {
         builder.addCase(this.api.pending, (state) => {
            state.login.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state) => {
            state.login.isLoading = false;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.login.isLoading = false;
         });
      },
   };

   register = {
      api: createAsyncThunk("register", async (credentials: RegisterDTO, thunkAPI) => {
         try {
            const { data } = await this._repo.register(credentials);
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(error);
         }
      }),

      reducer(builder: IBuilder<typeof initialState>) {
         builder
            .addCase(this.api.pending, (state) => {
               state.register.isLoading = true;
            })
            .addCase(this.api.fulfilled, (state) => {
               state.register.isLoading = false;
            })
            .addCase(this.api.rejected, (state) => {
               state.register.isLoading = false;
            });
      },
   };

   private slice = createSlice({
      name: "AuthService",
      initialState,
      reducers: {},
      extraReducers: (builder) => {
         this.login.reducer(builder);
         this.register.reducer(builder);
      },
   });
   reducer = this.slice.reducer;
   actions = this.slice.actions;
}

/*---------[di container]--------*/
const container = new AuthService(new AuthRepository(new HttpClient()));
export const authActions = container.actions;
export const authReducer = container.reducer;
export const authService = container as Omit<typeof container, "reducer" | "actions">;
