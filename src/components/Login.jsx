import { Form, Input, Button, notification, Typography } from "antd";
import { useContext } from "react";
import { StoreContext } from "../store/StoreProvider";
import { types } from "../store/storeReducer";
import { auth } from "../firebase";
import { useHistory } from "react-router";

const Login = () => {
  const [store, dispatch] = useContext(StoreContext);
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 12 },
  };
  const tailLayout = {
    wrapperCol: { offset: 6, span: 16 },
  };
  const onFinish = ({ email, password }) => {
    auth.signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        dispatch({
          type: types.LOGIN,
          payload: {
            firstName: 'Matias',
            lastName: 'Cordoba',
            email: user.email,
            uid: user.uid,
          },
        })
        localStorage.setItem('isLoggedIn', true)
      })
      .catch((err) =>
        notification.error({
          message: `Something is wrong, try again!`,
          description: err.message,
          placement: "bottomRight",
        }))
  }
  const onFinishFailed = () => {
    notification.error({
      message: `Your password is invalid, try again!`,
      placement: "bottomRight",
    });
  }
  const history = useHistory();

  return (
    <section style={{ padding: '42px 24px', height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
      <Form
        form={form}
        name="login"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        {...layout}
        style={{
          width: '100%',
        }}
      >
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
            Login
          </Button>
          <span style={{ margin: '0px 7px' }}>
            Don't have an account?
          </span>
          <Button type="link" htmlType="submit" style={{ padding: '0px' }} onClick={() => { history.push('/signup') }} >
            Signup
          </Button>
        </Form.Item>
      </Form>
    </section>
  );
}

export default Login;