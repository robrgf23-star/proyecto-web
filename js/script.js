// Funcionalidades avanzadas para el sitio web
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll para navegación
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Resaltar código al hacer clic
    const codeBlocks = document.querySelectorAll('pre code');
    
    codeBlocks.forEach(block => {
        block.addEventListener('click', function() {
            const selection = window.getSelection();
            const range = document.createRange();
            range.selectNodeContents(this);
            selection.removeAllRanges();
            selection.addRange(range);
            
            // Mostrar mensaje de copiado
            try {
                document.execCommand('copy');
                showNotification('Código copiado al portapapeles!', 'success');
            } catch (err) {
                showNotification('Error al copiar el código', 'error');
            }
            
            selection.removeAllRanges();
        });
    });

    // Navegación activa
    function updateActiveNav() {
        const sections = document.querySelectorAll('.content-section');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && 
                window.scrollY < sectionTop + sectionHeight) {
                currentSection = '#' + section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentSection) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);

    // Efecto de aparición suave
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Aplicar efectos a las secciones
    document.querySelectorAll('.content-section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Función para mostrar notificaciones
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 1rem 2rem;
            background: ${type === 'success' ? '#27ae60' : '#e74c3c'};
            color: white;
            border-radius: 5px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Demo interactivo de JSON
    const createJSONDemo = () => {
        const demoSection = document.createElement('div');
        demoSection.innerHTML = `
            <div class="section-info">
                <h3>Demo Interactivo: JSON en Acción</h3>
                <div class="demo-container" style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin: 2rem 0;">
                    <div>
                        <h4>Objeto JavaScript</h4>
                        <textarea id="jsInput" style="width: 100%; height: 200px; padding: 1rem; border: 1px solid #ddd; border-radius: 5px; font-family: 'Fira Code', monospace;" placeholder='Escribe tu objeto JavaScript aquí...'></textarea>
                        <button onclick="convertToJSON()" class="btn btn-primary" style="margin-top: 1rem;">Convertir a JSON</button>
                    </div>
                    <div>
                        <h4>JSON Resultante</h4>
                        <pre id="jsonOutput" style="height: 200px; background: #2c3e50; color: white; padding: 1rem; border-radius: 5px; overflow: auto;"></pre>
                        <button onclick="copyJSON()" class="btn btn-secondary" style="margin-top: 1rem;">Copiar JSON</button>
                    </div>
                </div>
            </div>
        `;
        
        document.querySelector('#json').querySelector('article').appendChild(demoSection);
    };

    // Agregar el demo a la sección JSON
    createJSONDemo();

    // Mensaje de consola
    console.log('¡Bienvenido a la guía completa de XML y JSON!');
    console.log('Puedes usar las funciones convertToJSON() y copyJSON() en la consola.');
});

// Funciones globales para el demo
function convertToJSON() {
    const jsInput = document.getElementById('jsInput').value;
    const jsonOutput = document.getElementById('jsonOutput');
    
    try {
        // Evaluar el input como objeto JavaScript
        const jsObject = eval(`(${jsInput})`);
        const jsonString = JSON.stringify(jsObject, null, 2);
        jsonOutput.textContent = jsonString;
        showNotification('Conversión exitosa!', 'success');
    } catch (error) {
        jsonOutput.textContent = 'Error: ' + error.message;
        showNotification('Error en la conversión', 'error');
    }
}

function copyJSON() {
    const jsonOutput = document.getElementById('jsonOutput');
    const textArea = document.createElement('textarea');
    textArea.value = jsonOutput.textContent;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    showNotification('JSON copiado al portapapeles!', 'success');
}