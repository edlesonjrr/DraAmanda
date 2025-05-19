// Lógica do Carrossel
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    const slidesContainer = document.querySelector('.carousel-slides');
    let currentSlide = 0;

    // Verifica se os elementos existem
    if (!slides.length || !dots.length || !slidesContainer) {
        console.error('Erro: Elementos do carrossel não encontrados.');
        return;
    }

    // Força renderização inicial de todos os slides
    slides.forEach((slide, index) => {
        slide.style.opacity = '1';
        slide.style.visibility = 'visible';
    });

    // Função para atualizar o slide visível
    function updateSlide() {
        console.log(`Mudando para slide ${currentSlide}`); // Depuração
        const translateValue = -currentSlide * 33.333;
        slidesContainer.style.transform = `translateX(${translateValue}%)`;
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    // Botão "Próximo"
    const nextBtn = document.querySelector('.next');
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % slides.length;
            updateSlide();
        });
    }

    // Botão "Anterior"
    const prevBtn = document.querySelector('.prev');
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            updateSlide();
        });
    }

    // Clique nos indicadores (dots)
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateSlide();
        });
    });

    // Inicializa o carrossel
    updateSlide();

    // Auto-play (a cada 9 segundos)
    const autoPlay = setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlide();
    }, 9000);

    // Pausa o autoplay ao interagir
    slidesContainer.addEventListener('mouseenter', () => clearInterval(autoPlay));
});

// Lógica do Formulário
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Captura os valores dos campos
            const nome = document.querySelector('#nome').value.trim();
            const telefone = document.querySelector('#telefone').value.trim();
            const email = document.querySelector('#email').value.trim();
            const mensagem = document.querySelector('#mensagem').value.trim();

            // Validação básica
            if (!nome || !telefone || !email || !mensagem) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }

            // Validação de e-mail simples
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Por favor, insira um e-mail válido.');
                return;
            }

            // Formata a mensagem para o WhatsApp
            const mensagemFormatada = `*Nova Mensagem do Site - Dra. Amanda Maylla*\n\n` +
                                    `*Nome:* ${nome}\n` +
                                    `*Telefone:* ${telefone}\n` +
                                    `*E-mail:* ${email}\n` +
                                    `*Mensagem:* ${mensagem}`;

            // Codifica a mensagem para a URL
            const mensagemCodificada = encodeURIComponent(mensagemFormatada);

            // URL do WhatsApp
            const numeroWhatsApp = '5581988921935';
            const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensagemCodificada}`;

            // Tenta abrir o WhatsApp
            try {
                window.open(urlWhatsApp, '_blank');
                alert('Mensagem enviada com sucesso! Você será redirecionado para o WhatsApp.');
            } catch (error) {
                alert('Não foi possível abrir o WhatsApp. Por favor, instale o aplicativo ou entre em contato diretamente pelo número (81) 9 8892-1935.');
                console.error('Erro ao abrir WhatsApp:', error);
            }

            // Limpa o formulário
            form.reset();
        });
    }
});