import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import DateRangeIcon from "@mui/icons-material/DateRange";

interface YouTubeVideoCardProps {
  title: string;
  thumbnailUrl: string;
  videoId: string;
  uploaderName: string;
  _date: string;
}

export const CardContentNoPadding = styled(CardContent)(`
  padding: 0;
  &:last-child {
    padding-bottom: 0;
  }
`);

const StyledCard = styled(Card)(({ theme }) => ({
  transition: "transform 0.15s ease-in-out",
  "&:hover": { transform: "scale3d(1.02, 1.02, 1)" },
}));

const YouTubeVideoCard = ({
  title,
  thumbnailUrl,
  videoId,
  uploaderName,
  _date,
}: YouTubeVideoCardProps) => (
  <StyledCard>
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      <CardMedia
        component="img"
        image={thumbnailUrl}
        title={title}
        height="100px"
        sx={{ width: 151, m: 0.1, cursor: "pointer" }}
      />
      <CardContentNoPadding sx={{ ml: 1 }}>
        <Typography
          sx={{
            wordWrap: "break-word",
            width: "8rem",
            fontSize: {
              lg: 14,
              md: 12,
              sm: 10,
              xs: 8,
            },
          }}
        >
          {title}
        </Typography>
        <Typography variant="body2">{uploaderName}</Typography>

        <IconButton sx={{ fontSize: 10 }}>
          <DateRangeIcon sx={{ width: 10, mr: 1 }} />
          <span>
            {_date} - {_date}
          </span>
        </IconButton>
      </CardContentNoPadding>
      <CardActions sx={{ alignItems: "flex-start", p: 0, ml: 2 }}>
        <IconButton>
          <ThumbUpOffAltIcon />
        </IconButton>
      </CardActions>
    </Box>
  </StyledCard>
);

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Grid2View() {
  const list_data = new Array(10).fill("abc").map((val, i) => val + (i + 1));
  const date: string = new Date().toLocaleDateString();

  return (
    <Box>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid xs={6} md={8}>
            <Item>xs=6 md=8</Item>
          </Grid>
          <Grid xs={6} md={4}>
            <Item>xs=6 md=4</Item>
          </Grid>
          <Grid xs={6} md={4}>
            <Item>xs=6 md=4</Item>
          </Grid>
          <Grid xs={6} md={8}>
            <Item>xs=6 md=8</Item>
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ mb: 2, mt: 2 }} />

      <Stack
        spacing={{ xs: 1, sm: 2 }}
        direction="row"
        useFlexGap
        flexWrap="wrap"
      >
        {list_data.map((item) => (
          <YouTubeVideoCard
            title={`tile demo  with xx name ${item}`}
            thumbnailUrl={`https://source.unsplash.com/random?scenery,${item}`}
            videoId="22-22-007"
            uploaderName="xx-viar"
            _date={date}
          />
        ))}
      </Stack>
    </Box>
  );
}
