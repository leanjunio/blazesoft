import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE, createWrapper } from 'next-redux-wrapper'

interface Item {
  name: string
  price: number
  category: string
  description: string;
}

interface ItemsState {
  items: Item[]
}

const initialState: ItemsState = {
  items: [
    {
      name: "Harry Potter",
      price: 19.99,
      category: "Fiction",
      description: "The boy who lived."
    },
    {
      name: "Thinking Fast and Slow",
      price: 25.99,
      category: "Self Help",
      description: "By Malcolm Gladwell"
    },
    {
      name: "Never Split The Difference",
      price: 12.99,
      category: "Negotiation",
      description: "By Chris Voss"
    },
  ],
}

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Item>) => {
      state.items.push(action.payload)
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items.splice(action.payload, 1)
    },
    editItem: (state, action: PayloadAction<{ index: number, data: Item }>) => {
      state.items[action.payload.index] = action.payload.data
    }
  },
  extraReducers: {
    [HYDRATE]: (state, action: PayloadAction<ItemsState>) => {
      // This will be fired when the server state clashes with the initial client state
      return {
        ...state,
        ...action.payload, // apply payload from server to the state
      }
    },
  },
})

export const { addItem, removeItem, editItem } = itemsSlice.actions

const store = configureStore({
  reducer: {
    items: itemsSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Create a makeStore function
const makeStore = (context: any) => store

// Export the wrapper & wrap the pages/_app.js with this wrapper only
export const wrapper = createWrapper(makeStore, { debug: true })
