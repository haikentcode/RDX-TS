import SendIcon from "@mui/icons-material/Send";
import {
  Box,
  IconButton,
  LinearProgress,
  Stack,
  TextField,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {
  IPost,
  useAddPostMutation,
  useGetPostQuery,
} from "../../store/services/post";

type ItemProps = {
  post: IPost;
};
const Post = ({ post }: ItemProps): JSX.Element => {
  const getUrl = (id: number): string => {
    return `https://source.unsplash.com/random?portrait,${id}`;
  };

  return (
    <ListItem alignItems="flex-start" key={post.id}>
      <ListItemAvatar>
        <Avatar alt={post.title} src={getUrl(post.id)} />
      </ListItemAvatar>
      <ListItemText
        primary={post.title}
        secondary={
          <React.Fragment>
            <Typography
              sx={{ display: "inline" }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {post.title}
            </Typography>
            {post.body}
          </React.Fragment>
        }
      />
    </ListItem>
  );
};

const CratePost = (): JSX.Element => {
  const [post, setPost] = React.useState<IPost>();
  const [addPost] = useAddPostMutation();

  function handelChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    var value: string = event.target.value;
    var name: string = event.target.name;
    console.log(name, value);
    var np: IPost = {
      ...{
        userId: 0,
        id: 0,
        title: "",
        body: "",
      },
      ...post,
    };

    np = { ...np, [name]: value };

    setPost(np);
  }
  const createPost = () => {
    if (post) {
      post.userId = Math.floor(Math.random() * 1000);
      post.id = Math.floor(Math.random() * 1000);
      addPost(post);
    }
    console.log(post);
  };

  return (
    <Box sx={{ m: 1 }}>
      <Stack>
        <TextField
          id="title"
          type="text"
          name="title"
          label="title"
          variant="standard"
          value={post?.title}
          onChange={handelChange}
        />
        <TextField
          id="body"
          type="text"
          name="body"
          label="body"
          variant="standard"
          value={post?.body}
          onChange={handelChange}
        />
        <IconButton onClick={createPost}>
          <SendIcon />{" "}
        </IconButton>
      </Stack>
    </Box>
  );
};

function PostView() {
  const { data, isLoading } = useGetPostQuery();
  return (
    <Box>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {isLoading && <LinearProgress />}
        <>
          {data && data.map((post: IPost) => <Post post={post} />)}
          <Divider variant="inset" component="li" />
        </>
      </List>
      <CratePost />
    </Box>
  );
}

export default PostView;
