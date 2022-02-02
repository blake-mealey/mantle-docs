import { JSONSchema7 } from 'json-schema';
import remark from 'remark';
import visit from 'unist-util-visit';
import remarkGfm from 'remark-gfm';
import { list, listItem, paragraph, text } from 'mdast-builder';

const simplify = () => {
  return (tree: any, _file: any) => {
    visit(tree, 'code', (node: any) => {
      console.log(node);

      node.meta = undefined;
    });

    visit(tree, 'table', (node: any, index, parent) => {
      const [_header, ...rows] = node.children;

      const ul: any = list(
        'unordered',
        rows.map((row: any) => {
          const [value, description] = row.children;

          return listItem(
            paragraph([...value.children, text(': '), ...description.children])
          );
        })
      );
      ul.spread = false;
      parent.children[index] = ul;
    });
  };
};

const processor = remark().use(remarkGfm).use(simplify);
async function simplifyMarkdown(md: string) {
  const { contents } = await processor.process(md);

  return contents.toString();
}

export async function simplifySchemaMarkdown(schema: JSONSchema7) {
  if (schema.description) {
    schema.description = await simplifyMarkdown(schema.description);
  }

  if (schema.properties) {
    await Promise.all(
      Object.values(schema.properties).map(async (definition) => {
        if (typeof definition !== 'boolean') {
          await simplifySchemaMarkdown(definition);
        }
      })
    );
  }
}
