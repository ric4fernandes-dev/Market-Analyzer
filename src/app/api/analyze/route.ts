import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { image } = await request.json();

    if (!image) {
      return NextResponse.json(
        { error: "Imagem não fornecida" },
        { status: 400 }
      );
    }

    // Verificar se a chave da OpenAI está configurada
    const apiKey = process.env.OPENAI_API_KEY;
    
    console.log("=== DEBUG INICIO ===");
    console.log("API Key presente:", !!apiKey);
    console.log("API Key começa com sk-:", apiKey?.startsWith('sk-'));
    console.log("Tamanho da imagem:", image.length);
    
    if (!apiKey) {
      console.error("OPENAI_API_KEY não configurada");
      return NextResponse.json(
        { error: "Chave da API OpenAI não configurada. Configure a variável OPENAI_API_KEY nas configurações do projeto." },
        { status: 400 }
      );
    }

    // Validar formato da chave
    if (!apiKey.startsWith('sk-')) {
      console.error("OPENAI_API_KEY com formato inválido");
      return NextResponse.json(
        { error: "Chave da API OpenAI com formato inválido. A chave deve começar com 'sk-'." },
        { status: 400 }
      );
    }

    // Extrair apenas a parte base64 da imagem
    const base64Image = image.split(",")[1] || image;

    // Validar se é uma imagem base64 válida
    if (!base64Image || base64Image.length < 100) {
      return NextResponse.json(
        { error: "Imagem inválida ou corrompida" },
        { status: 400 }
      );
    }

    console.log("Iniciando análise com OpenAI Vision API...");
    console.log("Tamanho base64:", base64Image.length);

    const requestBody = {
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `Você é um analista técnico especializado em mercados financeiros. Analise o gráfico fornecido e forneça uma recomendação clara.

Sua análise deve considerar:
- Padrões de candlestick (doji, martelo, engolfo, etc)
- Tendências (alta, baixa, lateral)
- Suportes e resistências
- Volume de negociação
- Indicadores técnicos visíveis (médias móveis, RSI, MACD, etc)
- Padrões gráficos (triângulos, bandeiras, ombro-cabeça-ombro, etc)

Responda APENAS com um JSON no seguinte formato:
{
  "recommendation": "buy" | "sell" | "hold",
  "confidence": número entre 0-100,
  "analysis": "explicação detalhada da análise em português"
}

Regras:
- "buy" = sinais claros de compra (tendência de alta, rompimento de resistência, padrões de alta)
- "sell" = sinais claros de venda (tendência de baixa, rompimento de suporte, padrões de baixa)
- "hold" = sinais mistos ou inconclusivos, aguardar melhor momento
- confidence deve refletir a força dos sinais identificados (0-100%)`,
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Analise este gráfico financeiro e forneça uma recomendação de trading.",
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`,
              },
            },
          ],
        },
      ],
      max_tokens: 1000,
      temperature: 0.3,
    };

    console.log("Enviando requisição para OpenAI...");

    // Chamar OpenAI Vision API para análise
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(requestBody),
    });

    console.log("Resposta da OpenAI recebida. Status:", response.status);
    console.log("Status Text:", response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("=== ERRO COMPLETO DA OPENAI ===");
      console.error("Status:", response.status);
      console.error("Status Text:", response.statusText);
      console.error("Response Body:", errorText);
      
      let errorData;
      try {
        errorData = JSON.parse(errorText);
        console.error("Error Data (parsed):", JSON.stringify(errorData, null, 2));
      } catch {
        console.error("Não foi possível parsear erro como JSON");
        errorData = { message: errorText };
      }
      
      // Mensagens de erro mais específicas
      if (response.status === 401) {
        return NextResponse.json(
          { error: `Chave da API OpenAI inválida ou expirada. Detalhes: ${errorData.error?.message || errorText}` },
          { status: 401 }
        );
      } else if (response.status === 429) {
        return NextResponse.json(
          { error: `Limite de requisições da OpenAI excedido. Detalhes: ${errorData.error?.message || errorText}` },
          { status: 429 }
        );
      } else if (response.status === 400) {
        return NextResponse.json(
          { error: `Erro na requisição: ${errorData.error?.message || errorText}` },
          { status: 400 }
        );
      } else {
        return NextResponse.json(
          { error: `Erro ao comunicar com OpenAI (${response.status}): ${errorData.error?.message || errorText}` },
          { status: response.status }
        );
      }
    }

    const data = await response.json();
    console.log("Dados da OpenAI processados com sucesso");
    console.log("Response data:", JSON.stringify(data, null, 2));

    const content = data.choices[0]?.message?.content;

    if (!content) {
      console.error("Resposta da OpenAI sem conteúdo:", data);
      return NextResponse.json(
        { error: "Resposta inválida da IA. Tente novamente." },
        { status: 500 }
      );
    }

    console.log("Conteúdo recebido:", content);

    // Extrair JSON da resposta
    let analysisResult;
    try {
      // Tentar parsear diretamente
      analysisResult = JSON.parse(content);
    } catch {
      // Se falhar, tentar extrair JSON do texto
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          analysisResult = JSON.parse(jsonMatch[0]);
        } catch (parseError) {
          console.error("Erro ao parsear JSON extraído:", parseError);
          console.error("Conteúdo recebido:", content);
          return NextResponse.json(
            { error: "Não foi possível processar a resposta da IA. Tente novamente." },
            { status: 500 }
          );
        }
      } else {
        console.error("JSON não encontrado na resposta:", content);
        return NextResponse.json(
          { error: "Formato de resposta inválido da IA. Tente novamente." },
          { status: 500 }
        );
      }
    }

    // Validar estrutura da resposta
    if (
      !analysisResult.recommendation ||
      typeof analysisResult.confidence !== "number" ||
      !analysisResult.analysis
    ) {
      console.error("Estrutura de resposta inválida:", analysisResult);
      return NextResponse.json(
        { error: "Formato de resposta inválido. Tente novamente." },
        { status: 500 }
      );
    }

    // Garantir que confidence está entre 0-100
    analysisResult.confidence = Math.max(
      0,
      Math.min(100, analysisResult.confidence)
    );

    console.log("Análise concluída com sucesso:", {
      recommendation: analysisResult.recommendation,
      confidence: analysisResult.confidence
    });
    console.log("=== DEBUG FIM ===");

    return NextResponse.json(analysisResult);
  } catch (error) {
    console.error("=== ERRO CATCH GERAL ===");
    console.error("Erro ao processar análise:", error);
    console.error("Stack trace:", error instanceof Error ? error.stack : "N/A");
    
    // Tratamento específico para erros de rede
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return NextResponse.json(
        { error: "Erro de conexão com a API OpenAI. Verifique sua conexão com a internet." },
        { status: 503 }
      );
    }
    
    return NextResponse.json(
      { 
        error: "Erro interno ao processar análise. Tente novamente.",
        details: error instanceof Error ? error.message : "Erro desconhecido"
      },
      { status: 500 }
    );
  }
}
