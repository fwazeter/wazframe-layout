/**
 * External dependencies
 */
import { get } from 'lodash';

/**
 * Returns a JSON representation of the generated CSS rules.
 *
 * @param {Object} style    The style object.
 * @param {Object} options  Options object with settings to adjust how styles are generated.
 * @param {Array} path      Array of strings representing the path to the style value in style object.
 * @param {String} ruleKey           A property key.
 *
 * @returns {[{selector: *, value: *, key}]|*[]}
 */
export function generateRule(style, options, path, ruleKey) {
	const styleValue = get(style, path);

	return styleValue
		? [
				{
					selector: options?.selector,
					key: ruleKey,
					value: styleValue,
				},
		  ]
		: [];
}
