// Assuming you have a Resumeform element in your HTML
declare var html2pdf: any;
const formElement = document.getElementById('Resumeform') as HTMLFormElement | null;

formElement?.addEventListener('submit', (event: Event) => {
    event.preventDefault();
    
    const profilePictureInput = document.getElementById("profilePicture") as HTMLInputElement | null;
    const nameElement = document.getElementById('name') as HTMLInputElement | null;
    const emailElement = document.getElementById('email') as HTMLInputElement | null;
    const phoneElement = document.getElementById('phone') as HTMLInputElement | null;
    const educationElement = document.getElementById('education') as HTMLInputElement | null;
    const experienceElement = document.getElementById('experience') as HTMLInputElement | null;
    const skillsElement = document.getElementById('skills') as HTMLInputElement | null;
    const usernameElement = document.getElementById("username") as HTMLInputElement | null;

    if (profilePictureInput && nameElement && emailElement && phoneElement && educationElement && experienceElement && skillsElement && usernameElement) {
        const name = nameElement.value;
        const email = emailElement.value;
        const phone = phoneElement.value;
        const education = educationElement.value;
        const experience = experienceElement.value;
        const skills = skillsElement.value;
        const username = usernameElement.value;

        // Generate unique path for download
        const uniquePath = `resumes/${username.replace(/\s+/g, '_')}_cv.html`;

        // Handle profile picture
        const profilePictureFile = profilePictureInput.files?.[0];
        const profilePictureURL = profilePictureFile ? URL.createObjectURL(profilePictureFile) : "";

        const resumeOutput = `
            <h2>Resume</h2>
            ${profilePictureURL ? `<img src="${profilePictureURL}" alt="Profile Picture" class="profilePicture">` : ""}
            <p><strong>Name:</strong> <span id="edit-name" class="editable">${name}</span></p>
            <p><strong>Email:</strong> <span id="edit-email" class="editable">${email}</span></p>
            <p><strong>Phone:</strong> <span id="edit-phone" class="editable">${phone}</span></p>
            <h3>Education</h3>
            <p id="edit-education" class="editable">${education}</p>
            <h3>Experience</h3>
            <p id="edit-experience" class="editable">${experience}</p>
            <h3>Skills</h3>
            <p id="edit-skills" class="editable">${skills}</p>
        `;

        // Adding download link for the resume
        const downloadLink = document.createElement('a');
        downloadLink.href = 'data:text/html;charset=utf-8,' + encodeURIComponent(`
            <html>
                <head>
                    <link rel="stylesheet" href="style.css">
                </head>
                <body>${resumeOutput}</body>
            </html>
        `);
        downloadLink.download = uniquePath;
        downloadLink.textContent = 'Download Your 2024 Resume';

        // Output resume content to the page
        const resumeOutputElement = document.getElementById('resumeOutput');
        if (resumeOutputElement) {
            resumeOutputElement.innerHTML = resumeOutput;
            resumeOutputElement.appendChild(downloadLink);
            makeEditable();
        }
    } else {
        console.error('One or more form elements are missing');
    }
});

// Make text editable on click
function makeEditable() {
    const editableElements = document.querySelectorAll(".editable");
    editableElements.forEach((element) => {
        element.addEventListener('click', () => {
            const currentElement = element as HTMLElement;
            const currentValue = currentElement.textContent || "";
            const input = document.createElement('input');
            input.type = "text";
            input.value = currentValue;
            input.classList.add('editing-input');
            currentElement.style.display = "none";
            currentElement.parentNode?.insertBefore(input, currentElement);
            input.focus();
        });
    });
}

// Profile picture preview before submission
const profilePictureInput = document.getElementById("profilePicture") as HTMLInputElement | null;
const preview = document.createElement('img');

profilePictureInput?.addEventListener('change', () => {
    const file = profilePictureInput.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            preview.src = e.target?.result as string;
            preview.classList.add('profilePicture');
            document.getElementById('resumeOutput')?.appendChild(preview);
        };
        reader.readAsDataURL(file);
    }
});

// PDF Download Functionality
const downloadBtn = document.getElementById('downloadPdfBtn') as HTMLButtonElement | null;
const resumeOutputElement = document.getElementById('resumeOutput') as HTMLElement | null;

if (downloadBtn && resumeOutputElement) {
    downloadBtn.addEventListener('click', () => {
        const options = {
            margin: 0.5,
            filename: 'resume.pdf',
            image: { type: 'jpeg', quality: 1.0 },
            html2canvas: { scale: 3 },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
        };

        // Generate and download the PDF
        html2pdf().set(options).from(resumeOutputElement).save();
    });
}
