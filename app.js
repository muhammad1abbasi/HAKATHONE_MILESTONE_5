var formElement = document.getElementById('Resumeform');
formElement === null || formElement === void 0 ? void 0 : formElement.addEventListener('submit', function (event) {
    var _a;
    event.preventDefault();
    var profilePictureInput = document.getElementById("profilePicture");
    var nameElement = document.getElementById('name');
    var emailElement = document.getElementById('email');
    var phoneElement = document.getElementById('phone');
    var educationElement = document.getElementById('education');
    var experienceElement = document.getElementById('experience');
    var skillsElement = document.getElementById('skills');
    var usernameElement = document.getElementById("username");
    if (profilePictureInput && nameElement && emailElement && phoneElement && educationElement && experienceElement && skillsElement && usernameElement) {
        var name_1 = nameElement.value;
        var email = emailElement.value;
        var phone = phoneElement.value;
        var education = educationElement.value;
        var experience = experienceElement.value;
        var skills = skillsElement.value;
        var username = usernameElement.value;
     
        var uniquePath = "resumes/".concat(username.replace(/\s+/g, '_'), "_cv.html");
     
        var profilePictureFile = (_a = profilePictureInput.files) === null || _a === void 0 ? void 0 : _a[0];
        var profilePictureURL = profilePictureFile ? URL.createObjectURL(profilePictureFile) : "";
        var resumeOutput = "\n            <h2>Resume</h2>\n            ".concat(profilePictureURL ? "<img src=\"".concat(profilePictureURL, "\" alt=\"Profile Picture\" class=\"profilePicture\">") : "", "\n            <p><strong>Name:</strong> <span id=\"edit-name\" class=\"editable\">").concat(name_1, "</span></p>\n            <p><strong>Email:</strong> <span id=\"edit-email\" class=\"editable\">").concat(email, "</span></p>\n            <p><strong>Phone:</strong> <span id=\"edit-phone\" class=\"editable\">").concat(phone, "</span></p>\n            <h3>Education</h3>\n            <p id=\"edit-education\" class=\"editable\">").concat(education, "</p>\n            <h3>Experience</h3>\n            <p id=\"edit-experience\" class=\"editable\">").concat(experience, "</p>\n            <h3>Skills</h3>\n            <p id=\"edit-skills\" class=\"editable\">").concat(skills, "</p>\n        ");
        // Adding download link for the resume
        var downloadLink = document.createElement('a');
        downloadLink.href = 'data:text/html;charset=utf-8,' + encodeURIComponent("\n            <html>\n                <head>\n                    <link rel=\"stylesheet\" href=\"style.css\">\n                </head>\n                <body>".concat(resumeOutput, "</body>\n            </html>\n        "));
        downloadLink.download = uniquePath;
        downloadLink.textContent = 'Download Your 2024 Resume';
        // Output resume content to the page
        var resumeOutputElement_1 = document.getElementById('resumeOutput');
        if (resumeOutputElement_1) {
            resumeOutputElement_1.innerHTML = resumeOutput;
            resumeOutputElement_1.appendChild(downloadLink);
            makeEditable();
        }
    }
    else {
        console.error('One or more form elements are missing');
    }
});
// Make text editable on click
function makeEditable() {
    var editableElements = document.querySelectorAll(".editable");
    editableElements.forEach(function (element) {
        element.addEventListener('click', function () {
            var _a;
            var currentElement = element;
            var currentValue = currentElement.textContent || "";
            var input = document.createElement('input');
            input.type = "text";
            input.value = currentValue;
            input.classList.add('editing-input');
            currentElement.style.display = "none";
            (_a = currentElement.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(input, currentElement);
            input.focus();
        });
    });
}
// Profile picture preview before submission
var profilePictureInput = document.getElementById("profilePicture");
var preview = document.createElement('img');
profilePictureInput === null || profilePictureInput === void 0 ? void 0 : profilePictureInput.addEventListener('change', function () {
    var _a;
    var file = (_a = profilePictureInput.files) === null || _a === void 0 ? void 0 : _a[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var _a, _b;
            preview.src = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
            preview.classList.add('profilePicture');
            (_b = document.getElementById('resumeOutput')) === null || _b === void 0 ? void 0 : _b.appendChild(preview);
        };
        reader.readAsDataURL(file);
    }
});
// PDF Download Functionality
var downloadBtn = document.getElementById('downloadPdfBtn');
var resumeOutputElement = document.getElementById('resumeOutput');
if (downloadBtn && resumeOutputElement) {
    downloadBtn.addEventListener('click', function () {
        var options = {
            margin: 0.5,
            filename: 'resume.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
        };
        // Generate and download the PDF
        html2pdf().set(options).from(resumeOutputElement).save();
    });
}
