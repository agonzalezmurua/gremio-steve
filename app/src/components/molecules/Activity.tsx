import tw, { css } from 'twin.macro';
import React, { useMemo } from 'react';
import {
  FormattedDate,
  FormattedMessage,
  FormattedRelativeTime,
} from 'react-intl';
import { Link } from 'react-router-dom';

import links from '@links';
import Annotation from '@assets/icons/solid/annotation.svg';
import AtSymbol from '@assets/icons/solid/at-symbol.svg';
import Plus from '@assets/icons/solid/plus.svg';
import Pencil from '@assets/icons/solid/pencil.svg';

import Messages from './Activity.messages';

type Props = {
  entry: UserActivity;
};

const Activity: React.FC<Props> = ({ entry }) => {
  const Icon = useMemo(() => {
    switch (entry.what) {
      case 'comment':
        return Annotation;
      case 'create':
        return Plus;
      case 'edit':
        return Pencil;
      case 'mention':
      default:
        return AtSymbol;
    }
  }, [entry.what]);
  const message = useMemo(() => {
    switch (entry.what) {
      case 'comment':
        switch (entry.to) {
          case 'journey':
            return Messages.comment_on_journey;
          case 'comment':
            return Messages.comment_on_comment;
          case 'user':
            return Messages.comment_on_user;
          default:
            break;
        }
        break;
      case 'mention':
        switch (entry.to) {
          case 'comment':
            return Messages.mention_on_comment;
          case 'journey':
            return Messages.mention_on_journey;
          default:
            break;
        }
      case 'create':
        switch (entry.to) {
          case 'journey':
            return Messages.create_a_journey;
        }
      case 'edit': {
        switch (entry.to) {
          case 'journey':
            return Messages.edit_a_journey;
        }
      }
    }
    return Messages.default;
  }, []);
  console.log(new Date(entry.when).getTime() - Date.now());

  return (
    <section tw="flex p-4">
      <section tw="mr-2">
        <section
          css={[
            tw`flex justify-center items-center rounded-full w-7 h-7 text-white`,
            entry.what === 'add' && tw`bg-green-500`,
            entry.what === 'comment' && tw`bg-yellow-500`,
            entry.what === 'create' && tw`bg-green-500`,
            entry.what === 'edit' && tw`bg-purple-500`,
            entry.what === 'mention' && tw`bg-blue-500`,
            entry.what === 'remove' && tw`bg-red-500`,
            css`
              > svg {
                ${tw`w-5 h-5`}
              }
            `,
          ]}
        >
          <Icon />
        </section>
      </section>
      <section tw="flex flex-col flex-grow">
        <FormattedMessage
          {...message}
          tagName="section"
          tw="truncate"
          values={{
            journey: entry.journey && (
              <Link to={links.journeys.id({ id: entry.journey.__id })}>
                {entry.journey.title}
              </Link>
            ),
            user: (
              <strong>
                <Link to={links.user.profile({ id: entry.who.__id })}>
                  {entry.who.name}
                </Link>
              </strong>
            ),
            comment: entry.comment && (
              <Link
                to={links.journeys.comment({
                  id: entry.comment.journey.__id,
                  commentNode: entry.comment.__id,
                })}
              >
                <FormattedMessage
                  id="generic.comment"
                  defaultMessage="{count, plural, =0 {no comments} one {comment} other {comments}}"
                  values={{ count: 1 }}
                />
              </Link>
            ),
          }}
        />
        <section tw="mt-1 text-gray-500 space-x-4">
          <span>
            <FormattedDate value={new Date(entry.when)} />
          </span>
          <span>
            <FormattedRelativeTime
              value={(new Date(entry.when).getTime() - Date.now()) / 1000}
              numeric="auto"
              updateIntervalInSeconds={1}
            />
          </span>
        </section>
        {entry.content && (
          <section tw="mt-2 shadow border rounded-lg px-4 py-2 overflow-ellipsis">
            {entry.content}
          </section>
        )}
      </section>
    </section>
  );
};

export default Activity;
