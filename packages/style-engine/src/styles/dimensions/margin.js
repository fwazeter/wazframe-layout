/**
 * Internal Dependencies
 */
import { generateRule } from '../utils';

const margin = {
	name: 'margin',
	generate: (style, options) => {
		return generateRule(style, options, ['dimensions', 'margin'], 'space');
	},
};

export default margin;
