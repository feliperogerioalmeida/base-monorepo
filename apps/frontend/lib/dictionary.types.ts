export interface CommonDictionary {}

export interface HomeDictionary {
  title: string;
}

export interface Dictionary {
  common: CommonDictionary;
  home: HomeDictionary;
}
