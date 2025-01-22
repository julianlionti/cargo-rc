"use client";
import { useTheme } from "@mui/material";
import { Position } from "@ui";
import Image from "next/image";
import clientConfig from "rc/config/client.config";

interface StaticMapProps {
  width?: number;
  height?: number;
  from: Position;
  to: Position;
}

export default function StaticMap({
  from,
  to,
  height = 480,
  width = 640,
}: StaticMapProps) {
  const { palette } = useTheme();

  const mapStyle = "logistics.satellite.day";
  const markerColor = encodeURIComponent(palette.primary.main);
  const outlineColor = encodeURIComponent(palette.primary.contrastText);

  const geojson2 = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "MultiPoint",
          coordinates: [
            [from.lng, from.lat],
            [to.lng, to.lat],
          ],
        },
        properties: {
          label: "$alpha",
          color: markerColor,
          "outline-color": outlineColor,
          "text-color": outlineColor,
          size: "large",
        },
      },
    ],
  };

  return (
    <Image
      priority
      width={width}
      height={height}
      alt="map"
      src={`https://maps.hereapi.com/mia/v3/base/mc/overlay;padding=44/${width}x${height}/png8?apikey=${
        clientConfig.NEXT_PUBLIC_HERE_API
      }&style=${mapStyle}&features=pois:disabled&geojson=${JSON.stringify(
        geojson2
      )}`}
    />
  );
}
