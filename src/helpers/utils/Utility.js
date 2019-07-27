import moment from 'moment';

const dateFormat = dateData => moment(dateData).format('MMMM Do, YYYY');

export default { dateFormat };
