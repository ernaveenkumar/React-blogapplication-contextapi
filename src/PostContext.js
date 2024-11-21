// import { createContext, useState } from 'react';
import { createContext, useState } from 'react';
import { faker } from '@faker-js/faker';

//the variable name PostContext starts with an uppercase letter. the reason for that
//is this is actually a component. and component always use first letter capital.
//1st step
const PostContext = createContext();

function PostProvider({ children }) {
  //useState(()=>{}) callback function runs on the initial render only.
  const [posts, setPosts] = useState(() =>
    Array.from({ length: 30 }, () => createRandomPost())
  );

  const [searchQuery, setSearchQuery] = useState('');

  // Derived state. These are the posts that will actually be displayed
  const searchedPosts =
    searchQuery.length > 0
      ? posts.filter((post) =>
          `${post.title} ${post.body}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : posts;

  function handleAddPost(post) {
    setPosts((posts) => [post, ...posts]);
  }

  function handleClearPosts() {
    setPosts([]);
  }

  return (
    <PostContext.Provider
      value={{
        posts: searchedPosts,
        onClearPosts: handleClearPosts,
        onAddPost: handleAddPost,
        searchQuery: searchQuery,
        setSearchQuery: setSearchQuery,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

function createRandomPost() {
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  };
}
// export default PostProvider;
export { PostProvider, PostContext };
