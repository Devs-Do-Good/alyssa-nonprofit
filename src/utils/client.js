import { Client } from 'tina-graphql-gateway'

const client = new Client({
    organizationId: process.env.GATSBY_TINA_ORGANIZATION_ID,
    clientId: process.env.GATSBY_TINA_CLIENT_KEY,
    branch: process.env.GATSBY_TINA_BRANCH,
    tokenStorage: 'LOCAL_STORAGE',
    redirectURI: 'http://localhost:8000',
})

export default client;