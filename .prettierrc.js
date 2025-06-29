module.exports = {
  // ===== CONFIGURAÇÕES BÁSICAS =====
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  quoteProps: 'as-needed',
  jsxSingleQuote: true,
  trailingComma: 'all',
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'avoid',
  endOfLine: 'auto',

  // ===== CONFIGURAÇÕES ESPECÍFICAS PARA REACT/JSX =====

  // ===== CONFIGURAÇÕES PARA CLEAN ARCHITECTURE =====
  // Organização de imports será feita pelo ESLint
  // Esta configuração foca na formatação de código

  // ===== CONFIGURAÇÕES DE PERFORMANCE =====
  // Evita quebra de linha desnecessária em JSX
  proseWrap: 'preserve',

  // ===== CONFIGURAÇÕES PARA REACT NATIVE =====
  // Mantém estilos inline legíveis
  overrides: [
    {
      files: '*.{js,jsx,ts,tsx}',
      options: {
        // Configurações específicas para arquivos React
        parser: 'typescript',
      },
    },
    {
      files: '*.{json,md}',
      options: {
        // Configurações para outros tipos de arquivo
        printWidth: 80,
      },
    },
  ],
};
