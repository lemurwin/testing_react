$(document).ready(function(){


  $('#players').change(function(){
    var name = $('select[name="players"]').val();
    $('#namePlace').html(name);

$('#gameContainer').html('');

  var firebaseUser = firebase.database().ref(name);
  firebaseUser.on('value', function(snapshot){
    $('#gameContainer').html('');
      let userObject = snapshot.val();
      //console.log(userObject);
      // Various variables to store information
      let totalKills = 0;
      let totalDeaths = 0;
      let totalWins= 0;
      let totalLosses=0;
      let totalUnknown=0;

      //Iterating over the snapshot object
      $.each(userObject, function(key, value){

        //Date formatting
       let month = key.substr(4, 2);
       let day = key.substr(6, 2);
       let year = key.substr(0,4);
       let time = key.substr(8, 4);

       //Variables to render into html
       let deathCounter = value.deaths;
       let killCounter = value.kills;
       let kdRatio = killCounter/deathCounter;
       let location = value.location;
       if (value.location == undefined || value.location == '') {
         location = "No Location Data Logged"
       };

       // Consolidating win/loss record for title
       if (value.record == 'Win' || value.record == 'win'){
         totalWins=totalWins+1;
       } else if(value.record == 'Loss'|| value.record == 'loss'){
         totalLosses=totalLosses+1;
       } else if(value.record == 'Unknown' || value.record == 'unknown'){
         totalUnknown = totalUnknown+1;
       }
       // Consolidating kill/death ratio for title
       totalKills = totalKills+value.kills;
       totalDeaths = totalDeaths + value.deaths;

       //Rendering HTML bits
       let titleRender = '<div class="row"><div class="col-md-12"><h3>Date ';
       let statsRender = '<div class="row"><div class="col-md-12 ">';
       let statsRenderEnd = '</div></div>';
       $('#gameContainer').append(titleRender + month+'/'+day + '/' + year+' '+time+'</h3>');
       $('#gameContainer').append(statsRender + location + ' - '+ value.record + statsRenderEnd);
       $('#gameContainer').append(statsRender+'Kills: '+killCounter+ statsRenderEnd+statsRender+'Deaths: '+deathCounter+statsRenderEnd);
       $('#gameContainer').append(statsRender+'K/D Ratio: '+ (killCounter/deathCounter).toFixed(2) + statsRenderEnd);
          });
      //Outside the user object, final tally and rendering
          $('#winRecord').html('Total Win/Loss Record: ' + totalWins +' Wins, '+totalLosses+' Losses, '+ totalUnknown + ' Other');
        $('#totalRatio').html('Total K/D Ratio: '+(totalKills/totalDeaths).toFixed(2));
        });

    });
});
