# Sistema de Design - MindMate Voice

## 🇧🇷 Português

### Visão Geral

O Sistema de Design do MindMate Voice é uma biblioteca de componentes moderna e acessível, projetada especificamente para aplicações de reconhecimento de voz e inteligência artificial. O sistema oferece uma experiência visual consistente, cores modernas e suporte completo de acessibilidade.

### 🎨 Design Tokens

#### Cores

O sistema utiliza paletas de cores cuidadosamente selecionadas para promover clareza e inovação tecnológica:

**Cores Primárias:**

- `primary`: Azul moderno (#3B82F6)
- `secondary`: Verde suave (#10B981)
- `success`: Verde positivo (#059669)
- `warning`: Amarelo atencioso (#F59E0B)
- `error`: Vermelho suave (#EF4444)

**Cores de Voz e IA:**

- `voice.primary`: Azul de reconhecimento de voz (#3B82F6)
- `voice.secondary`: Azul escuro de voz (#1E40AF)
- `voice.accent`: Azul claro de voz (#60A5FA)
- `voice.background`: Fundo de voz (#EFF6FF)
- `ai.primary`: Roxo de IA (#8B5CF6)
- `ai.secondary`: Roxo escuro de IA (#7C3AED)
- `ai.accent`: Roxo claro de IA (#A78BFA)
- `ai.background`: Fundo de IA (#F3F4F6)

**Cores de Texto:**

- `primary`: Texto principal (#1F2937)
- `secondary`: Texto secundário (#6B7280)
- `disabled`: Texto desabilitado (#9CA3AF)
- `inverse`: Texto sobre fundos escuros (#FFFFFF)

#### Tipografia

**Tamanhos de Fonte:**

- `xs`: 12px
- `sm`: 14px
- `md`: 16px
- `lg`: 18px
- `xl`: 20px
- `2xl`: 24px
- `3xl`: 30px

**Pesos:**

- `normal`: 400
- `medium`: 500
- `semibold`: 600
- `bold`: 700

#### Espaçamento

**Escala de Espaçamento:**

- `xs`: 4px
- `sm`: 8px
- `md`: 16px
- `lg`: 24px
- `xl`: 32px
- `2xl`: 48px
- `3xl`: 64px

**Espaçamentos Específicos:**

- `screenPadding`: 16px
- `cardPadding`: 20px
- `buttonPadding`: 16px

#### Bordas e Sombras

**Raio de Borda:**

- `xs`: 4px
- `sm`: 8px
- `md`: 12px
- `lg`: 16px
- `xl`: 24px

**Sombras:**

- `sm`: Sombra sutil para elevação baixa
- `md`: Sombra média para cards e botões
- `lg`: Sombra forte para modais

### 🧩 Componentes

#### VoiceAIButton

Botão moderno e acessível com múltiplas variantes para aplicações de voz e IA.

**Props:**

```typescript
interface VoiceAIButtonProps {
  title: string; // Texto do botão
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'voice' | 'ai';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean; // Estado de carregamento
  disabled?: boolean; // Estado desabilitado
  fullWidth?: boolean; // Largura total
  outlined?: boolean; // Estilo outline
  onPress?: () => void; // Callback de press
  style?: any; // Estilos customizados
  animated?: boolean; // Animação no press
  accessibilityLabel?: string; // Label de acessibilidade
  leftIcon?: React.ReactNode; // Ícone à esquerda
  rightIcon?: React.ReactNode; // Ícone à direita
}
```

**Exemplo de Uso:**

```tsx
import { VoiceAIButton } from '@/presentation/components/VoiceAIButton';

<VoiceAIButton
  title="Iniciar Reconhecimento"
  variant="voice"
  size="large"
  onPress={() => console.log('Botão pressionado')}
  leftIcon={<Icon name="mic" />}
/>;
```

#### VoiceAICard

Card moderno com cores temáticas de voz e IA.

**Props:**

```typescript
interface VoiceAICardProps {
  title: string; // Título do card
  subtitle?: string; // Subtítulo opcional
  children: React.ReactNode; // Conteúdo do card
  type?: 'voice' | 'ai' | 'primary' | 'secondary' | 'info';
  interactive?: boolean; // Se é clicável
  onPress?: () => void; // Callback de press
  style?: any; // Estilos customizados
  animated?: boolean; // Animação no press
  accessibilityLabel?: string; // Label de acessibilidade
}
```

**Exemplo de Uso:**

```tsx
import { VoiceAICard } from '@/presentation/components/VoiceAICard';

<VoiceAICard
  title="Reconhecimento de Voz"
  subtitle="Processamento inteligente"
  type="voice"
  interactive
  onPress={() => console.log('Card pressionado')}
>
  <Text>Fale naturalmente e deixe a IA processar suas palavras.</Text>
</VoiceAICard>;
```

### 🎯 Hook useThemeColors

Hook personalizado para acessar cores do tema atual.

**Uso:**

```tsx
import { useThemeColors } from '@/presentation/themes/useThemeColors';

const MyComponent = () => {
  const colors = useThemeColors();

  return (
    <View style={{ backgroundColor: colors.voice.background }}>
      <Text style={{ color: colors.text.primary }}>Conteúdo</Text>
    </View>
  );
};
```

### 🌙 Temas

O sistema suporta temas claro e escuro automaticamente:

**Tema Claro:**

- Fundo principal: #FFFFFF
- Fundo secundário: #F9FAFB
- Texto principal: #1F2937

**Tema Escuro:**

- Fundo principal: #111827
- Fundo secundário: #1F2937
- Texto principal: #F9FAFB

### ♿ Acessibilidade

Todos os componentes seguem as diretrizes WCAG AA:

- **Contraste de Cores:** Mínimo 4.5:1 para texto normal
- **Labels de Acessibilidade:** Automáticos ou customizáveis
- **Navegação por Teclado:** Suporte completo
- **Screen Readers:** Compatível com VoiceOver e TalkBack
- **Estados de Foco:** Visíveis e claros

### 🧪 Testes

Cada componente possui testes unitários e de integração:

**Executar Testes:**

```bash
# Testes de componentes específicos
npm test -- --testPathPattern="VoiceAICard|VoiceAIButton"

# Todos os testes
npm test
```

### 🔧 Customização

#### Adicionando Novas Cores

1. Edite `src/presentation/themes/colorPalettes.ts`
2. Adicione a nova cor nas paletas claro e escuro
3. Atualize os tipos em `designTokens.ts`

#### Criando Novos Componentes

1. Crie o componente em `src/presentation/components/`
2. Use o hook `useThemeColors` para cores
3. Implemente suporte de acessibilidade
4. Adicione testes unitários e de integração
5. Documente as props e exemplos de uso

---

## 🇺🇸 English

### Overview

The MindMate Voice Design System is a modern and accessible component library designed specifically for voice recognition and AI applications. The system provides a consistent visual experience, modern colors, and complete accessibility support.

### 🎨 Design Tokens

#### Colors

The system uses carefully selected color palettes to promote clarity and technological innovation:

**Primary Colors:**

- `primary`: Modern blue (#3B82F6)
- `secondary`: Soft green (#10B981)
- `success`: Positive green (#059669)
- `warning`: Attentive yellow (#F59E0B)
- `error`: Soft red (#EF4444)

**Voice and AI Colors:**

- `voice.primary`: Voice recognition blue (#3B82F6)
- `voice.secondary`: Darker voice blue (#1E40AF)
- `voice.accent`: Light voice blue (#60A5FA)
- `voice.background`: Voice background (#EFF6FF)
- `ai.primary`: AI purple (#8B5CF6)
- `ai.secondary`: Darker AI purple (#7C3AED)
- `ai.accent`: Light AI purple (#A78BFA)
- `ai.background`: AI background (#F3F4F6)

**Text Colors:**

- `primary`: Main text (#1F2937)
- `secondary`: Secondary text (#6B7280)
- `disabled`: Disabled text (#9CA3AF)
- `inverse`: Text on dark backgrounds (#FFFFFF)

#### Typography

**Font Sizes:**

- `xs`: 12px
- `sm`: 14px
- `md`: 16px
- `lg`: 18px
- `xl`: 20px
- `2xl`: 24px
- `3xl`: 30px

**Font Weights:**

- `normal`: 400
- `medium`: 500
- `semibold`: 600
- `bold`: 700

#### Spacing

**Spacing Scale:**

- `xs`: 4px
- `sm`: 8px
- `md`: 16px
- `lg`: 24px
- `xl`: 32px
- `2xl`: 48px
- `3xl`: 64px

**Specific Spacing:**

- `screenPadding`: 16px
- `cardPadding`: 20px
- `buttonPadding`: 16px

#### Borders and Shadows

**Border Radius:**

- `xs`: 4px
- `sm`: 8px
- `md`: 12px
- `lg`: 16px
- `xl`: 24px

**Shadows:**

- `sm`: Subtle shadow for low elevation
- `md`: Medium shadow for cards and buttons
- `lg`: Strong shadow for modals

### 🧩 Components

#### VoiceAIButton

Modern and accessible button with multiple variants for voice and AI applications.

**Props:**

```typescript
interface VoiceAIButtonProps {
  title: string; // Button text
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'voice' | 'ai';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean; // Loading state
  disabled?: boolean; // Disabled state
  fullWidth?: boolean; // Full width
  outlined?: boolean; // Outline style
  onPress?: () => void; // Press callback
  style?: any; // Custom styles
  animated?: boolean; // Press animation
  accessibilityLabel?: string; // Accessibility label
  leftIcon?: React.ReactNode; // Left icon
  rightIcon?: React.ReactNode; // Right icon
}
```

**Usage Example:**

```tsx
import { VoiceAIButton } from '@/presentation/components/VoiceAIButton';

<VoiceAIButton
  title="Start Recognition"
  variant="voice"
  size="large"
  onPress={() => console.log('Button pressed')}
  leftIcon={<Icon name="mic" />}
/>;
```

#### VoiceAICard

Modern card with voice and AI themed colors.

**Props:**

```typescript
interface VoiceAICardProps {
  title: string; // Card title
  subtitle?: string; // Optional subtitle
  children: React.ReactNode; // Card content
  type?: 'voice' | 'ai' | 'primary' | 'secondary' | 'info';
  interactive?: boolean; // If clickable
  onPress?: () => void; // Press callback
  style?: any; // Custom styles
  animated?: boolean; // Press animation
  accessibilityLabel?: string; // Accessibility label
}
```

**Usage Example:**

```tsx
import { VoiceAICard } from '@/presentation/components/VoiceAICard';

<VoiceAICard
  title="Voice Recognition"
  subtitle="Intelligent processing"
  type="voice"
  interactive
  onPress={() => console.log('Card pressed')}
>
  <Text>Speak naturally and let AI process your words.</Text>
</VoiceAICard>;
```

### 🎯 useThemeColors Hook

Custom hook to access current theme colors.

**Usage:**

```tsx
import { useThemeColors } from '@/presentation/themes/useThemeColors';

const MyComponent = () => {
  const colors = useThemeColors();

  return (
    <View style={{ backgroundColor: colors.voice.background }}>
      <Text style={{ color: colors.text.primary }}>Content</Text>
    </View>
  );
};
```

### 🌙 Themes

The system supports light and dark themes automatically:

**Light Theme:**

- Main background: #FFFFFF
- Secondary background: #F9FAFB
- Primary text: #1F2937

**Dark Theme:**

- Main background: #111827
- Secondary background: #1F2937
- Primary text: #F9FAFB

### ♿ Accessibility

All components follow WCAG AA guidelines:

- **Color Contrast:** Minimum 4.5:1 for normal text
- **Accessibility Labels:** Automatic or customizable
- **Keyboard Navigation:** Full support
- **Screen Readers:** Compatible with VoiceOver and TalkBack
- **Focus States:** Visible and clear

### 🧪 Testing

Each component has unit and integration tests:

**Run Tests:**

```bash
# Specific component tests
npm test -- --testPathPattern="VoiceAICard|VoiceAIButton"

# All tests
npm test
```

### 🔧 Customization

#### Adding New Colors

1. Edit `src/presentation/themes/colorPalettes.ts`
2. Add the new color to light and dark palettes
3. Update types in `designTokens.ts`

#### Creating New Components

1. Create component in `src/presentation/components/`
2. Use `useThemeColors` hook for colors
3. Implement accessibility support
4. Add unit and integration tests
5. Document props and usage examples

### 📚 File Structure

```
src/presentation/
├── themes/
│   ├── designTokens.ts          # Design tokens and types
│   ├── colorPalettes.ts         # Color palettes
│   ├── light.ts                 # Light theme
│   ├── dark.ts                  # Dark theme
│   └── useThemeColors.ts        # Theme hook
├── components/
│   ├── VoiceAIButton/
│   │   ├── index.tsx
│   │   └── __tests__/
│   └── VoiceAICard/
│       ├── index.tsx
│       └── __tests__/
```

### 🚀 Getting Started

1. **Import Components:**

```tsx
import { VoiceAIButton, VoiceAICard } from '@/presentation/components';
```

2. **Use Theme Hook:**

```tsx
import { useThemeColors } from '@/presentation/themes/useThemeColors';
```

3. **Follow Patterns:**

- Always use design tokens for colors, spacing, and typography
- Implement accessibility features
- Write tests for new components
- Document props and usage examples

### 🔄 Updates and Maintenance

- **Adding New Variants:** Update component props and color mappings
- **Theme Changes:** Modify color palettes and regenerate tokens
- **Accessibility:** Ensure new features meet WCAG guidelines
- **Testing:** Maintain test coverage above 90%

---

_This design system is maintained by the MindMate Voice team and follows React Native best practices._
