import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  styled,
} from "@mui/material";
import { TodoCard } from "../TodoCard/TodoCard";
import { Share, Done, Close } from "@mui/icons-material";

export interface RecipeProps {
  id: number;
  name: string;
  typeOfCuisine: string;
}

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: "500px",
}));

function Recipe({ id, name, typeOfCuisine }: RecipeProps) {
  return (
    <StyledCard>
      <CardHeader title={name} subheader={`Created By: Julia`} />
      <CardContent>{typeOfCuisine}</CardContent>
      <CardActions
        sx={{
          alignContent: "flex-end",
          justifyContent: "end",
          alignSelf: "end",
        }}
      >
        {/*TODO: Set up these actions correctly */}
        <IconButton>
          <Share data-testid="todo-card-share" />
        </IconButton>
        <IconButton>
          <Done data-testid="todo-card-done" />
        </IconButton>
        <IconButton>
          <Close data-testid="todo-card-close" />
        </IconButton>
      </CardActions>
    </StyledCard>
  );
}

export { Recipe };
