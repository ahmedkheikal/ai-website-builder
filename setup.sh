#!/bin/bash

echo "🚀 Setting up Website Sections Generator..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v18 or higher."
    exit 1
fi

echo "✅ Node.js is installed"

# Check if Ollama is installed (optional)
if ! command -v ollama &> /dev/null; then
    echo "⚠️  Ollama is not installed. You can install it for local AI generation:"
    echo "   Visit: https://ollama.ai/download"
    echo "   Or run: curl -fsSL https://ollama.ai/install.sh | sh"
    echo ""
fi

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "🔑 Creating .env file..."
    cat > .env << EOF
OPENAI_API_KEY=your_openai_api_key_here
AI_PROVIDER=openai
OLLAMA_URL=http://localhost:11434
OLLAMA_MODEL=llama3.2:3b
EOF
    echo "⚠️  Please update the OPENAI_API_KEY in backend/.env with your actual API key"
    echo "   You can also change AI_PROVIDER to 'ollama' to use local models"
fi

cd ..

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
npm install
cd ..

echo "✅ Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Update the OPENAI_API_KEY in backend/.env with your actual API key"
echo "2. Make sure MongoDB is running"
echo "3. (Optional) Install and start Ollama for local AI generation"
echo "4. Start the backend: cd backend && npm run start:dev"
echo "5. Start the frontend: cd frontend && npm run dev"
echo ""
echo "🌐 Frontend will be available at: http://localhost:3000"
echo "🔧 Backend will be available at: http://localhost:3001"
echo ""
echo "🤖 AI Providers:"
echo "   - OpenAI: Requires API key, high quality, paid service"
echo "   - Ollama: Local models, free, requires Ollama installation" 