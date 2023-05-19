import AddIcon from "@mui/icons-material/Add";
import {
  Checkbox,
  FormControlLabel,
  Input,
  Stack,
  TextField,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Fab from "@mui/material/Fab";
import * as React from "react";
import uuid from "react-uuid";
import { useAppDispatch } from "../../store/app/hooks";
import {
  Document,
  addDocument,
} from "../../store/features/document/documentSlice";

export default function AddDocumentDialog() {
  const [open, setOpen] = React.useState(false);
  const [document, setDocument] = React.useState<Document>({
    id: "",
    name: "",
    file: undefined,
    uploaded_at: new Date().toLocaleString(),
    is_favorite: false,
  });

  const [currentFile, setCurrentFile] = React.useState<File>();

  const selectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    const selectedFiles = files as FileList;
    setCurrentFile(selectedFiles?.[0]);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useAppDispatch();

  const uploadDocument = () => {
    setDocument({ ...document, id: uuid() });
    dispatch(addDocument(document));
    handleClose();
  };

  console.log(document.file);

  return (
    <div>
      <Fab
        sx={{
          position: "absolute",
          bottom: 16,
          right: 16,
        }}
        color="secondary"
        onClick={handleClickOpen}
      >
        <AddIcon />
      </Fab>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Document</DialogTitle>
        <DialogContent>
          <Stack sx={{ mt: 2 }} spacing={2}>
            <TextField
              error={false}
              id="outlined-error"
              label="Document name"
              value={document.name}
              onChange={(e) =>
                setDocument({ ...document, name: e.target.value })
              }
            />
            <Input type="file" name="file" id="file" onChange={selectFile} />

            <FormControlLabel
              control={
                <Checkbox
                  value={document.is_favorite}
                  onChange={(e) =>
                    setDocument({ ...document, is_favorite: e.target.checked })
                  }
                />
              }
              label="Is Favorite"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => uploadDocument()} disabled={!currentFile}>
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
