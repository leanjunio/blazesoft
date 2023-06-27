import Head from 'next/head'
import { Inter } from 'next/font/google'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, addItem, editItem, removeItem } from '@/store'
import { Box, Button, Container, Grid, IconButton, Modal, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import AddBook, { AddItemSchema } from '@/components/AddBook'
import EditBook from '@/components/EditBook'
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

type Item = {
  name: string
  price: number
  category: string
  description: string
}

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const items = useSelector((state: RootState) => state.items.items)
  const [isAdd, setIsAdd] = useState(false);
  const [bookToEdit, setBookToEdit] = useState<null | number>(null);
  const dispatch = useDispatch();


  function openAddItemDialog() {
    setIsAdd(true)
  };

  function onAdd(data: AddItemSchema) {
    dispatch(addItem(data));
    setIsAdd(false);
  }

  function onEdit(data: Item) {
    if (bookToEdit !== null) {
      dispatch(editItem({ index: bookToEdit, data }));
      setBookToEdit(null);
    }
  }

  function onDelete(index: number) {
    dispatch(removeItem(index))
  }

  return (
    <>
      <Head>
        <title>Blazesoft | List of Books</title>
        <meta name="description" content="Blazesoft list of books" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Container sx={{ marginTop: "5em" }}>
          <Stack spacing={5}>
            <Stack direction="row" alignContent="center" justifyContent="space-between">
              <Typography component="h1" variant="h5" gutterBottom>
                Books
              </Typography>
              <IconButton aria-label="Delete button" onClick={openAddItemDialog}>
                <AddIcon />
              </IconButton>
            </Stack>
            <Stack spacing={3} direction="column">
              {items.map((item, i) => (
                <Stack key={i} direction="row" justifyContent="space-between">
                  <Stack direction="row" spacing={3} alignItems="center">
                    <Button onClick={() => setBookToEdit(i)} variant="contained">{item.name}</Button>
                    <Typography variant="body1" gutterBottom>
                      $ {item.price}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {item.category}
                    </Typography>
                  </Stack>
                  <IconButton onClick={() => onDelete(i)}>
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              ))}
            </Stack>
          </Stack>
        </Container>
        <Modal
          open={isAdd}
          onClose={() => setIsAdd(false)}
          aria-labelledby="add book modal"
          aria-describedby="this modal opens after the add button is clicked"
        >
          <AddBook onSubmit={onAdd} />
        </Modal>
        {bookToEdit !== null ? (
          <Modal
            open={bookToEdit !== null}
            onClose={() => setBookToEdit(null)}
            aria-labelledby="edit book modal"
            aria-describedby="this modal opens after the edit button is clicked"
          >
            <EditBook data={items[bookToEdit]} onSubmit={onEdit} />
          </Modal>
        ) : null}
      </main>
    </>
  )
}
