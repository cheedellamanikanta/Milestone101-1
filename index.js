document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM content loaded");
  
    let storedUserDetails = localStorage.getItem("users");
    let users = [];
  
    if (storedUserDetails) {
      console.log("User details found in local storage");
      let parsedData = JSON.parse(storedUserDetails);
      users = [...parsedData];
      displayUsersInTable(users);
    } else {
      console.log("No user details found in local storage");
    }
  });
  
  function displayError(message) {
    console.log("Displaying error:", message);
    errorContainer.textContent = message;
  }
  
  let form = document.getElementById("formData");
  let errorContainer = document.querySelector(".error-msg");
  let nameElement = document.getElementById("name");
  let emailElement = document.getElementById("email");
  let passwordElement = document.getElementById("password");
  let dobElement = document.getElementById("dob");
  let checkBoxElement = document.getElementById("agree");
  let tableBody = document.getElementById("tableBody");
  
  function isFieldEmpty(value) {
    console.log("Checking if field is empty:", value);
    return value === "";
  }
  
  function isInvalidAge(age) {
    console.log("Checking if age is invalid:", age);
    let currentDate = new Date();
    let userDob = new Date(age);
    let userAge = currentDate.getFullYear() - userDob.getFullYear();
    return userAge < 18 || userAge > 55;
  }
  
  function displayUsersInTable(users) {
    let tableContent = "";
    users.forEach(function (userDetails) {
      tableContent += `<tr>
        <td>${userDetails.name}</td>
        <td>${userDetails.email}</td>
        <td>${userDetails.password}</td>
        <td>${userDetails.dob}</td>
        <td>${userDetails.terms}</td>
      </tr>`;
    });
    tableBody.innerHTML = tableContent;
  }
  
  form.addEventListener("submit", function (event) {
    console.log("Form submission started");
  
    event.preventDefault();
  
    let userName = nameElement.value;
    let userEmail = emailElement.value;
    let userPassword = passwordElement.value;
    let userDob = dobElement.value;
    let acceptedTerms = checkBoxElement.checked;
  
    console.log("Form data captured:", {
      userName,
      userEmail,
      userPassword,
      userDob,
      acceptedTerms,
    });
  
    if (isFieldEmpty(userName) || isFieldEmpty(userEmail) || isFieldEmpty(userPassword) || isFieldEmpty(userDob)) {
      displayError("All fields are required");
      return;
    }
  
    if (isInvalidAge(userDob)) {
      displayError("Your age should be between 18 and 55");
      return;
    }
  
    displayError("");
  
    let user = {
      name: userName,
      email: userEmail,
      password: userPassword,
      dob: userDob,
      terms: acceptedTerms,
    };
  
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
  
    location.reload();
  });
  