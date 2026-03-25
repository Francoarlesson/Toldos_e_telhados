document.addEventListener('DOMContentLoaded', function () {
    // Scroll suave para âncoras
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Destaque do menu ativo durante scroll
    var sections = document.querySelectorAll('section[id]');
    var links = document.querySelectorAll('nav a');

    function atualizarMenu() {
        var offset = window.innerHeight * 0.35;
        sections.forEach(function (sec) {
            var top = sec.getBoundingClientRect().top;
            var id = sec.getAttribute('id');
            var link = document.querySelector('nav a[href="#' + id + '"]');
            if (link) {
                if (top <= offset && top >= -offset) {
                    link.classList.add('ativo');
                } else {
                    link.classList.remove('ativo');
                }
            }
        });
    }

    window.addEventListener('scroll', atualizarMenu);
    atualizarMenu();

    // Voltar ao topo com botão
    var btnTop = document.createElement('button');
    btnTop.textContent = '↑';
    btnTop.id = 'btn-voltar-topo';
    btnTop.title = 'Voltar ao topo';
    document.body.appendChild(btnTop);

    btnTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', function () {
        btnTop.style.display = window.scrollY > 320 ? 'block' : 'none';
    });

    // Validação simples de formulário
    var form = document.querySelector('#contato form');
    if (form) {
        form.addEventListener('submit', function (e) {
            var nome = form.querySelector('#nome').value.trim();
            var email = form.querySelector('#email').value.trim();

            if (!nome || !email) {
                e.preventDefault();
                alert('Por favor, preencha os campos Nome e E-mail antes de enviar.');
                return;
            }

            alert('Obrigado! Sua solicitação foi enviada com sucesso.');
        });
    }

    // Animação de entrada das seções
    var observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(function (section) {
        observer.observe(section);
    });

    // Efeito de hover nos cards de serviço
    document.querySelectorAll('.servico-item').forEach(function (item) {
        item.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        item.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});
