import {
  ApolloClient,
  InMemoryCache,
  gql,
} from "@apollo/client";

const cache = new InMemoryCache({
  typePolicies: {
    AttributeSet: {
      keyFields: ['id','items'],
    },
  },
});

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: cache
});

export const getCurrencies = gql`
{ 
  currencies {
    label,
    symbol
  }
}
`
export const getCategories = gql`
{ 
  categories {
    name
  }
}
`
export const getProducts = gql`
  query ($title: String!){ 
    category(input: {title:$title}){
      products {
        id,
        name,
        brand,
        description,
        inStock,
        gallery,
        attributes {
          id,
          name,
          type,
          items {
            displayValue,
            value,
            id
          }
        },
        prices {
          currency {
            label,
            symbol
          },
          amount
        },
      }
    }
  }
`

export const getItem = gql`
query ($id: String!){ 
  product(id: $id) {
    id,
    name,
    brand,
    description,
    inStock,
    gallery,
    attributes {
      id,
      name,
      type,
      items {
        displayValue,
        value,
        id
      }
    },
    prices {
      currency {
        label,
        symbol
      },
      amount
    },
  }
}
`

export default client;