// Define function for DOM Content Loaded event
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form') as HTMLFormElement;
    const resumeOutput = document.getElementById('resume-output') as HTMLDivElement;
    const profilePicInput = document.getElementById('profilePic') as HTMLInputElement;

    // Add event listener for form submission
    form.addEventListener('submit', (event: Event) => {
        event.preventDefault(); // Prevent the form from submitting traditionally

        // Get the form data
        const name = (document.getElementById('name') as HTMLInputElement).value;
        const email = (document.getElementById('email') as HTMLInputElement).value;
        const phone = (document.getElementById('phone') as HTMLInputElement).value;
        const education = (document.getElementById('education') as HTMLTextAreaElement).value;
        const experience = (document.getElementById('experience') as HTMLTextAreaElement).value;
        const skills = (document.getElementById('skills') as HTMLTextAreaElement).value;

        // Check if a profile picture has been uploaded
        const profilePicFile = profilePicInput.files?.[0];
        let profilePicURL = '';

        if (profilePicFile) {
            // Create a FileReader to read the uploaded image and convert it to a URL
            const reader = new FileReader();
            reader.onload = (e: ProgressEvent<FileReader>) => {
                if (e.target && e.target.result) {
                    profilePicURL = e.target.result as string;
                    generateResume(profilePicURL);
                }
            };
            reader.readAsDataURL(profilePicFile); // Convert image to data URL
        } else {
            // No image selected, just generate the resume without the profile picture
            generateResume('');
        }

        // Function to generate the resume dynamically
        function generateResume(imageURL: string): void {
            let imageHTML = '';
            if (imageURL) {
               
                imageHTML = `<img src="${imageURL}" alt="Profile Picture" style="width:150px;height:150px;border-radius:50%;"><br><br>`;
               
            }

            // Generate the dynamic resume
            const resumeHTML = `
                ${imageHTML}
                <h2> <span id="edit-name" class="editable">${name}</span></h2>
                <p><strong>Email:</strong><span id="edit-edit" class="editable"> ${email}</span></p>
                <p><strong>Phone:</strong> <span id="edit-phon" class="editable">${phone}</span></p>

                <h3>Education</h3>
                <p id="edit-education" class="editable">${education}</p>

                <h3>Experience</h3>
                <p id="edit-experience" class="editable">${experience}</p>

                <h3>Skills</h3>
                <p id="edit-skills" class="editable">${skills}</p>
            `;

            // Clear the previous resume and insert the new one
            resumeOutput.innerHTML = resumeHTML;
            makeEditable();
            
            // Enable editable fields with a click event
            
        }
    });
});
function makeEditable(){
    const editableElements = document.querySelectorAll('editable');
    
        editableElements.forEach(element =>{
            element.addEventListener(`click`,function(){
                const currentElement = element as HTMLElement;
                const currentValue=currentElement.textContent || "" ;
                // if(customElements.getName ==="p" || customElements.getName ==="span")
                
                    {
                    const input = document.createElement("input") 
                    input.type = "text";
                    input.value = currentValue;
                    input.classList.add(`editing-input`)
                    input.addEventListener(`blur`,function(){
                        currentElement.textContent= input.value;
                        currentElement.style.display="inline"
                        input.remove();
                    })
                    currentElement.style.display = `none`
                    currentElement.parentNode?.insertBefore(input, currentElement)
                    input.focus

                }
            
           
            });
        });
    }    
 
