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
        prices{
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

export const getDescription = gql`
query ($id: String!){ 
  product(id: $id) {
    id,
    name,
    inStock,
    gallery,
    description,
    category,
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
    brand
  }
}
`
export const getItem = gql`
query ($id: String!){ 
  product(id: $id) {
    id,
    name,
    brand,
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