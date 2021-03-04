import 'twin.macro';
import React, { useEffect, useRef, useState } from 'react';
import { useDebounce } from 'react-use';

import Api from '_/services/api';
import { ApiTypes } from '_/../common/api/types';
import { Formik, FormikHandlers } from 'formik';
import { Canceler } from 'axios';

type Operations = keyof ReturnType<typeof Api.Client.operations>;

type Params<O extends Operations> = Parameters<
  ReturnType<typeof Api.Client.operations>[O]
>['0'];

type Resolution<O extends Operations> = ({
  response,
  parameters,
}: {
  response: ApiTypes.Operations.Base.Response<
    ApiTypes.Operations.Definitions[O]
  >;
  parameters: Params<O>;
}) => void;

type Props<O extends Operations, Q> = {
  onResolved: Resolution<O>;
  operation: O;
  parameters: (values: Q) => Params<O>;
  initialParameters: Params<O>;
  skipCondition?: (
    parameters: Params<O>
  ) => { shouldSkip: boolean; returnValue: any };
  searchOnLoad?: boolean;
  children: (props: {
    values: Q;
    isSearching: boolean;
    handleChange: FormikHandlers['handleChange'];
  }) => JSX.Element;
};

const CancelMessage = 'Canceled by user';

function Search<O extends Operations, Q>(props: Props<O, Q>) {
  const cancel = useRef<Canceler | undefined>(undefined); // Cancel request function
  const [values, setValues] = useState<Q>(props.initialParameters); // Input values
  const [debouncedValues, setDebouncedValues] = React.useState<Q>(
    props.initialParameters
  );
  const [isSearching, setIsSearching] = useState(false);

  // Start search when deboucned values change and it's not already searching
  useDebounce(
    () => {
      if (Boolean(props.searchOnLoad) === false) {
        return;
      }
      setDebouncedValues(values);
    },
    500,
    [values]
  );

  useEffect(() => {
    if (isSearching === false) {
      return;
    }

    const parameters = props.parameters(debouncedValues);

    function finish(returnValue) {
      props.onResolved({
        response: returnValue,
        parameters: parameters,
      });
    }

    if (props.skipCondition) {
      const skipResult = props.skipCondition(parameters);
      if (skipResult.shouldSkip) {
        finish(skipResult.returnValue);
        return;
      }
    }

    const request = Api.Client.operations({
      cancelToken: new Api.Client.cancelToken((c) => {
        cancel.current = c;
      }),
    })[props.operation];

    request(parameters as any)
      .finally(() => setIsSearching(false))
      //@ts-ignore
      .then((response) => {
        finish(response);
      })
      .catch((error) => {
        if (error.message === CancelMessage) {
          return;
        }
      });
    return () => {
      setIsSearching(false);
      cancel.current(CancelMessage);
    };
  }, [debouncedValues]);

  const handleChange = ({ currentTarget: { name, value } }) => {
    setIsSearching(true);
    if (cancel.current) {
      // If executing a request, cancel the petition
      cancel.current();
    }
    setValues({ ...values, ...{ [name]: value } });
  };

  return (
    <Formik initialValues={props.initialParameters} onSubmit={() => null}>
      {(formikProps) => (
        <form onSubmit={formikProps.handleSubmit}>
          {props.children({
            values: values,
            handleChange: handleChange,
            isSearching: isSearching,
          })}
        </form>
      )}
    </Formik>
  );
}

export default Search;
