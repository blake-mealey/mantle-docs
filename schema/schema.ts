import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, parse } from 'node:path';
import Handlebars from 'handlebars';
import { JSONSchema7 } from 'json-schema';
import flattenProperties from './flattenProperties';
import { createSlugger } from '@docusaurus/utils';

const schema: JSONSchema7 = JSON.parse(
  readFileSync(join(__dirname, 'schema.json'), 'utf-8')
);

const includes = readdirSync(join(__dirname, 'includes'));
includes.forEach((file) => {
  const contents = readFileSync(join(__dirname, 'includes', file), 'utf-8');
  Handlebars.registerPartial(parse(file).name, contents);
});

Handlebars.registerHelper('repeat', require('handlebars-helper-repeat'));

const slugs = createSlugger();
Handlebars.registerHelper('anchor', (id: string) => {
  return `{#${slugs.slug(id.replace(/\./g, '-'))}}`;
});

const source = readFileSync(join(__dirname, 'template.hbs'), 'utf-8');
const template = Handlebars.compile(source, { noEscape: true });
const markdown = template({
  properties: flattenProperties(schema),
});

writeFileSync(join(__dirname, '../docs/configuration.md'), markdown, 'utf-8');
