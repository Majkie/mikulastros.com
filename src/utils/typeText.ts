export const typeText = async (
  html: string,
  setOutput: (result: string) => void,
  delay: number = 5
): Promise<void> => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  let result = "";

  const walkNodes = async (nodeList: NodeListOf<ChildNode> | ChildNode[]): Promise<void> => {
    for (const node of nodeList) {
      if (node.nodeType === Node.TEXT_NODE && node.textContent) {
        // Type text content character by character
        for (const char of node.textContent) {
          result += char;
          setOutput(result);
          await new Promise((r) => setTimeout(r, delay));
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as HTMLElement;
        const tag = el.tagName.toLowerCase();

        const attrs = Array.from(el.attributes)
          .map((a) => `${a.name}="${a.value}"`)
          .join(" ");

        result += `<${tag}${attrs ? ` ${attrs}` : ""}>`;
        setOutput(result);

        await walkNodes(Array.from(node.childNodes));

        result += `</${tag}>`;
        setOutput(result);
      }
    }
  };

  await walkNodes(Array.from(tempDiv.childNodes));
};