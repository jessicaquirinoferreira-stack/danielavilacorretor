# Gil Avila Daniel | Corretor de Imóveis

Site institucional imobiliário premium e painel administrativo completo desenvolvido para **Gil Avila Daniel**, corretor de imóveis especialista na Zona Sul de São Paulo com mais de 20 anos de experiência.

---

## 1. Dados Confirmados & Marca

- **Nome profissional:** Gil Avila Daniel | Corretor de Imóveis
- **Experiência declarada:** Mais de 20 anos como corretor de imóveis
- **Especialidade:** Imóveis na Zona Sul de São Paulo (Moema, Campo Belo, Brooklin, Vila Mariana, Chácara Flora, Santo Amaro) e São Bernardo do Campo & região
- **WhatsApp oficial:** [+55 11 97324-5981](https://wa.me/5511973245981) (`wa.me/5511973245981`)
- **Instagram oficial:** [@daniel_corretor1](https://www.instagram.com/daniel_corretor1/)
- **Threads:** [@daniel_corretor1](https://threads.net/@daniel_corretor1)
- **CRECI:** Campo 100% editável no painel administrativo (regra: nenhuma numeração fictícia foi inventada).
- **Status das artes do Instagram:** Imóveis cadastrados com base nas referências visuais históricas do feed foram categorizados com o selo obrigatório de **"Pendente de confirmação"**, acompanhados de nota de disponibilidade.

---

## 2. Identidade Visual Premium

- **Base:** Branco puro (`#ffffff`), off-white (`#f8fafc`) e cinza muito claro (`#f1f5f9`).
- **Cores Principais:** Navy profundo / Azul Petróleo (`#0a1926`, `#0f2338`) e Charcoal (`#1e293b`).
- **Acentos:** Azul médio suave (`#2563eb`, `#38bdf8`) e toques discretos de prata e cinza metálico (`#cbd5e1`). *Sem dourado dominante ou marrom escuro*.
- **Tipografia:** Sans-serif moderna e limpa (*Plus Jakarta Sans*) + títulos editoriais elegantes (*Outfit*).

---

## 3. Funcionalidades do Site Público

1. **Header Institucional:**
   - Nome oficial, badge de +20 anos de carreira e especialidade na Zona Sul.
   - Navegação: Início, Comprar, Alugar, Empreendimentos, Sobre, Contato.
   - Botão direto para WhatsApp oficial (+55 11 97324-5981).
   - Link discreto para o Painel Administrativo.

2. **Hero com Posicionamento:**
   - Mensagem central: *"Mais de 20 anos conectando pessoas ao imóvel ideal na Zona Sul de São Paulo."*
   - Texto institucional oficial e botões de conversão imediata no WhatsApp.
   - Mecanismo de busca rápida (Finalidade, Bairro/Região, Tipo, Faixa de Preço).

3. **Catálogo de Imóveis & Empreendimentos:**
   - Filtros dinâmicos: Comprar, Alugar, Bairros, Quartos, Suítes, Vagas, Faixa de Valor e Ordenação.
   - Cards com selo "Pendente de confirmação", especificações técnicas (área, quartos, vagas) e valores em R$.
   - Páginas individuais (`/imovel/:slug`) com galeria ilimitada de fotos e vídeos, mapa de contexto aproximado, modal de compartilhamento (WhatsApp, Instagram Stories, Link direto) e formulário embutido.
   - Página de Empreendimento (`/empreendimento/:slug`) com plantas de 152 a 224 m² e status de obras.

4. **Concierge de IA Google Gemini (Gemini 3.8 Flash):**
   - Assistente virtual inteligente com conhecimento dos imóveis, bairros da Zona Sul e orientações de compra.
   - Drawer conversacional interativo com botão de transição para o WhatsApp com histórico da conversa.
   - Endpoint seguro server-side em Express (`/api/ai/concierge` e `/api/ai/match-property`).

5. **Componentes Interativos Premium (React Bits / Magic UI / Aceternity UI):**
   - **Bento Grid**: Apresentação visual assimétrica dos diferenciais com iluminação de borda e Magic Cards.
   - **Neighborhood Explorer**: Guia dinâmico dos bairros da Zona Sul (Moema, Campo Belo, Brooklin, Vila Mariana e São Bernardo).
   - **Simulador de Financiamento**: Cálculo de parcelas, entrada e renda recomendada com botão WhatsApp.
   - **NumberTicker**: Contador numérico animado para estatísticas de mercado (+20 anos).
   - **MagicCard**: Cards com spotlight radial sob o cursor do mouse.
   - **ShimmerButton**: Botões com feixe de luz refletivo para CTAs de alta conversão.

6. **Landing Pages de Campanha (`/lp/:slug`):**
   - Páginas com foco total em conversão para campanhas de Instagram Ads, Stories e Facebook Ads.
   - Links prontos com parâmetros UTM gerados automaticamente no painel.

7. **Agendamento de Visitas & Captura de Leads:**
   - Formulário com nome, telefone, e-mail opcional, data e horário sugeridos.
   - Salvamento no Firestore e no armazenamento local.
   - Disparo de mensagem pré-formatada direta para o WhatsApp oficial de Gil Avila Daniel.
   - Efeito visual de celebração com confetti no envio.

8. **Privacidade & LGPD:**
   - Banner de cookies com consentimento ativo.
   - Modal com a Política de Privacidade e Proteção de Dados segundo a Lei Federal nº 13.709/2018.

---

## 4. Painel Administrativo (Área Privada do Corretor)

Acesso restrito via autenticação segura com Firebase Auth (Google Login e sessão autorizada):

- **Dashboard:** Métricas em tempo real (total de imóveis, empreendimentos, à venda, para alugar, leads recebidos, cliques no WhatsApp e taxas de conversão).
- **CRUD de Imóveis:** Cadastrar, editar, duplicar, publicar/despublicar, destacar e excluir imóveis com campos completos e proteção de endereço confidencial interno.
- **Galeria Ilimitada via Vercel Blob:** Upload de múltiplas fotos em alta resolução e vídeos, seleção de foto de capa, reordenação e exclusão.
- **CRUD de Empreendimentos:** Cadastro de edifícios residenciais modernos, faixas de metragem (152 a 224 m²) e plantas.
- **Gestão de Leads:** Tabela de contatos, histórico, filtro por status (Novo, Em Atendimento, Visita Agendada, Convertido, Descartado), campo para anotações internas privadas do corretor e botão de 1 clique para chamar o lead no WhatsApp.
- **Exportação de Leads:** Exportação dos contatos e agendamentos em formato CSV.
- **Gerenciador de Landing Pages:** Criação de páginas de campanha e links de divulgação prontos para Instagram e WhatsApp.
- **Central de Mídia (Vercel Blob):** Biblioteca unificada de ativos visuais com cópia de URL.
- **Configurações do Site:** Edição de CRECI, contatos de WhatsApp, Instagram, títulos e textos institucionais.

---

## 5. Variáveis de Ambiente & Configuração

Crie um arquivo `.env` na raiz (baseado em `.env.example`):

```env
# URL base da aplicação
APP_URL="http://localhost:3000"

# Token de Leitura e Escrita do Vercel Blob (para deploy na Vercel)
# Obtenha no painel da Vercel em Storage -> Blob -> Create Database -> Tokens
BLOB_READ_WRITE_TOKEN="vercel_blob_rw_..."

# Firebase Config (já provisionado e salvo em firebase-applet-config.json)
```

---

## 6. Instalação e Execução Local

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento (porta 3000)
npm run dev

# Build de produção
npm run build
```

---

## 7. Deploy na Vercel

1. Suba o repositório para o GitHub ou GitLab.
2. No painel da [Vercel](https://vercel.com):
   - Importe o projeto.
   - Em **Storage**, ative o **Vercel Blob** para habilitar uploads de mídia sem limite.
   - O Vercel injetará automaticamente a variável `BLOB_READ_WRITE_TOKEN`.
   - Clique em **Deploy**.
3. O site estará online com suporte total a fotos, vídeos e regras de segurança Firestore.
