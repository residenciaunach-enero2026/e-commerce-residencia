export type ResultFilterTypes = {
  schema: {
    attributes: {
      origin: {
        enum: string[];
      };
    };
  };
};

export type FilterTypes = {
  result: ResultFilterTypes | null;
  loading: boolean;
};
