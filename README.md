# IMOBILIÁRIA FRONT

Painel administrativo desenvolvido para gerenciamento de imóveis destinados à venda e locação.  
O sistema permite realizar cadastro, edição, listagem, visualização e exclusão de imóveis, bem como o gerenciamento de fotos de cada unidade.

---

## 🎯 Objetivo do Sistema

Desenvolver uma interface administrativa completa, moderna e responsiva, que permita:

- Gerenciar o catálogo de imóveis (CRUD completo)
- Organizar informações de venda e locação
- Realizar upload e remoção de fotos dos imóveis
- Visualizar detalhes completos de cada propriedade
- Integrar o front-end React com o back-end Spring Boot

---

## 🧩 Tecnologias Utilizadas

### **Front-end**
- Vite
- React
- React Router
- TailwindCSS

### **Back-end**
- Spring Boot
- Java
- MySQL

---

## 📁 Estrutura do Projeto

```
IMOBILIARIA-FRONT/
│
├── public/               # Arquivos públicos
├── src/
│   ├── assets/           # Imagens e arquivos estáticos
│   ├── components/       # Componentes reutilizáveis (Navbar, Layout etc.)
│   ├── pages/            # Páginas principais (CRUDs e Dashboard)
│   │   └── imoveis/      # Módulo de imóveis
│   ├── routes/           # Configuração das rotas
│   ├── services/         # Serviços de API (Axios)
│   ├── App.css           # Estilos globais
│   ├── index.css         # Estilos padrão do Vite
│   └── main.jsx          # Inicialização da aplicação
│
├── README.md             # Documentação do projeto
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

---

## ⚙️ Instalação e Execução (Front-end)

### 🔹 **Pré-requisitos**
- Node.js instalado
- Backend Spring Boot em execução (porta padrão: 8080)

### 🔹 **Passo a passo**

```bash
# 1. Instalar dependências
npm install

# 2. Executar o projeto
npm run dev
```

O sistema abrirá em:

👉 **http://localhost:5173**

---

## 🔗 Comunicação com o Back-end

O front-end se comunica com o serviço Spring Boot através de rotas REST.

Os serviços estão organizados na pasta:  
`src/services/`

Exemplos:

- `imovelService.js` → CRUD de imóveis  
- `fotoService.js` → Upload, listagem e remoção de fotos  

---

## 💾 Funcionalidades Implementadas

### ✔ CRUD completo de imóveis
- Criar imóvel  
- Editar imóvel  
- Excluir imóvel  
- Visualizar informações  
- Listar todos os imóveis  

### ✔ Gerenciamento de fotos
- Upload de imagens  
- Exclusão de fotos  
- Marcar foto como capa (quando aplicável)  
- Ordenação  

### ✔ Layout administrativo
- Navegação estruturada em rotas
- Layout com Navbar e Sidebar
- Responsividade aplicada com TailwindCSS

---

## 🧠 Boas Práticas Adotadas

- Componentização clara
- Separação entre lógica e apresentação
- Serviços de API isolados
- Layout responsivo
- Organização de pastas seguindo padrões profissionais
- Uso de UI Framework (TailwindCSS)
- Código limpo e identado

---

## 🌐 Deploy (Vercel)

O projeto será publicado gratuitamente no Vercel.  
Após realizar o deploy, o link será adicionado aqui:

🔗 **Deploy:** _aguardando publicação_

(Quando fizer o deploy, basta me enviar o link para atualizar o README.)

---

## 👤 Autor

**Róger André Hepfner**  
Projeto desenvolvido como atividade acadêmica.

---

## 📄 Licença

Este projeto é de uso acadêmico e não possui fins comerciais.
