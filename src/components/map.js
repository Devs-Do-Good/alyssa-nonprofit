import React from "react"
import styled, { css } from "styled-components"
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import KenyaJSON from "../../content/maps/kenya.json";


const geojsonFiles = {
  "Kenya": KenyaJSON,
}

export const Map = ({ file, locations, markerOffset }) => {  
  return (
    <ComposableMap
      projection="geoAzimuthalEqualArea"
      projectionConfig={{
        rotate: [-38, -0.3, 0],
        scale: 2000
      }}
      width={300}
      height={360}
      style={{ width: "auto", height: "100%" }}
    >
      <Geographies geography={geojsonFiles[file]}>
        {({ geographies }) =>
          geographies.map(geo => 
            <Geography
              key={geo.rsmKey}
              geography={geo}
              tabIndex={-1}
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
          <circle r={5} fill="#F00" stroke="#fff" strokeWidth={1} />
          <text
            textAnchor="middle"
            y={markerOffset}
            style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}
          >
            {name}
          </text>
        </Marker>
      ))}
    </ComposableMap>
  )
}

const HeroWrapper = styled.div`
  position: relative;
  flex: 0 0 auto;
  top: 0;
  padding-top: ${props => props.theme.header.height};
  min-height: calc(
    ${props => props.theme.header.height} +
      ${props => props.theme.header.height}
  );

  ${props =>
    props.theme.hero.parallax &&
    css`
      transform-style: preserve-3d;
    `}
`

const HeroContent = styled.div`
  display: block;
  padding: 3rem 0;

  ${props =>
    props.large &&
    css`
      padding: 8rem 0;
    `}
`

export const Actions = styled.div`
  padding-bottom: 0.5rem;
  > * {
    margin-right: 1rem;
  }
`