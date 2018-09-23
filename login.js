//--FUNCTIONS in login.html--------------------------------------------

function validatestafflogin() {
  console.log('Login');
  //Retrieve user name and save them;
  try {
    //Get username and save them
    var staff = document.getElementById('staffinitialfulllist').value.split(" ");
    var staffinitial=staff[0];
    var stafffull=staff[1];
    if (staffinitial == null || staffinitial == 'NA') {
      document.getElementById('message').innerHTML = 'Staff needs to be selected.';
      return false;
    }
    else {
      localStorage.setItem('staffinitial',staffinitial);
      localStorage.setItem('stafffull',stafffull);
    }
    //Get password
    var pw=document.getElementById('pw').value;
    if (pw==null || pw=='') {
      //document.getElementById('msgpw').innerHTML='Missing password.';
      document.getElementById('message').appendChild(document.createTextNode('Missing password'));
      return false;
    }
    else {
      object={staffinitial:staffinitial,pw:pw};
      //xxx ajax call to database to compare username with password.
      $.ajax({
        type:'POST',
        url:'int_chain_loginverify.php',
        data:object,
        success:function(data){
          if (data=='Correct') {
          //Go to samplestorage.html after user and pw are verified.
            window.location='samplestorage.html';
            return true;
          }
          else {
            document.getElementById('message').appendChild(document.createTextNode('Incorect username or password.'));
          }
        }
      });
    }
  }
  catch (err) {
    document.getElementById('message').innerHTML = err.message;
  }
}
