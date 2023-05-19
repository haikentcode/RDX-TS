import { Box, Typography } from "@mui/material";
import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../store/app/hooks";
import {
  User,
  selectUser,
  userAsync,
} from "../../store/features/user/userSlice";

const UserView = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUser);

  React.useEffect(() => {
    dispatch(userAsync());
  }, [dispatch]);

  console.log(users);

  return (
    <Box>
      {users && users.map((user: User) => <Typography>{user.name}</Typography>)}
    </Box>
  );
};

export default UserView;
