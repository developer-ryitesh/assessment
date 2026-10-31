import HttpClient from "@/libs/interceptors";
import TaskRepository from "../repositories/task.repository";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { IBuilder, IService } from "@/libs/redux/types";
import type { ITaskModel } from "../models";
import type { CreateTaskDTO, MoveStoryDTO, UpdateTaskDTO } from "../dtos";

const initialState = {
   getTasks: {
      isLoading: true,
      data: [] as ITaskModel[],
   },
   moveStory: {
      isLoading: false,
   },
   createTask: {
      isLoading: false,
   },
   deleteTask: {
      isLoading: false,
   },
   updateTask: {
      isLoading: false,
   },
};

class TaskService implements IService {
   constructor(private _taskRepository: TaskRepository) {}

   getTasks = {
      api: createAsyncThunk("!getTasks", async (workspace_id: string, thunkAPI) => {
         try {
            const { data } = await this._taskRepository.getTasks(workspace_id);
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(error);
         }
      }),
      reducer(builder: IBuilder<typeof initialState>) {
         builder.addCase(this.api.pending, (state) => {
            state.getTasks.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state, action) => {
            state.getTasks.isLoading = false;
            state.getTasks.data = action.payload?.data || [];
         });
         builder.addCase(this.api.rejected, (state) => {
            state.getTasks.isLoading = false;
         });
      },
   };

   moveStory = {
      api: createAsyncThunk("!moveStory", async (dto: MoveStoryDTO, thunkAPI) => {
         try {
            const { data } = await this._taskRepository.moveStory(dto);
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(error);
         }
      }),
      reducer(builder: IBuilder<typeof initialState>) {
         builder.addCase(this.api.pending, (state) => {
            state.moveStory.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state) => {
            state.moveStory.isLoading = false;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.moveStory.isLoading = false;
         });
      },
   };

   createTask = {
      api: createAsyncThunk("createTask", async (dto: CreateTaskDTO, thunkAPI) => {
         try {
            const { data } = await this._taskRepository.createTask(dto);
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(error);
         }
      }),
      reducer(builder: IBuilder<typeof initialState>) {
         builder.addCase(this.api.pending, (state) => {
            state.createTask.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state, action) => {
            state.createTask.isLoading = false;
            state.getTasks.data.push(action.payload.data);
         });
         builder.addCase(this.api.rejected, (state) => {
            state.createTask.isLoading = false;
         });
      },
   };

   updateTask = {
      api: createAsyncThunk("updateTask", async (dto: any, thunkAPI) => {
         try {
            const { data } = await this._taskRepository.updateTask(dto);
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(error);
         }
      }),

      reducer(builder: IBuilder<typeof initialState>) {
         builder.addCase(this.api.pending, (state) => {
            state.updateTask.isLoading = true;
         });

         builder.addCase(this.api.fulfilled, (state, action) => {
            const updatedTask = action.payload.data;
            const index = state.getTasks.data.findIndex((task) => task._id === updatedTask._id);
            if (index !== -1) {
               state.getTasks.data[index] = updatedTask;
            }
            state.updateTask.isLoading = false;
         });

         builder.addCase(this.api.rejected, (state) => {
            state.updateTask.isLoading = false;
         });
      },
   };

   deleteTask = {
      api: createAsyncThunk("deleteTask", async (task_id: string, thunkAPI) => {
         try {
            const { data } = await this._taskRepository.deleteTask(task_id);
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(error);
         }
      }),
      reducer(builder: IBuilder<typeof initialState>) {
         builder.addCase(this.api.pending, (state) => {
            state.deleteTask.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state, action) => {
            state.deleteTask.isLoading = false;
            state.getTasks.data = state.getTasks.data.filter((task) => task._id !== action.payload.data?._id);
         });
         builder.addCase(this.api.rejected, (state) => {
            state.deleteTask.isLoading = false;
         });
      },
   };

   private slice = createSlice({
      name: "TaskService",
      initialState,
      reducers: {
         setTask(state, action) {
            state.getTasks.data = action.payload;
         },
      },
      extraReducers: (builder) => {
         this.getTasks.reducer(builder);
         this.moveStory.reducer(builder);
         this.createTask.reducer(builder);
         this.updateTask.reducer(builder);
         this.deleteTask.reducer(builder);
      },
   });
   reducer = this.slice.reducer;
   actions = this.slice.actions;
}

/*---------[di container]--------*/
const container = new TaskService(new TaskRepository(new HttpClient()));
export const taskActions = container.actions;
export const taskReducer = container.reducer;
export const taskService = container as Omit<typeof container, "reducer" | "actions">;
