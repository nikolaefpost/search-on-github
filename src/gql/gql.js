import {gql} from '@apollo/client';

export const GET_SCHEMA = gql`
    query {
        node(id:"MDQ6VXNlcjU4MzIzMQ==") {
            __typename
        }
    }

`;
