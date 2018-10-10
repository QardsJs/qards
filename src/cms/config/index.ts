import {getSettingsConfig} from '../../utils/helpers';
import base from './base';

export default Object.assign(base, {
	publish_mode: getSettingsConfig('editorialMode', false) == true ? 'editorial_mode' : undefined,
});