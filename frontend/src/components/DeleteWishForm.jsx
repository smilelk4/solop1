import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWish, deleteWish } from '../actions/wishActions';
import Button from './Button';
import PageSection from './PageSection';
import Alert from '@material-ui/lab/Alert';

const DeleteWishForm = (props) => {
  const [ wishTitle, setWishTitle ] = useState('');
  const [ collectionId, setCollectionId ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ country, setCountry ] = useState('');
  const [ regionCity , setRegionCity ] = useState('');
  const wishId = props.match.params.id;
  const dispatch = useDispatch();
  const collection = useSelector(state => state.collections[0]);
  const token = useSelector(state => state.token);
  const errorLog = useSelector(state => state.errors);
  const wish = useSelector(state => state.wishes[0]);

  useEffect(() => {
    dispatch(fetchWish(wishId));
  }, [props.match.params.id]);

  useEffect(() => {
    if (wish) {
      setWishTitle(wish.title);
      setCollectionId(wish.collectionId);
      setDescription(wish.description);
      setCountry(wish.country);
      setRegionCity(wish.regionCity);
    }
  }, [wish]);

  const handleSubmit = e => {
    e.preventDefault();
    (async () => {
      await dispatch(deleteWish(token, wish.id));
      window.location.href='/my-box';
    })();
  }
  
  if (wish) {
    return (
      <>
        <h3 className="form__header">{props.title}</h3>
        <div className="form__error-container">
          {errorLog.map(err => (
            <Alert severity="error">{err}</Alert> 
          ))}
        </div>
        <PageSection 
          label='Title:'
          value={wishTitle}
        />
        <PageSection 
          label='Description:'
          value={description}
        />
        <PageSection 
          label='Collection Id:'
          value={collectionId}
        />
        <PageSection 
          label='Country:'
          value={country}
        />
        <PageSection 
          label='Region/City:'
          value={regionCity}
        />
        <form className="form" onSubmit={handleSubmit}>
          <Button type='deleteWish' bgcolor='pink' reg='true'/>
        </form>
      </>
    );
  }
  return (
    <div>...Loading</div>
  )

}
 
export default DeleteWishForm;