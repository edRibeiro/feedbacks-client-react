import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Menu from '../../../components/menu';
import Copyright from '../../../components/footer';
import { Button, Paper, Stack, TextField } from '@mui/material';
import api from '../../../services/api';
import { getToken } from '../../../services/auth';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import CancelIcon from '@mui/icons-material/Cancel';


const mdTheme = createTheme();

function FeedbacksContent() {
  const [user, setUser] = React.useState('');
  const [improvementPoints, setImprovementPoints] = React.useState('');
  const [maintainPoints, setMaintainPoints] = React.useState('');
  const [suggestions, setSuggestions] = React.useState('');
  const [finalFeedback, setFinalFeedback] = React.useState('');
  const [createdAt, setCreatedAt] = React.useState(new Date());

  const { idFeedback } = useParams();

  React.useEffect(() => {
    async function loadFeedback() {
      api.defaults.headers.common['x-access-token'] = getToken();
      const response = await api.get('/feedbacks/' + idFeedback, {
        headers: {
          'Authorization': `Bearer ${getToken()}`,
        },
      });

      // reason: response.data.data
      const { data } = response.data;
      setUser(data.user.name);
      setImprovementPoints(data.improvementpoints);
      setMaintainPoints(data.maintainpoints);
      setSuggestions(data.suggestions);
      setFinalFeedback(data.finalfeedback);
      setCreatedAt(data.createdAt);
    }
    loadFeedback();
  }, []);

  const handleSubmit = async () => {
    const data = {
      improvementpoints: improvementPoints,
      maintainpoints: maintainPoints,
      suggestions,
      finalfeedback: finalFeedback
    }
    if (improvementPoints !== '' && maintainPoints !== '' && suggestions && finalFeedback !== '') {
      try {
        const response = await api.patch('/feedbacks/' + idFeedback, data);
        if (response.status === 200) {
          window.location.href = '/feedbacks';
        } else {
          throw new Error("Error when submitting feedback");
        }
      } catch (error) {
        console.error(error);
        alert("Error when submitting feedback");
      }
    } else {
      alert("Please fill in all data.");
    }
  }

  return (
    <ThemeProvider theme={mdTheme}>
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
              <Grid item sm={12}>
                <Paper sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',

                }}>
                  <Grid container spacing={3} >
                    <Grid item xs={12}>
                      <Typography variant="h2" component="h1" gutterBottom>
                        Edit Feedback
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container spacing={3} >
                    <Grid item xs={6}>
                      <TextField
                        required
                        id="user"
                        name="user"
                        label="Recipient"
                        fullWidth
                        defaultValue={user}
                        InputProps={{
                          readOnly: true,
                        }}
                        value={user}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        required
                        id="user"
                        name="user"
                        label="Recipient"
                        fullWidth
                        defaultValue={moment(createdAt).format('MM.DD.YYYY')}
                        InputProps={{
                          readOnly: true,
                        }}
                        value={moment(createdAt).format('MM.DD.YYYY')}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        id="improvementpoints"
                        name="improvementpoints"
                        label="Improvement Points"
                        fullWidth
                        multiline
                        value={improvementPoints}
                        onChange={e => setImprovementPoints(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        id="maintainpoints"
                        name="maintainpoints"
                        label="Maintain Points"
                        fullWidth
                        multiline
                        value={maintainPoints}
                        onChange={e => setMaintainPoints(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        id="suggestions"
                        name="suggestions"
                        label="Suggestions"
                        fullWidth
                        multiline
                        value={suggestions}
                        onChange={e => setSuggestions(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        id="finalfeedback"
                        name="finalfeedback"
                        label="Final Feedback"
                        fullWidth
                        multiline
                        value={finalFeedback}
                        onChange={e => setFinalFeedback(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Stack spacing={2} direction="row">
                          <Button variant="contained" onClick={handleSubmit}>Submit</Button>
                        </Stack>
                        <Button variant="secondary" startIcon={<CancelIcon />} href={'/feedbacks'}>
                          Cancel
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function FeedbacksEdit() {
  return <FeedbacksContent />;
}

