import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  styled,
} from "@mui/material";
import { Share, Done, Close } from "@mui/icons-material";

export interface RecipeProps {
  Id: number;
  Name: string;
  TypeOfCuisine: string;
}

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: "500px",
}));

function Recipe({ Id, Name, TypeOfCuisine }: RecipeProps) {
  return (
    <StyledCard>
      <CardHeader title={Name} subheader={`Created By: Julia`} />
      <CardContent>{TypeOfCuisine}</CardContent>
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
