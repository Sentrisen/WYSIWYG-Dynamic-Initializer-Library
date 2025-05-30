// Contatore per generare ID univoci per gli editor WYSIWYG
let wysiwygIdCounter = 1;

// Carica dinamicamente un file CSS e restituisce una Promise
function loadCss(href) { 
  return new Promise((resolve, reject) => {
    // Evita di caricare lo stesso CSS più volte
    if (document.querySelector(`link[href="${href}"]`)) {
      resolve();
      return;
    }
// Crea e aggiunge un nuovo elemento <link> per l'importazione del CSS di Trumbowyg, e può essere utilizzato anche per editor simili
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.onload = () => resolve(); // Risolvi quando il CSS è caricato
    link.onerror = () => reject(new Error(`Impossibile caricare il CSS: ${href}`));
    document.head.appendChild(link);
  });
}

// Inizializza un editor WYSIWYG specifico su un elemento
async function initwysiwyg(element, service) {
    switch(service){
        case 'Trumbowyg':
            // Carica jQuery e Trumbowyg
            await import("https://code.jquery.com/jquery-3.6.0.min.js");
            await loadCss('https://cdn.jsdelivr.net/npm/trumbowyg@2.27.3/dist/ui/trumbowyg.min.css');
            await import("https://cdn.jsdelivr.net/npm/trumbowyg@2.27.3/dist/trumbowyg.min.js");

            // Configura il percorso delle icone SVG
            $.trumbowyg.svgPath = 'https://cdn.jsdelivr.net/npm/trumbowyg@2.27.3/dist/ui/icons.svg';

            // Inizializza l’editor e rileva la perdita di focus
            $(element).trumbowyg().on('tbwblur', function () {
                element.dispatchEvent(new Event('change'));
            });
            break;

        case 'CKEditor':
            // Carica CKEditor
            await import("https://cdn.ckeditor.com/ckeditor5/39.0.1/classic/ckeditor.js");

            // Inizializza CKEditor
            ClassicEditor.create(element)
                .then(editor => {
                    // Aggiorna il valore al blur
                    editor.editing.view.document.on('blur', () => {
                        element.value = editor.getData();
                        element.dispatchEvent(new Event('change'));
                    });
                })
                .catch(error => {
                    console.error('Errore con CKEditor:', error);
                });
            break;

        default:
            // Caso predefinito: utilizza Trumbowyg come fallback
            await import("https://code.jquery.com/jquery-3.6.0.min.js");
            await loadCss('https://cdn.jsdelivr.net/npm/trumbowyg@2.27.3/dist/ui/trumbowyg.min.css');
            await import("https://cdn.jsdelivr.net/npm/trumbowyg@2.27.3/dist/trumbowyg.min.js");
            $.trumbowyg.svgPath = 'https://cdn.jsdelivr.net/npm/trumbowyg@2.27.3/dist/ui/icons.svg';
            $(element).trumbowyg().on('tbwblur', function () {
                element.dispatchEvent(new Event('change'));
            });
            break;
    }
}

// Inizializza tutti gli editor WYSIWYG corrispondenti al selettore
function init_wysiwyg_all(select, service){
    const elements = document.querySelectorAll(`${select}`);
    for(const element of elements){
        // Assegna un ID se manca
        if (!element.id) {
            element.id = `wysiwyg-${wysiwygIdCounter++}`;
        }
        initwysiwyg(element, service);
    }
}

// Inizializza gli editor WYSIWYG solo quando diventano visibili (lazy loading)
function init_wysiwyg_load_lazy(select, service){
    const elements = document.querySelectorAll(select);
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry =>{
            if(entry.isIntersecting){
                const element = entry.target;
                // Evita la doppia inizializzazione
                if (!element.classList.contains('wysiwyg-initialized')) {
                    if (!element.id) {
                        element.id = `wysiwyg-${wysiwygIdCounter++}`;
                    }
                    initwysiwyg(element, service);
                    element.classList.add('wysiwyg-initialized');
                    observer.unobserve(element); // Interrompi l’osservazione
                }
            }
        });
    }, {
        rootMargin: '200px 0px' // Precarica quando si avvicina alla vista
    });

    elements.forEach(element => {
        observer.observe(element);
    });
}

// Mostra un messaggio e un link alla documentazione dell’editor scelto
function wysiwyginfo(service){
    switch(service){
        case 'Trumbowyg':
            alert('Vai alla console per ottenere il link alla documentazione di Trumbowyg.');
            console.log('Documentazione Trumbowyg:', 'https://alex-d.github.io/Trumbowyg/documentation/');
            break;
        case 'CKEditor':
            alert('Vai alla console per ottenere il link alla documentazione di CKEditor.');
            console.log('Documentazione CKEditor:', 'https://ckeditor.com/docs/ckeditor5/latest/index.html');
            break;
        default:
            alert('Nessun editor WYSIWYG selezionato.');
            break;
    }
}

// Registra nel log ogni cambiamento nei <textarea> per il tracciamento
function wysiwygchangelogger(service){
    document.querySelectorAll('textarea').forEach(textarea => {
        textarea.addEventListener('change', (e) => {
            console.log('Editor:', service, `\n ID della textarea: ${textarea.id}`, '\n Value:', textarea.value);
        });
    });
}
