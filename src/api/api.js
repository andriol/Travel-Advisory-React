import axios from "axios";
const url =
  "https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary";

export const fetchData = async (sw, ne) => {
  try {
    const {
      data: { data },
    } = await axios.get(url, {
      params: {
        bl_latitude: sw.lat,
        tr_latitude: ne.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
      },
      headers: {
        "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
        "x-rapidapi-key": process.env.REACT_APP_RAPID_API_TRAVEL_API_KEY,
      },
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};