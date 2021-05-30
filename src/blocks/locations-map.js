import React from "react"
import styled from "styled-components"

export function LocationsMap({ data }) {
  return (
      <div>hi</div>
    )
}

export const LocationsMapBlock = {
  label: "Locations Map",
  name: "locationsmap",
  defaultItem: {},
  fields: [
    {
        name: "mapType",
        label: "Map Type",
        component: "select",
        options: ["Kenya"]
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