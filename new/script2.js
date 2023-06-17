let template = null;
let resumeData = null;

// Load the template from template.json file
function loadTemplate() {
  fetch('template2.json')
    .then(response => response.json())
    .then(data => {
      template = data;
      updatePreview();
    })
    .catch(error => {
      console.error('Error loading template:', error);
    });
}

// Update the resume preview with the latest data
function updatePreview() {
  if (!template) {
    return;
  }

  resumeData = {
    name: document.getElementById('name').value,
    phone: document.getElementById('phone').value,
    email: document.getElementById('email').value,
    education: document.getElementById('education').value.split('\n'),
    workExp: document.getElementById('work-exp').value.split('\n'),
    skills: document.getElementById('skills').value.split('\n')
  };

  const content = fillTemplateWithData(template.content, resumeData);
  renderPreview(content);
}

// Fill the template with data from the input fields
function fillTemplateWithData(content, data) {
  if (!content) {
    return null;
  }

  const filledContent = JSON.parse(JSON.stringify(content));

  filledContent.forEach(item => {
    if (item.hasOwnProperty('text') && Array.isArray(item.text)) {
      item.text.forEach(textItem => {
        if (textItem.hasOwnProperty('text') && textItem.hasOwnProperty('bold')) {
          const fieldId = textItem.text;
          if (data.hasOwnProperty(fieldId)) {
            textItem.text = data[fieldId];
          }
        }
      });
    }

    if (item.hasOwnProperty('ul') && Array.isArray(item.ul) && item.hasOwnProperty('id')) {
      const fieldId = item.id;
      if (data.hasOwnProperty(fieldId) && Array.isArray(data[fieldId])) {
        item.ul = data[fieldId].map(item => ({ text: item }));
      }
    }
  });

  return filledContent;
}

// Render the preview with the filled template content
function renderPreview(content) {
  const previewContainer = document.getElementById('resume-preview');
  previewContainer.innerHTML = '';

  if (content) {
    pdfMake.createPdf({ content }).getDataUrl(dataUrl => {
      const iframe = document.createElement('iframe');
      iframe.src = dataUrl;
      iframe.width = '100%';
      iframe.height = '500px';
      previewContainer.appendChild(iframe);
    });
  }
}

// Generate the PDF and download it
function generatePDF() {
  if (!template || !resumeData) {
    return;
  }

  const filledContent = fillTemplateWithData(template.content, resumeData);

  if (filledContent) {
    const pdfDocGenerator = pdfMake.createPdf({ content: filledContent });
    pdfDocGenerator.download('resume.pdf');
  }
}

// Open the PDF in a new tab
function openPDF() {
  if (!template || !resumeData) {
    return;
  }

  const filledContent = fillTemplateWithData(template.content, resumeData);

  if (filledContent) {
    const pdfDocGenerator = pdfMake.createPdf({ content: filledContent });
    pdfDocGenerator.open();
  }
}

// Load the template on page load
window.onload = loadTemplate;
