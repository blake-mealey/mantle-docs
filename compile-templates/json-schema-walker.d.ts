declare module '@cloudflare/json-schema-walker' {
  import { JSONSchema4, JSONSchema6, JSONSchema7 } from 'json-schema';

  export type SchemaPath = string[];

  export type WalkFunc<TSchema> = (
    subschema: TSchema,
    path: SchemaPath,
    schema: TSchema,
    parentPath: SchemaPath
  ) => void;

  export type Vocabulary<TSchema> = Record<
    string,
    (
      schema: TSchema,
      keyword: keyof TSchema,
      preFunc: WalkFunc<TSchema>,
      postFunc: WalkFunc<TSchema>,
      parentPath: SchemaPath
    ) => void
  >;

  export const getSubschema: <TSchema>(
    schema: TSchema,
    path: SchemaPath
  ) => TSchema;

  export const schemaWalk: <TSchema>(
    schema: TSchema,
    preFunc?: WalkFunc<TSchema>,
    postFunc?: WalkFunc<TSchema>,
    vocabulary?: Vocabulary<TSchema>
  ) => void;

  export const subschemaWalk: <TSchema>(
    schema: TSchema,
    preFunc?: WalkFunc<TSchema>,
    postFunc?: WalkFunc<TSchema>,
    parentPath?: SchemaPath,
    vocabulary?: Vocabulary<TSchema>
  ) => void;

  export const getVocabulary: <TSchema>(
    schema: TSchema,
    defaultVocabulary?: Vocabulary<TSchema>
  ) => Vocabulary<TSchema>;

  export const vocabularies: {
    DRAFT_04: Vocabulary<JSONSchema4>;
    DRAFT_04_HYPER: Vocabulary<JSONSchema4>;
    DRAFT_04_HYPER_LDO: Vocabulary<JSONSchema4>;
    DRAFT_06: Vocabulary<JSONSchema6>;
    DRAFT_06_HYPER: Vocabulary<JSONSchema6>;
    DRAFT_06_HYPER_LDO: Vocabulary<JSONSchema6>;
    DRAFT_07: Vocabulary<JSONSchema7>;
    DRAFT_07_HYPER: Vocabulary<JSONSchema7>;
    DRAFT_07_HYPER_LDO: Vocabulary<JSONSchema7>;
    CLOUDFLARE_DOCA: Vocabulary<JSONSchema7>;
  };
}
