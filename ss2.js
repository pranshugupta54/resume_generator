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
          Name: ${name} ,                           hio
          Phone: ${phone}
        `;
  
        resumeContent.innerHTML = resumeText;
  
        // Create a new jsPDF instance
        const doc = new jsPDF();
  
        // Set PDF styling
        doc.setFillColor(0); // Black background
        doc.setTextColor("E7B43A"); // Yellow text
  
        // Set the background color by drawing a filled rectangle
        doc.rect(0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight(), "F");
  
        // Add content to PDF
        doc.text(resumeText, 15, 15);
        // doc.text(resumeText, 15, 20);
        // doc.save("resume.pdf");
  
        // Generate Blob object from the PDF
        const pdfBlob = doc.output("blob");
  
        // Open the PDF in a new browser tab using Blob URL
        const blobUrl = URL.createObjectURL(pdfBlob);
        window.open(blobUrl);
  
        // Cleanup the Blob URL
        URL.revokeObjectURL(blobUrl);
      });
  
      inputForm.addEventListener("input", function() {
        const name = document.getElementById("name").value;
        const phone = document.getElementById("phone").value;
  
        const resumeText = `Namee: ${name}\nPhone: ${phone}`;
  
        resumeContent.innerHTML = resumeText;
      });
    });
  }
  