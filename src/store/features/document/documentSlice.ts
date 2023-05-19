import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface Document {
  id: string;
  name: string;
  file: File | undefined;
  uploaded_at: string;
  is_favorite: boolean;
}

export interface DocumentState {
  all: Document[];
}

const initialState: DocumentState = {
  all: [] as Document[],
};

export const documentSlice = createSlice({
  name: "documents",
  initialState,
  reducers: {
    addDocument: (state, action: PayloadAction<Document>) => {
      state.all = [...state.all, action.payload];
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      state.all = state.all.map((document: Document) =>
        document.id === action.payload
          ? { ...document, is_favorite: !document.is_favorite }
          : document
      );
    },

    updateDocumentName: (
      state,
      action: PayloadAction<{ id: string; name: string }>
    ) => {
      state.all = state.all.map((document: Document) =>
        document.id === action.payload.id
          ? { ...document, name: action.payload.name }
          : document
      );
    },
  },
});

export const { addDocument, toggleFavorite, updateDocumentName } =
  documentSlice.actions;
export const selectDocuments = (state: RootState) => state.documents.all;

export default documentSlice.reducer;
