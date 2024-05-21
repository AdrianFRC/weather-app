import { Input, Typography, Space, Card, ConfigProvider, Flex } from "antd";
import { useState, useEffect } from "react";
import {
  clear_800_d,
  clouds_801_d,
  clouds_802,
  clouds_803_804,
  freezing_rain_511,
  humidity,
  mist_dust_fog_701_771,
  pressure,
  rain_300_321_520_531,
  rain_500_504_d,
  snow_all,
  thunderstorm_200_232,
  tornado_781,
  visibility,
  wind,
} from "../assets/icons/index";
import {
  inputStyle,
  cityTextStyle,
  tempStyle,
  cardStyle,
  subTextStyle,
  customThemeComponentsCard,
  customThemeComponentsTypografy,
} from "../style";

const API_KEY = "0d3891fbec466dd993a8e50ab228be4e";

function WeatherView(props) {
  const { Text } = Typography;
  const [location, setLocation] = useState("");
  const [data, setData] = useState("");
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`;
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  function success(pos) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&units=metric&appid=${API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        console.log(data);
      })
      .catch((error) => console.log(error));
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  function getWeatherByLocation() {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        console.log(data);
      })
      .catch((error) => console.log(error));
  }
  function onChange(event) {
    setLocation(event.target.value);
    console.log(location);
  }

  function getIconByMeteoDescription(meteoDesc) {
    if (meteoDesc === 800) {
      return clear_800_d;
    }
    if (meteoDesc === 801) {
      return clouds_801_d;
    }
    if (meteoDesc === 802) {
      return clouds_802;
    }
    if (meteoDesc === 803 || meteoDesc === 804) {
      return clouds_803_804;
    }
    if (meteoDesc >= 701 && meteoDesc <= 771) {
      return mist_dust_fog_701_771;
    }
    if (meteoDesc === 781) {
      return tornado_781;
    }
    if (meteoDesc >= 600 && meteoDesc <= 622) {
      return snow_all;
    }
    if (meteoDesc >= 300 && meteoDesc <= 321) {
      return rain_300_321_520_531;
    }
    if (meteoDesc >= 520 && meteoDesc <= 531) {
      return rain_300_321_520_531;
    }
    if (meteoDesc >= 500 && meteoDesc <= 504) {
      return rain_500_504_d;
    }
    if (meteoDesc === 501) {
      return freezing_rain_511;
    }
    if (meteoDesc >= 200 && meteoDesc <= 232) {
      return thunderstorm_200_232;
    }
  }

  return (
    <>
      <Input
        placeholder="Inserisci la citta"
        value={location}
        onChange={onChange}
        onPressEnter={getWeatherByLocation}
        style={inputStyle}
      />
      {data.cod === 200 ? (
        <>
          <Text style={cityTextStyle}>{data.name}</Text>
          <img
            src={getIconByMeteoDescription(data.weather[0].id)}
            alt=""
            style={{ width: "200px" }}
          />
          <Text style={tempStyle}>{Math.round(data.main.temp)}°</Text>
          <Space direction="vertical" size="0" align="center">
            <Text style={subTextStyle}>Main: {data.weather[0].main}</Text>
            <Space>
              <Text style={subTextStyle}>
                Max: {Math.round(data.main.temp_max)}°
              </Text>
              <Text style={subTextStyle}>
                Min: {Math.round(data.main.temp_min)}°
              </Text>
            </Space>
          </Space>
          <ConfigProvider
            theme={{
              components: {
                Typography: customThemeComponentsTypografy,
                Card: customThemeComponentsCard,
              },
            }}
          >
            {
              <Card title="Today" bordered={false} style={cardStyle}>
                <Flex justify="space-evenly">
                  <Space direction="vertical" align="center">
                    <Text>Visibility</Text>
                    <img src={visibility} alt="" style={{ width: "70px" }} />
                    <Text>{data.visibility / 1000} KM</Text>
                  </Space>
                  <Space direction="vertical" align="center">
                    <Text>Humidity</Text>
                    <img src={humidity} alt="" style={{ width: "70px" }} />
                    <Text>{data.main.humidity} %</Text>
                  </Space>
                  <Space direction="vertical" align="center">
                    <Text>Pressure</Text>
                    <img src={pressure} alt="" style={{ width: "70px" }} />
                    <Text>{data.main.pressure} hPa</Text>
                  </Space>
                  <Space direction="vertical" align="center">
                    <Text>Wind</Text>
                    <img src={wind} alt="" style={{ width: "70px" }} />
                    <Text>{data.wind.speed} m/s</Text>
                  </Space>
                </Flex>
              </Card>
            }
          </ConfigProvider>
        </>
      ) : (
        <Text style={cityTextStyle}>City Not Found</Text>
      )}
    </>
  );
}
export default WeatherView;
