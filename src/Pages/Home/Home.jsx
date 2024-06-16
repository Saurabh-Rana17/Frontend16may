import Grid from "@mui/material/Grid";
import MainFeaturedPost from "./MainFeaturedPost";
import Main from "./Main.jsx";
import Sidebar from "./Sidebar";
import RecommendedPost from "./Recommended.jsx";
import MainCategory from "./MainCategory.jsx";

export default function Home() {
  return (
    <main>
      <MainFeaturedPost />
      <MainCategory />
      <RecommendedPost />
      <Grid container spacing={5} sx={{ mt: 3 }}>
        <Main />
        <Sidebar />
      </Grid>
    </main>
  );
}
