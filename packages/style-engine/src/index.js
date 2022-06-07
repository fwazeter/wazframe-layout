/**
 * External dependencies
 */
import { groupBy, kebabCase } from 'lodash';

import { layoutStyleDefinitions } from './styles';

/**
 * Generates a stylesheet for a given style object and selector.
 *
 * @param {Object} style Style object.
 * @param {Object} options Options object with settings to adjust how the style are generated.
 *
 * @return generated stylesheet.
 */
export function generate(style, options) {
	const rules = [ style, options ];

	// if no selector provided, treat as an inline style returned as string.
	if (!options?.selector) {
		const inlineRules = [];
		if (!options?.isCustomProp) {
			rules.forEach((rule) => {
				inlineRules.push(`${kebabCase(rule.key)}: ${rule.value};`);
			});
			return inlineRules.join(' ');
		}
		rules.forEach((rule) => {
			inlineRules.push(`--${kebabCase(rule.key)}: ${rule.value};`);
		});
		return inlineRules.join(' ');
	}

	const groupedRules = groupBy(rules, 'selector');

	// reduce allows for a callback function to reduce all values to a single value from array.
	// acc is for grouping objs by property.
	const selectorRules = Object.keys(groupedRules).reduce(
		(acc, subSelector) => {
			acc.push(
				`${subSelector} { ${groupedRules[subSelector]
					.map((rule) => `${kebabCase(rule.key)}: ${rule.value};`)
					.join(' ')} }`
			);
			return acc;
		},
		[]
	);
	return selectorRules.join('\n');
}

/**
 * Returns a JSON representation of the generated CSS rules.
 *
 * @param {Object} style       Style object.
 * @param {Object} options     Options object with settings to adjust how styles are generated.
 *
 * @return generated styles.
 */
export function getCSSRules( style, options = {}) {
	const rules = [];

	layoutStyleDefinitions.forEach((definition) => {
		if (typeof definition.generate === 'function') {
			rules.push(generate(style, options));
		}
	});

	return rules;
}
