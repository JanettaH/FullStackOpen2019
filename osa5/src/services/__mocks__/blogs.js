const blogs = [
  {
    author: "Ensimmäinen blogi",
    title: "Otsikko",
    url: "Url",
    user: {
      name: "JttA",
      id: 2
    },
    likes: 3
  },
  {
    author: "Toinen blogi",
    title: "Otsikko2",
    url: "Url2",
    user: {
      name: "JttA2",
      id: 2
    },
    likes: 3
  },
  {
    author: "Kolmas blogi",
    title: "Otsikko3",
    url: "Url3",
    user: {
      name: "JttA3",
      id: 2
    },
    likes: 3
  }
];

const getAll = () => {
  return Promise.resolve(blogs);
};

const setToken = newToken => {
  let token = `bearer ${newToken}`;
};

export default { getAll, setToken };
