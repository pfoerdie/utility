const _ = require('.');

const pattern = exports;

pattern.nonempty = /\S/;

// pattern.token = /^[a-z_]\w*$/i;

/** 
 * @see https://tools.ietf.org/html/rfc3987#section-2.2
 * @see https://stackoverflow.com/questions/1547899/which-characters-make-a-url-invalid/36667242#answer-36667242 
 */
pattern.IRI = /^[a-z][a-z+.-]*:[^\s"<>\\^`{|}]*$/i;

/**
 * @see https://tools.ietf.org/html/rfc4646#section-2.1
 */
pattern.LanguageTag = /^[a-z]{1,3}(?:-[0-9a-z]{2,8})*$/i;