import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request: NextRequest) {
  try {
    // Verifica se a API key está configurada
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { 
          error: "Chave da OpenAI não configurada",
          message: "Configure a variável OPENAI_API_KEY no banner laranja acima."
        },
        { status: 500 }
      );
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const { image } = await request.json();

    if (!image) {
      return NextResponse.json(
        { error: "Imagem não fornecida" },
        { status: 400 }
      );
    }

    // Análise da imagem usando OpenAI Vision
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `Você é um analista financeiro especializado em análise técnica de gráficos. 
          Analise o gráfico fornecido e forneça uma recomendação clara de COMPRA, VENDA ou AGUARDAR.
          
          Responda SEMPRE em formato JSON com a seguinte estrutura:
          {
            "recommendation": "buy" | "sell" | "hold",
            "confidence": número entre 0-100,
            "analysis": "análise detalhada em português",
            "keyPoints": ["ponto 1", "ponto 2", "ponto 3"]
          }
          
          Considere:
          - Tendências de preço (alta, baixa, lateral)
          - Padrões gráficos (suporte, resistência, candles)
          - Volume de negociação
          - Indicadores técnicos visíveis (médias móveis, RSI, MACD, etc)
          - Momentum do mercado
          
          Seja objetivo e profissional.`,
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Analise este gráfico financeiro e me diga se devo comprar, vender ou aguardar. Forneça uma análise técnica completa.",
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
      max_tokens: 1000,
      temperature: 0.7,
    });

    const content = response.choices[0].message.content;
    
    if (!content) {
      throw new Error("Resposta vazia da API");
    }

    // Parse do JSON da resposta
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Formato de resposta inválido");
    }

    const result = JSON.parse(jsonMatch[0]);

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Erro na análise:", error);
    
    // Mensagens de erro mais específicas
    let errorMessage = "Erro ao analisar a imagem";
    
    if (error?.error?.code === "invalid_api_key") {
      errorMessage = "Chave da OpenAI inválida. Verifique sua configuração.";
    } else if (error?.error?.code === "insufficient_quota") {
      errorMessage = "Limite de uso da OpenAI atingido. Verifique sua conta.";
    } else if (error?.message) {
      errorMessage = error.message;
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
