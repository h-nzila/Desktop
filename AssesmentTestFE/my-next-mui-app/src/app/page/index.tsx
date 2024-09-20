"use client";

import { useEffect, useState } from 'react';
import { Button, Card, CardContent, Typography, Container, Grid } from '@mui/material';

interface Post {
  id: number;
  title: string;
  body: string;
}

interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const postsResponse = await fetch('https://jsonplaceholder.typicode.com/posts');
      const commentsResponse = await fetch('https://jsonplaceholder.typicode.com/comments');
      
      const postsData = await postsResponse.json();
      const commentsData = await commentsResponse.json();
      
      setPosts(postsData);
      setComments(commentsData);
    };

    fetchData();
  }, []);

  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        Posts
      </Typography>
      <Grid container spacing={2}>
        {posts.map(post => (
          <Grid item xs={12} sm={6} md={4} key={post.id}>
            <Card>
              <CardContent>
                <Typography variant="h5">{post.title}</Typography>
                <Typography variant="body2">{post.body}</Typography>
                <Button variant="outlined" color="primary">
                  View Comments
                </Button>
                <Typography variant="h6" gutterBottom>
                  Comments
                </Typography>
                {comments.filter(comment => comment.postId === post.id).map(comment => (
                  <Typography key={comment.id} variant="body2" color="textSecondary">
                    {comment.name}: {comment.body}
                  </Typography>
                ))}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
