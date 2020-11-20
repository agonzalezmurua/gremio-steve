import React from "react";
import "twin.macro";

import Avatar from "@components/atoms/Avatar";
import DotsVerticalIcon from "@assets/icons/solid/dots-vertical.svg";

type UserHeaderProps = {
  firstName: string;
  lastName: string;
  role?: string;
};

const UserHeader: React.FunctionComponent<UserHeaderProps> = (props) => {
  return (
    <section tw="flex flex-grow space-x-4 w-64">
      <Avatar
        tw="border"
        size="medium"
        src="https://avataaars.io/?avatarStyle=Transparent&topType=LongHairNotTooLong&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=ShirtVNeck&clotheColor=Blue03&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Pale'"
      />
      {/* Name */}
      <section tw="flex flex-grow flex-col items-start">
        <strong>
          {props.firstName} {props.lastName}
        </strong>
        {props.role && <span tw="text-xs">{props.role}</span>}
      </section>
      {/* Actions */}
      <DotsVerticalIcon tw="w-5 h-5 self-center" />
    </section>
  );
};

export default UserHeader;
