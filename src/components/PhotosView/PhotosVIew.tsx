import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useGetPhotosQuery } from "../../store/services/photos";
import Slider from "@mui/material/Slider";
import { Box } from "@mui/material";

function valuetext(value: number) {
  return `${value}°C`;
}

function srcset(image: string, size: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function PhotosView() {
  const { data, isLoading } = useGetPhotosQuery();
  const itemDataLength = itemData.length;

  const getUrl = (index: number): string => {
    return `https://source.unsplash.com/random?scenery,${index}`;
  };

  const getC = (index: number): number => {
    const x = itemData[index % itemDataLength].cols;
    return x ? x : 1;
  };

  const getR = (index: number): number => {
    const x = itemData[index % itemDataLength].rows;
    return x ? x : 1;
  };

  const [value, setValue] = React.useState<number>(4);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  return (
    <Box>
      <Slider
        aria-label="Temperature"
        defaultValue={4}
        value={value}
        onChange={handleChange}
        getAriaValueText={valuetext}
        valueLabelDisplay="auto"
        step={2}
        marks
        min={2}
        max={16}
      />
      <ImageList
        variant="quilted"
        cols={value}
        rowHeight={484 / value}
        sx={{ height: "70%" }}
      >
        <>
          {data &&
            data.map((item, index) => (
              <ImageListItem
                key={item.id}
                cols={getC(index)}
                rows={getR(index)}
              >
                <img
                  {...srcset(getUrl(index), 121, getR(index), getC(index))}
                  alt={item.title}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
        </>
      </ImageList>
    </Box>
  );
}

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
    rows: 2,
    cols: 2,
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
    cols: 2,
  },
  {
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
    cols: 2,
  },
  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
    author: "@arwinneil",
    rows: 2,
    cols: 2,
  },
  {
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "Basketball",
  },
  {
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
  },
  {
    img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "Mushrooms",
    rows: 2,
    cols: 2,
  },
  {
    img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    title: "Tomato basil",
  },
  {
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    title: "Sea star",
  },
  {
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "Bike",
    cols: 2,
  },
];
