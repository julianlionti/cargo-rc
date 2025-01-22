"use client";

import { useTheme } from "@mui/material";
import { Position } from "@ui";
import Image from "next/image";
import clientConfig from "rc/config/client.config";

type NullablePosition<T> = {
  [P in keyof T]: T[P] | null;
};

interface DriverMapProps {
  width?: number;
  height?: number;
  position: NullablePosition<Position>;
}

export default function DriverMap({
  height = 280,
  width = 280,
  position,
}: DriverMapProps) {
  const mapStyle = "logistics.satellite.day";

  const { palette } = useTheme();

  const markerColor = encodeURIComponent(palette.common.black);

  if (!position.lng || !position.lat) return null;

  const geojson2 = {
    type: "Feature",
    properties: {
      icon: "cp",
      size: "small",
      label: "Driver",
      "text-color": markerColor,
    },
    geometry: {
      coordinates: [position.lng, position.lat],
      type: "Point",
    },
  };

  return (
    <Image
      priority
      width={width}
      height={height}
      alt="map"
      src={`https://maps.hereapi.com/mia/v3/base/mc/overlay;zoom=14/${width}x${height}/png8?apikey=${
        clientConfig.NEXT_PUBLIC_HERE_API
      }&style=${mapStyle}&features=pois:disabled&geojson=${JSON.stringify(
        geojson2
      )}`}
    />
  );
}
