import { JSONSchema7, JSONSchema7Definition } from 'json-schema';

function getDefinition(
  definitions: Record<string, JSONSchema7Definition>,
  ref: string
) {
  const parts = ref.split('/');
  const name = parts[parts.length - 1];
  return definitions[name];
}

// export default function flattenProperties(
//   schema: JSONSchema7,
//   definitions?: Record<string, JSONSchema7Definition>
// ) {
//   definitions = definitions ?? schema.definitions;

//   let flattened: JSONSchema7Definition[] = [];
//   schema.definitions;

//   if (!schema.properties) {
//     return [];
//   }

//   const properties = Object.entries(schema.properties);
//   for (const [id, prop] of properties) {
//     if (typeof prop === 'boolean') {
//       // TODO: what does it mean when it _is_ a boolean?
//       continue;
//     }
//     console.log(id);

//     flattened.push(prop);

//     if (prop.allOf) {
//       prop.allOf.forEach((element) => {
//         if (typeof element === 'boolean' || !element.$ref) {
//           return;
//         }

//         const definition = getDefinition(definitions, element.$ref);

//         if (!definition || typeof definition === 'boolean') {
//           return;
//         }

//         flattened.push(...flattenProperties(definition, definitions));
//       });
//     }
//   }

//   return flattened;
// }

function formatId(id: string, parentId?: string) {
  return (parentId ? `${parentId}.` : '') + id;
}

function getLevel(id: string) {
  return Math.min(
    6,
    Array.from(id).reduce(
      (n, c) => (c === '.' ? n + 1 : c === '*' ? n - 1 : n),
      3
    )
  );
}

export default function flattenProperties(
  schema: JSONSchema7,
  parentId?: string,
  required?: boolean
) {
  let properties: {
    id: string;
    required: boolean;
    level: number;
    schema: JSONSchema7;
  }[] = [];

  const requiredProps = schema.required ?? [];

  if (schema.type === 'object') {
    Object.entries(schema.properties).forEach(([id, definition]) => {
      if (typeof definition === 'boolean') {
        return;
      }
      const formattedId = formatId(id, parentId);
      properties.push({
        id: formattedId,
        level: getLevel(formattedId),
        required: requiredProps.includes(id),
        schema: definition,
      });
      properties.push(...flattenProperties(definition, formattedId));
    });
  } else if (schema.type === 'array') {
    const items = Array.isArray(schema.items) ? schema.items : [schema.items];
    items.forEach((definition) => {
      if (typeof definition === 'boolean') {
        return;
      }
      properties.push(
        ...flattenProperties(definition, formatId('*', parentId))
      );
    });
  } else if (schema.oneOf) {
    schema.oneOf.forEach((definition) => {
      if (typeof definition === 'boolean') {
        return;
      }
      properties.push(...flattenProperties(definition, parentId));
    });
  } else {
    console.log('uh oh');
  }

  return properties;
}
