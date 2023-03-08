import { MixedLocale, StringLocale } from 'yup/lib/locale';

const required: MixedLocale['required'] = (a) => ({
  key: a.path,
  message: `required`,
});

const maxString: StringLocale['max'] = (a) => ({
  key: a.path,
  message: `must contain at most ${a.max} characters.`,
});

const minString: StringLocale['min'] = (a) => ({
  key: a.path,
  message: `must contain at least ${a.min} characters.`,
});

const upperCaseRequired: StringLocale['matches'] = (a) => ({
  key: a.path,
  message: 'must contain one or more uppercase characters.',
});

const numberRequired: StringLocale['matches'] = (a) => ({
  key: a.path,
  message: 'must contain one or more number digits.',
});

const endDateInvalidMessage: MixedLocale['required'] = (a) => ({
  key: a.path,
  message: `task must end after the start time`,
});

const letterRequired: StringLocale['matches'] = (a) => ({
  key: a.path,
  message: ' must contain one or more letters',
});

const specialCharacterRequired: StringLocale['matches'] = (a) => ({
  key: a.path,
  message: 'must contain one or more special character.',
});

const validEmail: StringLocale['email'] = (a) => ({
    key: a.path,
    message: ' provided email is not correct.',
  });

export const validationMessage = {
  required,
  maxString,
  minString,
  upperCaseRequired,
  numberRequired,
  letterRequired,
  specialCharacterRequired,
  validEmail,
  endDateInvalidMessage,
};
