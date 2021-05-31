import React from "react"
import styled, { css, withTheme } from "styled-components"
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import KenyaJSON from "../../content/maps/kenya.json";
import { Theme } from './theme';

const geojsonFiles = {
  "Kenya": {
    file: KenyaJSON,
    projectionConfig: {
      rotate: [-38, -0.3, 0],
      scale: 2000,
    }
  },
}

export const Map = withTheme(({ file, locations, markerOffset, theme }, props) => {
  return (
    <ComposableMap
      projection="geoAzimuthalEqualArea"
      projectionConfig={geojsonFiles[file].projectionConfig}
      width={300}
      height={360}
      style={{ width: "100%" }}
    >
      <Geographies geography={geojsonFiles[file].file}>
        {({ geographies }) =>
          geographies.map(geo =>
            <Geography
              key={geo.rsmKey}
              geography={geo}
              tabIndex={-1}
              fill={theme.color.foreground}
              stroke={"gray"}
              style={{
                default: { outline: "none" },
                hover: { outline: "none" },
                pressed: { outline: "none" },
              }}
            />
          )
        }
      </Geographies>

      {locations.map(({ name, latitude, longitude }) => (
        <Marker key={name} coordinates={[latitude, longitude]}>
          <circle r={theme.radius.small} fill={theme.color.secondary} stroke={theme.color.background} strokeWidth={1} />
          <text
            textAnchor="middle"
            y={markerOffset}
            fill={theme.color.primary}
            fontSize={"0.75em"}
          >
            {name}
          </text>
        </Marker>
      ))}
    </ComposableMap>
  )
})