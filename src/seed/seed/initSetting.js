import { setting as Setting} from '../models';

export default () => {
	Setting.create({
		brandName: 'IBIS Bank',
		greenlight: true
	})
}
