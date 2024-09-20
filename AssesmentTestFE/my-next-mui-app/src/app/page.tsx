"use client";

import { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  Snackbar,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Pagination from './components/Pagination';
import { useRouter } from 'next/navigation';
import PostCard from './components/PostCard'; // Ensure to import PostCard

interface Post {
  id: number;
  title: string;
  body: string;
}

const Home: React.FC = () => {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [postsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const indexOfLastPost = page * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    setOpenSnackbar(true);
  };

  const handleViewDetails = (postId: number) => {
    router.push(`/posts/${postId}`);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container>
      <Typography variant="h2" gutterBottom align="center">
        Posts
      </Typography>

      {loading ? (
        <Typography variant="h6" align="center">Loading posts...</Typography>
      ) : (
        <Grid container spacing={4}>
          {currentPosts.map(post => (
            <Grid item xs={12} sm={6} md={4} key={post.id}>
              <PostCard 
                id={post.id} 
                title={post.title} 
                body={post.body} 
                onViewDetails={handleViewDetails} 
              />
            </Grid>
          ))}
        </Grid>
      )}

      <Pagination
        count={Math.ceil(posts.length / postsPerPage)}
        page={page}
        onChange={handleChange}
      />

      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        message={`Page ${page} loaded`}
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseSnackbar}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </Container>
  );
};

export default Home;
