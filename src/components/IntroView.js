import React from "react";
import { Button, ConfigProvider, Typography } from "antd";
import {
  customTheme,
  headOneStyle,
  headTwoStyle,
  introButtonStyle,
} from "../style";
import {
  clear_800_d,
  clouds_801_d,
  rain_300_321_520_531,
  rain_500_504_d,
} from "../assets/icons/index";

function IntroView(props) {
  const { setHidden } = props;
  const icons = [
    clear_800_d,
    clouds_801_d,
    rain_300_321_520_531,
    rain_500_504_d,
  ];

  return (
    <>
      <img src={icons[Math.floor(Math.random() * icons.length)]} alt="" />
      <Typography.Title level={1} style={headOneStyle}>
        Weather
      </Typography.Title>
      <Typography.Title level={1} style={headTwoStyle}>
        ForeCasts
      </Typography.Title>
      <ConfigProvider theme={customTheme}>
        <Button
          type="primary"
          onClick={() => setHidden(false)}
          style={introButtonStyle}
        >
          Get Start
        </Button>
      </ConfigProvider>
    </>
  );
}
export default IntroView;
