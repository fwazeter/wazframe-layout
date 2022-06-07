/**
 * Internal Dependencies
 */
import { toCSSCustomProps } from '../../block-editor/hooks/utils';

function Edit(props) {
	const { attributes, setAttributes, clientId } = props;
	const {
		space, // CSS margin value for margin-block-start.
		splitAfter, // number, element after which to split stack w/auto margin
		recursive, // bool whether spaces apply recursively.
	} = attributes;
}
