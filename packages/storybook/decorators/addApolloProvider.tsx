import { ApolloClient, InMemoryCache } from '@apollo/client'
import { ApolloProvider } from '@apollo/react-hooks'
import { graphqlTypeMocks } from '@frontend/graphql-fixtures'
import { ApolloLink, Observable } from 'apollo-link'
import { DocumentNode, graphql, print, OperationDefinitionNode } from 'graphql'
import { addMockFunctionsToSchema, makeExecutableSchema } from 'graphql-tools'
import React from 'react'

type PartialDeep<T> = { [P in keyof T]?: PartialDeep<T[P]> }

const schemaString: DocumentNode = require('@packages/graphql-schema/api-schema.graphql')

export const setOperations = () => {}

const executableSchema = makeExecutableSchema({
  typeDefs: schemaString,
  resolvers: {},
  resolverValidationOptions: {
    requireResolversForResolveType: false,
  },
})

addMockFunctionsToSchema({
  // @ts-ignore
  mocks: graphqlTypeMocks,
  schema: executableSchema,
  preserveResolvers: true,
})

export type ModificationTypes = PartialDeep<{
  query: CypressMockQueryTypes
  mutation: CypressMockMutationTypes
  subscription: CypressMockSubscriptionTypes
}>

export const addApolloProvider = (
  story: Function,
  modifications: ModificationTypes = {}
) => {
  return (props) => {
    let client = new ApolloClient({
      cache: new InMemoryCache(),
      assumeImmutableResults: true,
      link: new ApolloLink((operation) => {
        return new Observable((observer) => {
          const { query, operationName, variables } = operation
          const opDef = operation.query.definitions.find(
            (d) => d.kind === 'OperationDefinition'
          ) as OperationDefinitionNode

          let rootValue = {}
          if (
            modifications[opDef.operation] &&
            // @ts-ignore
            modifications[opDef.operation][operationName]
          ) {
            // @ts-ignore
            rootValue = modifications[opDef.operation][operationName]
          }
          Promise.resolve()
            .then(() => {
              return graphql(
                executableSchema,
                print(query),
                rootValue,
                {},
                variables,
                operationName
              )
            })
            .then((result) => {
              observer.next(result)
              observer.complete()
            })
            .catch(observer.error.bind(observer))
        })
      }),
    })
    return <ApolloProvider client={client}>{story(props)}</ApolloProvider>
  }
}
