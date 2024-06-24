const states = {
  User: {
    userName: "radhiarahmanii",
    Email: "radhiarahmani.info@gmail.com",
    passw: "RADHIARAHMANI2021",
    website: ".com",
    Useravatar: "/images/image2.jpg",
    user: "Radhia Rahmani",
    bio: `Université de sesame
            business intelligence and power bi engineer
            from Medenine`,
    gender: "femme",
    phone: "54227098",
  },

  filter: [],
  posts: [
    {
      id: 1,
      username: "cristiano",
      url: "https://www.instagram.com/cristiano/?hl=fr",
      avatar:
        "https://wikiimg.tojsiabtv.com/wikipedia/commons/thumb/8/8c/Cristiano_Ronaldo_2018.jpg/440px-Cristiano_Ronaldo_2018.jpg",
      image:
        "https://resize.programme-television.ladmedia.fr/r/670,670/img/var/premiere/storage/images/tele-7-jours/news-tv/euro-2020-cristiano-ronaldo-fait-chuter-l-action-en-bourse-de-coca-cola-sponsor-de-la-competition-4674322/99515457-1-fre-FR/Euro-2020-Cristiano-Ronaldo-fait-chuter-l-action-en-bourse-de-Coca-Cola-sponsor-de-la-competition.jpg",
      caption: "Believe in your self and fight for your dreams!",
      comment: [
        {
          user: "amani",
          commentaire: "waww so beautiful",
        },
        {
          user: "radhia",
          commentaire: "so nice",
        },
      ],
    },

    {
      id: 2,
      username: "rymsaidi",
      url: "https://www.instagram.com/rymsaidi/?hl=fr",
      avatar:
        "https://bodysize.org/wp-content/uploads/2019/02/Rym-Saidi-300x400.jpg",
      image:
        "https://www2.pictures.zimbio.com/gi/Wissam+Breidy+Rym+Saidi+Breidy+Armani+One+Um4jqMo5Mgxx.jpg",
      caption: `What a beautiful night
                Thank you @redseafilm for having us
                @moalturki proud of you my friend
                Dress @georgeshobeika`,
      comment: [
        {
          user: "amani",
          commentaire: "waww so beautiful",
        },
        {
          user: "radhia",
          commentaire: "so nice",
        },
      ],
    },
    {
      id: 3,
      username: "dhaferlabidine",
      url: "https://www.instagram.com/dhaferlabidine/?hl=fr",
      avatar:
        "http://photo.cineart.agency/media/m/112/112238/6bis1_460_610r.jpg",
      image:
        "https://scontent.ftun15-1.fna.fbcdn.net/v/t39.30808-6/s960x960/263331235_464353758384820_7314982027746174277_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=qb32GEIZI5MAX82jrXW&_nc_ht=scontent.ftun15-1.fna&oh=2850ae4e9d4405e9ea244a1434e57d1a&oe=61B5060E",
      caption: `I’m very thrilled for Ghodwa winning the best film award Fipresci (the international federation of film critics) at the Cairo international film festival. 🇹🇳🙏😍
                Dhafer Styling: @maissaazab @sahar.m.azab
                Suit @orangesquarecairo @hatemhhafez 
                Hair @alsagheersalons 
                @cairofilms
                #dhaferlabidine
                #cairofilmfestival
                @fatales_stores
                @gac_motor`,
      comments: [
        {
          user: "amani",
          commentaire: "waww so beautiful",
        },
        {
          user: "radhia",
          commentaire: "so nice",
        },
      ],
    },
    {
      id: 4,
      username: "psg",
      url: "https://www.instagram.com/psg/?hl=fr",
      avatar:
        "https://upload.wikimedia.org/wikipedia/ar/thumb/a/a7/Paris_Saint-Germain_F.C..svg/270px-Paris_Saint-Germain_F.C..svg.png",
      image:
        "https://resize-parismatch.lanmedia.fr/f/webp/r/625,417,forcex,center-middle/img/var/news/storage/images/paris-match/actu/sport/lionel-messi-kylian-mbappe-paris-gagnant-1756170/28904283-1-fre-FR/Lionel-Messi-Kylian-Mbappe-Paris-gagnant.jpg",
      caption: `#ParisSaintGermain 4️⃣ - 1️⃣ #ClubBrugge
                ⚽ @k.mbappe 2’, 7’
                ⚽ @leomessi 38’, 76'`,
      comment: [
        {
          user: "amani",
          commentaire: "waww so beautiful",
        },
        {
          user: "radhia",
          commentaire: "so nice",
        },
      ],
    },
  ],
  comments: [
    {
      user: "amani",
      commentaire: "waww so beautiful",
      id: 1,
    },
    {
      user: "radhia",
      commentaire: "so nice",
      id: 1,
    },
    {
      user: "iheb99",
      commentaire: "yes youre the best one ",
      id: 2,
    },
    {
      user: "manarbenslimane",
      commentaire: "good work ",
      id: 2,
    },
    {
      user: "mouhamedtunis",
      commentaire: "really youre the best forever ",
      id: 2,
    },
    {
      user: "sana",
      commentaire: "keep it :) ",
      id: 3,
    },
  ],
  myposts: [
    {
      id: 1,
      imgsrc: "/images/image.jpg",
      statut: "what a wonderful day...",
    },
    {
      id: 2,
      imgsrc: "/images/image2.jpg",
      statut: " starting a new day with full energy",
    },
  ],
  post: [],
  likes: [],
  like: [],
};
const reducer = (state = states, action) => {
  const com = action.payload;
  const id = action.id;
  const image = action.data;
  const statut = action.stat;
  const identifiant = action.identifiant;
  const username = action.user;
  const idpost = action.idpost;
  const psw = action.pass;
  const name = action.val1;
  const usern = action.val2;
  const bio = action.val4;
  const website = action.val3;
  const email = action.val5;
  const phone = action.val6;
  const searched = action.profile;
  const newavatar = action.image;

  switch (action.type) {
    case "Register":
      return {
        ...state,
        users: [...state.User, action.payload],
      };
    case "addcomm":
      return {
        ...state,
        comments: [
          ...state.comments,
          {
            user: state.User.userName.toLowerCase(),
            commentaire: com,
            id: id,
          },
        ],
      };
    case "addpost":
      return {
        ...state,

        myposts: [
          ...state.myposts,
          {
            id:
              state.myposts.reduce(
                (acc, current) => (current.id > acc ? (acc = current.id) : acc),
                0
              ) + 1,
            imgsrc: image,
            statut: statut,
          },
        ],
      };

    case "showpost":
      return {
        ...state,

        post: state.myposts.filter((element) => element.id === identifiant),
      };

    case "likepost":
      const like = state.likes.filter(
        (element) => element.username === username && element.idpost === idpost
      );
      const l = like.length;
      if (l === 0) {
        return {
          ...state,
          likes: [
            ...state.likes,
            {
              username: username,
              idpost: idpost,
              btnlike: true,
            },
          ],
        };
      } else {
        return {
          ...state,

          likes: state.likes.filter(
            (element) =>
              element.username !== username && element.idpost !== idpost
          ),
          btnlike: false,
        };
      }
    case "editpsw":
      return {
        ...state,
        User: {
          ...state.User,
          passw: psw,
        },
      };
    case "editprofile":
      return {
        ...state,
        User: {
          ...state.User,
          userName: usern,
          user: name,
          Email: email,
          website: website,
          bio: bio,
          phone: phone,
        },
      };

    case "searchpage":
      return {
        ...state,
        filter: state.posts.filter((element) =>
          element.username.toLowerCase().includes(searched.toLowerCase())
        ),
      };
    case "editim":
      return {
        ...state,
        User: {
          ...state.User,
          Useravatar: newavatar,
        },
      };
    default:
      return state;
  }
};

export default reducer;
