'use client'
import { useEffect, useState } from 'react';
import { Container, Typography, Card, CardContent, Button, Box } from '@mui/material';

interface Post {
  id: number;
  title: string;
  body: string;
}

interface Comment {
  id: number;
  postId: number;
  name: string;
  body: string;
}

const PostDetail = ({ params }: { params: { id: string } }) => {
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const postResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`);
      const commentsResponse = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${params.id}`);

      const postData = await postResponse.json();
      const commentsData = await commentsResponse.json();

      setPost(postData);
      setComments(commentsData);
      setLoading(false);
    };

    fetchData();
  }, [params.id]);

  return (
    <Container>
      {loading ? (
        <Typography variant="h6">Loading post...</Typography>
      ) : (
        <>
          <Card elevation={3} sx={{ marginBottom: 4 }}>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                {post?.title}
              </Typography>
              <Typography variant="body1" paragraph>
                {post?.body}
              </Typography>
              <Button variant="contained" onClick={() => window.history.back()}>
                Go Back
              </Button>
            </CardContent>
          </Card>
          <Box mt={4}>
            <Typography variant="h6">Comments</Typography>
            {comments.length > 0 ? (
              comments.map(comment => (
                <Box key={comment.id} mb={2} p={2} borderRadius={2} bgcolor="#f9f9f9" border={1} borderColor="grey.300">
                  <Typography variant="subtitle1" fontWeight="bold">{comment.name}</Typography>
                  <Typography variant="body2" color="textSecondary">{comment.body}</Typography>
                </Box>
              ))
            ) : (
              <Typography variant="body2" color="textSecondary">No comments available.</Typography>
            )}
          </Box>
        </>
      )}
    </Container>
  );
};

export default PostDetail;

