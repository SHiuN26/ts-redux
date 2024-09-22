import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserById } from "../../redux/userSlice";
import { RootState, AppDispatch } from "../../store";

const UserComponent = () => {
  const dispatch = useDispatch<AppDispatch>();

  // 从 Redux store 中获取用户状态
  const user = useSelector((state: RootState) => state.user.entities[1]);
  const loading = useSelector((state: RootState) => state.user.loading);
  const error = useSelector((state: RootState) => state.user.error);

  useEffect(() => {
    // 触发异步请求获取用户信息
    dispatch(fetchUserById(1));
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      {user ? (
        <div>
          <h2>{user.name}</h2>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>No user found</p>
      )}
    </div>
  );
};

export default UserComponent;
