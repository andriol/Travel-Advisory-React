import React, { useEffect, useState } from 'react';
import { dataWeather, fetchData } from './api/api';
import Header from './components/Header/Header';
import ListItems from './components/ListItems/ListItems';
import Map from './components/Map/Map';
import { CssBaseline, Grid } from '@material-ui/core';

const App = () => {
  const [type, setType] = useState('restaurants');
  const [places, setPlaces] = useState([]);
  const [weather, setWeather] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});
  const [paperClicked, setPaperClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [rating, setRating] = useState('');
  const [filteredPlaces, setFilteredPlaces] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  useEffect(() => {
    const ratingFilter = places?.filter(
      (place) => Number(place.rating) > rating
    );
    setFilteredPlaces(ratingFilter);
  }, [rating]);

  useEffect(() => {
    if (bounds.sw && bounds.ne) {
      setIsLoading(true);
      dataWeather(coordinates.lat, coordinates.lng).then((data) => {
        setWeather(data);
      });

      fetchData(type, bounds.sw, bounds.ne).then((data) => {
        setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
        setIsLoading(false);
        setFilteredPlaces([]);
      });
    }
  }, [bounds, type]);
  console.log(weather);
  return (
    <>
      <CssBaseline />
      <Header setCoordinates={setCoordinates} />
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <ListItems
            places={filteredPlaces.length ? filteredPlaces : places}
            paperClicked={paperClicked}
            isLoading={isLoading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={filteredPlaces.length ? filteredPlaces : places}
            setPaperClicked={setPaperClicked}
            weather={weather}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
