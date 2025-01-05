import withSearch from './WithSearch';
import withSort from './WithSort';

function WithSearchAndSort(WrappedComponent) {
    return withSearch(withSort(WrappedComponent));
}

export default WithSearchAndSort;
