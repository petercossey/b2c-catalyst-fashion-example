import { graphql } from '~/client/graphql';

export const ProductVariantsInventoryListFragment = graphql(`
  fragment ProductVariantsInventoryListFragment on Product {
    variants(first: 50) {
      edges {
        node {
          entityId
          sku
          options(first: 10) {
            edges {
              node {
                entityId
                displayName
                values(first: 10) {
                  edges {
                    node {
                      entityId
                      label
                    }
                  }
                }
              }
            }
          }
          inventory {
            isInStock
            aggregated {
              availableToSell
            }
          }
        }
      }
    }
  }
`);
