
class Test extends React.Component{


  render(){
    var firebaseUser = firebase.database().ref('Pariah');
    let userObject=undefined;
    firebaseUser.on('value', function(snapshot){
      userObject = snapshot.val();

    });
    console.log(userObject);
    return <Game user={{userObject}}/>
  };
};

ReactDOM.render(<Test />, document.getElementById('app'));
