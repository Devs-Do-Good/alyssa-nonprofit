import React from "react";
import { TinaCMS } from 'tinacms'
import { TinaCloudProvider } from "tina-graphql-gateway";
import { useGraphqlForms } from "tina-graphql-gateway";
import Client from '../utils/client';

const TinaWrapper = ({ query, children }, props) => {
    const cms = React.useMemo(() => {
      return new TinaCMS({
        apis: {
          tina: Client
        },
      });
    }, []);
  
    return (
        <TinaCloudProvider cms={cms}>
            {query ? <Inner {...props} /> : children}
        </TinaCloudProvider>
    );
};

const Inner = (props) => {
  const [payload, isLoading] = useGraphqlForms({
    query: (gql) => gql(props.query),
    variables: props.variables || {},
  });
  return (
    <>
      {isLoading ? (
        <div>Loading content ...</div>
      ) : (
        // pass the new edit state data to the child
        props.children({ ...props, data: payload })
      )}
    </>
  );
};

export default TinaWrapper;