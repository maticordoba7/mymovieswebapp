import { Form, Input, Button, notification } from "antd";
import { useContext } from "react";
import { StoreContext } from "../store/StoreProvider";
import { types } from "../store/storeReducer";
import { auth, db } from "../firebase";
import { useHistory } from "react-router";

const SignUp = () => {
  const [store, dispatch] = useContext(StoreContext);
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 12 },
  };
  const tailLayout = {
    wrapperCol: { offset: 6, span: 16 },
  };
  const onFinish = ({ email, password, firstName, lastName}) => {
    auth.createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        db.collection('users').doc(user.uid).set({
          firstName,
          lastName,
          email,
          favoritesMovies: [],
      })
        dispatch({
          type: types.LOGIN,
          payload: {
            firstName,
            lastName,
            email: user.email,
            uid: user.uid,
            favoritesMovies: [],
          },
        })
        localStorage.setItem('isLoggedIn', true)
      })
      .catch(err => console.log(err.message))
  }
  const onFinishFailed = () => {
    notification.error({
      message: `Your password is invalid, try again!`,
      placement: "bottomRight",
    });
  }
  const history = useHistory();
  
  return (
    <section style={{ padding: '42px 24px' }}>
      <Form
        form={form}
        name="login"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        {...layout}
      >
        <Form.Item
          label="Firstname"
          name="firstName"
          rules={[{ required: true, message: "Please input your firstname!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Lastname"
          name="lastName"
          rules={[{ required: true, message: "Please input your lastname!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          {...tailLayout}
        >
          <Button type="primary" htmlType="submit">
            Create account
          </Button>
          <span style={{ margin: '0px 7px' }}>
            Do you have an account?
          </span>
          <Button type="link" htmlType="submit" style={{ padding: '0px' }} onClick={() => { history.push('/') }} >
            Login
          </Button>
        </Form.Item>
      </Form>
    </section>
  );
}

export default SignUp;