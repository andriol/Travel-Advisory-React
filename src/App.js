import React from "react";
import Header from "./components/Header/Header";
import ListItems from "./components/ListItems/ListItems";
import ItemDetails from "./components/ItemDetails/ItemDetails";
import Map from "./components/Map/Map";
import { CssBaseline, Grid } from "@material-ui/core";

const App = () => {
  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <ListItems />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map />
        </Grid>
      </Grid>
      {/* <ItemDetails /> */}
    </>
  );
};

export default App;
