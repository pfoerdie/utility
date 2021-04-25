const _ = require('.');
const pattern = exports;

pattern.nonempty = /\S/;

/** 
 * @see https://tools.ietf.org/html/rfc3987#section-2.2
 * @see https://stackoverflow.com/questions/1547899/which-characters-make-a-url-invalid/36667242#answer-36667242 
 */
pattern.IRI = /^[a-z][a-z+.-]*:[^\s"<>\\^`{|}]*$/i;