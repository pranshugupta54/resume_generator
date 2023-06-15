document.addEventListener("DOMContentLoaded", function() {
    const resumeContent = document.getElementById("resume-content");
    const downloadButton = document.getElementById("download-button");
    const inputForm = document.getElementById("input-form");
  
    downloadButton.addEventListener("click", function() {
      const doc = new jsPDF();
      doc.setFillColor(0, 0, 0); // Set fill color to black
      doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, "F"); // Fill the entire page with black color
      doc.fromHTML(resumeContent.innerHTML, 15, 15, {
        width: 170
      });
      doc.save("resume.pdf");
    });
  
    inputForm.addEventListener("input", function() {
      const name = document.getElementById("name").value;
      const phone = document.getElementById("phone").value;
  
      const resumeText = `<div style="color: yellow;">
        <p>Name: ${name}</p>
        <p>Phone: ${phone}</p>
      </div>`;
  
      resumeContent.innerHTML = resumeText;
    });
  });
  