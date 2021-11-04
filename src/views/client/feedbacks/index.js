import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Menu from '../../../components/menu';
import Copyright from '../../../components/footer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import api from '../../../services/api';
import moment from 'moment';
import { IconButton } from '@mui/material';
import ModeIcon from '@mui/icons-material/Mode';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { getToken } from '../../../services/auth';
import FloatingActionButton from '../../../components/floatingActiveButton';

const mdTheme2 = createTheme();
function FeedbacksContent() {
  const [feedbacks, setFeedbacks] = React.useState([]);

  const loadFeedbacks = async () => {
    api.defaults.headers.common['x-access-token'] = getToken();
    const response = await api.get('/feedbacks', {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    setFeedbacks([...response.data.data]);
  }

  React.useEffect(() => {
    loadFeedbacks();
  }, []);


  return (
    <ThemeProvider theme={mdTheme2}>
      <Box sx={{ display: 'flex' }}>

        <Menu title={'Feedbacks'} />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3} >
              <FloatingActionButton />

              <Paper sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',

              }}>
                <Grid container spacing={3} >
                  <Grid item xs={12}>
                    <Typography variant="h2" component="h1" gutterBottom>
                      Feedbacks List
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12}>
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                          <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="center">Recipient</TableCell>
                            <TableCell align="center">Owner</TableCell>
                            <TableCell align="center">Created at</TableCell>
                            <TableCell align="center">Actions</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {feedbacks.map((row) => (
                            <TableRow
                              key={row._id}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                              <TableCell component="th" scope="row">
                                {row._id}
                              </TableCell>
                              <TableCell align="right">{row.user.name}</TableCell>
                              <TableCell align="right">{row.owner.name}</TableCell>
                              <TableCell align="right">{moment(row.createdAt).format('MM.DD.Y')}</TableCell>

                              <TableCell align="right">
                                <IconButton color="secondary" href={'/feedbacks/' + row._id + '/edit'} >
                                  <ModeIcon />
                                </IconButton>
                                <IconButton color="primary" href={'/feedbacks/' + row._id}>
                                  <VisibilityIcon />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider >

  );
}

export default function Feedbacks() {
  return <FeedbacksContent />;
}

