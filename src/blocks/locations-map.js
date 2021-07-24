import React from "react"
import styled from "styled-components"
import { Map } from "../components/map"

export function LocationsMap({ data }) {
    if (data.locations === undefined) {
        return null
    }
    return (
        <MapWrapper>
            {data.mapType}
            <Map
                file={data.mapType}
                locations={data.locations}
                markerOffset={15}
                mapColor={data.mapColor}
                locationTextColor={data.locationTextColor}
                locationPointColor={data.locationPointColor}
            />
        </MapWrapper>
    )
}

const MapWrapper = styled.div`
    max-width: 100vw;
    height: auto;
`

export const LocationsMapBlock = {
  label: "Locations Map",
  key: "map",
  name: "locationsmap",
  component: "group",
  defaultItem: {
    mapType: "Kenya",
    locations: [],
  },
  fields: [
    {
        name: "mapType",
        label: "Map Type",
        component: "select",
        options: ["Kenya"]
    },
    {
        name: "mapColor",
        label: "Map Color",
        component: "color",
        colorFormat: "hex",
    },
    {
        name: "locationTextColor",
        label: "Location Text Color",
        component: "color",
        colorFormat: "hex",
    },
    {
        name: "locationPointColor",
        label: "Location Point Color",
        component: "color",
        colorFormat: "hex",
    },
    {
        name: "locations",
        label: "Locations",
        component: "group-list",
        description: "List of Locations",
        itemProps: item => ({
            label: item.name,
        }),
        defaultItem: () => ({
            name: 'New Location',
            latitude: 0,
            longitude: 0,
        }),
        fields: [
            {
                label: "Location Name",
                name: "name",
                component: "text",
            },
            {
                label: "Latitude",
                name: "latitude",
                component: "number",
                step: 0.1,
                description: "Degrees of Latitude of the Location",
            },
            {
                label: "Longitude",
                name: "longitude",
                component: "number",
                step: 0.1,
                description: "Degrees of Longitude of the Location",
            }
        ]
    },
  ],
}