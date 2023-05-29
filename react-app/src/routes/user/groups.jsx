import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import AddGoalButton from '../../components/AddGoalButton';
import AddGroup from './tracking/addGroup';
import AddGroupButton from '../../components/AddGroupButton';
import React from "react";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
}));

class GroupListItem extends React.Component {
  state = {"members":""};
  owner = "";
  
  componentDidMount() {
    let owner = "";
    let requestJson =  {"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjIsInVzZXJuYW1lIjoibHlyYS1zY2FybGV0IiwiaWF0IjoxNjg1MzgzOTk3LCJleHAiOjE2ODUzOTExOTd9.0WPT_uGFF0qG_ELadnmyxUwtfWHrybwedg0YGxzValo", "users":this.props.ownerID};
    fetch('http://localhost:3001/getUsers',{method:'POST',body:JSON.stringify(requestJson),headers:{'Content-type':'application/json; charset=UTF-8'},}).then((response) => response.json()).then((data) => {
     if (data.success) this.owner = data.data;
    }).catch((err) => {console.log(err.message);});
    
    requestJson =  {"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjIsInVzZXJuYW1lIjoibHlyYS1zY2FybGV0IiwiaWF0IjoxNjg1MzgzOTk3LCJleHAiOjE2ODUzOTExOTd9.0WPT_uGFF0qG_ELadnmyxUwtfWHrybwedg0YGxzValo", "users":this.props.memberIDs};
    fetch('http://localhost:3001/getUsers',{method:'POST',body:JSON.stringify(requestJson),headers:{'Content-type':'application/json; charset=UTF-8'},}).then((response) => response.json()).then((data) => {
     if (data.success) this.setState({"owner":this.state.owner,"members":data.data});
    }).catch((err) => {console.log(err.message);});
  };
  
  render() {
    return (
    <Item elevation={2}>
      <Grid container xs={12}>
        <Grid container xs={8}>
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
          return <GroupListItem key={group.groupID} groupName={group.groupName} ownerID={group.ownerID} memberIDs={group.memberIDs} />
        })}
      </Grid>
    )
  }
}


export default class Groups extends React.Component {
  state = {groups:[]};
  componentDidMount() {
    let requestJson = {"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjIsInVzZXJuYW1lIjoibHlyYS1zY2FybGV0IiwiaWF0IjoxNjg1MzgzOTk3LCJleHAiOjE2ODUzOTExOTd9.0WPT_uGFF0qG_ELadnmyxUwtfWHrybwedg0YGxzValo"};
    fetch('http://localhost:3001/getGroups',{method:'POST',body:JSON.stringify(requestJson),headers:{'Content-type':'application/json; charset=UTF-8'},}).then((response) => response.json()).then((data) => {
     if (data.success) this.setState({"groups":data.data});
    }).catch((err) => {console.log(err.message);});
  };
  render() {
    return (
      <Container sx={
        {
  
          padding: "30px"
        }
      } maxWidth="sm">
        <Typography variant="h2" component="h1" gutterBottom> Your groups </Typography>
        <AddGroupButton></AddGroupButton>
        {/* 
        group search bar */}
        <GroupList groups={this.state.groups} />
      </Container>
    );
  }
}
