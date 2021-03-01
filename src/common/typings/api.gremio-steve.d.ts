/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/users": {
    /** Obtains a list of users, searching based on username */
    get: operations["searchUsers"];
  };
  "/users/:id": {
    /** Obtains a user by id */
    get: operations["getOneUserById"];
  };
  "/users/myself": {
    /** Obtains the current logged user */
    get: operations["getMyUser"];
  };
  "/journeys": {
    /** Search a list of journeys based on a string */
    get: operations["searchJourneys"];
    /** Create a new journey */
    post: operations["createOneJourney"];
  };
  "/journeys/mine": {
    /** Get the journeys that were organized by the current user */
    get: operations["getMyJourneys"];
  };
  "/journeys/queue": {
    /** Get journeys that were added into the user's queue */
    get: operations["getMyQueue"];
  };
  "/journeys/:id": {
    /** Find one journey based on ID */
    get: operations["getOneJourneyById"];
    /** Delete a journey based on id */
    delete: operations["deleteOneJourneyById"];
  };
  "/auth/osu": {
    /** Redirects to osu oauth flow */
    get: operations["redirectToOsuOauth"];
  };
  "/auth/osu/callback": {
    post: operations["authenticateUser"];
  };
  "/auth/refresh": {
    get: operations["refreshToken"];
  };
}

export interface definitions {
  "User.Preferences": {
    std?: boolean;
    taiko?: boolean;
    ctb?: boolean;
    mania?: boolean;
  };
  "User.Availability": {
    mods?: boolean;
    guest_diffs?: boolean;
    playtesting?: boolean;
  };
  "Journey.Metadata": {
    genre: string;
    /** Represents a range of BPM that the song has */
    bpm: number[];
    /** ISO String of closure date */
    closure?: string;
    duration?: number;
  };
  "Journey.Beatmap": {
    id?: string;
    name: string;
    mode: "std" | "taiko" | "ctb" | "mania";
    difficulty: "easy" | "normal" | "hard" | "insane" | "expert" | "expert+";
    status?: "ready" | "pending" | "alert" | "problem";
    assignee?: definitions["User"];
  };
  Journey: {
    id?: string;
    title: string;
    artist: string;
    organizer?: definitions["User"];
    thumbnail_url: string;
    banner_url: string;
    metadata?: definitions["Journey.Metadata"];
    description?: string;
    status?: "pending" | "open" | "ready" | "alert" | "problem" | "closed";
    is_private?: boolean;
    beatmaps?: definitions["Journey.Beatmap"][];
    osu_link?: string;
  };
  User: {
    /** User's id (read only) */
    id?: string;
    /** Ous user's id (read only) */
    osu_id?: string;
    name: string;
    active?: boolean;
    avatar_url: string;
    banner_url: string;
    availability: definitions["User.Availability"];
    journeys?: definitions["Journey"][];
    community_role: string;
    role: "admin" | "user" | "moderator";
    preferences: definitions["User.Preferences"];
    status: "available" | "do_not_disturb";
    description?: string;
    queue?: definitions["Journey"][];
  };
  /** Authentication values for response */
  "Authentication.Response": {
    access_token?: string;
    token_type?: string;
    expires_in?: number;
  };
}

export interface operations {
  /** Obtains a list of users, searching based on username */
  searchUsers: {
    parameters: {
      query: {
        /** Can be the username */
        search?: unknown;
      };
    };
    responses: {
      /** Success */
      200: {
        schema: definitions["User"][];
      };
    };
  };
  /** Obtains a user by id */
  getOneUserById: {
    parameters: {
      path: {
        id?: unknown;
      };
    };
    responses: {
      /** Success */
      200: {
        schema: definitions["User"];
      };
    };
  };
  /** Obtains the current logged user */
  getMyUser: {
    responses: {
      /** Success */
      200: {
        schema: definitions["User"];
      };
    };
  };
  /** Search a list of journeys based on a string */
  searchJourneys: {
    parameters: {
      query: {
        search?: unknown;
      };
    };
    responses: {
      /** Success */
      200: {
        schema: definitions["Journey"][];
      };
    };
  };
  /** Create a new journey */
  createOneJourney: {
    parameters: {
      body: {
        journey?: definitions["Journey"];
      };
    };
    responses: {
      /** Success */
      200: {
        schema: definitions["Journey"];
      };
    };
  };
  /** Get the journeys that were organized by the current user */
  getMyJourneys: {
    parameters: {
      query: {
        status?: unknown;
      };
    };
    responses: {
      /** Success */
      200: {
        schema: definitions["Journey"][];
      };
    };
  };
  /** Get journeys that were added into the user's queue */
  getMyQueue: {
    responses: {
      /** Success */
      200: {
        schema: definitions["Journey"][];
      };
    };
  };
  /** Find one journey based on ID */
  getOneJourneyById: {
    parameters: {
      path: {
        id?: unknown;
      };
    };
    responses: {
      /** Success */
      200: {
        schema: definitions["Journey"];
      };
      /** Client error and Not Found */
      404: unknown;
    };
  };
  /** Delete a journey based on id */
  deleteOneJourneyById: {
    parameters: {
      path: {
        /** Journey's id */
        id?: unknown;
      };
    };
    responses: {
      /** The journey was deleted succesfully */
      200: unknown;
      /** User is not authenticated */
      401: unknown;
      /** User cannot perform action */
      403: unknown;
      /** The journey could not be found */
      404: unknown;
    };
  };
  /** Redirects to osu oauth flow */
  redirectToOsuOauth: {
    parameters: {
      query: {
        state?: unknown;
      };
    };
    responses: {
      /** Redirects to oauth service */
      301: never;
    };
  };
  authenticateUser: {
    parameters: {
      body: {
        authentication?: {
          code?: string;
        };
      };
    };
    responses: {
      /** Bearer token response */
      200: {
        schema: definitions["Authentication.Response"];
      };
    };
  };
  refreshToken: {
    responses: {
      /** Bearer token response */
      200: {
        schema: definitions["Authentication.Response"];
      };
      /** User is not allowed to refresh */
      403: unknown;
    };
  };
}
