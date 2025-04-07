
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { dataSource, clientName, quarter, year, llmType, llmApiKey } = await req.json();

    // Validate required fields
    if (!dataSource || !clientName || !quarter || !year || !llmType || !llmApiKey) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Define API endpoint based on LLM type
    let apiEndpoint, requestBody, headers, extractResponse;
    const basePrompt = `Generate a comprehensive Brand Sentiment Analysis (BSA) report for ${clientName} for Q${quarter} ${year} based on the following data:\n\n${dataSource}\n\nThe report should include:\n- Overall BSA Score (out of 10)\n- Sentiment distribution (positive, negative, neutral percentages)\n- Department performance analysis\n- Key strengths and areas for improvement\n- Strategic recommendations\n- Trend analysis compared to previous quarters (if data available)\n- Key positive and negative reviews\n\nProvide the report in a structured format that can be easily parsed into sections for a dashboard.`;

    switch (llmType) {
      case 'openai':
        apiEndpoint = 'https://api.openai.com/v1/chat/completions';
        headers = {
          'Authorization': `Bearer ${llmApiKey}`,
          'Content-Type': 'application/json'
        };
        requestBody = JSON.stringify({
          model: 'gpt-4o',
          messages: [
            { role: 'system', content: 'You are a professional brand sentiment analyst who specializes in creating detailed reports.' },
            { role: 'user', content: basePrompt }
          ],
          temperature: 0.3,
        });
        extractResponse = (data) => data.choices[0].message.content;
        break;
      case 'anthropic':
        apiEndpoint = 'https://api.anthropic.com/v1/messages';
        headers = {
          'x-api-key': llmApiKey,
          'anthropic-version': '2023-06-01',
          'Content-Type': 'application/json'
        };
        requestBody = JSON.stringify({
          model: 'claude-3-opus-20240229',
          max_tokens: 4000,
          messages: [
            { role: 'user', content: basePrompt }
          ],
          temperature: 0.3,
        });
        extractResponse = (data) => data.content[0].text;
        break;
      case 'gemini':
        apiEndpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent';
        headers = {
          'Content-Type': 'application/json'
        };
        requestBody = JSON.stringify({
          contents: [
            { role: 'user', parts: [{ text: basePrompt }] }
          ],
          generationConfig: {
            temperature: 0.3,
          }
        });
        apiEndpoint += `?key=${llmApiKey}`;
        extractResponse = (data) => data.candidates[0].content.parts[0].text;
        break;
      case 'deepseek':
        apiEndpoint = 'https://api.deepseek.com/v1/chat/completions';
        headers = {
          'Authorization': `Bearer ${llmApiKey}`,
          'Content-Type': 'application/json'
        };
        requestBody = JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            { role: 'system', content: 'You are a professional brand sentiment analyst who specializes in creating detailed reports.' },
            { role: 'user', content: basePrompt }
          ],
          temperature: 0.3,
        });
        extractResponse = (data) => data.choices[0].message.content;
        break;
      default:
        return new Response(
          JSON.stringify({ error: 'Invalid LLM type' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }

    // Call the selected LLM API
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: headers,
      body: requestBody
    });

    if (!response.ok) {
      const error = await response.text();
      console.error(`LLM API error: ${error}`);
      return new Response(
        JSON.stringify({ error: `Error calling ${llmType} API: ${response.status} ${response.statusText}` }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    const generatedReport = extractResponse(data);

    // Process the generated report to create a structured JSON
    // For now, we'll return the raw report text
    // In a real-world scenario, you'd want to further structure this data
    return new Response(
      JSON.stringify({ 
        report: generatedReport,
        clientName,
        quarter,
        year,
        generatedAt: new Date().toISOString()
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error generating BSA report:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
