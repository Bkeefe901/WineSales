import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic(); // picks up ANTHROPIC_API_KEY from env automatically

const invoiceCTRL = {
  async parseInvoice(req, res) {
    if (!req.file) {
      return res.status(400).json({ msg: "No PDF file provided" });
    }

    const base64PDF = req.file.buffer.toString("base64");
    const initials = req.body.initials || "TK";

    const response = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 2048,
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
              text: `This PDF contains one or more invoices, one per page. Only extract invoices where the PO Number field is exactly "${initials}" — skip any page where it is not. For each qualifying page extract the following fields and return ONLY a valid JSON array with no explanation or markdown:

- "invoiceId": the Invoice Number field
- "saleDate": the Invoice Date field, converted to YYYY-MM-DD format
- "shopName": the first line of the Billing Address (the company or customer name)
- "total": the Total field as a plain number with no currency symbol

If no invoices qualify, return an empty array [].

[
  {
    "invoiceId": string or null,
    "saleDate": "YYYY-MM-DD" or null,
    "shopName": string or null,
    "total": number or null
  }
]`,
            },
          ],
        },
      ],
    });

    const text = response.content[0].text.trim().replace(/^```json\s*/i, "").replace(/\s*```$/, "");

    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch {
      console.error("Claude response was not valid JSON:", text);
      return res.status(500).json({ msg: "Failed to parse Claude response", raw: text });
    }

    res.json(parsed);
  },
};

export default invoiceCTRL;
