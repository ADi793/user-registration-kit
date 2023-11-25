import { Avatar, Box, Card, CardContent, Typography } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export const AccountProfile = () => {
  const { user } = useContext(UserContext);

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Avatar
            sx={{
              height: 80,
              mb: 2,
              width: 80,
            }}
          />
          <Typography gutterBottom variant="h5">
            {user.firstName} {user.lastName}
          </Typography>
          <Typography color="text.secondary" variant="body2">
            {user.city}, {user.country}
          </Typography>
          <Typography color="text.secondary" variant="body2">
            {user.email}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
