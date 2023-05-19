import {
  Box,
  Card,
  CardActions,
  CardMedia,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/app/hooks";
import {
  Document,
  selectDocuments,
  toggleFavorite,
  updateDocumentName,
} from "../../store/features/document/documentSlice";

import DoneIcon from "@mui/icons-material/Done";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import React, { ChangeEvent } from "react";
import AddDocumentDialog from "./AddDocumentDialog";

interface IDocumentProps {
  document: Document;
}

const IDocumnet = ({ document }: IDocumentProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const [isRename, setIsRename] = React.useState(false);
  const [name, setName] = React.useState(document.name);

  const isRenameToggle = () => {
    setIsRename(!isRename);
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => setName(event.target.value);

  const _handleKeyDown = (e: { key: string }) => {
    if (e.key === "Enter") {
      handleUdateDocumentName();
    }
  };

  const handleUdateDocumentName = () => {
    dispatch(
      updateDocumentName({
        id: document.id,
        name: name,
      })
    );
    isRenameToggle();
  };

  return (
    <Card>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={`https://source.unsplash.com/random?bitcoin,${document.id}`}
      />
      <CardActions sx={{ justifyContent: "flex-end" }}>
        {!isRename ? (
          <Typography onClick={() => isRenameToggle()}>
            {document.name}
          </Typography>
        ) : (
          <Input
            size="small"
            value={name}
            onChange={handleChange}
            onBlur={() => {
              if (name === document.name) {
                isRenameToggle();
              }
            }}
            onKeyDown={_handleKeyDown}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => handleUdateDocumentName()}
                  edge="end"
                >
                  <DoneIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        )}

        <IconButton
          onClick={() => dispatch(toggleFavorite(document.id))}
          color={document.is_favorite ? "secondary" : "primary"}
        >
          {document.is_favorite ? <StarIcon /> : <StarBorderIcon />}
        </IconButton>
      </CardActions>
    </Card>
  );
};

const DocumentView = (): JSX.Element => {
  const documents = useAppSelector(selectDocuments);
  return (
    <Box sx={{ height: "92vh", overflow: "auto" }}>
      <Grid container spacing={1}>
        {documents.map((document: Document) => (
          <Grid item xs={3} id={document.id}>
            <IDocumnet document={document} />
          </Grid>
        ))}
      </Grid>
      <AddDocumentDialog />
    </Box>
  );
};
export default DocumentView;
