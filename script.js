// Sistema de busca automática por notícias e concursos
const newsData = [
    // Notícias de exemplo - em produção viriam de API real
    {
        id: 1,
        title: "SEDUC-SP publica novas resoluções sobre calendário escolar 2025",
        summary: "Foram publicadas no Diário Oficial as resoluções que estabelecem o calendário letivo para a rede estadual de ensino, com ajustes nos períodos de recesso e recuperação.",
        source: "Diário Oficial SP",
        link: "#",
        isOfficial: true,
        type: "noticia"
    },
    {
        id: 2,
        title: "MEC anuncia novas diretrizes para formação docente",
        summary: "Portaria do Ministério da Educação estabelece novas bases para os cursos de licenciatura, com foco em práticas pedagógicas inovadoras.",
        source: "MEC",
        link: "#",
        isOfficial: true,
        type: "noticia"
    },
    {
        id: 3,
        title: "CONCURSO: USP abre edital para Professor Doutor em Letras",
        summary: "Universidade de São Paulo publica edital para contratação de Professor Doutor na área de Letras, com exigência de doutorado em Educação ou áreas afins. Inscrições abertas.",
        source: "USP",
        link: "#",
        isOfficial: true,
        type: "concurso"
    },
    {
        id: 4,
        title: "IFSP lança concurso para Professor de Língua Portuguesa",
        summary: "Instituto Federal de São Paulo abre vagas para Professor de Língua Portuguesa no campus do interior paulista. Requer doutorado em Educação ou Linguística.",
        source: "IFSP",
        link: "#",
        isOfficial: true,
        type: "concurso"
    },
    {
        id: 5,
        title: "UNESP publica edital para docente em Educação",
        summary: "Universidade Estadual Paulista abre concurso para Professor Assistente na área de Educação, com foco em metodologias de ensino de língua portuguesa.",
        source: "UNESP",
        link: "#",
        isOfficial: true,
        type: "concurso"
    },
    {
        id: 6,
        title: "UFMG oferta vagas para Professor de Literatura",
        summary: "Universidade Federal de Minas Gerais publica edital para Professor de Teoria da Literatura, aceitando doutorado em Educação com pesquisa em literatura.",
        source: "UFMG",
        link: "#",
        isOfficial: true,
        type: "concurso"
    },
    {
        id: 7,
        title: "Deliberação CEE estabelece novas normas para educação básica",
        summary: "Conselho Estadual de Educação publica deliberação com atualizações no regimento das escolas estaduais paulistas.",
        source: "CEE-SP",
        link: "#",
        isOfficial: true,
        type: "noticia"
    },
    {
        id: 8,
        title: "CONCURSO: Prefeitura de Campinas - Professor Doutor",
        summary: "Prefeitura Municipal de Campinas abre edital para Professor Doutor com formação em Letras/Educação para atuação na rede municipal de ensino superior.",
        source: "Prefeitura Campinas",
        link: "#",
        isOfficial: true,
        type: "concurso"
    },
    {
        id: 9,
        title: "UNICAMP seleciona docente para Instituto de Estudos da Linguagem",
        summary: "Universidade de Campinas publica edital para Professor Doutor com experiência em ensino de língua portuguesa e formação educacional.",
        source: "UNICAMP",
        link: "#",
        isOfficial: true,
        type: "concurso"
    },
    {
        id: 10,
        title: "Novas portarias da SEDUC sobre formação continuada",
        summary: "Secretaria de Educação publica portarias que regulamentam os programas de formação continuada para professores da rede estadual.",
        source: "SEDUC-SP",
        link: "#",
        isOfficial: true,
        type: "noticia"
    }
];

// Elementos DOM
const newsContainer = document.getElementById('newsContainer');
const loadingElement = document.getElementById('loading');
const lastUpdateElement = document.getElementById('lastUpdate');
const refreshButton = document.getElementById('refreshBtn');

// Função para simular carregamento de API real
function simulateLoading() {
    loadingElement.style.display = 'block';
    newsContainer.style.display = 'none';
    refreshButton.disabled = true;
    refreshButton.innerHTML = '⏳ Buscando...';
    
    // Simular delay de API
    setTimeout(() => {
        loadingElement.style.display = 'none';
        newsContainer.style.display = 'grid';
        renderNews();
        refreshButton.disabled = false;
        refreshButton.innerHTML = '🔄 Atualizar Agora';
    }, 1500);
}

// Função para renderizar notícias e concursos
function renderNews() {
    newsContainer.innerHTML = '';
    
    // Ordenar: concursos primeiro, depois notícias
    const sortedNews = [...newsData].sort((a, b) => {
        if (a.type === 'concurso' && b.type !== 'concurso') return -1;
        if (a.type !== 'concurso' && b.type === 'concurso') return 1;
        return 0;
    });
    
    sortedNews.forEach(news => {
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
                <a href="${news.link}" class="news-link" target="_blank">
                    ${news.type === 'concurso' ? '📋 Ver Edital Completo →' : '📰 Ler Notícia Completa →'}
                </a>
            </div>
        `;
        
        newsContainer.appendChild(newsCard);
    });
    
    updateLastUpdateTime();
}

// Função para atualizar horário
function updateLastUpdateTime() {
    const now = new Date();
    const options = { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric',
        hour: '2-digit', 
        minute: '2-digit' 
    };
    
    lastUpdateElement.textContent = 
        `Última atualização: ${now.toLocaleDateString('pt-BR', options)} às ${now.toLocaleTimeString('pt-BR', {hour: '2-digit', minute: '2-digit'})}`;
}

// Simular atualização automática às 6h
function checkAutoUpdate() {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    
    if (currentHour === 6 && currentMinute === 0) {
        simulateLoading();
    }
}

// Event Listeners
refreshButton.addEventListener('click', simulateLoading);

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    simulateLoading();
    
    // Verificar atualização automática a cada minuto
    setInterval(checkAutoUpdate, 60000);
    
    // Atualizar horário a cada minuto
    setInterval(updateLastUpdateTime, 60000);
});

// Sistema de busca real (para versão futura com API)
async function fetchRealNews() {
    try {
        // Em produção, aqui viria a chamada para API real
        const response = await fetch('https://api.example.com/noticias-educacao');
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Usando dados de exemplo - API offline');
        return newsData;
    }
}
