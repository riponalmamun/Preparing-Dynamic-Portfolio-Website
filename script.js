// Theme Toggle
document.getElementById("theme-toggle").addEventListener("click", function() {
  document.body.classList.toggle("dark-theme");
  localStorage.setItem("theme", document.body.classList.contains("dark-theme") ? "dark" : "light");
});

// Language Selector
document.getElementById("language-selector").addEventListener("change", function(event) {
  const selectedLanguage = event.target.value;
  alert(`Language changed to ${selectedLanguage}`);
});

// Toggle between Login and Sign Up Forms
document.getElementById("go-to-signup").addEventListener("click", function() {
  document.getElementById("login-form").style.display = "none";
  document.getElementById("signup-form").style.display = "block";
});

document.getElementById("go-to-login").addEventListener("click", function() {
  document.getElementById("signup-form").style.display = "none";
  document.getElementById("login-form").style.display = "block";
});

// Handle Login
document.getElementById("login").addEventListener("submit", function(event) {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (email && password) {
    alert("Logged in successfully!");
    document.getElementById("login-form").style.display = "none";
    document.getElementById("portfolio-form").style.display = "block";
    document.getElementById("home-btn").style.display = "inline-block";
    document.getElementById("logout-btn").style.display = "inline-block";
  } else {
    alert("Please enter valid credentials");
  }
});

// Handle Sign Up
document.getElementById("signup").addEventListener("submit", function(event) {
  event.preventDefault();
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  if (password === confirmPassword) {
    alert("Sign up successful!");
    document.getElementById("signup-form").style.display = "none";
    document.getElementById("portfolio-form").style.display = "block";
    document.getElementById("home-btn").style.display = "inline-block";
    document.getElementById("logout-btn").style.display = "inline-block";
  } else {
    alert("Passwords do not match.");
  }
});

// Handle Logout and Return to Home Page
document.getElementById("home-btn").addEventListener("click", function() {
  document.getElementById("portfolio-form").style.display = "none";
  document.getElementById("login-form").style.display = "block";
  document.getElementById("home-btn").style.display = "none";
  document.getElementById("logout-btn").style.display = "none";
});

// Handle Logout
document.getElementById("logout-btn").addEventListener("click", function() {
  document.getElementById("portfolio-form").reset();
  document.getElementById("portfolio-form").style.display = "none";
  document.getElementById("login-form").style.display = "block";
  document.getElementById("home-btn").style.display = "none";
  document.getElementById("logout-btn").style.display = "none";
  alert("Logged out successfully!");
});

// Handle Adding Work Experience
document.getElementById("add-work-experience").addEventListener("click", function() {
  const newSection = document.createElement("div");
  newSection.classList.add("work-experience-section");

  newSection.innerHTML = `
    <input type="text" placeholder="Company Name" required>
    <input type="text" placeholder="Job Duration (e.g., Jan 2020 - Dec 2022)" required>
    <textarea placeholder="Job Responsibilities" required></textarea>
    <button type="button" class="remove-section">Remove</button>
  `;

  document.getElementById("work-experience-container").appendChild(newSection);

  newSection.querySelector(".remove-section").addEventListener("click", function() {
    newSection.remove();
  });
});

// Handle Image Preview and File Upload
document.getElementById('photo').addEventListener('change', function(event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  
  reader.onloadend = function() {
    document.getElementById('image-preview').src = reader.result;
    window.uploadedImage = reader.result;  // Store base64 image globally for PDF
  };

  if (file) {
    reader.readAsDataURL(file);  // Convert the file to a data URL (base64)
  } else {
    document.getElementById('image-preview').src = '';  // Reset if no file is selected
  }
});

// Handle Portfolio Form Submission (Generate PDF)
document.getElementById("portfolio").addEventListener("submit", function(event) {
  event.preventDefault();

  // Collecting form data
  const fullName = document.getElementById("full-name").value;
  const contactInfo = document.getElementById("contact-info").value;
  const bio = document.getElementById("bio").value;
  const softSkills = document.getElementById("soft-skills").value;
  const technicalSkills = document.getElementById("technical-skills").value;
  const institute = document.getElementById("institute").value;
  const degree = document.getElementById("degree").value;
  const year = document.getElementById("year").value;
  const grade = document.getElementById("grade").value;
  const projects = document.getElementById("projects").value;

  // Get work experience data
  const workExperienceSections = document.querySelectorAll(".work-experience-section");
  let workExperienceData = '';
  workExperienceSections.forEach(section => {
    const companyName = section.querySelector("input[type='text']").value;
    const jobDuration = section.querySelector("input[type='text']:nth-child(2)").value;
    const jobResponsibilities = section.querySelector("textarea").value;
    workExperienceData += `Company: ${companyName}, Duration: ${jobDuration}, Responsibilities: ${jobResponsibilities}\n`;
  });

  // Generate PDF using jsPDF
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.text("Portfolio of " + fullName, 10, 10);
  doc.text("Contact Information: " + contactInfo, 10, 20);
  doc.text("Bio: " + bio, 10, 30);
  doc.text("Soft Skills: " + softSkills, 10, 40);
  doc.text("Technical Skills: " + technicalSkills, 10, 50);
  doc.text("Academic Background: " + institute + ", " + degree + ", " + year + ", " + grade, 10, 60);
  doc.text("Work Experience:\n" + workExperienceData, 10, 70);
  doc.text("Projects/Publications: " + projects, 10, 100);

  // Add the uploaded image to the PDF if available
  if (window.uploadedImage) {
    doc.addImage(window.uploadedImage, 'JPEG', 10, 120, 50, 50); // Parameters: Image, Format, X, Y, Width, Height
  }

  // Save the PDF
  doc.save("portfolio.pdf");

  alert("Portfolio generated and downloaded successfully!");
});
