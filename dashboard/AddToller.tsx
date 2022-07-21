import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent/CardContent';
import FormControl from '@mui/material/FormControl/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel/FormControlLabel';
import FormLabel from '@mui/material/FormLabel/FormLabel';
import Radio from '@mui/material/Radio/Radio';
import RadioGroup from '@mui/material/RadioGroup/RadioGroup';
import TextField from '@mui/material/TextField';
import React = require('react');
import {
  writeTollerData,
  getTollerTree,
  getMales,
  getFemales,
} from '../firebase';
import './AddToller.css';

export default function AddToller() {
  const [microChipId, setMicroChipId] = React.useState(null);
  const [dogName, setDogName] = React.useState(null);
  const [gender, setGender] = React.useState(null);
  const [location, setLocation] = React.useState(null);
  const [litter, setLitter] = React.useState(null);
  const [kennel, setKennel] = React.useState(null);
  const [father, setFather] = React.useState(null);
  const [mother, setMother] = React.useState(null);

  const [ownerEmail, setOwnerEmail] = React.useState(null);

  const [males, setMales] = React.useState([]);
  const [females, setFemales] = React.useState([]);

  React.useEffect(() => {
    getMales().then((vals: Array<any>) => setMales(vals));
    getFemales().then((vals: Array<any>) => setFemales(vals));
  }, []);

  return (
    <Card variant="outlined">
      <CardContent className="container">
        <TextField
          id="filled-basic"
          className={'item'}
          label="Name"
          variant="filled"
          onChange={(e) => setDogName(e.target.value)}
        />
        <TextField
          id="filled-basic"
          className={'item'}
          label="Location"
          variant="filled"
          onChange={(e) => setLocation(e.target.value)}
        />
        <TextField
          id="filled-basic"
          className={'item'}
          type="number"
          label="Mircro Chip ID"
          variant="filled"
          onChange={(e) => setMicroChipId(e.target.value)}
        />
        <TextField
          id="filled-basic"
          className={'item'}
          label="Litter"
          variant="filled"
          onChange={(e) => setLitter(e.target.value)}
        />
        <TextField
          id="filled-basic"
          className={'item'}
          label="Kennel"
          variant="filled"
          onChange={(e) => setKennel(e.target.value)}
        />
        <FormControl className={'item'}>
          <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="F"
              control={<Radio />}
              label="Female"
              onChange={() => {
                setGender('F');
              }}
            />
            <FormControlLabel
              value="M"
              control={<Radio />}
              label="Male"
              onChange={() => {
                setGender('M');
              }}
            />
          </RadioGroup>
        </FormControl>
        <Autocomplete
          id="combo-box-demo"
          className={'item'}
          options={males}
          getOptionLabel={(option) => option.data.dogName}
          onChange={(_, value) => {
            setFather((value && value.id) || null || null);
          }}
          renderInput={(params) => <TextField {...params} label="Father" />}
        />
        <Autocomplete
          id="combo-box-demo"
          className={'item'}
          options={females}
          getOptionLabel={(option) => option.data.dogName}
          onChange={(_, value) => {
            setMother((value && value.id) || null);
          }}
          renderInput={(params) => <TextField {...params} label="Mother" />}
        />

        <TextField
          id="filled-basic"
          className={'item'}
          label="Contact Email"
          variant="filled"
          onChange={(e) => setOwnerEmail(e.target.value)}
        />
      </CardContent>
      <CardActions>
        <Button
          variant="text"
          onClick={() =>
            writeTollerData(
              microChipId,
              dogName,
              gender,
              location,
              litter,
              kennel,
              mother,
              father,
              ownerEmail
            ).then(() => {
              setMicroChipId(null);
            })
          }
        >
          Submit
        </Button>
      </CardActions>
    </Card>
  );
}
