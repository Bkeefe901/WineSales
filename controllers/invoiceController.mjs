import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic(); // picks up ANTHROPIC_API_KEY from env automatically

const invoiceCTRL = {
  async parseInvoice(req, res) {
    if (!req.file) {
      return res.status(400).json({ msg: "No PDF file provided" });
    }

    const base64PDF = req.file.buffer.toString("base64");

    const response = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 512,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "document",
              source: {
                type: "base64",
                media_type: "application/pdf",
                data: base64PDF,
              },
            },
            {
              type: "text",
              text: `Extract invoice details and return ONLY a valid JSON object with these fields:
{
  "invoiceId": string or null,
  "saleDate": "YYYY-MM-DD" or null,
  "shopName": string or null,
  "total": number or null
}
No explanation, no markdown, just the JSON object.`,
            },
          ],
        },
      ],
    });

    const text = response.content[0].text.trim();
    const parsed = JSON.parse(text);

    res.json(parsed);
  },
};

export default invoiceCTRL;
