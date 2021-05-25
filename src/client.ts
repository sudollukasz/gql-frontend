import { ApolloClient, InMemoryCache} from '@apollo/client'

export const client = new ApolloClient({
    uri: 'https://white-hill.us-east-1.aws.cloud.dgraph.io/graphql',
    cache: new InMemoryCache()
})
