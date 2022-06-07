/**
 * External dependencies
 */
import { isObject, pickBy, mapValues, identity, isEmpty } from 'lodash';

/**
 * Removed falsy values from nested object. This
 * helps reset functions in block editor remove unnecessary
 * values without requiring a replacement value like a blank string.
 *
 * @param {*} object
 * @return {*} Object cleaned from falsy values
 */
export const cleanEmptyObject = (object) => {
	if (!isObject(object) || Array.isArray(object)) {
		return object;
	}
	const cleanedNestedObjects = pickBy(
		mapValues(object, cleanEmptyObject),
		identity
	);
	return isEmpty(cleanedNestedObjects) ? undefined : cleanedNestedObjects;
};
/**
 * Allows multiple props to be passed around in objects and then
 * generates a string of CSS custom properties to inject into the "style" field.
 * @param {*} object    An object key: value pair to transfer to string.
 * @return {string}     String to be used in style property.
 */
export const toCSSCustomProps = (object) => {
	return Object.entries(object)
		.map((entry) => {
			return `--${entry[0]}:${entry[1]};`;
		})
		.join('');
};

/*
 Example implementation.
const styleProps = {
    columns: '20ch 1fr 50px',
    gap: '20rem'
}

let styleString = toCSSCustomProps(styleProps)
// → '--columns:20ch 1fr 50px;--gap:20rem;'*/
