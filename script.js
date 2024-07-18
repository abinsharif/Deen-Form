// Form builder variables
let formBuilderContainer = document.getElementById('form-builder-container');
let createFormBtn = document.getElementById('create-form-btn');
let loadFormBtn = document.getElementById('load-form-btn');
let createFormModal = document.getElementById('create-form-modal');
let loadFormModal = document.getElementById('load-form-modal');
let formElements = [];

// Create form modal events
createFormBtn.addEventListener('click', () => {
    createFormModal.style.display = 'block';
});

createFormBtn.addEventListener('click', () => {
    createFormModal.classList.add('show');
  });
  
  loadFormBtn.addEventListener('click', () => {
    loadFormModal.classList.add('show');
  });

document.getElementById('create-form-submit').addEventListener('click', (e) => {
    e.preventDefault(); // Prevent default form submission
    let formName = document.getElementById('form-name').value;
    let formDescription = document.getElementById('form-description').value;
    createForm(formName, formDescription);
    createFormModal.style.display = 'none';
});

// Load form modal events
loadFormBtn.addEventListener('click', () => {
    loadFormModal.style.display = 'block';
});

document.getElementById('load-form-submit').addEventListener('click', (e) => {
    e.preventDefault(); // Prevent default form submission
    let formId = document.getElementById('form-id').value;
    loadForm(formId);
    loadFormModal.style.display = 'none';
});

//... rest of the code remains the same...
// Create form function
function createForm(formName, formDescription) {
    let form = {
        id: generateUUID(),
        name: formName,
        description: formDescription,
        elements: []
    };
    formElements.push(form);
    renderFormBuilder(form);
}

// Load form function
function loadForm(formId) {
    let form = formElements.find((form) => form.id === formId);
    if (form) {
        renderFormBuilder(form);
    } else {
        alert('Form not found!');
    }
}

// Render form builder function
function renderFormBuilder(form) {
    formBuilderContainer.innerHTML = '';
    let formPreview = document.createElement('div');
    formPreview.className = 'form-builder-preview';
    formBuilderContainer.appendChild(formPreview);
    let formElementsContainer = document.createElement('div');
    formBuilderContainer.appendChild(formElementsContainer);
    form.elements.forEach((element) => {
        let elementHTML = getElementHTML(element);
        formElementsContainer.innerHTML += elementHTML;
    });
    let addElementBtn = document.createElement('button');
    addElementBtn.className = 'btn btn-primary';
    addElementBtn.textContent = 'Add Element';
    addElementBtn.addEventListener('click', () => {
        addElement(form);
    });
    formBuilderContainer.appendChild(addElementBtn);
}

// Add element function
function addElement(form) {
    let elementType = prompt('Enter element type (text, textarea, checkbox, select)');
    let element = {
        type: elementType,
        label: '',
        value: ''
    };
    form.elements.push(element);
    renderFormBuilder(form);
}

// Get element HTML function
function getElementHTML(element) {
    let html = '';
    switch (element.type) {
        case 'text':
            html = `
                <div class="form-builder-element">
                    <label>${element.label}</label>
                    <input type="text" value="${element.value}">
                    <button type="button" class="form-builder-element-remove">Remove</button>
                </div>
            `;
            break;
        case 'textarea':
            html = `
                <div class="form-builder-element">
                    <label>${element.label}</label>
                    <textarea>${element.value}</textarea>
                    <button type="button" class="form-builder-element-remove">Remove</button>
                </div>
            `;
            break;
        case 'checkbox':
            html = `
                <div class="form-builder-element">
                    <label>${element.label}</label>
                    <input type="checkbox" ${element.value? 'checked' : ''}>
                    <button type="button" class="form-builder-element-remove">Remove</button>
                </div>
            `;
            break;
        case 'elect':
            html = `
                <div class="form-builder-element">
                    <label>${element.label}</label>
                    <select>
                        <option value="">Select an option</option>
                        ${element.value? `<option value="${element.value}" selected>${element.value}</option>` : ''}
                    </select>
                    <button type="button" class="form-builder-element-remove">Remove</button>
                </div>
            `;
            break;
        default:
            html = `
                <div class="form-builder-element">
                    <label>${element.label}</label>
                    <input type="text" value="${element.value}">
                    <button type="button" class="form-builder-element-remove">Remove</button>
                </div>
            `;
    }
    return html;
}

// Generate UUID function
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x'? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// Form element remove event
formBuilderContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('form-builder-element-remove')) {
        let element = e.target.parentNode;
        let form = formElements.find((form) => form.elements.includes(element));
        if (form) {
            let index = form.elements.indexOf(element);
            form.elements.splice(index, 1);
            renderFormBuilder(form);
        }
    }
});

// Form element label change event
formBuilderContainer.addEventListener('change', (e) => {
    if (e.target.tagName === 'LABEL') {
        let element = e.target.parentNode;
        let form = formElements.find((form) => form.elements.includes(element));
        if (form) {
            let index = form.elements.indexOf(element);
            form.elements[index].label = e.target.textContent;
        }
    }
});

// Form element value change event
formBuilderContainer.addEventListener('change', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') {
        let element = e.target.parentNode;
        let form = formElements.find((form) => form.elements.includes(element));
        if (form) {
            let index = form.elements.indexOf(element);
            form.elements[index].value = e.target.value;
        }
    }
});