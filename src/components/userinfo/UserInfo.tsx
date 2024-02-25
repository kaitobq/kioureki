import { FirebaseApp } from "@/firebase/FirebaseConfig";
import { Box, Typography } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";

const UserInfo = () => {
  const [user] = useAuthState(FirebaseApp.auth);

  return (
    <Box
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Typography component="h5">{user?.email}さんようこそ</Typography>
    </Box>
  );
};

export default UserInfo;
