import { FirebaseApp } from "@/firebase/FirebaseConfig";
import { Box, Button, Typography } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";

const UserInfo = () => {
  const [user] = useAuthState(FirebaseApp.auth);

  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Typography component="h5" my={1}>
        ようこそ {user?.email}さん
      </Typography>
      <Button href="/home" variant="contained" fullWidth>
        始める
      </Button>
    </Box>
  );
};

export default UserInfo;
