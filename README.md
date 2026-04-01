# Núcleo Facilities — Site

## Estrutura de arquivos

```
nucleo-facilities/
├── index.html              ← arquivo principal (abrir no navegador)
├── src/
│   ├── style.css           ← todos os estilos + variáveis de cores
│   ├── js/
│   │   └── main.js         ← navegação entre páginas
│   └── assets/
│       └── images/         ← coloque suas imagens aqui
│           ├── hero-bg.jpg           (hero — imagem de fundo)
│           ├── operacao.jpg          (home — seção "risco operacional")
│           ├── limpeza.jpg           (limpeza — home e serviços)
│           ├── portaria.jpg          (portaria — home e serviços)
│           ├── recepcao.jpg          (recepção — serviços)
│           ├── jardim.jpg            (jardinagem — home e serviços)
│           ├── terceirizacao.jpg     (terceirização — serviços)
│           ├── equipe.jpg            (quem somos — grid e missão)
│           ├── visao.jpg             (quem somos — card visão)
│           ├── valores.jpg           (quem somos — card valores)
│           ├── diferencial.jpg       (quem somos — card diferencial)
│           └── parceria.jpg          (diferenciais — banner foto)
```

## Como trocar as cores

Abra `src/style.css` e edite as variáveis no topo do arquivo:

```css
:root {
  --color-primary:       #e63312;   /* vermelho — botões, destaques */
  --color-primary-dark:  #c42b0e;   /* vermelho hover */
  --color-secondary:     #4a2d7a;   /* roxo — títulos, cards */
  --color-secondary-dark:#3a2260;   /* roxo hover */
  --color-navy:          #1a2250;   /* footer, logos bar */
  ...
}
```

## Como substituir imagens

1. Coloque suas fotos na pasta `src/assets/images/`
2. Use os nomes exatos da lista acima, **ou** edite o atributo `src` correspondente no `index.html`
3. Formato recomendado: JPG ou WebP, largura mínima de 800px

## Como rodar

Basta abrir o `index.html` diretamente no navegador.  
Se quiser um servidor local: `npx serve .` ou use o Live Server do VS Code.

## Páginas disponíveis

| Página        | ID no HTML         |
|---------------|--------------------|
| Home          | `page-home`        |
| Quem somos    | `page-quemsomos`   |
| Serviços      | `page-servicos`    |
| Diferenciais  | `page-diferenciais`|
| Contato       | `page-contato`     |
