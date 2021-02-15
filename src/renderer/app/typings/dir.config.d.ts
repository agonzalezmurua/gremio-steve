declare const CONFIG: {
  main: Record<string, unknown>;
  webpack: {
    dev_server: {
      port: number;
    };
  };
  app: {
    api: {
      uri: string;
      path: string;
    };
  };
};
