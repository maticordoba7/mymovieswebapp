import { Col, Comment, Image, PageHeader, Row, Tooltip, List, Button, Input, notification, Typography } from "antd";
import { useContext, useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router";
import { getMoreDetail } from "../api/apiCalls";
import { StoreContext } from "../store/StoreProvider";
import moment from 'moment';
import { db, moviesCollection } from "../firebase";

const DetailMovie = () => {
  const history = useHistory();
  const [store] = useContext(StoreContext);
  const { id } = useParams();
  const [detailMovie, setDetailMovie] = useState(null)
  const { Title, Paragraph } = Typography;
  useEffect(() => {
    getMoreDetail(id)
      .then(({ data }) => {
        setDetailMovie(data);
      })
  }, [id]);
  console.log({ detailMovie })

  const inputRef = useRef(null);
  const [inputComment, setInputComment] = useState('');
  const [comments, setComments] = useState([]);

  const getData = async () => {
    if (store.user !== null) {
      await moviesCollection
        .doc(id.toString())
        .collection('comments')
        .onSnapshot(querySnapshot => {
          querySnapshot.docChanges().forEach((change) => {
            const firebaseComment = change.doc.data();
            console.log({firebaseComment})
            setComments((prevState) => [...prevState,
            {
              author: `${firebaseComment.firstName} ${firebaseComment.lastName}`,
              avatar: `https://ui-avatars.com/api/?name=${firebaseComment.firstName}+${firebaseComment.lastName}&background=random`,
              content: (
                <p style={{ color: 'black' }}>
                  {firebaseComment.content}
                </p>
              ),
              datetime: (
                <Tooltip title={moment(firebaseComment.datatime.toDate()).format('YYYY-MM-DD HH:mm:ss')}>
                  <span>{moment(firebaseComment.datatime.toDate()).fromNow()}</span>
                </Tooltip>
              ),
            }])
          });
        })
    }
  };
  useEffect(() => {
    getData()
  }, [])
  const handleSendComment = () => {
    if (!store.user) {
      return notification.error({
        message: 'Something is wrong, please try again',
        placement: 'bottomRight'
      })
    }
    if (inputComment.length === 0) {
      return notification.error({
        message: 'It is necessary to write a comment',
        placement: 'bottomRight'
      })
    }
    const commentDates = {
      firstName: store.user.firstName,
      lastName: store.user.lastName,
      content: inputComment,
      datatime: new Date(),
    };
    moviesCollection
      .doc(id.toString())
      .collection('comments')
      .doc()
      .set(commentDates)
      .then((res) => {
        setInputComment('')
      })
      .catch((err) => notification.error({
        message: 'Ups, something is failed',
        description: err.message,
        placement: 'bottomRight'

      }))
  };
  useEffect(() => {
    const elementEmpty = document.getElementsByClassName('ant-empty-description')[0];
    if (elementEmpty) {
      elementEmpty.innerText = "No comments"
    }
  }, [])
  return (
    <>
      <PageHeader
        className="site-page-header"
        onBack={() => history.push('/')}
        title={`${detailMovie?.title} `}
        subTitle={detailMovie?.release_date ? `(${detailMovie?.release_date.substr(0, 4)})` : ''}
      />
      <div style={{
        display: 'flex', justifyContent: 'center', paddingLeft: '16px 24px',
        backgroundImage: `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${detailMovie?.backdrop_path})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right -200px top'
      }}>
        <Row
          gutter={[25, 25]}
          style={{
            backgroundImage: 'linear-gradient(to right, rgba(8.24%, 11.76%, 13.33%, 1.00) 150px, rgba(8.24%, 11.76%, 13.33%, 0.84) 100%)',
            padding: '30px',
            width: '100%'
          }}
        >
          <Col
            xs={{ span: 18, offset: 3 }}
            sm={{ span: 16, offset: 4 }}
            md={{ span: 12, offset: 0 }}
            lg={{ span: 8, offset: 0 }}
            xl={{ span: 7, offset: 0 }}
            xxl={{ span: 8, offset: 0 }}
          >
            <Image
              src={`https://image.tmdb.org/t/p/original${detailMovie?.poster_path}`}
              style={{ width: '100%', height: '100%', borderRadius: '10px' }}
              width={'100%'}
              height={'100%'}
            />
          </Col>
          <Col
            xs={{ span: 18, offset: 3 }}
            sm={{ span: 16, offset: 4 }}
            md={{ span: 12, offset: 0 }}
            lg={{ span: 16, offset: 0 }}
            xl={{ span: 16, offset: 0 }}
            xxl={{ span: 14, offset: 0 }}
          >
            <div>
              <Title level={5}>{detailMovie?.genres?.map(genre => genre.name).join(', ')} </Title>
              <Title level={3}>{detailMovie?.tagline}</Title>
              <Title level={3}>Overview</Title>
              <Paragraph>{detailMovie?.overview}</Paragraph>
            </div>
            <Button
              style={{ position: 'absolute', bottom: '0', right: '0' }}
              onClick={() => {
                inputRef.current.focus({
                  cursor: 'start',
                });
              }}
            >
              Leave my comment
            </Button>
          </Col>
        </Row>
      </div>
      <Row>
        <Col offset={4} span={16}>
          <List
            header={`${comments.length} replies`}
            dataSource={comments}
            renderItem={item => (
              <li>
                <Comment
                  actions={item.actions}
                  author={item.author}
                  avatar={item.avatar}
                  content={item.content}
                  datetime={item.datetime}
                />
              </li>
            )}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Input.TextArea
              style={{ width: '75%' }}
              placeholder={'Leave here you comment'}
              ref={inputRef}
              onChange={(e) => setInputComment(e.target.value)}
              value={inputComment}
            />
            <Button onClick={() => handleSendComment()}> Send comment</Button>
          </div>
        </Col>
      </Row>

    </>
  )
}

export default DetailMovie;