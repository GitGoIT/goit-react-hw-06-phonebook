import css from './Filter.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from '../../redux/filter/filter-slice';
import { getFilter } from '../../redux/filter/filter-selectors';


export const Filter = () => {

 const filter = useSelector(getFilter);
 const dispatch = useDispatch();

const handleFilter = ({ target }) => {
    dispatch(setFilter(target.value));
  };

  return (
    <div className={css.container}>
      <label htmlFor="">Find contacts by name</label>
      <input
        value={filter}
        name="filter"
        onChange={handleFilter}
        type="text"
        className={css.input}
      />
    </div>
  );
};

