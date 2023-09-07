import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { GRAY, PRIMARY } from '../../colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { useUserContext } from '../../contexts/UserContext';
import { URL } from '../../../env';

const PostItem = ({ post }) => {
  const [token] = useUserContext();

  const navigation = useNavigation();
  const windowWidth = Dimensions.get('window').width;

  const [image, setImage] = useState(null);

  const getImageApi = (id) => {
    fetch(`${URL}/thumbnail/${id}`, {
      method: 'GET', //메소드 지정
      headers: {
        //데이터 타입 지정
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${token}`,
      },
    })
      //   .then((res) => res) // 리턴값이 있으면 리턴값에 맞는 req 지정
      .then((res) => {
        // console.log(res); // 리턴값에 대한 처리
        // 성공하면!
        setImage(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    console.log(post.user);
    if (post.thumbnailId !== 0) {
      getImageApi(post.thumbnailId);
    }
  }, [post]);

  return (
    <Pressable
      style={[styles.container, { width: windowWidth - 50 }]}
      onPress={() => navigation.navigate('커뮤니티', { post })}
    >
      <View style={styles.textContainer}>
        <Text style={styles.title}>{post.title}</Text>
        {/* <Text style={styles.content}>
          {post.content.toString().substr(0, 10)}
        </Text> */}
        <View style={styles.explainContainer}>
          <Text style={styles.explain}>{post.createdDate}</Text>
          <Text style={styles.explainSeparator}>|</Text>
          <Text style={styles.explain}>{post.user.nickname}</Text>
          <Text style={styles.explainSeparator}>|</Text>
          <MaterialCommunityIcons
            style={[styles.icon, { color: '#991b1b' }]}
            name={'cards-heart-outline'}
            size={18}
            color={GRAY.DARK}
          />
          <Text style={[styles.explain, { color: '#991b1b' }]}>
            {post.liked}
          </Text>
          <MaterialCommunityIcons
            style={[styles.icon, { color: '#075985' }]}
            name={'comment-outline'}
            size={18}
            color={GRAY.DARK}
          />
          <Text style={[styles.explain, { color: '#075985' }]}>
            {post.postReplyCount}
          </Text>
        </View>
      </View>
      <View style={styles.imageContainer}>
        {image && post.thumbnailId !== 0 && (
          <Image source={image} style={styles.image} resizeMode={'cover'} />
        )}
      </View>
    </Pressable>
  );
};

PostItem.propTypes = {
  post: PropTypes.object,
  onPress: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '85%',
    marginHorizontal: 20,
    paddingVertical: 10,
    // borderBottomWidth: 0.5,
    // borderBottomColor: GRAY.DARK,
  },
  textContainer: {
    flexDirection: 'column',
  },
  title: {
    marginBottom: 10,
    fontSize: 25,
    lineHeight: 30,
    fontWeight: '700',
  },
  content: {
    fontSize: 15,
    lineHeight: 25,
  },
  explainContainer: {
    flexDirection: 'row',
    paddingVertical: 5,
  },
  explain: {
    fontSize: 15,
    lineHeight: 20,
    color: PRIMARY.DARK,
  },
  explainSeparator: {
    paddingHorizontal: 5,
    fontSize: 15,
    lineHeight: 20,
    color: PRIMARY.DARK,
  },
  icon: {
    paddingHorizontal: 2,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    marginLeft: 10,
    width: 80,
    height: 80,
    borderWidth: 1, // 지워
    borderColor: 'black', // 지워
    borderRadius: 10,
  },
});

export default PostItem;
