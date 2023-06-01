import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import AddGoalButton from '../../components/AddGoalButton';
import AddGroup from './tracking/addGroup';
import AddGroupButton from '../../components/AddGroupButton';
import JoinGroupButton from '../../components/JoinGroupButton';
import React from "react";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(4),
  color: theme.palette.text.secondary,
}));

const userToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjIsInVzZXJuYW1lIjoibHlyYS1zY2FybGV0IiwiaWF0IjoxNjg1NTY3MzM0LCJleHAiOjE2ODU1NzQ1MzR9.1pW5I-9-U_Wi8QJxJ-sfRdKIsrjrf9Pa-RGDNZFdgIA";

class GroupListItem extends React.Component {
  state = {"members":""};
  owner = "";
  
  componentDidMount() {
    let owner = "";
    let requestJson =  {"token":userToken, "users":this.props.ownerID};
    fetch('http://localhost:3001/getUsers',{method:'POST',body:JSON.stringify(requestJson),headers:{'Content-type':'application/json; charset=UTF-8'},}).then((response) => response.json()).then((data) => {
     if (data.success) this.owner = data.data;
    }).catch((err) => {console.log(err.message);});
    
    requestJson =  {"token":userToken, "users":this.props.memberIDs};
    fetch('http://localhost:3001/getUsers',{method:'POST',body:JSON.stringify(requestJson),headers:{'Content-type':'application/json; charset=UTF-8'},}).then((response) => response.json()).then((data) => {
     if (data.success) this.setState({"owner":this.state.owner,"members":data.data});
    }).catch((err) => {console.log(err.message);});
  };
  
  render() {
    return (
    <Item elevation={2}>
      <Grid container xs={12}>
        <Grid container xs={12}>
          <Grid xs={12}>
            <Typography variant='h5'> Group name: {this.props.groupName} </Typography>
          </Grid>
          <Grid xs={12}>
            <Typography variant='h6'> Owner: {this.owner} </Typography>
          </Grid>
        </Grid>
        <Grid xs={12}>
            <Typography variant='h6'> Members: {this.state.members} </Typography>
          </Grid>
        <Grid xs={12}>
            <Typography variant='h6'> Group Join ID: {this.props.groupID} </Typography>
          </Grid>
        </Grid>
    </ Item>
    )
  }
}

class GroupList extends React.Component {
  render() {
    return (
      <Grid container direction="column" rowGap={2} maxWidth="sm">
        {this.props.groups.map(group => {
          return <GroupListItem key={group.groupID} groupID={group.groupID} groupName={group.groupName} ownerID={group.ownerID} memberIDs={group.memberIDs} />
        })}
      </Grid>
    )
  }
}


export default class Groups extends React.Component {
  state = {groups:[]};
  componentDidMount() {
    let requestJson = {"token":userToken};
    fetch('http://localhost:3001/getGroups',{method:'POST',body:JSON.stringify(requestJson),headers:{'Content-type':'application/json; charset=UTF-8'},}).then((response) => response.json()).then((data) => {
     if (data.success) this.setState({"groups":data.data}); console.log(data);
    }).catch((err) => {console.log(err.message);});
  };
  render() {
    return (
      <Container sx={
        {
          padding: "30px"
        }
      } maxWidth="sm">
        <Item>
        <Typography variant="h2" component="h1" gutterBottom> Your groups </Typography>
        <Grid container direction="column" rowGap={2} maxWidth="sm">
        <AddGroupButton /><JoinGroupButton />
        {/* 
        group search bar */}
        <GroupList groups={this.state.groups} />
        </Grid>
        </Item>
      </Container>
    );
  }
}
