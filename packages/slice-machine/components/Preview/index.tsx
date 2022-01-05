import React, { useEffect, useState } from "react";
import { useContext } from "react";

import { Flex } from "theme-ui";

import { SliceContext } from "@src/models/slice/context";

import Header from "./components/Header";
import { Size } from "./components/ScreenSizes";
import IframeRenderer from "./components/IframeRenderer";
import { TrackerContext } from "@src/utils/tracker";
import { useSelector } from "react-redux";
import {
  getCurrentVersion,
  getFramework,
  getUserID,
} from "@src/modules/environment";
import { SliceMachineStoreType } from "@src/redux/type";

export type SliceView = SliceViewItem[];
export type SliceViewItem = Readonly<{ sliceID: string; variationID: string }>;

export default function Preview(): React.ReactNode {
  const { Model, variation } = useContext(SliceContext);
  const tracker = useContext(TrackerContext);

  const { userId, framework, version } = useSelector(
    (state: SliceMachineStoreType) => ({
      userId: getUserID(state),
      framework: getFramework(state),
      version: getCurrentVersion(state),
    })
  );

  useEffect(() => {
    tracker?.Track.SlicePreview({ framework, userId, version });
  }, [userId, framework, version]);

  const [state, setState] = useState({ size: Size.FULL });

  const handleScreenSizeChange = (screen: { size: Size }) => {
    setState({ ...state, size: screen.size });
  };

  if (!Model || !variation) {
    return <div />;
  }

  const sliceView: SliceView = [
    { sliceID: Model.infos.model.id, variationID: variation.id },
  ];

  const canvasUrl = `http://localhost:${
    process.env.NODE_ENV === "development" ? "3001" : "3000"
  }/_canvas`;

  return (
    <Flex sx={{ height: "100vh", flexDirection: "column" }}>
      <Header
        title={Model.infos.sliceName}
        Model={Model}
        variation={variation}
        handleScreenSizeChange={handleScreenSizeChange}
        size={state.size}
      />
      <IframeRenderer
        size={state.size}
        canvasUrl={canvasUrl}
        sliceView={sliceView}
      />
    </Flex>
  );
}
