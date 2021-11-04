import * as React from 'react';

const populateUsersSelect =
  api.get('/users').then(response => {
    return response.data;
  });

const handleChange = (event) => {
  setUser(event.target.value);
};
const [user, setUser] = React.useState('');
export function SelectUsers() {
  <FormControl required fullWidth>
    <InputLabel id="recipient-label">Recipient</InputLabel>
    <Select

      labelId="recipient-label"
      id="recipient"
      value={user}
      onChange={handleChange}
      label="Recipient"
    >
      <MenuItem value="">
        <em>None</em>
      </MenuItem>
      <MenuItem value={10}>Ten Ten Ten Ten Ten Ten Ten Ten Ten Ten </MenuItem>
      <MenuItem value={20}>Twenty Twenty Twenty Twenty Twenty Twenty Twenty </MenuItem>
      <MenuItem value={30}>Thirty Thirty Thirty Thirty Thirty Thirty Thirty Thirty Thirty </MenuItem>

    </Select>
  </FormControl >
};