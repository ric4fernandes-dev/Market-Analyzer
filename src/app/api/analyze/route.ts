import { NextRequest, NextResponse } from "next/server";

// Força a rota a ser dinâmica (não será pré-renderizada no build)
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const revalidate = 0;

export async function POST(request: NextRequest) {
  try {
    const { image } = await request.json();

    if (!image) {
      return NextResponse.json(
        { error: "Imagem não fornecida" },
        { status: 400 }
      );
    }

    // Verifica se a chave da OpenAI está configurada
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Chave da OpenAI não configurada. Configure a variável OPENAI_API_KEY nas variáveis de ambiente." },
        { status: 500 }
      );
    }

    // Importação dinâmica do OpenAI apenas em runtime
    const { default: OpenAI } = await import("openai");
    const openai = new OpenAI({ apiKey });

    // Análise da imagem usando OpenAI Vision
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `Você é um analista financeiro especializado em análise técnica de gráficos. 
          Analise o gráfico fornecido e forneça uma recomendação clara de COMPRA, VENDA ou AGUARDAR.
          
          Responda SEMPRE APENAS com um JSON válido (sem texto adicional), seguindo EXATAMENTE esta estrutura:
          {
            "recommendation": "buy",
            "confidence": 85,
            "analysis": "Análise detalhada aqui",
            "keyPoints": ["Ponto 1", "Ponto 2", "Ponto 3"]
          }
          
          REGRAS OBRIGATÓRIAS:
          - recommendation: APENAS "buy", "sell" ou "hold" (minúsculas)
          - confidence: número inteiro entre 0 e 100 (SEM símbolo %)
          - analysis: texto em português explicando a análise
          - keyPoints: array com 3-5 pontos importantes
          
          Considere na análise:
          - Tendências de preço (alta, baixa, lateral)
          - Padrões gráficos (suporte, resistência, candles)
          - Volume de negociação
          - Indicadores técnicos visíveis (médias móveis, RSI, MACD, etc)
          - Momentum do mercado
          
          IMPORTANTE: Retorne APENAS o JSON, sem texto antes ou depois.`,
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Analise este gráfico financeiro e retorne APENAS o JSON com sua análise técnica completa.",
            },
            {
              type: "image_url",
              image_url: {
                url: image,
              },
            },
          ],
        },
      ],
      max_tokens: 1500,
      temperature: 0.5,
      response_format: { type: "json_object" },
    });

    const content = response.choices[0].message.content;
    
    if (!content) {
      throw new Error("Resposta vazia da API");
    }

    // Parse do JSON da resposta
    let result;
    try {
      result = JSON.parse(content);
    } catch (parseError) {
      console.error("Erro ao fazer parse do JSON:", content);
      // Tenta extrair JSON do conteúdo
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        result = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("Não foi possível extrair JSON válido da resposta");
      }
    }

    // Validação e normalização dos dados
    const validatedResult = {
      recommendation: (result.recommendation || "hold").toLowerCase(),
      confidence: Math.min(100, Math.max(0, parseInt(result.confidence) || 0)),
      analysis: result.analysis || "Análise não disponível",
      keyPoints: Array.isArray(result.keyPoints) ? result.keyPoints : ["Análise em andamento"]
    };

    // Garante que recommendation é válido
    if (!["buy", "sell", "hold"].includes(validatedResult.recommendation)) {
      validatedResult.recommendation = "hold";
    }

    console.log("Resultado validado:", validatedResult);

    return NextResponse.json(validatedResult);
  } catch (error) {
    console.error("Erro na análise:", error);
    return NextResponse.json(
      { 
        error: "Erro ao analisar a imagem",
        details: error instanceof Error ? error.message : "Erro desconhecido"
      },
      { status: 500 }
    );
  }
}
