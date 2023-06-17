const templateURL = "template.json";

function loadJSON(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.overrideMimeType("application/json");
  xhr.open("GET", url, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      callback(JSON.parse(xhr.responseText));
    }
  };
  xhr.send(null);
}

function loadPdfMake(callback) {
  if (typeof pdfMake !== "undefined") {
    // pdfMake is already loaded
    callback();
  } else {
    // Load pdfMake dynamically
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/pdfmake.min.js";
    script.onload = function () {
      const vfsScript = document.createElement("script");
      vfsScript.src = "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/vfs_fonts.js";
      vfsScript.onload = callback;
      document.body.appendChild(vfsScript);
    };
    document.body.appendChild(script);
  }
}

function updatePreview() {
  const name = document.getElementById("name").value || "";
  const email = document.getElementById("email").value || "";
  const phone = document.getElementById("phone").value || "";

  loadJSON(templateURL, function (template) {
    const resumeTemplate = JSON.parse(JSON.stringify(template)); // Deep copy of template
    updateResumeData(resumeTemplate, name, email, phone);

    const resumePreview = document.getElementById("resume-preview");
    resumePreview.innerHTML = "";
    loadPdfMake(function () {
      pdfMake.createPdf(resumeTemplate).getDataUrl((dataUrl) => {
        const iframe = document.createElement("iframe");
        iframe.src = dataUrl;
        iframe.width = "100%";
        iframe.height = "500px";
        resumePreview.appendChild(iframe);
      });
    });
  });
}

function updateResumeData(resume, name, email, phone) {
  resume.content.forEach((item) => {
    if (item.columns && item.columns.length > 0) {
      item.columns.forEach((column) => {
        if (column.text && Array.isArray(column.text)) {
          column.text.forEach((textItem) => {
            if (textItem.text === "Name: ") {
              textItem.text += name;
            } else if (textItem.text === "Email: ") {
              textItem.text += email;
            } else if (textItem.text === "Phone: ") {
              textItem.text += phone;
            }
          });
        }
      });
    }
  });
}

function generatePDF() {
  const name = document.getElementById("name").value || "";
  const email = document.getElementById("email").value || "";
  const phone = document.getElementById("phone").value || "";

  loadJSON(templateURL, function (template) {
    const resumeTemplate = JSON.parse(JSON.stringify(template)); // Deep copy of template
    updateResumeData(resumeTemplate, name, email, phone);
    loadPdfMake(function () {
      pdfMake.createPdf(resumeTemplate).download("resume.pdf");
    });
  });
}

function openPDF() {
  const name = document.getElementById("name").value || "";
  const email = document.getElementById("email").value || "";
  const phone = document.getElementById("phone").value || "";

  loadJSON(templateURL, function (template) {
    const resumeTemplate = JSON.parse(JSON.stringify(template)); // Deep copy of template
    updateResumeData(resumeTemplate, name, email, phone);
    loadPdfMake(function () {
      pdfMake.createPdf(resumeTemplate).getDataUrl((dataUrl) => {
        const newTab = window.open();
        newTab.document.write('<iframe src="' + dataUrl + '" width="100%" height="100%"></iframe>');
      });
    });
  });
}

// Add event listeners to update the preview on input change
document.getElementById("name").addEventListener("input", updatePreview);
document.getElementById("email").addEventListener("input", updatePreview);
document.getElementById("phone").addEventListener("input", updatePreview);
// Add event listeners for more input fields as needed

// Initial preview update
updatePreview();
