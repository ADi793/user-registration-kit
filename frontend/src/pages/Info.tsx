import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import { AccountProfile } from "../components/AccountProfile";
import { AccountProfileDetails } from "../components/AccountProfileDetails";

function Info() {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <div>
            <Typography variant="h4" sx={{ pb: 3 }}>
              Registered Details
            </Typography>
          </div>
          <div>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={4}>
                <AccountProfile />
              </Grid>
              <Grid item xs={12} md={6} lg={8}>
                <AccountProfileDetails />
              </Grid>
            </Grid>
          </div>
        </Stack>
      </Container>
    </Box>
  );
}

export default Info;
