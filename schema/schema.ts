import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import Handlebars from 'handlebars';
import { JSONSchema7 } from 'json-schema';
import flattenProperties from './flattenProperties';

const schema: JSONSchema7 = JSON.parse(
  readFileSync(join(__dirname, 'schema2.json'), 'utf-8')
);

Handlebars.registerHelper('repeat', require('handlebars-helper-repeat'));

const source = readFileSync(join(__dirname, 'template.hbs'), 'utf-8');
const template = Handlebars.compile(source, { noEscape: true });
const markdown = template({
  properties: flattenProperties(schema),
});

console.log(markdown);
writeFileSync(join(__dirname, '../docs/schema.md'), markdown, 'utf-8');
