
function initializeApp() {
    window.jsPDF = window.jspdf.jsPDF;
  document.addEventListener("DOMContentLoaded", function() {
    const resumeContent = document.getElementById("resume-content");
    const downloadButton = document.getElementById("download-button");
    const inputForm = document.getElementById("input-form");

    downloadButton.addEventListener("click", function() {
      const name = document.getElementById("name").value;
      const phone = document.getElementById("phone").value;

      const resumeText = `
        Name: ${name}
        Phone: ${phone}
      `;

      resumeContent.innerText = resumeText;

      // Create a new jsPDF instance
      const doc = new jsPDF();

      // Set PDF styling
      doc.setFillColor(0, 0, 0); // Black background
      doc.setTextColor(255, 255, 0); // Yellow text

      // Set the background color by drawing a filled rectangle
      doc.rect(0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight(), "F");

      // Add content to PDF
      doc.text(resumeText, 15, 15);

      // Save the PDF file
      doc.save("resume.pdf");
    });

    inputForm.addEventListener("input", function() {
      const name = document.getElementById("name").value;
      const phone = document.getElementById("phone").value;

      const resumeText = `Name: ${name}\nPhone: ${phone}`;

      resumeContent.innerText = resumeText;
    });
  });
}
