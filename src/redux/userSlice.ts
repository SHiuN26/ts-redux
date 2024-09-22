import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// 定义用户数据的类型
interface User {
  id: number;
  name: string;
  email: string;
}

interface UserState {
  entities: Record<number, User>;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  entities: {},
  loading: false,
  error: null,
};

// 使用 createAsyncThunk 定义异步操作
export const fetchUserById = createAsyncThunk(
  "users/fetchById",
  async (userId: number, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}`
      );
      // 如果请求失败，手动抛出错误
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data as User;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// 使用 createSlice 定义 reducer 和处理异步 action 的额外状态
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // 处理异步操作的三种状态：pending, fulfilled, rejected
    builder
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUserById.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.entities[action.payload.id] = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default userSlice.reducer;
