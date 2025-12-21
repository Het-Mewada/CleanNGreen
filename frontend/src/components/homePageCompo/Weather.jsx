import React, { useState, useEffect } from "react";
import axios from "axios";
import { useGeolocated } from "react-geolocated";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  TextField,
  Button,
  Grid,
  IconButton,
} from "@mui/material";

import RefreshIcon from "@mui/icons-material/Refresh";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocationOffIcon from "@mui/icons-material/LocationOff";

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [city, setCity] = useState("");
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });
  const token = JSON.parse(localStorage.getItem("user"))?.token;
  const fetchWeather = async (lat, lon, cityName) => {
    setLoading(true);
    setError("");
    try {
      const params = {};
      if (cityName) {
        params.city = cityName;
      } else if (lat && lon) {
        params.lat = lat;
        params.lon = lon;
      } else {
        throw new Error("No location data available");
      }

      const response = await axios.get(`${__API_URL__}/users/weather`, {
        params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setWeather(response.data);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch weather data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (coords) {
      fetchWeather(coords.latitude, coords.longitude);
    }
  }, [coords]);

  const handleRefresh = () => {
    if (city) {
      fetchWeather(null, null, city);
    } else if (coords) {
      fetchWeather(coords.latitude, coords.longitude);
    }
  };

  const handleCitySearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather(null, null, city.trim());
    }
  };

  if (!isGeolocationAvailable) {
    return <div>Your browser does not support Geolocation</div>;
  }

  if (!isGeolocationEnabled && !city) {
    return (
      <Card
        style={{
          maxWidth: 800,
          margin: "100px auto",
          borderRadius: 16,
          boxShadow: "0 8px 32px rgba(31, 38, 135, 0.15)",
          background: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255, 255, 255, 0.18)",
          overflow: "hidden",
        }}
      >
        <CardContent style={{ padding: 24 }}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Typography
              variant="h5"
              component="h2"
              style={{
                color: "#2E7D32",
                fontWeight: 600,
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              Location Services
            </Typography>
            <LocationOffIcon
              style={{
                backgroundColor: "#E8F5E9",
                color: "#2E7D32",
                borderRadius: "50%",
                padding: 6,
              }}
            />
          </Grid>

          <Typography
            variant="body1"
            style={{
              color: "#1B5E20",
              fontWeight: 500,
              marginTop: 24,
              fontSize: 16,
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Geolocation is not enabled. Please enable it or search by city.
          </Typography>

          <form onSubmit={handleCitySearch} style={{ marginTop: 20 }}>
            <TextField
              label="Search by city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              variant="outlined"
              fullWidth
              margin="normal"
              InputProps={{
                style: {
                  borderRadius: 12,
                  backgroundColor: "#F1F8E9",
                },
              }}
              InputLabelProps={{
                style: {
                  color: "#689F38",
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!city.trim()}
              fullWidth
              style={{
                marginTop: 8,
                backgroundColor: "#2E7D32",
                color: "white",
                borderRadius: 12,
                padding: "10px 0",
                textTransform: "none",
                fontWeight: 500,
                "&:hover": {
                  backgroundColor: "#1B5E20",
                },
              }}
            >
              Search
            </Button>
          </form>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      style={{
        maxWidth: 800,
        margin: "100px auto",
        borderRadius: 16,
        boxShadow: "0 8px 32px rgba(31, 38, 135, 0.15)",
        background: "rgba(255, 255, 255, 0.85)",
        backdropFilter: "blur(8px)",
        border: "1px solid rgba(255, 255, 255, 0.18)",
        overflow: "hidden",
      }}
    >
      <CardContent style={{ padding: 24 }}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography
            variant="h5"
            component="h2"
            style={{
              color: "#2E7D32",
              fontWeight: 600,
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Weather Information
          </Typography>
          <IconButton
            onClick={handleRefresh}
            disabled={loading}
            style={{
              backgroundColor: "#E8F5E9",
              color: "#2E7D32",
              "&:hover": {
                backgroundColor: "#C8E6C9",
              },
            }}
          >
            <RefreshIcon />
          </IconButton>
        </Grid>

        {loading ? (
          <div style={{ textAlign: "center", margin: "20px 0" }}>
            <CircularProgress style={{ color: "#2E7D32" }} />
            <Typography style={{ color: "#4CAF50", marginTop: 8 }}>
              Loading weather data...
            </Typography>
          </div>
        ) : error ? (
          <Typography
            color="error"
            style={{
              backgroundColor: "#FFEBEE",
              padding: 8,
              borderRadius: 4,
              marginTop: 16,
            }}
          >
            {error}
          </Typography>
        ) : weather ? (
          <>
            <Typography
              variant="h6"
              gutterBottom
              style={{
                color: "#1B5E20",
                fontWeight: 500,
                marginTop: 16,
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              {weather.name}, {weather.sys?.country}
              <LocationOnIcon fontSize="small" style={{ color: "#4CAF50" }} />
            </Typography>
            {weather && weather.weather && weather.weather[0] && (
              <Typography
                color="textSecondary"
                style={{
                  color: "#689F38",
                  fontSize: 14,
                  marginBottom: 16,
                }}
              >
                {new Date().toLocaleDateString()} •{" "}
                {weather.weather[0].description}
              </Typography>
            )}
            <Grid container spacing={2} style={{ marginTop: 10 }}>
              <Grid item xs={6}>
                {weather?.main && (
                  <>
                    <Typography
                      variant="h3"
                      style={{
                        color: "#eb934b",
                        fontWeight: 300,
                        lineHeight: 1,
                      }}
                    >
                      {Math.round(weather.main.temp)}°C
                    </Typography>
                    <Typography
                      style={{
                        color: "#689F38",
                        fontSize: 14,
                      }}
                    >
                      Feels like: {Math.round(weather.main.feels_like)}°C
                    </Typography>
                  </>
                )}
              </Grid>
              <Grid item xs={6} style={{ textAlign: "right" }}>
                <img
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt={weather.weather[0].main}
                  style={{ width: 100, height: 100 }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} style={{ marginTop: 10 }}>
              <Grid item xs={6}>
                <Typography
                  style={{
                    fontSize: 14,
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <span style={{ color: "#2E7D32" }}>Humidity:</span>{" "}
                  {weather.main.humidity}%
                </Typography>
                <Typography
                  style={{
                    fontSize: 14,
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <span style={{ color: "#2E7D32" }}>Pressure:</span>{" "}
                  {weather.main.pressure} hPa
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  style={{
                    fontSize: 14,
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <span style={{ color: "#2E7D32" }}>Wind:</span>{" "}
                  {weather.wind.speed} m/s
                </Typography>
                <Typography
                  style={{
                    fontSize: 14,
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <span style={{ color: "#2E7D32" }}>Visibility:</span>{" "}
                  {weather.visibility / 1000} km
                </Typography>
              </Grid>
            </Grid>
          </>
        ) : (
          <Typography
            style={{
              color: "#455A64",
              textAlign: "center",
              margin: "20px 0",
            }}
          >
            No weather data available
          </Typography>
        )}

        <form onSubmit={handleCitySearch} style={{ marginTop: 20 }}>
          <TextField
            label="Search by city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            variant="outlined"
            fullWidth
            margin="normal"
            InputProps={{
              style: {
                borderRadius: 12,
                backgroundColor: "#F1F8E9",
              },
            }}
            InputLabelProps={{
              style: {
                color: "#689F38",
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!city.trim()}
            fullWidth
            style={{
              marginTop: 8,
              backgroundColor: "#2E7D32",
              color: "white",
              borderRadius: 12,
              padding: "10px 0",
              textTransform: "none",
              fontWeight: 500,
              "&:hover": {
                backgroundColor: "#1B5E20",
              },
            }}
          >
            Search
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default Weather;
