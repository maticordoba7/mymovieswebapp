import React, { useContext, useState } from 'react';
import { Button, Input, Layout, Menu } from 'antd';
import { StoreContext } from '../../store/StoreProvider';
import { useHistory } from 'react-router';
import { getResultSearch } from '../../api/apiCalls';
import { types } from '../../store/storeReducer';
import { auth } from '../../firebase';


function HeaderComponent(props) {
  const history = useHistory();
  const { Header } = Layout;
  const [store, dispatch] = useContext(StoreContext);
  const { user } = store;
  const [loading, setLoading] = useState(false);
  const onSearch = (query) => {
    setLoading(true)
    getResultSearch(query)
      .then(({ data }) => {
        console.log(data)
        dispatch({
          type: types.SET_SEARCH_RESULTS,
          payload: data.results
        })
        history.push('/searchResults')
        setLoading(false)
      })
      .catch((err) => setLoading(false))
  }
  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        console.log('se deslogueo')
        localStorage.removeItem('isLoggedIn')
        dispatch({
          type: types.LOGOUT,
        });
      })
  };
  return (
    <Header theme="dark" style={{ display: 'flex', justifyContent: 'space-evenly' }}>
      {/* <div style={{ float: 'left', width: '120px', height: '31px', margin: '16px 24px 16px 0', background: 'white' }}>
        <h4>
          Welcome, {user && user.firstName}
        </h4>
      </div> */}
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item key="1" onClick={() => { history.push('/') }}>Home</Menu.Item>
        <Menu.Item key="2" onClick={() => { history.push('/favorites') }}>My favorites movies</Menu.Item>
      </Menu>
      <div style={{ alignSelf: 'center' }}>
        <div style={{ display: 'flex', alignContent: 'center' }}>
          <Input.Search
            loading={loading}
            placeholder="Search movie"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
          />
        </div>
      </div>
      <div>
        <Button onClick={() => { handleLogout() }}>Logout</Button>

      </div>
    </Header>
  );
}

export default HeaderComponent;