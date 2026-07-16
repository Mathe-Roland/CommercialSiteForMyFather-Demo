export const formatForURL = (str) => {
  return str
    .trim() // Eliminăm spațiile de la început și sfârșit
    .replace(/\s+/g, "-") // Înlocuim toate spațiile cu "-"
    .replace(/[^a-zA-Z0-9-]/g, "").toLowerCase(); // Permitem atât litere mari cât și mici, cifre și "-"
};


export const syncCartToDB = async (items, token) => {

  await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/panouritraforates/actions/sync`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({ items }),
});

};


type ArticleBlock =
  | { type: "paragraph"; content: string }
  | { type: "heading"; content: string }
  | { type: "image"; index: number }
  | { type: "list"; items: string[] }
  | { type: "ordered-item"; number: number; title: string };



 export function parseArticle(description: string): ArticleBlock[] {
  const blocks: ArticleBlock[] = [];

  // Normalize the text so every special marker starts on its own line
  description = description
    .replace(/✔/g, "\n✔")
    .replace(/•/g, "\n•")
    .replace(/📷/g, "\n📷");

  const lines = description.split("\n");

  let paragraph: string[] = [];
  let list: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length) {
      blocks.push({
        type: "paragraph",
        content: paragraph.join(" "),
      });

      paragraph = [];
    }
  };

  const flushList = () => {
    if (list.length) {
      blocks.push({
        type: "list",
        items: [...list],
      });

      list = [];
    }
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();

    // ---------------- EMPTY LINE ----------------

    if (!line) {
      flushParagraph();
      flushList();
      continue;
    }

    // ---------------- IMAGE ----------------

    const imageMatch = line.match(/📷\s*Imagine\s+(\d+)/);

    if (imageMatch) {
      flushParagraph();
      flushList();

      blocks.push({
        type: "image",
        index: Number(imageMatch[1]) - 1,
      });

      continue;
    }

    // ---------------- ORDERED ITEM ----------------

    const orderedMatch = line.match(/^(\d+)\.\s+(.*)$/);

    if (orderedMatch) {
      flushParagraph();
      flushList();

      blocks.push({
        type: "ordered-item",
        number: Number(orderedMatch[1]),
        title: orderedMatch[2],
      });

      continue;
    }

    // ---------------- BULLET / CHECK LIST ----------------

    if (line.startsWith("•") || line.startsWith("✔")) {
      list.push(line.replace(/^[•✔]\s*/, ""));
      continue;
    }

    flushList();

    // ---------------- HEADINGS ----------------

    if (
      line === "Concluzie" ||
      line === "Întrebări frecvente" ||
      line === "Cum alegi dimensiunea corectă?" ||
      line === "Ce este o mască de calorifer?" ||
      line.startsWith("5 motive pentru")
    ) {
      flushParagraph();

      blocks.push({
        type: "heading",
        content: line,
      });

      continue;
    }

    // ---------------- NORMAL PARAGRAPH ----------------

    paragraph.push(line);
  }

  flushParagraph();
  flushList();

  return blocks;
}