//--FUNCTIONS in login.html--------------------------------------------

function validatestafflogin() {
  console.log('Login');
  try {
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
      window.location='samplestorage.html';
      return true;
    }
  }
  catch (err) {
    document.getElementById('message').innerHTML = err.message;
  }
}
