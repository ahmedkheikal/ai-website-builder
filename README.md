# Website Sections Generator

An AI-powered application that generates website sections using multiple AI providers. Given a website idea, it creates three sections (Hero, About, Contact) with compelling titles and 150-word content for each.

## Features

- 🤖 **Multiple AI Providers**: Choose between OpenAI GPT-4 and Ollama (local models)
- 📝 Generate Hero, About, and Contact sections
- 💾 MongoDB storage for generated sections
- 🎨 Modern React frontend with Tailwind CSS
- ⚡ Fast NestJS backend
- 🔄 Real-time loading states and error handling
- 🔧 Easy provider switching via UI

## AI Providers

### OpenAI GPT-4
- **Pros**: High-quality content, reliable, professional results
- **Cons**: Requires API key, paid service
- **Best for**: Production use, professional content

### Ollama (Local Models)
- **Pros**: Free, private, no API limits, runs locally
- **Cons**: Requires local installation, may be slower
- **Best for**: Development, privacy-conscious users

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (running locally or cloud instance)
- OpenAI API key (for OpenAI provider)
- Ollama (optional, for local AI generation)

## Setup

### 1. Clone the repository
```bash
git clone <repository-url>
cd stunning.so-task
```

### 2. Quick Setup
```bash
./setup.sh
```

### 3. Manual Setup

#### Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```bash
OPENAI_API_KEY=your_openai_api_key_here
AI_PROVIDER=openai
OLLAMA_URL=http://localhost:11434
OLLAMA_MODEL=llama3.2:3b
```

Start the backend:
```bash
npm run start:dev
```

#### Frontend Setup
```bash
cd frontend
npm install
```

Start the frontend:
```bash
npm run dev
```

### 4. Ollama Setup (Optional)

If you want to use local AI models:

1. **Install Ollama**:
   ```bash
   curl -fsSL https://ollama.ai/install.sh | sh
   ```

2. **Start Ollama**:
   ```bash
   ollama serve
   ```

3. **Download a model**:
   ```bash
   ollama pull llama3.2:3b
   ```

4. **Update environment**:
   ```bash
   # In backend/.env
   AI_PROVIDER=ollama
   ```

### 5. MongoDB Setup
Make sure MongoDB is running on `mongodb://localhost:27017/website-sections` or update the connection string in `backend/src/app.module.ts`.

## Usage

1. Open the frontend application in your browser
2. Select your preferred AI provider (OpenAI or Ollama)
3. Enter a website idea (e.g., "Landing page for a bakery")
4. Click "Generate Sections"
5. View the AI-generated Hero, About, and Contact sections
6. All generated sections are automatically saved to MongoDB

## API Endpoints

- `POST /sections` - Generate new sections
- `GET /sections` - Get all generated sections
- `GET /sections/models` - Get available models for a provider
- `GET /sections/provider` - Get default AI provider

## Environment Variables

- `OPENAI_API_KEY`: Your OpenAI API key (required for OpenAI provider)
- `AI_PROVIDER`: Default AI provider (`openai` or `ollama`)
- `OLLAMA_URL`: Ollama server URL (default: `http://localhost:11434`)
- `OLLAMA_MODEL`: Default Ollama model (default: `llama3.2:3b`)

## Project Structure

```
├── backend/
│   ├── src/
│   │   ├── sections/
│   │   │   ├── ai.service.ts         # OpenAI integration
│   │   │   ├── ollama.service.ts     # Ollama integration
│   │   │   ├── ai-provider.factory.ts # Provider management
│   │   │   ├── section.schema.ts     # MongoDB schema
│   │   │   ├── sections.service.ts   # Business logic
│   │   │   └── sections.controller.ts # API endpoints
│   │   └── app.module.ts
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── SectionCard.tsx       # Section display component
│   │   ├── types/
│   │   │   └── section.ts            # TypeScript interfaces
│   │   └── app/
│   │       └── page.tsx              # Main application
│   └── package.json
└── README.md
```

## Technologies Used

- **Backend**: NestJS, MongoDB, OpenAI API, Ollama API
- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **AI**: OpenAI GPT-4 and Ollama local models

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License 