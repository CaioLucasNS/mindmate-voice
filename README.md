# 🧠 MindMate Voice

### PT-BR
Aplicativo mobile em React Native com reconhecimento de voz e integração com IA (OpenAI API).  

### EN-US
Mobile app built with React Native featuring voice recognition and AI integration (OpenAI API).

---

## 📦 Tecnologias Principais / Main Technologies

- **React Native** `0.71.x`
- **Typescript**
- **Expo**
- **OpenAI API**
- **tsyringe** (Injeção de dependência / Dependency Injection)
- **Clean Architecture**
- **Jest** (Testes unitários / Unit testing)

---

## 📁 Estrutura de Pastas (Clean Architecture) / Folder Structure (Clean Architecture)

```bash
mindmate-voice/
├── src/
│   ├── domain/              # Entidades e contratos / Entities and interfaces
│   ├── infra/      # Implementações concretas / Concrete implementations
│   ├── presentation/        # UI e hooks
│   ├── services/        # Injeção do tsyringe / tsyringe injection
│   ├── shared/              # Estilos, configs, helpers / Styles, configs, helpers
│   ├── tests/              # Testes unitários / Units tests
│   └── main.ts              # Ponto de entrada / DI entry point
