import Autocomplete from '@mui/material/Autocomplete';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent/CardContent';
import TextField from '@mui/material/TextField';
import React = require('react');
import { getTollerTree, getAll } from '../firebase';
import { TreeNode } from 'react-organizational-chart';
import { Tree } from 'react-organizational-chart';

import './NodeStyle.css';
import TollerCard from './tollerCard';

export default function ViewTollerTree() {
  const [allTollers, setAllTollers] = React.useState([]);
  const [selectToller, setSelectedToller] = React.useState();
  const [treeRoot, setTreeRoot] = React.useState();

  React.useEffect(() => {
    getAll().then((vals: Array<any>) => setAllTollers(vals));
    getTollerTree(selectToller).then((val) => setTreeRoot(val));
  }, [selectToller]);

  console.log(selectToller);
  console.log(treeRoot);

  const addTreeNode = (dog, father: boolean) => {
    return (
      <TreeNode label={<TollerCard dog={dog} />}>
        {dog.mother && addTreeNode(dog.mother, false)}
        {dog.father && addTreeNode(dog.father, true)}
      </TreeNode>
    );
  };

  return (
    <div>
      <Card variant="outlined">
        <CardContent className="container">
          <Autocomplete
            id="combo-box-demo"
            className={'item'}
            options={allTollers}
            getOptionLabel={(option) => option.data.dogName}
            onChange={(_, value) => {
              setSelectedToller((value && value.id) || null);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select a toller to display the tree"
              />
            )}
          />
        </CardContent>
      </Card>
      {treeRoot && (
        <Tree label={<div>{treeRoot?.dogName}</div>}>
          {treeRoot?.mother && addTreeNode(treeRoot?.mother, false)}
          {treeRoot?.father && addTreeNode(treeRoot?.father, true)}
        </Tree>
      )}
    </div>
  );
}
