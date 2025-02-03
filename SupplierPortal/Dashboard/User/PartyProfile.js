document.getElementById('btn-edit').addEventListener('click', function () {
    // Get the profile update container
    const profileUpdateContainer = document.getElementsByClassName('profile-update-container');
    
    // Toggle the d-none and d-block classes
    if (profileUpdateContainer.classList.contains('d-none')) {
      profileUpdateContainer.classList.remove('d-none');
      profileUpdateContainer.classList.add('d-block');
    } else {
      profileUpdateContainer.classList.remove('d-block');
      profileUpdateContainer.classList.add('d-none');
    }
  });
