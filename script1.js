document.addEventListener("DOMContentLoaded", function() {
    const resumeContent = document.getElementById("resume-content");
    const downloadButton = document.getElementById("download-button");
    const inputForm = document.getElementById("input-form");
  
    downloadButton.addEventListener("click", function() {
      const doc = new jsPDF();
      doc.fromHTML(resumeContent.innerHTML, 15, 15, {
        width: 170
      });
      doc.save("resume.pdf");
    });
  
    inputForm.addEventListener("input", function() {
      const name = document.getElementById("name").value;
      const phone = document.getElementById("phone").value;
  
      const resumeText = `Name: ${name}<br>Phone: ${phone}`;
  
      resumeContent.innerHTML = resumeText;
    });
  });
  