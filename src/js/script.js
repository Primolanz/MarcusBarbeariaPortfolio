// Inicializar Lucide Icons
        if (window.lucide) {
            lucide.createIcons();
        }

        // Controlar Menu Mobile
        const menuBtn = document.getElementById('menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileLinks = document.querySelectorAll('.mobile-link');

        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('flex');
        });

        // Fechar menu mobile ao clicar em um link
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('flex');
            });
        });

        // Efeito Header Sticky com Scroll
        const navbar = document.getElementById('navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('py-4', 'bg-brand-black');
                navbar.classList.remove('py-6', 'bg-brand-black/80');
            } else {
                navbar.classList.add('py-6', 'bg-brand-black/80');
                navbar.classList.remove('py-4', 'bg-brand-black');
            }
        });

        // Gaveta de serviços
        const servicesList = document.getElementById('services-list');
        const toggleServicesBtn = document.getElementById('toggle-services');

        if (servicesList && toggleServicesBtn) {
            const extraServices = Array.from(servicesList.children).slice(4);
            const toggleServicesText = toggleServicesBtn.querySelector('span');
            const toggleServicesIcon = toggleServicesBtn.querySelector('svg, [data-lucide]');
            let servicesExpanded = false;

            function updateServicesDrawer() {
                extraServices.forEach(service => {
                    service.classList.toggle('hidden', !servicesExpanded);
                });

                toggleServicesText.textContent = servicesExpanded ? 'Mostrar menos serviços' : 'Mostrar mais serviços';

                if (toggleServicesIcon) {
                    toggleServicesIcon.classList.toggle('rotate-180', servicesExpanded);
                }
            }

            toggleServicesBtn.addEventListener('click', () => {
                servicesExpanded = !servicesExpanded;
                updateServicesDrawer();
            });

            updateServicesDrawer();
        }

        // Filtragem Interativa da Galeria de Trabalhos
        function filterGallery(category) {
            const items = document.querySelectorAll('.gallery-item');
            const tabs = document.querySelectorAll('.gallery-tab');

            // Resetar botões ativos
            tabs.forEach(tab => {
                tab.classList.remove('bg-brand-red', 'text-white');
                tab.classList.add('text-gray-400', 'hover:text-white');
            });

            // Adicionar ativo ao atual
            const activeTab = document.getElementById(`tab-${category}`);
            if (activeTab) {
                activeTab.classList.remove('text-gray-400', 'hover:text-white');
                activeTab.classList.add('bg-brand-red', 'text-white');
            }

            // Filtrar itens com animação suave
            items.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                if (category === 'todos' || itemCategory === category) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        }

        // Envio do Formulário de Agendamento Dinâmico para o WhatsApp
        function sendWhatsApp(event) {
            event.preventDefault();

            const name = document.getElementById('name').value;
            const service = document.getElementById('service').value;

            // Número fictício para o WhatsApp (Substitua pelo seu número real, apenas dígitos com DDI e DDD)
            const phoneNumber = "5514991075564";

            // Montar mensagem amigável e profissional
            const message = `Olá! Gostaria de agendar um horário.%0A%0A` +
                `*Nome:* ${name}%0A` +
                `*Serviço:* ${service}%0A` +
                `*Quais datas e horários estão disponíveis?*%0A%0A` +
                `_Enviado através do site Marcus Ortensi._`;

            // Gerar link da API do WhatsApp
            const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;

            // Abrir em uma nova aba
            window.open(whatsappUrl, '_blank');
        }