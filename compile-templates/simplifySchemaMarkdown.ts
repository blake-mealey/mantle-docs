import { JSONSchema7 } from 'json-schema';
import remark, { RemarkOptions } from 'remark';
import visit from 'unist-util-visit';
import remarkGfm from 'remark-gfm';
import admonitions from 'remark-admonitions';
import { list, listItem, paragraph, text } from 'mdast-builder';

const simplify = () => {
  return (tree: any, _file: any) => {
    visit(tree, 'code', (node: any) => {
      // console.log(node);

      delete node.meta;
      delete node.lang;

      // console.log(node);
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

const processor = remark()
  .data('settings', {} as RemarkOptions)
  .use(admonitions, {})
  .use(remarkGfm)
  .use(simplify);

async function simplifyMarkdown(md: string) {
  const { contents } = await processor.process(md);
  // I couldn't find a way to stop remark from adding these comments
  return contents.toString().replace(/<!---->\n/g, '');
}

export async function simplifySchemaMarkdown(
  schema: JSONSchema7,
  title?: string
) {
  schema.title = title;

  if (schema.description) {
    const newDesc = await simplifyMarkdown(schema.description);
    // console.log('\n\n\nBEFORE:');
    // console.log(schema.description);
    // console.log('\nAFTER:');
    // console.log(newDesc);
    schema.description = newDesc;
  }

  if (schema.properties) {
    for (const [name, definition] of Object.entries(schema.properties)) {
      if (typeof definition !== 'boolean') {
        await simplifySchemaMarkdown(definition, name);
      }
    }
  }

  if (schema.oneOf) {
    for (const definition of Object.values(schema.oneOf)) {
      if (typeof definition !== 'boolean') {
        await simplifySchemaMarkdown(definition);
      }
    }
  }

  if (schema.anyOf) {
    for (const definition of Object.values(schema.anyOf)) {
      if (typeof definition !== 'boolean') {
        await simplifySchemaMarkdown(definition);
      }
    }
  }

  if (typeof schema.items === 'object') {
    const items = Array.isArray(schema.items) ? schema.items : [schema.items];
    for (const definition of items) {
      console.log(definition);

      if (typeof definition !== 'boolean') {
        await simplifySchemaMarkdown(definition);
      }
    }
  }

  if (typeof schema.additionalProperties === 'object') {
    await simplifySchemaMarkdown(schema.additionalProperties);
  }
}
