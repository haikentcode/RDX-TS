import { Box } from "@mui/material";
import AppBarWithDrawer from "../../components/AppBarWithDrawer/AppBarWithDrawer";
import { Counter } from "../../components/Counter/Counter";
import DocumentView from "../../components/DocumentView/DocumentView";
import PhotosView from "../../components/PhotosView/PhotosVIew";
import PostView from "../../components/PostView/PostView";
import UserView from "../../components/UserView/UserView";
import Grid2View from "../../components/Grid2View/Grid2View";

interface HomeProps {
  page: string;
}

const Home = ({ page }: HomeProps) => (
  <Box>
    <AppBarWithDrawer page={page}>
      <Box>{page === "user" && <UserView></UserView>}</Box>
      <Box>{page === "post" && <PostView></PostView>}</Box>
      <Box>{page === "counter" && <Counter></Counter>}</Box>
      <Box>{page === "photos" && <PhotosView></PhotosView>}</Box>
      <Box>{page === "documents" && <DocumentView></DocumentView>}</Box>
      <Box>{page === "grid2" && <Grid2View></Grid2View>}</Box>
    </AppBarWithDrawer>
  </Box>
);

export default Home;
