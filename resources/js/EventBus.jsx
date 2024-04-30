import React from "react";

export const EventBusContect = React.useContext();

export const EventBusProvider = ({children}) => {
    const [events , setEvents] = React.useState({});
}
