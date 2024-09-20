import { Card, CardContent, Typography, Button } from '@mui/material';

interface PostCardProps {
  id: number;
  title: string;
  body: string;
  onViewDetails: (id: number) => void;
}

const PostCard: React.FC<PostCardProps> = ({ id, title, body, onViewDetails }) => {
  return (
    <Card elevation={3}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary" paragraph>
          {body.length > 100 ? `${body.slice(0, 100)}...` : body}
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => onViewDetails(id)}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default PostCard;
