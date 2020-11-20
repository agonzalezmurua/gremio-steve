import React from "react";
import LightNingBolt from "@assets/icons/outline/lightning-bolt.svg";
import BookOpen from "@assets/icons/outline/book-open.svg";
import Bookmark from "@assets/icons/outline/bookmark.svg";
import { NavigationItem } from "./NavBar";

export const NavigationList: React.FunctionComponent = () => {
  return (
    <ul tw="space-y-2">
      <NavigationItem>
        <LightNingBolt />
        <span>Activity</span>
      </NavigationItem>
      <NavigationItem>
        <BookOpen />
        <span>Contacts</span>
      </NavigationItem>
      <NavigationItem>
        <Bookmark />
        <span>Bookmarks</span>
      </NavigationItem>
    </ul>
  );
};
