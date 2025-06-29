# Componentes do Sistema de Design - MindMate Voice

## 🇧🇷 Português

### Visão Geral

Esta pasta contém os componentes reutilizáveis do sistema de design do MindMate Voice. Todos os componentes são projetados para aplicações de saúde mental, com foco em acessibilidade, usabilidade e experiência do usuário.

### 📁 Estrutura

```
src/presentation/components/
├── MentalHealthButton/           # Botão com variantes de saúde mental
│   ├── index.tsx                 # Componente principal
│   └── __tests__/                # Testes unitários e de integração
│       ├── MentalHealthButton.test.tsx
│       └── MentalHealthButton.integration.test.tsx
├── MentalHealthCard/             # Card com temas de saúde mental
│   ├── index.tsx                 # Componente principal
│   └── __tests__/                # Testes unitários e de integração
│       ├── MentalHealthCard.test.tsx
│       └── MentalHealthCard.integration.test.tsx
└── README.md                     # Esta documentação
```

### 🧩 Componentes Disponíveis

#### MentalHealthButton

Botão moderno e acessível com múltiplas variantes temáticas de saúde mental.

**Características:**

- ✅ 7 variantes de cores (primary, secondary, success, warning, error, calm, peace)
- ✅ 3 tamanhos (small, medium, large)
- ✅ Estados: normal, loading, disabled
- ✅ Estilos: filled, outlined
- ✅ Suporte a ícones (esquerda e direita)
- ✅ Acessibilidade completa (WCAG AA)
- ✅ Animações suaves
- ✅ Responsivo a temas claro/escuro

**Uso Rápido:**

```tsx
import { MentalHealthButton } from './MentalHealthButton';

<MentalHealthButton
  title="Iniciar Meditação"
  variant="calm"
  size="large"
  onPress={() => console.log('Iniciando...')}
/>;
```

#### MentalHealthCard

Card moderno com cores temáticas de saúde mental e suporte a interatividade.

**Características:**

- ✅ 5 tipos de cores (calm, peace, comfort, safety, hope)
- ✅ Modo interativo e não-interativo
- ✅ Título e subtítulo opcionais
- ✅ Conteúdo flexível via children
- ✅ Acessibilidade completa
- ✅ Animações condicionais
- ✅ Responsivo a temas

**Uso Rápido:**

```tsx
import { MentalHealthCard } from './MentalHealthCard';

<MentalHealthCard
  title="Dica do Dia"
  subtitle="Mantenha-se hidratado"
  type="calm"
  interactive
  onPress={() => console.log('Card clicado')}
>
  <Text>Beber água regularmente ajuda a manter o foco.</Text>
</MentalHealthCard>;
```

### 🎯 Hook useThemeColors

Hook personalizado para acessar cores do tema atual de forma consistente.

**Uso:**

```tsx
import { useThemeColors } from '../themes/useThemeColors';

const MyComponent = () => {
  const colors = useThemeColors();

  return (
    <View style={{ backgroundColor: colors.mental.calm }}>
      <Text style={{ color: colors.text.primary }}>Conteúdo</Text>
    </View>
  );
};
```

### 🧪 Testes

Cada componente possui testes abrangentes:

**Executar Testes:**

```bash
# Testes de todos os componentes
npm test -- --testPathPattern="components"

# Testes específicos
npm test -- --testPathPattern="MentalHealthButton"
npm test -- --testPathPattern="MentalHealthCard"

# Testes de integração
npm test -- --testPathPattern="integration"
```

**Cobertura de Testes:**

- ✅ Renderização básica
- ✅ Props e variantes
- ✅ Estados (loading, disabled)
- ✅ Interações (press, touch)
- ✅ Acessibilidade
- ✅ Temas (claro/escuro)
- ✅ Integração com outros componentes

### 🔧 Desenvolvimento

#### Criando um Novo Componente

1. **Crie a estrutura:**

```bash
mkdir src/presentation/components/NovoComponente
touch src/presentation/components/NovoComponente/index.tsx
mkdir src/presentation/components/NovoComponente/__tests__
touch src/presentation/components/NovoComponente/__tests__/NovoComponente.test.tsx
```

2. **Use o template básico:**

```tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useThemeColors } from '@/presentation/themes/useThemeColors';

interface NovoComponenteProps {
  // Props do componente
}

export const NovoComponente: React.FC<NovoComponenteProps> = ({ ... }) => {
  const colors = useThemeColors();

  return (
    <View style={styles.container}>
      {/* Conteúdo do componente */}
    </View>
  );
};
```

3. **Implemente acessibilidade:**

```tsx
<View
  accessibilityLabel="Descrição para leitores de tela"
  accessibilityRole="button"
  accessibilityHint="Dica de uso"
>
```

4. **Adicione testes:**

```tsx
import { render, fireEvent } from '@testing-library/react-native';
import { NovoComponente } from '../index';

describe('NovoComponente', () => {
  it('renders correctly', () => {
    const { getByText } = render(<NovoComponente />);
    expect(getByText('Texto esperado')).toBeTruthy();
  });
});
```

#### Padrões de Desenvolvimento

**Obrigatório:**

- ✅ Use `useThemeColors` para cores
- ✅ Implemente acessibilidade (WCAG AA)
- ✅ Escreva testes unitários
- ✅ Documente props com TypeScript
- ✅ Siga padrões de nomenclatura

**Recomendado:**

- ✅ Adicione testes de integração
- ✅ Use design tokens para espaçamento
- ✅ Implemente animações suaves
- ✅ Suporte a temas claro/escuro
- ✅ Adicione exemplos de uso

### 📚 Documentação

- **Design System:** `docs/DESIGN_SYSTEM.md`
- **Testes:** `docs/TESTING.md`
- **Acessibilidade:** `docs/ACCESSIBILITY.md`

---

## 🇺🇸 English

### Overview

This folder contains the reusable components of the MindMate Voice design system. All components are designed for mental health applications, with focus on accessibility, usability, and user experience.

### 📁 Structure

```
src/presentation/components/
├── MentalHealthButton/           # Button with mental health variants
│   ├── index.tsx                 # Main component
│   └── __tests__/                # Unit and integration tests
│       ├── MentalHealthButton.test.tsx
│       └── MentalHealthButton.integration.test.tsx
├── MentalHealthCard/             # Card with mental health themes
│   ├── index.tsx                 # Main component
│   └── __tests__/                # Unit and integration tests
│       ├── MentalHealthCard.test.tsx
│       └── MentalHealthCard.integration.test.tsx
└── README.md                     # This documentation
```

### 🧩 Available Components

#### MentalHealthButton

Modern and accessible button with multiple mental health themed variants.

**Features:**

- ✅ 7 color variants (primary, secondary, success, warning, error, calm, peace)
- ✅ 3 sizes (small, medium, large)
- ✅ States: normal, loading, disabled
- ✅ Styles: filled, outlined
- ✅ Icon support (left and right)
- ✅ Complete accessibility (WCAG AA)
- ✅ Smooth animations
- ✅ Light/dark theme responsive

**Quick Usage:**

```tsx
import { MentalHealthButton } from './MentalHealthButton';

<MentalHealthButton
  title="Start Meditation"
  variant="calm"
  size="large"
  onPress={() => console.log('Starting...')}
/>;
```

#### MentalHealthCard

Modern card with mental health themed colors and interactivity support.

**Features:**

- ✅ 5 color types (calm, peace, comfort, safety, hope)
- ✅ Interactive and non-interactive modes
- ✅ Optional title and subtitle
- ✅ Flexible content via children
- ✅ Complete accessibility
- ✅ Conditional animations
- ✅ Theme responsive

**Quick Usage:**

```tsx
import { MentalHealthCard } from './MentalHealthCard';

<MentalHealthCard
  title="Tip of the Day"
  subtitle="Stay hydrated"
  type="calm"
  interactive
  onPress={() => console.log('Card clicked')}
>
  <Text>Drinking water regularly helps maintain focus.</Text>
</MentalHealthCard>;
```

### 🎯 useThemeColors Hook

Custom hook to access current theme colors consistently.

**Usage:**

```tsx
import { useThemeColors } from '../themes/useThemeColors';

const MyComponent = () => {
  const colors = useThemeColors();

  return (
    <View style={{ backgroundColor: colors.mental.calm }}>
      <Text style={{ color: colors.text.primary }}>Content</Text>
    </View>
  );
};
```

### 🧪 Testing

Each component has comprehensive tests:

**Run Tests:**

```bash
# All component tests
npm test -- --testPathPattern="components"

# Specific tests
npm test -- --testPathPattern="MentalHealthButton"
npm test -- --testPathPattern="MentalHealthCard"

# Integration tests
npm test -- --testPathPattern="integration"
```

**Test Coverage:**

- ✅ Basic rendering
- ✅ Props and variants
- ✅ States (loading, disabled)
- ✅ Interactions (press, touch)
- ✅ Accessibility
- ✅ Themes (light/dark)
- ✅ Integration with other components

### 🔧 Development

#### Creating a New Component

1. **Create structure:**

```bash
mkdir src/presentation/components/NewComponent
touch src/presentation/components/NewComponent/index.tsx
mkdir src/presentation/components/NewComponent/__tests__
touch src/presentation/components/NewComponent/__tests__/NewComponent.test.tsx
```

2. **Use basic template:**

```tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useThemeColors } from '@/presentation/themes/useThemeColors';

interface NewComponentProps {
  // Component props
}

export const NewComponent: React.FC<NewComponentProps> = ({ ... }) => {
  const colors = useThemeColors();

  return (
    <View style={styles.container}>
      {/* Component content */}
    </View>
  );
};
```

3. **Implement accessibility:**

```tsx
<View
  accessibilityLabel="Description for screen readers"
  accessibilityRole="button"
  accessibilityHint="Usage hint"
>
```

4. **Add tests:**

```tsx
import { render, fireEvent } from '@testing-library/react-native';
import { NewComponent } from '../index';

describe('NewComponent', () => {
  it('renders correctly', () => {
    const { getByText } = render(<NewComponent />);
    expect(getByText('Expected text')).toBeTruthy();
  });
});
```

#### Development Patterns

**Required:**

- ✅ Use `useThemeColors` for colors
- ✅ Implement accessibility (WCAG AA)
- ✅ Write unit tests
- ✅ Document props with TypeScript
- ✅ Follow naming conventions

**Recommended:**

- ✅ Add integration tests
- ✅ Use design tokens for spacing
- ✅ Implement smooth animations
- ✅ Support light/dark themes
- ✅ Add usage examples

### 📚 Documentation

- **Design System:** `docs/DESIGN_SYSTEM.md`
- **Testing:** `docs/TESTING.md`
- **Accessibility:** `docs/ACCESSIBILITY.md`

---

_This component library is maintained by the MindMate Voice team and follows React Native best practices._
