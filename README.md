# Landing Page J.R. Zezinho

Landing page comercial para a Churrascaria Restaurante e Pizzaria J.R. Zezinho - Montese, com cardapio digital, carrinho, envio de pedido via WhatsApp e painel admin simples com dados em localStorage.

## Como rodar

```bash
npm install
npm run dev
```

Acesse:

- Site: `http://localhost:3000`
- Admin: `http://localhost:3000/admin`

Credenciais do admin:

- Usuario: `admin`
- Senha: `jrzezinho123`

## Estrutura

- `src/app/page.tsx`: landing page principal.
- `src/app/admin/page.tsx`: login e dashboard local.
- `src/components`: componentes reutilizaveis de layout, cardapio, pedido e secoes.
- `src/data/menuData.ts`: categorias, itens, precos e imagens do cardapio.
- `src/lib/orders.ts`: persistencia local dos pedidos.
- `public/images`: fotos reais usadas na apresentacao.

## Observacoes

Os precos sao dados iniciais para apresentacao e devem ser revisados com o restaurante. A estrutura esta preparada para futuramente substituir localStorage por API, banco de dados, autenticacao real e pagamentos online.
