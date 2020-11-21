import React from "react";
import LightNingBolt from "@assets/icons/outline/lightning-bolt.svg";
import Collection from "@assets/icons/outline/collection.svg";
import Bookmark from "@assets/icons/outline/bookmark.svg";
import { NavigationItem } from "./NavBar";

export const NavigationList: React.FunctionComponent = () => {
  return (
    <ul tw="space-y-2">
      <NavigationItem>
        <Collection />
        <span>My Queue</span>
      </NavigationItem>
      <NavigationItem>
        <LightNingBolt />
        <span>Activity</span>
      </NavigationItem>
      <NavigationItem>
        <Bookmark />
        <span>Bookmarks</span>
      </NavigationItem>
    </ul>
  );
};
