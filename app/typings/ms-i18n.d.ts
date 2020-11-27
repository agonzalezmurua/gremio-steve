declare module 'ms-i18n' {
  type Options = {
    long: boolean;
  };

  export default class MS {
    constructor(locale?: string);
    /** Returns the ISO 639-1 code for this lang */
    langIsoCode: string;

    /** Returns the name of the lang, in the lang itself */
    langName: string;

    /** Returns the english name for this lang */
    langEnglishName: string;

    format(value: string): number;
    format(value: string, options: Options): number;
    format(value: number): string;
    format(value: number, options: Options): string;
  }
}
