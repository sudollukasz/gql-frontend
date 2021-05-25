import React from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Button, List, ListItem, ListItemText } from "@material-ui/core";

const GET_BOOKS = gql`
  query getBooks {
    queryBook {
      author {
        firstName
        lastName
      }
      name
    }
  }
`;

const ADD_BOOK = gql`
  mutation addBook($input: [AddBookInput!]!) {
    addBook(input: $input) {
      book {
        id
      }
    }
  }
`;

function App() {
  const { data, error, loading } = useQuery(GET_BOOKS, {
    fetchPolicy: "cache-and-network",
  });
  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }],
  });

  if (loading) {
    return <div>loading ...</div>;
  }

  if (error) {
    return <div>error, try again</div>;
  }

  console.log(data.queryBook);

  const handleClick = () => {
    addBook({ variables: { input: [{ name: "Ksiazka 5" }] } });
  };

  return (
    <>
      <List aria-label="main mailbox folders">
        {data.queryBook?.map((book: any) => (
          <ListItem button key={book.name}>
            <ListItemText primary={book.name} />
          </ListItem>
        ))}
      </List>
      <Button variant="contained" color="primary" onClick={handleClick}>
        Add
      </Button>
    </>
  );
}

export default App;
