import type { AuthDictionary } from "@workspace/auth/types";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CommonDictionary {}

export interface HomeDictionary {
  title: string;
}

export interface Dictionary {
  common: CommonDictionary;
  home: HomeDictionary;
  auth: AuthDictionary;
}
