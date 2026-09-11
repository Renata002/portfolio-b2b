# 🚀 Portfólio Agência B2B — Showcase de Clientes
Um projeto de **Portfólio Digital para Agência de Desenvolvimento Web
B2B**, desenvolvido como parte da disciplina de laboratório web. A
aplicação apresenta a estrutura de uma agência de tecnologia fictícia,
focada em uma experiência responsiva e moderna, integrando dados
dinâmicos de parceiros comerciais e clientes via API REST.
---
## 🌐 Acesse o Projeto Online
Você pode visualizar e interagir com o projeto final rodando
diretamente no **GitHub Pages**:
🔗 **[Clique aqui para acessar a aplicação
online]( https://renata002.github.io/portfolio-b2b/)**
---
## 🎨 Protótipo no Figma
O design do layout e os breakpoints responsivos foram desenvolvidos e
disponibilizados no Figma:
* 🔗 [Acessar Modelo no Figma — Projeto Lab
Web](https://www.figma.com/design/1N1Upe2vhqcOYX0gW6AwFd/projeto-lab-we
b--c%C3%B3pia-?node-id=1-10&p=f&t=8bOqkB8d5pQ4hPY1-0)
---
## ️ Tecnologias e Ferramentas Utilizadas
* **HTML5 Semântico:**
* **CSS3 (Mobile-First & Flexbox):**
* **JavaScript (ES6+):**
* **JSONPlaceholder API:**

---
## 🌐 Integração com a API (Showcase de Clientes)

A seção de **"Cases de Sucesso / Clientes Atendidos"** consome
dinamicamente os dados da API REST gratuita
[JSONPlaceholder](https://jsonplaceholder.typicode.com/users).
* **Endpoint:** `https://jsonplaceholder.typicode.com/users`
* **Regra de Negócio:** A aplicação busca a lista de usuários, filtra
estritamente os **5 primeiros resultados** e mapeia as propriedades
recebidas para popular os cards de depoimentos (`<article>`):
* **Empresa:** `company.name`
* **Depoimento / Slogan:** `company.catchPhrase` e `company.bs`
* **Responsável:** `name`
* **Cidade:** `address.city`
---
## 📁 Estrutura de Arquivos do Projeto
```
├── src/
│ ├── css/
│ │ ├── base.css # Estilos globais e reset
│ │ ├── components.css # Estilos de componentes reutilizáveis
│ │ ├── customers.css # Estilos da seção de clientes
│ │ ├── discover.css # Estilos da seção discover
│ │ ├── events.css # Estilos da seção de eventos
│ │ ├── footer.css # Estilos do rodapé
│ │ ├── header.css # Estilos do cabeçalho
│ │ ├── hero.css # Estilos da seção principal (Hero)
│ │ ├── nav.css # Estilos da barra de navegação
│ │ ├── speed.css # Estilos da seção de
velocidade/performance
│ │ ├── styles.css # Arquivo principal de importação do CSS
│ │ ├── testimonials.css # Estilos da seção de
depoimentos/carrossel
│ │ └── tools.css # Estilos da seção de ferramentas
│ ├── icons/ # Ícones SVG e assets vetoriais
│ ├── img/ # Imagens e avatares do projeto
│ └── js/
│ ├── nav.js # Comportamento do menu de navegação
│ └── testimonials.js # Lógica do carrossel e consumo de
depoimentos
├── index.html # Estrutura HTML5 semântica principal

├── script.js # Script principal da aplicação
└── README.md # Documentação do projeto
```

---
## 📋 Critérios de Qualidade Aplicados
* ✅ **Semântica HTML5:** Estrutura clara e acessível.
* ✅ **Validação W3C:** Código limpo e verificado no
[validator.w3.org](https://validator.w3.org/).
* ✅ **Zero Erros no Console:** Requisições assíncronas tratadas e
renderizadas de forma limpa.
* ✅ **Fidelidade ao Design:** Layout construído com base nas
diretrizes do Figma.