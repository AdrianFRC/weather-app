import React, { useState } from "react";
import { Flex } from "antd";
import WeatherView from "./components/WeatherView";
import IntroView from "./components/IntroView";
import { bgStyle } from "./style";

function App() {
  const [hidden, setHidden] = useState(true);
  return (
    <Flex vertical align="center" gap='middle' style={bgStyle} justify="center">
      {hidden ? <IntroView setHidden={setHidden} /> : null}
      {!hidden ? <WeatherView /> : null}
    </Flex>
  );
}

export default App;
//https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=0d3891fbec466dd993a8e50ab228be4e
