// Sistema de notícias e concursos - Versão Estável
console.log('Sistema iniciado...');

// Dados de exemplo com links REAIS
const newsData = [
    {
        id: 1,
        title: "SEDUC-SP publica resoluções sobre calendário escolar 2025",
        summary: "Novas resoluções estabelecem o calendário letivo para a rede estadual de ensino com ajustes nos períodos de recesso.",
        source: "Diário Oficial SP",
        link: "https://www.imprensaoficial.com.br/",
        isOfficial: true,
        type: "noticia"
    },
    {
        id: 2,
        title: "CONCURSO: USP abre edital para Professor Doutor em Letras",
        summary: "Edital para contratação de Professor Doutor na área de Letras, com exigência de doutorado em Educação ou áreas afins.",
        source: "USP",
        link: "https://www5.usp.br/",
        isOfficial: true,
        type: "concurso"
    },
    {
        id: 3,
        title: "IFSP lança concurso para Professor de Língua Portuguesa",
        summary: "Vagas para Professor de Língua Portuguesa no campus do interior paulista. Requer doutorado em Educação ou Linguística.",
        source: "IFSP",
        link: "https://www.ifsp.edu.br/",
        isOfficial: true,
        type: "concurso"
    },
    {
        id: 4,
        title: "MEC anuncia novas diretrizes para formação docente",
        summary: "Portaria estabelece novas bases para cursos de licenciatura, com foco em práticas pedagógicas inovadoras.",
        source: "MEC",
        link: "https://www.gov.br/mec/",
        isOfficial: true,
        type: "noticia"
    },
    {
        id: 5,
        title: "UNESP publica edital para docente em Educação",
        summary: "Concurso para Professor Assistente na área de Educação, com foco em metodologias de ensino de língua portuguesa.",
        source: "UNESP",
        link: "https://www.unesp.br/",
        isOfficial: true,
        type: "concurso"
    }
];

// Elementos DOM
console.log('Buscando elementos DOM...');
const newsContainer = document.getElementById('newsContainer');
const loadingElement = document.getElementById('loading');
const lastUpdateElement = document.getElementById('lastUpdate');
const refreshButton = document.getElementById('refreshBtn');

console.log('Elementos encontrados:', {
    newsContainer: !!newsContainer,
    loadingElement: !!loadingElement,
    lastUpdateElement: !!lastUpdateElement,
    refreshButton: !!refreshButton
});

// Função principal para renderizar notícias
function renderNews() {
    console.log('Iniciando renderização...');
    
    if (!newsContainer) {
        console.error('Container de notícias não encontrado!');
        return;
    }

    // Limpar container
    newsContainer.innerHTML = '';

    // Renderizar cada notícia
    newsData.forEach(news => {
        const newsCard = document.createElement('div');
        newsCard.className = `news-card ${news.type}`;
        
        let sourceClass = 'news-source';
        if (news.isOfficial) sourceClass += ' official';
        if (news.type === 'concurso') sourceClass += ' concurso';
        
        newsCard.innerHTML = `
            <div class="news-content">
                <span class="${sourceClass}">${news.source}</span>
                <h3 class="news-title">${news.title}</h3>
                <p class="news-summary">${news.summary}</p>
                <a href="${news.link}" class="news-link" target="_blank" rel="noopener">
                    ${news.type === 'concurso' ? '📋 Ver Edital →' : '📰 Ler Notícia →'}
                </a>
            </div>
        `;
        
        newsContainer.appendChild(newsCard);
    });

    // Esconder loading e mostrar conteúdo
    if (loadingElement) {
        loadingElement.style.display = 'none';
    }
    newsContainer.style.display = 'grid';
    
    updateLastUpdateTime();
    console.log('Renderização concluída!');
}

// Função para atualizar horário
function updateLastUpdateTime() {
    if (!lastUpdateElement) return;
    
    const now = new Date();
    lastUpdateElement.textContent = 
        `Última atualização: ${now.toLocaleDateString('pt-BR')} às ${now.toLocaleTimeString('pt-BR', {hour: '2-digit', minute: '2-digit'})}`;
}

// Função de carregamento
function simulateLoading() {
    console.log('Simulando carregamento...');
    
    if (loadingElement) {
        loadingElement.style.display = 'block';
        loadingElement.textContent = 'Buscando notícias atualizadas...';
    }
    
    if (newsContainer) {
        newsContainer.style.display = 'none';
    }
    
    if (refreshButton) {
        refreshButton.disabled = true;
        refreshButton.textContent = '⏳ Buscando...';
    }

    // Simular delay de carregamento
    setTimeout(() => {
        renderNews();
        
        if (refreshButton) {
            refreshButton.disabled = false;
            refreshButton.textContent = '🔄 Atualizar Agora';
        }
    }, 1000);
}

// Configurar event listeners
if (refreshButton) {
    refreshButton.addEventListener('click', simulateLoading);
    console.log('Event listener configurado no botão');
}

// Inicialização quando documento carregar
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM carregado - iniciando sistema...');
    simulateLoading();
});

console.log('Script carregado com sucesso!');
