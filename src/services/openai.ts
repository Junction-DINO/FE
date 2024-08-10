import axios from 'axios';

const apiKey = import.meta.env.VITE_AI_DATA;

export const sendMessageToOpenAI = async (message: string) => {
  const response = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: message }],
    },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    },
  );

  return response.data.choices[0].message.content;
};
