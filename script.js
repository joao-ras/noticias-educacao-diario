// Sistema completo com 10+ notícias e concursos
const newsData = [
    {
        id: 1,
        title: "SEDUC-SP publica resoluções sobre calendário escolar 2025",
        summary: "Novas resoluções estabelecem o calendário letivo para a rede estadual de ensino com ajustes nos períodos de recesso e recuperação.",
        source: "Diário Oficial SP",
        link: "https://www.imprensaoficial.com.br/",
        isOfficial: true,
        type: "noticia"
    },
    {
        id: 2,
        title: "CONCURSO: USP abre edital para Professor Doutor em Letras",
        summary: "Universidade de São Paulo publica edital para contratação de Professor Doutor na área de Letras, com exigência de doutorado em Educação ou áreas afins.",
        source: "USP",
        link: "https://www5.usp.br/",
        isOfficial: true,
        type: "concurso"
    },
    {
        id: 3,
        title: "IFSP lança concurso para Professor de Língua Portuguesa",
        summary: "Instituto Federal de São Paulo abre vagas para Professor de Língua Portuguesa no campus do interior paulista. Requer doutorado em Educação ou Linguística.",
        source: "IFSP",
        link: "https://www.ifsp.edu.br/",
        isOfficial: true,
        type: "concurso"
    },
    {
        id: 4,
        title: "MEC anuncia novas diretrizes para formação docente",
        summary: "Portaria do Ministério da Educação estabelece novas bases para os cursos de licenciatura, com foco em práticas pedagógicas inovadoras.",
        source: "MEC",
        link: "https://www.gov.br/mec/",
        isOfficial: true,
        type: "noticia"
    },
    {
        id: 5,
        title: "UNESP publica edital para docente em Educação",
        summary: "Universidade Estadual Paulista abre concurso para Professor Assistente na área de Educação, com foco em metodologias de ensino de língua portuguesa.",
        source: "UNESP",
        link: "https://www.unesp.br/",
        isOfficial: true,
        type: "concurso"
    },
    {
        id: 6,
        title: "UFMG oferta vagas para Professor de Literatura",
        summary: "Universidade Federal de Minas Gerais publica edital para Professor de Teoria da Literatura, aceitando doutorado em Educação com pesquisa em literatura.",
        source: "UFMG",
        link: "https://www.ufmg.br/",
        isOfficial: true,
        type: "concurso"
    },
    {
        id: 7,
        title: "Deliberação CEE estabelece novas normas para educação básica",
        summary: "Conselho Estadual de Educação publica deliberação com atualizações no regimento das escolas estaduais paulistas.",
        source: "CEE-SP",
        link: "https://www.ceesp.sp.gov.br/",
        isOfficial: true,
        type: "noticia"
    },
    {
        id: 8,
        title: "CONCURSO: UNICAMP seleciona docente para Instituto de Estudos da Linguagem",
        summary: "Universidade de Campinas publica edital para Professor Doutor com experiência em ensino de língua portuguesa e formação educacional.",
        source: "UNICAMP",
        link: "https://www.unicamp.br/",
        isOfficial: true,
        type: "concurso"
    },
    {
        id: 9,
        title: "Prefeitura de Campinas abre concurso para Professor Doutor",
        summary: "Edital para Professor Doutor com formação em Letras/Educação para atuação na rede municipal de ensino superior.",
        source: "Prefeitura Campinas",
        link: "https://www.campinas.sp.gov.br/",
        isOfficial: true,
        type: "concurso"
    },
    {
        id: 10,
        title: "Novas portarias da SEDUC sobre formação continuada",
        summary: "Secretaria de Educação publica portarias que regulamentam os programas de formação continuada para professores da rede estadual.",
        source: "SEDUC-SP",
        link: "https://www.educacao.sp.gov.br/",
        isOfficial: true,
        type: "noticia"
    },
    {
        id: 11,
        title: "CONCURSO: Universidade Federal de São Carlos",
        summary: "UFSCar abre edital para Professor de Metodologia de Ensino de Língua Portuguesa.",
        source: "UFSCar",
        link: "https://www.ufscar.br/",
        isOfficial: true,
        type: "concurso"
    },
    {
        id: 12,
        title: "Notícias sobre educação no portal G1",
        summary: "Acompanhe as últimas notícias sobre educação, concursos e políticas educacionais.",
        source: "G1 Educação",
        link: "https://g1.globo.com/educacao/",
        isOfficial: false,
        type: "noticia"
    }
];

// Sistema de carregamento
function loadNews() {
    const container = document.getElementById('newsContainer');
    const loading = document.getElementById('loading');
    const lastUpdate = document.getElementById('lastUpdate');
    const refreshBtn = document.getElementById('refreshBtn');

    // Esconder loading
    loading.style.display = 'none';
    
    // Limpar container
    container.innerHTML = '';
    
    // Adicionar notícias
    newsData.forEach(news => {
        const card = document.createElement('div');
        card.className = `news-card ${news.type}`;
        
        let sourceClass = 'news-source';
        if (news.isOfficial) sourceClass += ' official';
        if (news.type === 'concurso') sourceClass += ' concurso';
        
        card.innerHTML = `
            <div class="news-content">
                <span class="${sourceClass}">${news.source}</span>
                <h3 class="news-title">${news.title}</h3>
                <p class="news-summary">${news.summary}</p>
                <a href="${news.link}" class="news-link" target="_blank">
                    ${news.type === 'concurso' ? '📋 Ver Edital Completo →' : '📰 Ler Notícia Completa →'}
                </a>
            </div>
        `;
        container.appendChild(card);
    });
    
    // Atualizar horário
    const now = new Date();
    lastUpdate.textContent = `Última atualização: ${now.toLocaleDateString('pt-BR')} às ${now.toLocaleTimeString('pt-BR')}`;
    
    // Configurar botão
    refreshBtn.addEventListener('click', function() {
        loading.style.display = 'block';
        container.style.display = 'none';
        refreshBtn.disabled = true;
        refreshBtn.textContent = '⏳ Atualizando...';
        
        setTimeout(() => {
            loadNews();
        }, 1500);
    });
}

// Iniciar quando página carregar
document.addEventListener('DOMContentLoaded', loadNews);
