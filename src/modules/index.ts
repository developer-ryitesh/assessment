import { authReducer } from "./(auth)/services";
import { userReducer } from "./(user)/services";
import { taskReducer } from "./(task)/services";
import { workspaceReducer } from "./(workspace)/services";

const reducers = {
   auth: authReducer,
   user: userReducer,
   task: taskReducer,
   workspace: workspaceReducer,
};

export default reducers;
