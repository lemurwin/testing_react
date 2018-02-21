class Game extends React.Component{

  render(){
    const userObject=this.props.user;
    return (
    <div>
    <h1>{userObject.location}</h1>
    <div>{userObject.location}</div>
    <div>Kills:{userObject.kills} Deaths: {userObject.deaths} K/D: {(userObject.kills/userObject.deaths)}</div>
    </div>);
  }
};
